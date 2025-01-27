

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
      let dateTime = {}
      const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ];
      const date = new Date(dt);
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

  // function timeZone(date, type='milliseconds') {
  //   const tzOffset = date.getTimezoneOffset();

  //   if (type === 'milliseconds') tzOffset = tzOffset * 60000;
  // }

  export function formatDateTime(dt) {
    let dateTime = {};
    const newdate = new Date(dt);
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // timezone: '',
    };
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      // timezone: '',
    }
    
    dateTime.date = newdate.toLocaleDateString('en-US', dateOptions)
    dateTime.time = newdate.toLocaleTimeString('en-US', timeOptions);
    return dateTime;
  }