import styled from "@emotion/styled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useGlobalContext from "../../store/GlobalContext";
import { TApiRequest_Airport } from "../../store/types";

const NewRouteFieldWrapper = styled.li`
  display: flex;
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
`;

const getAirportInfo = async (code: String) => {
  return await fetch(`http://localhost:3001/airport/${code}`).then((res) =>
    res.json()
  );
};

const useAiportInfo = (fields: string[]) => {
  const [airportInfo, setAirportInfo] = useState<
    Record<string, TApiRequest_Airport | null>
  >({});

  useEffect(() => {
    fields.forEach((field) => {
      if (field.length === 4 && airportInfo[field] === undefined) {
        getAirportInfo(field)
          .then((res) =>
            setAirportInfo((prevState) => ({
              ...prevState,
              [field]: res,
            }))
          )
          .catch((err) => {
            setAirportInfo((prevState) => ({
              ...prevState,
              [field]: null,
            }));
          });
      }
    });
  }, [fields, airportInfo, setAirportInfo]);

  return airportInfo;
};

interface TICAOCodeInputProps {
  name: "from" | "to";
  value: string;
  onChange: (key: string, value: string) => void;
  forceUppercase?: boolean;
  airports: Record<string, TApiRequest_Airport | null>;
}

enum CodeInputStates {
  default = "deafult",
  valid = "valid",
  error = "error",
  pending = "pending",
}

const InputColors = {
  [CodeInputStates.default]: "var(--primary)",
  [CodeInputStates.valid]: "#47a386",
  [CodeInputStates.error]: "#b46442",
  [CodeInputStates.pending]: "#c8b933",
};

const ICAOCodeInput = (props: TICAOCodeInputProps) => {
  const inputState = useMemo(() => {
    let state = CodeInputStates.default;

    if (props.value.length === 4) {
      if (props.airports[props.value]) {
        state = CodeInputStates.valid;
      } else if (props.airports[props.value] === null) {
        state = CodeInputStates.error;
      } else {
        state = CodeInputStates.pending;
      }
    }

    return state;
  }, [props.value, props.airports]);

  return (
    <input
      style={{ borderColor: InputColors[inputState] }}
      name={props.name}
      onChange={(e) =>
        props.onChange(
          props.name,
          props.forceUppercase ? e.target.value.toUpperCase() : e.target.value
        )
      }
      placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      value={props.value}
    ></input>
  );
};

const NewRouteField = () => {
  const [inputFields, setInputFields] = useState({
    description: "",
    from: "",
    to: "",
  });

  const setInput = useCallback(
    (key: string, value: string) => {
      setInputFields((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [setInputFields]
  );

  const airportInfo = useAiportInfo([inputFields.from, inputFields.to]);

  console.log(airportInfo);

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
    </NewRouteFieldWrapper>
  );
};

export default NewRouteField;
