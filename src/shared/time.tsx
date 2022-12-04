//const data = time(day).format('YYYY-MM-DD')

export const time = (date = new Date()) => {
  const api = {
    format: (pattern='YYYY-MM-DD') => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const msecond = date.getMilliseconds();
      return pattern.replace(/YYYY/,year.toString())
        .replace(/MM/,month.toString().padStart(2,'0'))
        .replace(/DD/, day.toString().padStart(2, '0'))
        .replace(/HH/, hour.toString().padStart(2, '0'))
        .replace(/mm/, minute.toString().padStart(2, '0'))
        .replace(/ss/, second.toString().padStart(2, '0'))
        .replace(/SSS/, msecond.toString().padStart(3, '0'))
    },
  };
  return api
};
