
export function GenerateTimesTamp(min) {
  var dateInSecs = Math.floor(new Date().getTime() / 1000);
  const addMin =  min * 60
  dateInSecs += addMin
  return dateInSecs;
}