import { useEffect, useRef, useState } from "react";
import "./index.css";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { timeUp } from "../../redux/Score/action";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};
export default function Countdown({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerid = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    timerid.current = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown === 0) {
      clearInterval(timerid.current);
      dispatch(timeUp(true));
      message.error("Time is up!");
    }
    return () => clearInterval(timerid.current);
  }, [countdown]);
  return <h2 className="time">{formatTime(countdown)}</h2>;
}
