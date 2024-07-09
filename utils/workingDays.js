import { addDays, isWeekend } from "date-fns";
import Holidays from "date-holidays";

const hd = new Holidays("RU");

export function getFutureWorkingDate(n, startDate = new Date()) {
  let date = startDate;
  let addedDays = 0;

  while (addedDays < n) {
    date = addDays(date, 1);

    if (!isWeekend(date) && !isHoliday(date)) {
      addedDays++;
    }
  }

  return date;
}

function isHoliday(date) {
  const holiday = hd.isHoliday(date);
  return holiday !== false;
}
