import styled from "styled-components";
import { useCountDown } from "ahooks";

export const Time = ({ targetDate }: { targetDate: string | undefined }) => {
  const [, formattedRes] = useCountDown({
    targetDate,
    interval: 1,
    onEnd: () => {},
  });
  const { hours, minutes, seconds, milliseconds } = formattedRes;
  return (
    <TimeWraper>
      <div>距离下班还有：</div>
      <TimeStyle className="highlight">
        {hours === 0 && minutes === 0 && minutes === 0 && seconds === 0 && milliseconds === 0 ? (
          <div>现在</div>
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
