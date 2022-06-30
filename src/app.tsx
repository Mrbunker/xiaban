import { Time } from "./components/Time";
import { useLocalStorageState } from "ahooks";
import styled from "styled-components";
import TimeSelect from "./components/TimeSelect";
import { getToday } from "./tools/time";

export function App() {
  const eightClock = getToday("18:00");
  const [targetDate, setTargetDate] = useLocalStorageState<string | undefined>("xiaban", { defaultValue: eightClock.toString() });

  return (
    <AppWraper>
      <div className="main">
        <Time targetDate={targetDate} />
        <TimeSelect
          setTargetDate={setTargetDate}
          targetDate={targetDate}
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
