// localStorage
export function saveLocalTravelData(data) {
  localStorage.setItem('travel', JSON.stringify(data));
}

export function getLocalTravelData(data) {
  if (localStorage.getItem('travel') === null) {
    localStorage.setItem('travel', JSON.stringify(data));
    return data;
  }
  const tempData = JSON.parse(localStorage.getItem('travel'));
  if (tempData.length === 0) return data;
  return tempData;
}

// 換算金錢
export function currency(val, symbol) {
  const arr = val.toString().split('.');
  const re = /(\d{1,3})(?=(\d{3})+$)/g;
  return symbol + arr[0].replace(re, '$1,') + (arr.length === 2 ? `.${arr[1]}` : '');
}

export default {};
