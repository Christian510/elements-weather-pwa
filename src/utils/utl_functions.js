// import { formatDateTime } from "../models/date";
// CHECKS FOR RAIN OR SNOW
const precip = {
  precipitation: '',
  type: '',
}
const checkPrecip = (rain, snow) => {
  // let precipitation;
  if (rain !== undefined) {
    precip.precipitation = rain['1h'];
    precip.type = "rain";
  }
  if (snow !== undefined) {
    precip.precipitation = snow['1h'];
    precip.type = "snow";
  } else {
    precip.precipitation = '0';
    // precip.type = 'none';
  }
  return precip;
}


// RETURNS AN ADDRESS OBJECT USED RETRIEVE WEATHER DATA
const addr = {
  city: '',
  state: '',
  country: '',
  abbr: ''
};

const validateAdr = str => {
  let splitStr = str.trim().split(", ").filter(elm => elm !== '');
  addr.city = splitStr[0].split(' ').map(elm => {
    return elm.charAt(0).toUpperCase() + elm.slice(1);
  }).join(' ');
  if (splitStr.length < 2) {
    // message sent to user to include a state or country
    // console.log("state, provice, or country required!");
    return null;
  }
  if (splitStr.length === 2) {
    // Validate for just a city, state/country
    addr.abbr = splitStr[1].toUpperCase();
  }
  else if (splitStr.length === 3) {
    // Validates for city, state, country
    addr.state = splitStr[1].toUpperCase();
    addr.country = splitStr[2].toUpperCase();
  }
  return addr;
}

export function parseUrl(url) {
  if (!url) return null;
  const nUrl = new URL(url);
  const path = nUrl.pathname.split('/');
  const iconClass = path[path.length - 1].split(',')[0];
  // console.log('icon: ', iconClass);
  return iconClass;
}

export function convertDateStr(date) {
    const split = date.split('T');
    const d = split[0];
    const t = split[1].split('-');
    const dateStr = `${d} ${t[0]}`;
    // console.log('dateStr: ', dateStr);
    const dateTime = formatDateTime(dateStr);
    // console.log('dateTime: ', dateTime);
    return dateTime.time
}

export function formatDateStr(date) {
  let dateStr='';
  let operator = '';
  if (date.includes('T')) {
    const split = date.split('T');
    const d = split[0];
    let t = split[1];
    if (t.at(-6) === '+' || t.at(-6) === '-') {
      operator = t.at(-6);
      t = t.split(operator)[0];
      // console.log('t: ', t);
    }
    dateStr = `${d} ${t}`;
  } else {
    dateStr = null;
  }
  return dateStr;
}

export function formatDateTime(dt, { w='short', y='numeric', m='short', d='numeric', hh='numeric', mm, ss, tz, hour12=true}={}) {
  // console.log('date str: ', formatDateStr(dt));
  let dateTime = {};
  if (formatDateStr(dt) !== null) {
    dt = formatDateStr(dt);
    // console.log('dt: ', dt);
  }
  const newdate = new Date(dt);
  const dateOptions = {
    hour12: hour12,
    year: y,
    month: m,
    weekday: w,
    day: d,
  };
  const timeOptions = {
    hour: hh,
    minute: mm,
    seconds: ss,
    timezone: tz,
  }
  dateTime.date = newdate.toLocaleDateString('en-US', dateOptions)
  dateTime.time = newdate.toLocaleTimeString('en-US', timeOptions);
  return dateTime;
}