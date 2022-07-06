import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "preact/hooks";
import { Button, Radio, RadioChangeEvent, TimePicker } from "antd";
import { getHHmmMoment } from "../tools/momentP";

import { titleType } from "../app";

export default function ({
  memoryTime,
  setMemoryTime,
  title,
  setTitleP,
}: {
  memoryTime: moment.Moment;
  setMemoryTime: (value: moment.Moment) => void;
  title: { content: string; ani: boolean };
  setTitleP: (newTitle: titleType) => void;
}) {
  const xiabanList = ["18:00", "17:30", "17:00"];
  const [showSelecter, setShowSelecter] = useState(false);
  const [tx, setTx] = useState<"0%" | "-100%">("0%");
  useEffect(() => {
    showSelecter && setShowSelecter(false);
    tx !== "0%" && setTx("0%");
    setTitleP({ content: `已设置为${moment(memoryTime).format("HH:mm")}`, ani: true });
  }, [memoryTime]);

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    setMemoryTime(getHHmmMoment(value));
  };

  const onPickerChange = (value: moment.Moment | null) => {
    if (value === null) return;
    setMemoryTime(value);
  };

  return (
    <SelectWraper>
      {!showSelecter ? (
        <div
          // onMouseEnter={() => {
          // tx !== "0%" && setTx("0%");
          // setShowSelect(true);
          // }}
          title={"click to select xiaban time"}
          onClick={() => !showSelecter && setShowSelecter(true)}
          className={`highlight ${title.ani ? "right-in" : ""}`}
        >
          {title.content}
        </div>
      ) : (
        <TranslateWraper tx={tx}>
          <div className="translate">
            <div className="translate-radio">
              <Radio.Group
                options={xiabanList}
                onChange={onRadioChange}
                optionType="button"
                defaultValue={moment(memoryTime).format("HH:mm")}
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
              value={moment(memoryTime)}
              hideDisabledOptions={true}
            />
          </div>
        </TranslateWraper>
      )}
    </SelectWraper>
  );
}

const SelectWraper = styled.div`
  margin-top: 6rem;
  width: 60rem;
  height: 12rem;
  /* background: #F0F0F0; */
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;
const TranslateWraper = styled.div<{ tx: string }>`
  width: 30rem;
  overflow-x: hidden;
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
