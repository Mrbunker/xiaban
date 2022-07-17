import styled from "styled-components";
import ClipboardJS from "clipboard";
import { useCountDown } from "ahooks";
import { useEffect, useRef } from "preact/hooks";
import { getTodayDate } from "../tools/momentP";

import moment from "moment";
import { titleType } from "../app";

export const Time = ({ memoryTime, setTitleP }: { memoryTime: moment.Moment; setTitleP: (newTitle: titleType) => void }) => {
  /** 如果用户打开时间是 12 点之前，倒计时的targetTime 则设置为 12点 */
  const isMorning = moment().hours() < 12;

  const [_, formattedRes] = useCountDown({
    targetDate: isMorning ? getTodayDate(moment().hours(12).minutes(0).milliseconds(0)) : getTodayDate(memoryTime),
    interval: 1,
    onEnd: () => !isMorning && setTitleP({ content: "赶紧干饭了！", ani: true }),
  });
  const { hours, minutes, seconds, milliseconds } = formattedRes;
  const isRightnow = hours === 0 && minutes === 0 && minutes === 0 && seconds === 0 && milliseconds === 0;
  const tipString = isRightnow ? "赶紧溜！" : hours === 0 ? `${minutes}分钟` : `${hours}小时 ${minutes}分钟`;

  const copyBtnRef = useRef<any>(null);
  useEffect(() => {
    const clip = new ClipboardJS(copyBtnRef.current, { text: () => tipString });
    return () => clip?.destroy && clip.destroy();
  }, [copyBtnRef, tipString]);

  useEffect(() => {
    // document.title = `${seconds}.${milliseconds.toString().split("")[0]}秒`;
    document.title = minutes === 0 ? `${seconds}秒` : tipString;
  }, [seconds]);
  return (
    <TimeWraper>
      <div>距离{isMorning ? `干饭` : `下班`}还有：</div>
      <TimeStyle
        title={"click to copy countdown"}
        className="highlight"
        ref={copyBtnRef}
        onClick={() => {
          // navigator.clipboard.writeText(copyString);
          setTitleP({ content: `复制时间成功 [${tipString}]`, ani: true });
        }}
      >
        {isRightnow ? (
          <span>现在</span>
        ) : (
          <>
            <span>{hours}:</span>
            <span>{minutes}:</span>
            <span>{seconds}</span>
            <span className="time-lite">:{milliseconds}</span>
          </>
        )}
      </TimeStyle>
    </TimeWraper>
  );
};

export const TimeWraper = styled.div`
  width: 100%;
`;

const TimeStyle = styled.div`
  width: 100%;
  color: #cf5659;
  font-size: 6rem;
  font-weight: bold;
  .time-lite {
    padding-left: 1rem;
    font-size: 3rem;
  }
`;
