import React from "react";

import moment from "moment";

export default function test() {
    var maand = 2;
    var jaar = 2026;


  // getting all months
  const months = moment.months();

  // function to check and grey out previous & next months visible dates
  const isExtraDays = (week, date) => {
    if (week === 0 && date > 10) {
      return true;
    } else if (week === 5 && date < 10) {
      return true;
    } else if (week === 4 && date < 10) {
      return true;
    } else {
      return false;
    }
  };

  //function to get all days by week
  const getDate = (maand) => {
    var calendar = [];

    const startDate = moment([jaar, maand])
      .clone()
      .startOf("month")
      .startOf("isoweek");

    const endDate = moment([jaar, maand]).clone().endOf("month");

    const day = startDate.clone().subtract(1, "day");

    // looping a month by a week
    while (day.isBefore(endDate, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone().format("DD"))
      );
    }

    if (calendar.length > 0) {
      return calendar.map((week, index) => (
        <tr className="calender-row">
          {week.map((day) => (
            <td className="calender-col">
              <span className="day-value">
                {isExtraDays(index, day) ? (
                  <span className="isDates-grey">{day}</span>
                ) : (
                  day
                )}
              </span>
            </td>
          ))}
        </tr>
      ));
    }
  };
  return (
    <div className="App">
      <div className="head-wall">
        <h1>Simple React calendar using moment.js </h1>
        <h1>{jaar}</h1>
      </div>
        <div className="tableContainer">
          <table celled padded className="calender-date">
            <tr>
              <th className="month-name-col" colSpan={7}>
                <h1 className="month-name">{months[maand]}</h1>
              </th>
            </tr>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
                <th>Sun</th>
            </tr>
            {getDate(maand)}
          </table>
        </div>
    </div>
  );
}
