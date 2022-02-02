import {
  types,
  flow,
  getRoot,
  Instance,
  SnapshotOrInstance,
  getSnapshot,
  SnapshotOut,
  SnapshotIn,
} from "mobx-state-tree";
import { RouteModel, AirportModel, TApiRequest_Airport } from "./types";
import { autorun } from "mobx";
import distance from "@turf/distance";
import { Feature } from "geojson";

export const getAirportInfo: (
  code: String
) => Promise<TApiRequest_Airport | null> = async (code: String) => {
  return await fetch(`http://localhost:3001/airport/${code}`)
    .then((res) => res.json())
    .catch((err) => null);
};

export enum REQUEST_STATUS {
  pending,
  valid,
  error,
}

const QueryStatusModel = types.model({
  id: types.identifier,
  status: types.enumeration(["pending", "valid", "error"]),
});

const TentativeRouteStore = types
  .model({
    originInput: types.string,
    destinationInput: types.string,
    description: types.maybe(types.string),
  })
  .volatile((self) => {
    const rootStore = getRoot<any>(self);

    autorun(() => {
      [self.originInput, self.destinationInput].forEach(
        (value) => value.length === 4 && rootStore.fetchAirport(value)
      );
    });

    return { rootStore };
  })
  .views((self) => ({
    get origin() {
      const origin: Instance<typeof AirportModel> | undefined =
        self.rootStore.airports.get(self.originInput);

      if (origin) console.log(getSnapshot(origin));

      return origin;
    },
    get destination() {
      const destination: Instance<typeof AirportModel> | undefined =
        self.rootStore.airports.get(self.destinationInput);

      if (destination) console.log(getSnapshot(destination));

      return destination;
    },
  }))
  .views((self) => {
    return {
      get isValid() {
        return !!(self.origin && self.destination);
      },

      get distance() {
        console.log(self.origin, self.destination);

        return !!(self.origin && self.destination)
          ? distance(self.origin!.coordinates, self.destination!.coordinates, {
              units: "nauticalmiles",
            })
          : -1;
      },

      get airportNames() {
        if (!this.isValid) return "";

        return `${
          self.origin?.name ?? self.origin?.icao ?? self.originInput
        } - ${
          self.destination?.name ?? self.destination?.icao ?? self.originInput
        }`;
      },

      get tentativeFeature(): any | undefined {
        if (!this.isValid) return undefined;

        return {
          id: "tentative",
          origin: getSnapshot(self.origin!),
          destination: getSnapshot(self.destination!),
          description: self.description ?? this.airportNames,
        };
      },
    };
  })
  .actions((self) => ({
    setOrigin: (value: string) => {
      self.originInput = value;
    },
    setDestination: (value: string) => {
      self.destinationInput = value;
    },
    setDescription: (value: string) => {
      self.description = value;
    },
  }));

export const RootStore = types
  .model("RootStore", {
    airports: types.map(AirportModel),
    routes: types.array(RouteModel),
    requestStatus: types.map(QueryStatusModel),
    tentativeRoute: TentativeRouteStore,
  })
  .views((self) => ({
    get routesFeatureCollection() {
      let routes = [...self.routes.slice()];

      if (self.tentativeRoute.isValid) {
        routes.push(self.tentativeRoute.tentativeFeature);
      }

      return routes;
    },
  }))
  .actions((self) => ({
    fetchAirport: flow(function* (icaoId: string) {
      if (icaoId.length !== 4 || self.requestStatus.has(icaoId)) return;

      self.requestStatus.set(icaoId, {
        id: icaoId,
        status: "pending",
      });

      //not sure why this type isn't inferred, oh well
      const result: TApiRequest_Airport | null = yield getAirportInfo(icaoId);

      if (result) {
        self.requestStatus.set(icaoId, {
          id: icaoId,
          status: "valid",
        });
        self.airports.set(result.ident, {
          icao: result.ident,
          name: result.name,
          coordinates: [result.laty, result.lonx],
        });
      } else {
        self.requestStatus.set(icaoId, {
          id: icaoId,
          status: "error",
        });
      }
    }),
  }));
