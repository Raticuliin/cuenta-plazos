import { useState, useEffect } from "react";
import { fetchHolidays } from "../lib/api";
import { Holiday, RegionCode } from "../types";

export function useHolidays(region: RegionCode, year: number) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      const data = await fetchHolidays(region, year);
      if (mounted) {
        setHolidays(data);
        setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [region, year]);

  return { holidays, loading };
}
