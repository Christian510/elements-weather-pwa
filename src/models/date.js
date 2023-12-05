

export class DateTime {
  static convertUTC(dt, sunr='', suns='', offset, timezone='') {
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
      const displayDate = new Date(dt);
      const num = displayDate.getDay();
      const day = daysOfWeek.find((elm, i) => i === num)
      console.log('day: ', day);
      const dtOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      dateTime.date = displayDate.toLocaleString('en-US', dtOptions);
      dateTime.dow = day;
      return dateTime;
    }
  }