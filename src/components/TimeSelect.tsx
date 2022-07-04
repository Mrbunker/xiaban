import { StateUpdater, useEffect, useState } from "preact/hooks";
import moment from "moment";
import { Button, Radio, RadioChangeEvent, TimePicker } from "antd";
import styled from "styled-components";
import { getToday } from "../tools/momentP";
import type { Moment } from "moment";

export default function ({
  targetDate,
  setTargetDate,
  title,
  setTitle,
}: {
  targetDate: string;
  setTargetDate: (value: string) => void;
  title: { content: string; ani: boolean };
  setTitle: StateUpdater<{
    content: string;
    ani: boolean;
  }>;
}) {
  const xiabanList = ["18:00", "17:30", "17:00"];
  const [showSelect, setShowSelect] = useState(false);
  const [tx, setTx] = useState<"0%" | "-100%">("0%");

  useEffect(() => {
    setShowSelect(false);
    tx !== "0%" && setTx("0%");
    setTitle({ content: `已设置为${moment(targetDate).format("HH:mm")}`, ani: true });
  }, [targetDate]);

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    const formatValue = getToday(value);
    setTargetDate(formatValue.toString());
  };

  const onPickerChange = (value: Moment | null) => {
    if (value === null) return;
    setTargetDate(value.format().toString());
  };

  return (
    <div
      // onMouseEnter={() => {
      // tx !== "0%" && setTx("0%");
      // setShowSelect(true);
      // }}
      onClick={() => {
        if (showSelect) return;
        setShowSelect(true);
      }}
    >
      {!showSelect ? (
        <Title className={`highlight ${title.ani ? "right-in" : ""}`}>{title.content}</Title>
      ) : (
        <TranslateWraper tx={tx}>
          <div className="translate">
            <div className="translate-radio">
              <Radio.Group
                options={xiabanList}
                onChange={onRadioChange}
                optionType="button"
                defaultValue={moment(targetDate).format("HH:mm")}
                buttonStyle="solid"
              />
              <Button onClick={() => setTx("-100%")}>{"其他 >"}</Button>
            </div>
            <TimePicker
              className="translate-picker"
              onChange={onPickerChange}
              format={"HH:mm"}
              minuteStep={10}
              disabledTime={() => {
                /** 禁用0~14 */
                return { disabledHours: () => Array.from({ length: 12 }, (_item, index) => index) };
              }}
              value={moment(targetDate)}
              hideDisabledOptions={true}
              defaultValue={moment("18:00", "HH:mm")}
            />
          </div>
        </TranslateWraper>
      )}
    </div>
  );
}

const TranslateWraper = styled.div<{ tx: string }>`
  margin-top: 12.5rem;
  width: 30rem;
  overflow-x: hidden;
  font-size: 1rem;
  .translate {
    display: flex;
    transition: transform 0.75s;
    transform: translateX(${(props) => props.tx});
    align-items: center;

    &-picker,
    &-radio {
      flex-shrink: 0;
    }
    &-radio {
      width: 30rem;
    }
  }
`;

const Title = styled.div`
  margin-top: 12.5rem;
  font-size: 1.3rem;
`;
