import { LucideIcon } from "lucide-react";

// Tipos básicos
export type RegionCode = string;
export type ComputationTypeId = "habiles" | "naturales" | "laborables";
export type DayStatusType = "start" | "counted" | "skipped" | "end";

// Interfaces de datos estáticos
export interface Region {
  code: RegionCode;
  name: string;
}

export interface ComputationType {
  id: ComputationTypeId;
  label: string;
  description: string;
  activeColor: string;
  ringColor: string;
}

export interface Preset {
  id: string;
  label: string;
  days: number;
  type: ComputationTypeId;
  icon: LucideIcon;
}

// Interfaces de la API
export interface Holiday {
  date: string;
  name: string;
}

export interface ApiHolidayResponse {
  startDate: string;
  name: {
    text: string;
  }[];
  nationwide: boolean;
  subdivisionCode?: string;
}

// Interfaces del cálculo
export interface SkippedDetails {
  saturdays: number;
  sundays: number;
  holidays: Holiday[];
}

export interface CalculationResult {
  finalDate: Date;
  skippedDetails: SkippedDetails;
  totalSkipped: number;
}

export interface DayStatus {
  status: DayStatusType;
  reason: string;
}

export interface DayStatusMap {
  [isoDate: string]: DayStatus;
}
