

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

    static convertISO8601Format(dt) {

      let dateTime = {}
      const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ];
      const date = new Date(dt);
      console.log("displayDate: ", date.getTimezoneOffset())
      console.log('timestamp: ', date.getTime())
      const num = date.getDay();
      const day = daysOfWeek.find((elm, i) => i === num)
      const options = { 
        weekDay: 'short',
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZon: 'UTC',
        // timeZoneName: 'short'
      };

      // const formatter = new Intl.DateTimeFormat('en-US', options);
      // const readableDate = formatter.format(date);
      // console.log('readableDate: ', readableDate);
      dateTime.date = date.toLocaleString('en-US', options);
      dateTime.dow = day;
      dateTime.time = date.toLocaleTimeString('en-US', options);
      dateTime.dow = day;

      return dateTime;
    }
  }