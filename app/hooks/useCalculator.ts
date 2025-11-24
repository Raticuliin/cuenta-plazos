import { useState, useMemo } from "react";
import { calculateDeadline } from "../lib/calculator";
import { useHolidays } from "./useHolidays";
import { toIsoDate } from "../lib/date-utils";
import { RegionCode, ComputationTypeId } from "../types";

export function useCalculator() {
  // 1. Estados del Formulario (Inputs)
  const [startDate, setStartDate] = useState<string>(() =>
    toIsoDate(new Date())
  );
  const [daysToAdd, setDaysToAdd] = useState<number>(10);
  const [region, setRegion] = useState<RegionCode>("ES");
  const [compType, setCompType] = useState<ComputationTypeId>("habiles");

  // 2. Obtener festivos (automático gracias al hook anterior)
  const year = new Date(startDate).getFullYear();
  const { holidays, loading: loadingHolidays } = useHolidays(region, year);

  // 3. Ejecutar cálculo (automático cuando cambian las dependencias)
  const calculation = useMemo(() => {
    return calculateDeadline(startDate, daysToAdd, holidays, compType);
  }, [startDate, daysToAdd, holidays, compType]);

  // 4. Retornamos todo lo que la UI necesita
  return {
    // Valores actuales
    startDate,
    daysToAdd,
    region,
    compType,

    // Setters (para los inputs)
    setStartDate,
    setDaysToAdd,
    setRegion,
    setCompType,

    // Resultado calculado
    result: calculation?.result || null,
    dayStatusMap: calculation?.dayStatusMap || {},
    loadingHolidays,
  };
}
