import { observer } from "mobx-react-lite";
import useGlobalContext from "../../store/GlobalContext";
import ICAOCodeInput from "./ICAOCodeInput";
import { AirportInfoRow, NewRouteFieldWrapper } from "./NewRouteInput.style";

const NewRouteField = observer(() => {
  const rootStore = useGlobalContext();

  return (
    <NewRouteFieldWrapper>
      <input
        name="description"
        placeholder="Description"
        onChange={(e) =>
          rootStore.tentativeRoute.setDescription(e.target.value)
        }
        value={rootStore.tentativeRoute.description}
      />
      <ICAOCodeInput
        name="from"
        onChange={rootStore.tentativeRoute.setOrigin}
        value={rootStore.tentativeRoute.originInput}
        forceUppercase
      />
      <ICAOCodeInput
        name="to"
        onChange={rootStore.tentativeRoute.setDestination}
        value={rootStore.tentativeRoute.destinationInput}
        forceUppercase
      />
      {rootStore.tentativeRoute.isValid && (
        <AirportInfoRow>
          <span>{rootStore.tentativeRoute.airportNames}</span>
          <span>
            {new Intl.NumberFormat("en-US").format(
              Math.round(rootStore.tentativeRoute.distance)
            )}
            nm
          </span>

          <button>Add</button>
        </AirportInfoRow>
      )}
    </NewRouteFieldWrapper>
  );
});

export default NewRouteField;
