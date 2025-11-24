import { Briefcase, Car, FileText, Scale } from "lucide-react";
import { ComputationType, Preset, Region } from "../types/index"; // Importamos los tipos que acabamos de crear

export const REGIONS: Region[] = [
  { code: "ES", name: "Nacional" },
  { code: "ES-AN", name: "Andalucía" },
  { code: "ES-AR", name: "Aragón" },
  { code: "ES-AS", name: "Asturias" },
  { code: "ES-IB", name: "Illes Balears" },
  { code: "ES-CN", name: "Canarias" },
  { code: "ES-CB", name: "Cantabria" },
  { code: "ES-CM", name: "Castilla-La Mancha" },
  { code: "ES-CL", name: "Castilla y León" },
  { code: "ES-CT", name: "Cataluña" },
  { code: "ES-EX", name: "Extremadura" },
  { code: "ES-GA", name: "Galicia" },
  { code: "ES-MD", name: "Madrid" },
  { code: "ES-MC", name: "Murcia" },
  { code: "ES-NC", name: "Navarra" },
  { code: "ES-PV", name: "País Vasco" },
  { code: "ES-RI", name: "La Rioja" },
  { code: "ES-VC", name: "C. Valenciana" },
  { code: "ES-CE", name: "Ceuta" },
  { code: "ES-ML", name: "Melilla" },
];

export const COMPUTATION_TYPES: ComputationType[] = [
  {
    id: "habiles",
    label: "Hábiles",
    description: "Sin fines de semana ni festivos",
    activeColor: "bg-indigo-600 text-white",
    ringColor: "ring-indigo-600",
  },
  {
    id: "naturales",
    label: "Naturales",
    description: "Todos los días (L-D)",
    activeColor: "bg-emerald-600 text-white",
    ringColor: "ring-emerald-600",
  },
  {
    id: "laborables",
    label: "Laborables",
    description: "Sin domingos ni festivos",
    activeColor: "bg-amber-600 text-white",
    ringColor: "ring-amber-600",
  },
];

export const PRESETS: Preset[] = [
  {
    id: "despido",
    label: "Despido",
    days: 20,
    type: "habiles",
    icon: Briefcase,
  },
  { id: "multa", label: "Multa", days: 20, type: "naturales", icon: Car },
  {
    id: "hacienda",
    label: "Hacienda",
    days: 10,
    type: "habiles",
    icon: FileText,
  },
  {
    id: "monitorio",
    label: "Monitorio",
    days: 20,
    type: "habiles",
    icon: Scale,
  },
];

export const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
