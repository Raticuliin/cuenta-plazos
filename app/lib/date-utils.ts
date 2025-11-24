// Convierte una fecha a string YYYY-MM-DD (ISO)
export const toIsoDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Obtiene datos del mes para dibujar el calendario
export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Día 0 del mes siguiente = último día del mes actual
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Primer día del mes
  const firstDayObj = new Date(year, month, 1);
  let startDay = firstDayObj.getDay();

  // Ajuste para que la semana empiece en Lunes (0=Domingo -> 6, 1=Lunes -> 0)
  startDay = startDay === 0 ? 6 : startDay - 1;

  return { daysInMonth, startDay, month, year };
};
