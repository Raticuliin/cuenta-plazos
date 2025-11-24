"use client";

import Calendar from "../../components/Calendar/Calendar";
import Sidebar from "../../components/Controls/Sidebar";
import { useCalculator } from "../../hooks/useCalculator";

export default function MainLayout() {
  const {
    startDate,
    setStartDate,
    daysToAdd,
    setDaysToAdd,
    region,
    setRegion,
    compType,
    setCompType,
    result,
    dayStatusMap,
    loadingHolidays,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        {/* Izquierda: Calendario */}
        <Calendar
          startDate={startDate}
          setStartDate={setStartDate}
          dayStatusMap={dayStatusMap}
          loading={loadingHolidays}
        />

        {/* Derecha: Sidebar */}
        <Sidebar
          daysToAdd={daysToAdd}
          setDaysToAdd={setDaysToAdd}
          region={region}
          setRegion={setRegion}
          compType={compType}
          setCompType={setCompType}
          result={result}
          loadingHolidays={loadingHolidays}
        />
      </div>
    </div>
  );
}
