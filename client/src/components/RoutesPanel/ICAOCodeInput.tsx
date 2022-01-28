import { useMemo } from "react";
import { TApiRequest_Airport } from "../../store/types";

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

export default ICAOCodeInput;
