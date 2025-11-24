import React from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  RefreshCw,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { PRESETS, REGIONS, COMPUTATION_TYPES } from "../../lib/constants";
import { CalculationResult, ComputationTypeId, RegionCode } from "../../types";

interface SidebarProps {
  daysToAdd: number;
  setDaysToAdd: (d: number) => void;
  region: RegionCode;
  setRegion: (r: RegionCode) => void;
  compType: ComputationTypeId;
  setCompType: (t: ComputationTypeId) => void;
  result: CalculationResult | null;
  loadingHolidays: boolean;
}

export default function Sidebar({
  daysToAdd,
  setDaysToAdd,
  region,
  setRegion,
  compType,
  setCompType,
  result,
  loadingHolidays,
}: SidebarProps) {
  return (
    <div className="lg:w-[35%] bg-slate-50/50 p-8 lg:p-12 flex flex-col gap-10 overflow-y-auto border-l border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl tracking-tight text-slate-800 flex gap-2 items-center">
          <CalendarIcon className="w-6 h-6 text-indigo-600" />
          CuentaPlazos
        </h1>
        <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full tracking-wide">
          BETA
        </span>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1. Presets */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">
            Accesos Rápidos
          </label>
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setDaysToAdd(p.days);
                  setCompType(p.type);
                }}
                className="flex flex-col items-start p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all group text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {p.label}
                  </p>
                </div>
                <p className="text-xs text-slate-400">{p.days} días</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Inputs Principales */}
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Días a contar
            </label>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
              <button
                onClick={() => setDaysToAdd(Math.max(1, daysToAdd - 1))}
                className="w-10 h-10 rounded-lg hover:bg-slate-50 text-slate-500 font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 1)}
                className="flex-1 text-center font-bold text-slate-800 text-lg outline-none bg-transparent"
              />
              <button
                onClick={() => setDaysToAdd(daysToAdd + 1)}
                className="w-10 h-10 rounded-lg hover:bg-slate-50 text-slate-500 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Ubicación
            </label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 text-slate-700 font-medium py-3.5 pl-4 pr-10 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Tipo Cómputo */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
            Reglas
          </label>
          <div className="flex flex-col gap-2">
            {COMPUTATION_TYPES.map((t) => {
              const isActive = compType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setCompType(t.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex justify-between items-center ${
                    isActive
                      ? `${t.activeColor} border-transparent shadow-lg shadow-indigo-200`
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <span className="font-medium text-sm">{t.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resultado */}
        <div className="mt-auto pt-6 border-t border-slate-200 min-h-[140px] flex flex-col justify-end">
          {loadingHolidays && compType !== "naturales" ? (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2 h-full">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
              <span className="text-xs font-medium">
                Actualizando festivos...
              </span>
            </div>
          ) : result ? (
            <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Vencimiento
                </span>
              </div>
              <div className="text-3xl font-light text-slate-900 capitalize mb-1">
                {result.finalDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {result.finalDate.getFullYear()}
              </div>

              {result.totalSkipped > 0 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded-md whitespace-nowrap border border-rose-100">
                    +{result.totalSkipped} inhábiles
                  </span>
                  {result.skippedDetails.holidays.length > 0 && (
                    <span
                      className="text-[10px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md whitespace-nowrap border border-indigo-100 max-w-[150px] truncate"
                      title={result.skippedDetails.holidays
                        .map((h) => h.name)
                        .join(", ")}
                    >
                      {result.skippedDetails.holidays[0].name}
                      {result.skippedDetails.holidays.length > 1 &&
                        ` +${result.skippedDetails.holidays.length - 1}`}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
