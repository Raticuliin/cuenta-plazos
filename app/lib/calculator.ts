import {
  ComputationTypeId,
  Holiday,
  CalculationResult,
  DayStatusMap,
} from "../types";
import { toIsoDate } from "./date-utils";

export const calculateDeadline = (
  startDateStr: string,
  daysToAdd: number,
  holidays: Holiday[],
  compType: ComputationTypeId
): { result: CalculationResult; dayStatusMap: DayStatusMap } | null => {
  if (!daysToAdd || daysToAdd < 0) return null;

  // Inicializamos fecha
  let current = new Date(startDateStr);
  current.setHours(12, 0, 0, 0); // Evitar problemas de zona horaria

  let counted = 0;
  let skipped = { saturdays: 0, sundays: 0, holidays: [] as Holiday[] };
  let tempMap: DayStatusMap = {};
  let safetyCounter = 0;

  // Marcar día de inicio
  tempMap[startDateStr] = { status: "start", reason: "Inicio" };

  // Bucle principal
  while (counted < daysToAdd && safetyCounter < 2000) {
    current.setDate(current.getDate() + 1);
    safetyCounter++;

    const isoDate = toIsoDate(current);
    const dayOfWeek = current.getDay(); // 0 = Domingo, 6 = Sábado
    const holidayFound = holidays.find((h) => h.date === isoDate);

    let isCountable = true;
    let reason = "";

    // Lógica según tipo de cómputo
    if (compType === "habiles") {
      if (dayOfWeek === 6) {
        isCountable = false;
        skipped.saturdays++;
        reason = "Sábado";
      } else if (dayOfWeek === 0) {
        isCountable = false;
        skipped.sundays++;
        reason = "Domingo";
      } else if (holidayFound) {
        isCountable = false;
        skipped.holidays.push(holidayFound);
        reason = holidayFound.name;
      }
    } else if (compType === "laborables") {
      if (dayOfWeek === 0) {
        isCountable = false;
        skipped.sundays++;
        reason = "Domingo";
      } else if (holidayFound) {
        isCountable = false;
        skipped.holidays.push(holidayFound);
        reason = holidayFound.name;
      }
    } else {
      // Naturales
      reason = "Día Natural";
    }

    if (isCountable) {
      counted++;
      tempMap[isoDate] = { status: "counted", reason: `${counted}º día` };
    } else {
      tempMap[isoDate] = { status: "skipped", reason: reason };
    }
  }

  // Marcar día final
  const finalIso = toIsoDate(current);
  tempMap[finalIso] = { status: "end", reason: "Vencimiento" };

  return {
    result: {
      finalDate: current,
      skippedDetails: skipped,
      totalSkipped:
        skipped.saturdays + skipped.sundays + skipped.holidays.length,
    },
    dayStatusMap: tempMap,
  };
};
