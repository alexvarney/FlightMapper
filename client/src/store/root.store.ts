import { TApiRequest_Airport, TRoute, TAirport } from "./types";
import create from "zustand";
import produce from "immer";

export const getAirportInfo: (
  code: String
) => Promise<TAirport | null> = async (code: String) => {
  return await fetch(`http://localhost:3001/airport/${code}`)
    .then((res) => res.json() as Promise<TApiRequest_Airport>)
    .then((data) => ({
      icaoId: data.ident,
      name: data.name,
      coordinates: [data.laty, data.lonx],
    }))
    .catch((err) => null);
};

interface TRootStore {
  airports: Record<string, TAirport | null>;
  fetchAirport: (id: string) => Promise<void>;
  tentativeRoute: {
    origin?: string;
    setOrigin: (x: string) => void;
    destination?: string;
    setDestination: (x: string) => void;
  };
}

export const useStore = create<TRootStore>((set, get) => ({
  airports: {},
  tentativeRoute: {
    origin: "",
    setOrigin: (x) => {
      get().fetchAirport(x);
      set(
        produce((state) => {
          state.tentativeRoute.origin = x;
        })
      );
    },
    destination: "",
    setDestination: (x) => {
      get().fetchAirport(x);
      set(
        produce((state) => {
          state.tentativeRoute.destination = x;
        })
      );
    },
  },
  fetchAirport: async (icaoId: string) => {
    if (icaoId.length !== 4 || get().airports[icaoId] !== undefined) return;

    const res = await getAirportInfo(icaoId);
    set(
      produce((state) => {
        state.airports[icaoId] = res;
      })
    );
  },
}));

// useStore.subscribe((state) => [
//   state.tentativeRoute.origin,
//   state.tentativeRoute.destination,
// ]);
