
export function GenerateTimesTamp(min, days) {
  var dateInSecs = Math.floor(new Date().getTime() / 1000);
  const addMin =  min * 60
  dateInSecs += addMin
  const addDays = days * 60 * 60 * 24;
  dateInSecs += addDays

  return dateInSecs;
}

