import React, { useState, useEffect } from "react";
import { RefreshCw, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { WEEKDAYS } from "../../lib/constants";
import { getDaysInMonth, toIsoDate } from "../../lib/date-utils";
import { DayStatusMap } from "../../types";

interface CalendarProps {
  startDate: string;
  setStartDate: (date: string) => void;
  dayStatusMap: DayStatusMap;
  loading: boolean;
}

export default function Calendar({
  startDate,
  setStartDate,
  dayStatusMap,
  loading,
}: CalendarProps) {
  // Estado local solo para la vista (qué mes estamos mirando)
  const [viewDate, setViewDate] = useState(new Date(startDate));

  // Sincronizar vista si cambia la fecha de inicio externamente
  useEffect(() => {
    setViewDate(new Date(startDate));
  }, [startDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    const iso = toIsoDate(today);
    setStartDate(iso);
    setViewDate(today);
  };

  const { daysInMonth, startDay, month, year } = getDaysInMonth(viewDate);
  const monthName = viewDate.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="lg:w-[65%] p-8 lg:p-12 flex flex-col relative">
      {/* Controls */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-slate-900 capitalize flex items-center gap-3">
            {monthName}
            {loading && (
              <RefreshCw className="w-4 h-4 text-slate-300 animate-spin" />
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">{year}</p>
        </div>

        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100 shadow-sm">
          <button
            onClick={() => changeMonth(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleTodayClick}
            className="px-4 text-xs font-bold text-slate-600 uppercase tracking-wider hover:text-indigo-600 transition-colors"
          >
            Hoy
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-7 mb-6">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-slate-300 text-xs font-bold"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3 lg:gap-4">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`e-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const cellDate = new Date(year, month, day);
            // Ajuste zona horaria manual para evitar saltos de día
            const iso = toIsoDate(new Date(Date.UTC(year, month, day)));

            const dayData = dayStatusMap[iso];
            const isStart = iso === startDate;

            let btnClass = "text-slate-600 hover:bg-slate-50";
            let numClass = "font-medium text-lg";
            let statusIndicator = null;

            if (isStart) {
              btnClass =
                "bg-slate-900 text-white shadow-lg shadow-slate-200 transform scale-105 z-10";
              statusIndicator = (
                <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-50"></span>
              );
            } else if (dayData?.status === "end") {
              btnClass =
                "bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-105 z-10";
              statusIndicator = (
                <Flag className="absolute -top-2 -right-2 w-4 h-4 text-indigo-600 fill-indigo-100" />
              );
            } else if (dayData?.status === "counted") {
              btnClass = "bg-indigo-50/50 text-indigo-900";
              statusIndicator = (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-200 rounded-full"></span>
              );
            } else if (dayData?.status === "skipped") {
              btnClass = "text-slate-300 bg-slate-50/50";
              numClass = "font-normal line-through decoration-slate-300";
            }

            return (
              <button
                key={day}
                onClick={() => setStartDate(iso)}
                className={`relative h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group ${btnClass}`}
              >
                <span className={numClass}>{day}</span>
                {dayData?.reason && !isStart && dayData.status !== "end" && (
                  <span className="text-[9px] mt-1 max-w-[90%] truncate opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1">
                    {dayData.reason}
                  </span>
                )}
                {statusIndicator}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex gap-6 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-900"></span>Inicio
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-200"></span>Cómputo
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-200"></span>Inhábil
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          Vencimiento
        </div>
      </div>
    </div>
  );
}
