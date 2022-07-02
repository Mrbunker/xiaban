import styled from "styled-components";
import { useCountDown } from "ahooks";
import { StateUpdater } from "preact/hooks";

export const Time = ({
  targetDate,
  setTitle,
}: {
  targetDate: string;
  setTitle: StateUpdater<{
    content: string;
    ani: boolean;
  }>;
}) => {
  const [, formattedRes] = useCountDown({
    targetDate,
    interval: 1,
    onEnd: () => {},
  });
  const { hours, minutes, seconds, milliseconds } = formattedRes;
  return (
    <TimeWraper>
      <div>距离下班还有：</div>
      <TimeStyle
        className="highlight"
        onClick={() => {
          const copyString = hours === 0 ? `${minutes}分钟` : `${hours}:${minutes}`;
          navigator.clipboard.writeText(copyString);
          setTitle({ content: `复制时间成功 [${copyString}]`, ani: true });
        }}
      >
        {hours === 0 && minutes === 0 && minutes === 0 && seconds === 0 && milliseconds === 0 ? (
          <span>现在</span>
        ) : (
          <>
            <span>{hours}:</span>
            <span>{minutes}:</span>
            <span>{seconds}</span>
            <span className="time-small">:{milliseconds}</span>
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
  .time-small {
    padding-left: 1rem;
    font-size: 3rem;
  }
`;
