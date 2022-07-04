import { Time } from "./components/Time";
import TimeSelect from "./components/TimeSelect";
import { getToday } from "./tools/momentP";
import { useLocalStorageState } from "ahooks";
import styled from "styled-components";
import { useEffect, useRef, useState } from "preact/hooks";

export function App() {

  const eightClock = getToday("18:00");
  /** 倒计时目标时间，下班时间 localstorage */
  const [targetDate, setTargetDate] = useLocalStorageState<string>("xiaban", { defaultValue: eightClock.toString() });

  const [title, setTitle] = useState({ content: "时间不对？", ani: false });
  const timerRef = useRef(0);
  useEffect(() => {
    timerRef.current = window.setTimeout(() => setTitle({ content: "时间不对？", ani: false }), 2500);
    return () => clearTimeout(timerRef.current);
  }, [title]);

  return (
    <AppWraper>
      <div className="main right-in">
        <Time
          targetDate={targetDate}
          setTitle={setTitle}
        />
        <TimeSelect
          setTargetDate={setTargetDate}
          targetDate={targetDate}
          title={title}
          setTitle={setTitle}
        />
      </div>
    </AppWraper>
  );
}

const AppWraper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;

  @keyframes right-in {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
      transform: translateX(-1rem);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .right-in {
    animation: right-in 0.5s ease-out;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .highlight {
    color: #cf5659;
    cursor: pointer;
  }

  .highlight:hover {
    color: #db817f;
  }
`;
