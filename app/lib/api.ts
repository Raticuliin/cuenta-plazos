import { Holiday, ApiHolidayResponse } from "../types";

export const fetchHolidays = async (
  regionCode: string,
  year: number
): Promise<Holiday[]> => {
  try {
    const validFrom = `${year}-01-01`;
    const validTo = `${year + 1}-12-31`;

    // Construcción de URL
    let url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=ES&languageIsoCode=ES&validFrom=${validFrom}&validTo=${validTo}`;
    if (regionCode !== "ES") {
      url += `&subdivisionCode=${regionCode}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en API de festivos");

    const data: ApiHolidayResponse[] = await res.json();

    // Si es nacional (ES), filtramos solo los que aplican a toda la nación (nationwide)
    // Si es autonómico, la API ya devuelve los específicos + nacionales
    const filteredData =
      regionCode === "ES" ? data.filter((h) => h.nationwide === true) : data;

    // Mapeamos al formato limpio que definimos en types
    return filteredData.map((h) => ({
      date: h.startDate,
      name: h.name[0].text,
    }));
  } catch (err) {
    console.error("Error fetching holidays:", err);
    return []; // Retornamos array vacío para no romper la app
  }
};
