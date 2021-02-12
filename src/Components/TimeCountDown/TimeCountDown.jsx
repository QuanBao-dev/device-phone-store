import "./TimeCountDown.css";

import { useEffect, useMemo, useState } from "react";
import { interval } from "rxjs";

const TimeCountDown = ({ timeSecond }) => {
  const [seconds, setSeconds] = useState(timeSecond);
  useEffect(() => {
    const subscription = interval(1000).subscribe(() => {
      setSeconds(seconds - 1);
      if (seconds - 1 < 0) {
        subscription.unsubscribe();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [seconds]);

  const { day, hour, minute, second } = useMemo(() => {
    const day = parseInt(seconds / 86400);
    const hour = parseInt((seconds - day * 86400) / 3600);
    const minute = parseInt((seconds - day * 86400 - hour * 3600) / 60);
    const second = parseInt(seconds - day * 86400 - hour * 3600 - minute * 60);
    return { day, hour, minute, second };
  }, [seconds]);
  return (
    <div className="time-count-down-container">
      <div className="time-count-down-item">
        <span>{convertToStringTime(day)}</span>
        <div>DAY</div>
      </div>
      <div className="time-count-down-item">
        <span>{convertToStringTime(hour)}</span>
        <div>HRS</div>
      </div>
      <div className="time-count-down-item">
        <span>{convertToStringTime(minute)}</span>
        <div>MIN</div>
      </div>
      <div className="time-count-down-item">
        <span>{convertToStringTime(second)}</span>
        <div>SEC</div>
      </div>
    </div>
  );
};

export default TimeCountDown;

function convertToStringTime(number) {
  const temp = "0" + number;
  if (temp.length === 2) {
    return temp;
  }
  return number.toString();
}
