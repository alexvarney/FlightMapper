import { observer } from "mobx-react-lite";
import useGlobalContext from "../../store/GlobalContext";
interface TICAOCodeInputProps {
  name: "from" | "to";
  value: string;
  onChange: (value: string) => void;
  forceUppercase?: boolean;
}

const getInputColor = (status: string | undefined) => {
  switch (status) {
    case "pending":
      return "#c8b933";
    case "error":
      return "#b46442";
    case "valid":
      return "#47a386";
    default:
      return "var(--primary)";
  }
};

const ICAOCodeInput = observer((props: TICAOCodeInputProps) => {
  const rootStore = useGlobalContext();

  const requestStatus = rootStore.requestStatus.get(props.value)?.status;
  const inputColor = getInputColor(requestStatus);

  return (
    <input
      style={{ borderColor: inputColor }}
      name={props.name}
      onChange={(e) =>
        props.onChange(
          props.forceUppercase ? e.target.value.toUpperCase() : e.target.value
        )
      }
      placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      value={props.value}
    ></input>
  );
});

export default ICAOCodeInput;
