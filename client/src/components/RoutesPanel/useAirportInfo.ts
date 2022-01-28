import { useEffect, useState } from "react";
import { TApiRequest_Airport } from "../../store/types";

export const getAirportInfo = async (code: String) => {
  return await fetch(`http://localhost:3001/airport/${code}`).then((res) =>
    res.json()
  );
};

export const useAiportInfo = (fields: string[]) => {
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

export default useAiportInfo;
