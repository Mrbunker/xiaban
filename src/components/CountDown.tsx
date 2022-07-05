import styled from "styled-components";
import { useCountDown } from "ahooks";
import { StateUpdater, useEffect, useRef } from "preact/hooks";
import ClipboardJS from "clipboard";
import { getTodayDate } from "../tools/momentP";
import moment from "moment";

export const Time = ({
  memoryTime,
  setTitle,
}: {
  memoryTime: moment.Moment;
  setTitle: StateUpdater<{
    content: string;
    ani: boolean;
  }>;
}) => {
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
        className="highlight"
        ref={copyBtnRef}
        onClick={() => {
          // navigator.clipboard.writeText(copyString);
          setTitle({ content: `复制时间成功 [${copyString}]`, ani: true });
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
