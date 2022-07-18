import { Time } from "./components/CountDown";
import TimeSelect from "./components/TimeSelecter";
import { useState } from "preact/hooks";
import { useDebounceFn, useLocalStorageState } from "ahooks";
import { getHHmmMoment } from "./tools/momentP";
import styled from "styled-components";
import moment from "moment";

export type titleType = {
  /** 要设置的 title 文本 */
  content: string;
  /** 是否触发动画 */
  ani: boolean;
};
export function App() {
  /** 倒计时目标时间（下班时间） localStorage */
  const [memoryTime, setMemoryTime] = useLocalStorageState<moment.Moment>("xiaban", { defaultValue: getHHmmMoment("18:00") });

  const [title, setTitle] = useState({ content: "时间不对？", ani: false });

  const { run: setTitleBack } = useDebounceFn(() => setTitle({ content: "时间不对？", ani: false }), { wait: 2500 });
  const setTitleP = (newTitle: titleType) => {
    setTitle(newTitle);
    setTitleBack();
  };

  return (
    <AppWraper>
      <div className="main right-in">
        <Time
          memoryTime={memoryTime}
          setTitleP={setTitleP}
        />
        <TimeSelect
          setMemoryTime={setMemoryTime}
          memoryTime={memoryTime}
          title={title}
          setTitleP={setTitleP}
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
      transform: translateX(-2rem);
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
