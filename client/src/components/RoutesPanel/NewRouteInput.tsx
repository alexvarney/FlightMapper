import useGlobalContext from "../../store/GlobalContext";
import ICAOCodeInput from "./ICAOCodeInput";
import { AirportInfoRow, NewRouteFieldWrapper } from "./NewRouteInput.style";
import _distance from "@turf/distance";

import { useStore } from "../../store/root.store";
import { useMemo } from "react";

const NewRouteField = () => {
  const [origin, setOrigin, destination, setDestination, airports] = useStore(
    (state) => [
      state.tentativeRoute.origin,
      state.tentativeRoute.setOrigin,
      state.tentativeRoute.destination,
      state.tentativeRoute.setDestination,
      state.airports,
    ]
  );

  const [originAirport, destinationAirport] = useMemo(
    () => [airports[origin ?? ""], airports[destination ?? ""]],
    [airports, destination, origin]
  );

  const routeDistance = useMemo(() => {
    if (!originAirport?.coordinates || !destinationAirport?.coordinates)
      return null;

    const distNm = Math.round(
      _distance(originAirport.coordinates, destinationAirport.coordinates, {
        units: "nauticalmiles",
      })
    );

    const formattedNum = new Intl.NumberFormat("en-US").format(distNm);

    return `${formattedNum}nm`;
  }, [originAirport, destinationAirport]);

  return (
    <NewRouteFieldWrapper>
      <input name="description" placeholder="Description" />
      <ICAOCodeInput
        name="from"
        forceUppercase
        value={origin ?? ""}
        onChange={setOrigin}
      />
      <ICAOCodeInput
        name="to"
        forceUppercase
        value={destination ?? ""}
        onChange={setDestination}
      />
      {routeDistance && (
        <AirportInfoRow>
          <span>{`${originAirport?.name} - ${destinationAirport?.name}`}</span>
          <span>{routeDistance}</span>

          <button>Add</button>
        </AirportInfoRow>
      )}
    </NewRouteFieldWrapper>
  );
};

export default NewRouteField;
