import styled from "styled-components";
import ClipboardJS from "clipboard";
import { useCountDown } from "ahooks";
import { useEffect, useRef } from "preact/hooks";
import { getTodayDate } from "../tools/momentP";

import moment from "moment";
import { titleType } from "../app";

export const Time = ({ memoryTime, setTitleP }: { memoryTime: moment.Moment; setTitleP: (newTitle: titleType) => void }) => {
  const [, formattedRes] = useCountDown({
    targetDate: getTodayDate(memoryTime),
    interval: 1,
    onEnd: () => {},
  });
  const { hours, minutes, seconds, milliseconds } = formattedRes;
  const isRightnow = hours === 0 && minutes === 0 && minutes === 0 && seconds === 0 && milliseconds === 0;
  const copyString = isRightnow ? "现在" : hours === 0 ? `${minutes + "分钟"}` : `${hours}:${minutes}`;

  const copyBtnRef = useRef<any>(null);
  useEffect(() => {
    const clip = new ClipboardJS(copyBtnRef.current, { text: () => copyString });
    return () => clip?.destroy && clip.destroy();
  }, [copyBtnRef, copyString]);

  useEffect(() => {
    document.title = copyString;
  }, [minutes]);
  return (
    <TimeWraper>
      <div>距离下班还有：</div>
      <TimeStyle
        title={"click to copy countdown"}
        className="highlight"
        ref={copyBtnRef}
        onClick={() => {
          // navigator.clipboard.writeText(copyString);
          setTitleP({ content: `复制时间成功 [${copyString}]`, ani: true });
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
