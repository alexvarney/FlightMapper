import styled from "@emotion/styled";
import distance from "@turf/distance";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useGlobalContext from "../../store/GlobalContext";
import { TRoute } from "../../store/types";
import ICAOCodeInput from "./ICAOCodeInput";
import useAiportInfo from "./useAirportInfo";

const NewRouteFieldWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  & > input {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 0.25rem;
    border-radius: 0.25rem;
    flex-grow: 1;

    :focus {
      outline: none;
    }
  }

  & > input:not(:first-child) {
    flex-grow: 0;
    width: 8ch;
  }

  & > p {
    flex-grow: 1;
    margin: 0.125rem 0;
    font-size: 12px;
    font-weight: 800;
    text-overflow: ellipsis;
  }

  & > span {
    font-weight: 500;
    margin-left: 1rem;
  }

  align-items: center;

  button {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 18px;
    line-height: 14px;
    padding: 0.5rem;

    :hover {
      background: var(--primary);
      color: #182327;
    }
  }
`;

const AirportInfoRow = styled.div`
  display: flex;
  gap: 1rem;

  width: 100%;
  overflow: hidden;

  align-items: center;

  & > span:last-of-type {
    font-size: 14px;
    font-weight: 800;
    flex-grow: 1;
    text-align: right;
  }
`;

const INITIAL_INPUTS = {
  description: "",
  from: "",
  to: "",
};

const NewRouteField = () => {
  const [globalState, setGlobalState] = useGlobalContext();

  const [inputFields, setInputFields] = useState(INITIAL_INPUTS);

  const setInput = useCallback(
    (key: string, value: string) => {
      setInputFields((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [setInputFields]
  );

  const saveTentativeRoute = () => {
    if (globalState.tentativeRoute) {
      setGlobalState((prevState) => ({
        ...prevState,
        routes: [
          ...prevState.routes,
          {
            ...prevState.tentativeRoute!,
            id: nanoid(),
            description:
              inputFields.description && inputFields.description.length > 0
                ? inputFields.description
                : airportDescription,
          },
        ],
        tentativeRoute: undefined,
      }));

      setInputFields(INITIAL_INPUTS);
    }
  };

  const airportInfo = useAiportInfo([inputFields.from, inputFields.to]);

  const routeDistance = useMemo(() => {
    if (!globalState.tentativeRoute) return undefined;

    return distance(
      globalState.tentativeRoute?.origin.coordinates,
      globalState.tentativeRoute?.destination.coordinates,
      { units: "nauticalmiles" }
    );
  }, [globalState.tentativeRoute]);

  const airportDescription = globalState.tentativeRoute
    ? `${globalState.tentativeRoute.origin.name} - ${globalState.tentativeRoute.destination.name} `
    : "";

  useEffect(() => {
    const origin = airportInfo[inputFields.from];
    const destination = airportInfo[inputFields.to];

    if (
      origin &&
      destination &&
      (!globalState.tentativeRoute ||
        origin.ident !== globalState.tentativeRoute.origin.icao ||
        destination.ident !== globalState.tentativeRoute.destination.icao)
    ) {
      const tentativeRoute: TRoute = {
        id: "tentative",
        description: "",
        origin: {
          name: origin.name,
          icao: origin.ident,
          coordinates: [origin.laty, origin.lonx],
        },
        destination: {
          name: destination.name,
          icao: destination.ident,
          coordinates: [destination.laty, destination.lonx],
        },
      };

      setGlobalState((prevState) => ({
        ...prevState,
        tentativeRoute,
      }));
    } else if (globalState.tentativeRoute && (!origin || !destination)) {
      setGlobalState((prevState) => ({
        ...prevState,
        tentativeRoute: undefined,
      }));
    }
  }, [
    globalState,
    globalState.tentativeRoute?.origin.icao,
    globalState.tentativeRoute?.destination.icao,
    inputFields.from,
    inputFields.to,
    inputFields.description,
    airportInfo,
    globalState.tentativeRoute,
    setGlobalState,
    airportDescription,
  ]);

  return (
    <NewRouteFieldWrapper>
      <input
        name="description"
        placeholder="Description"
        onChange={(e) => setInput(e.target.name, e.target.value)}
        value={inputFields.description}
      />
      <ICAOCodeInput
        name="from"
        airports={airportInfo}
        onChange={setInput}
        value={inputFields.from}
        forceUppercase
      />
      <ICAOCodeInput
        name="to"
        airports={airportInfo}
        onChange={setInput}
        value={inputFields.to}
        forceUppercase
      />
      {globalState.tentativeRoute && (
        <AirportInfoRow>
          <span>{airportDescription}</span>
          <span>
            {new Intl.NumberFormat("en-US").format(
              Math.round(routeDistance ?? -1)
            )}
            nm
          </span>

          <button onClick={saveTentativeRoute}>Add</button>
        </AirportInfoRow>
      )}
    </NewRouteFieldWrapper>
  );
};

export default NewRouteField;
