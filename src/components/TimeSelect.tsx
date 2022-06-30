import { useState } from "preact/hooks";
import moment from "moment";
import type { Moment } from "moment";
import { Radio, RadioChangeEvent, TimePicker } from "antd";
import styled from "styled-components";
import { IFuncUpdater } from "ahooks/lib/createUseStorageState";
import { getToday } from "../tools/time";

const TranslateWraper = styled.div<{ tx: string }>`
  margin-top: 15rem;
  width: 30rem;
  height: 6rem;
  overflow-x: hidden;
  .translate {
    display: flex;
    transition: transform 0.75s;
    transform: translateX(${(props) => props.tx});

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
  margin-top: 15rem;
  font-size: 1.3rem;
`;

export default function ({
  setTargetDate,
  targetDate,
}: {
  setTargetDate: (value: string | IFuncUpdater<string | undefined> | undefined) => void;
  targetDate: string | undefined;
}) {
  const xiabanList = ["18:00", "17:30", "17:00", "其他 >"];
  const [showSelect, setShowSelect] = useState(false);
  const [tx, setTx] = useState<"0%" | "-100%">("0%");
  const [title, setTitle] = useState("时间不对？");

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    /** !todo 其他写成单独button */
    if (value === xiabanList[3]) setTx("-100%");
    else {
      const formatValue = getToday(value);
      setTargetDate(formatValue.toString());
      setShowSelect(false);
      setTitle(`已设置为${value}`);
    }
  };

  const onPickerChange = (value: Moment | null, dataString: string) => {
    if (value === null) return;
    setTargetDate(value.format().toString());
    setShowSelect(false);
    setTitle(`已设置为${dataString}`);
    setTimeout(() => setTitle(`时间不对？`), 2500);
  };

  return (
    <div
      // onMouseEnter={() => {
      // tx !== "0%" && setTx("0%");
      // setShowSelect(true);
      // }}
      onClick={() => {
        if (showSelect) return;
        tx !== "0%" && setTx("0%");
        setShowSelect(!showSelect);
      }}
    >
      {!showSelect ? (
        <Title className="highlight">{title}</Title>
      ) : (
        <TranslateWraper tx={tx}>
          <div className="translate">
            <Radio.Group
              className="translate-radio"
              options={xiabanList}
              onChange={onRadioChange}
              optionType="button"
              buttonStyle="solid"
            />
            <TimePicker
              className="translate-picker"
              onChange={onPickerChange}
              format={"HH:mm"}
              minuteStep={10}
              /** 禁用0~14 */
              disabledTime={() => {
                return { disabledHours: () => Array.from({ length: 12 }, (_item, index) => index) };
              }}
              hideDisabledOptions={true}
              defaultValue={moment("18:00", "HH:mm")}
            />
          </div>
        </TranslateWraper>
      )}
    </div>
  );
}
