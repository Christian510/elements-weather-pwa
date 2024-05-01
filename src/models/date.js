

export class DateTime {
  static convertUTC(dt, offset, timezone='UTC', sunr='', suns='') {
      const date_time = {
          date: '',
          sunrise: '',
          sunset: '',
        }
      const displayDate = new Date(dt * 1000);
      let dtOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', 'timeZone': timezone};
      date_time.date = displayDate.toLocaleString("en-US", dtOptions);
      if (!sunr) {
        date_time.sunrise = '';
      } else {
        const sunrise = new Date(sunr * 1000);
        let sunrOptions = { hour: 'numeric', minute: 'numeric', 'timeZone': timezone }
        date_time.sunrise = sunrise.toLocaleString("en-US", sunrOptions);
      }
      if (!suns) {
        date_time.sunset = '';
      } else {
        const sunset = new Date(suns * 1000);
        let sunsOptions = { hour: 'numeric', minute: 'numeric', 'timeZone': timezone }
        date_time.sunset = sunset.toLocaleString("en-US", sunsOptions);
      }
      return date_time;
    }

    static convertISO8601Format(dt, timezone='UTC') {
      // console.log('dt: ', dt)
      let dateTime = {}
      const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ];
      const date = new Date(dt);
      // console.log('date: ', date);
      // console.log("displayDate: ", date.getTimezoneOffset());
      // console.log('timestamp: ', date.getTime());
      // console.log('parse: ', Date.parse(dt));
      const num = date.getDay();
      const day = daysOfWeek.find((elm, i) => i === num)
      const options = { 
        weekDay: 'short',
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZon: timezone,
      };
      dateTime.date = date.toLocaleString('en-US', options);
      dateTime.dow = day;
      dateTime.time = date.toLocaleTimeString('en-US', options);
      dateTime.dow = day;

      return dateTime;
    }
  }


  DateTime.convertISO8601Format('2022-01-01T00:00:00-08:00');

  function timeZone(date, type='milliseconds') {
    const tzOffset = date.getTimezoneOffset();

    if (type === 'milliseconds') tzOffset = tzOffset * 60000;



  }

  export function formatDateTime(dt) {
    console.log('dt: ', dt)
    const date = new Date(dt);
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const num = date.getDay();
    const day = daysOfWeek.find((elm, i) => i === num)
    const options = {
      // weekDay: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    const time = date.toTimeString('en-US', options);
    return time;
  }
  
  // formatDateTime('2024-04-29T14:00:00-07:00'); // sandpoint
  // formatDateTime('2024-04-29T15:00:00-06:00'); // boise
  // formatDateTime('"2024-04-29T21:52:14+00:00"'); // updatedTime variable