import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "preact/hooks";
import { Button, TimePicker } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
  const [tx, setTx] = useState<"0%" | "-100%">("0%");
  useEffect(() => {
    tx !== "0%" && setTx("0%");
    setTitleP({ content: `已设置为${moment(memoryTime).format("HH:mm")}`, ani: true });
  }, [memoryTime]);

  const onPickerChange = (value: moment.Moment | null) => {
    if (value === null) return;
    setMemoryTime(value);
  };

  return (
    <TranslateWraper tx={tx}>
      <div className="translate">
        <div
          className={`translate-btn highlight ${title.ani ? "right-in" : ""}`}
          title={"click to select xiaban time"}
          onClick={() => setTx("-100%")}
        >
          {title.content}
        </div>

        <div className="translate-picker">
          <Button
            onClick={() => setTx("0%")}
            className="translate-picker-back"
          >
            {"<"}
          </Button>
          <TimePicker
            onChange={onPickerChange}
            format={"HH:mm"}
            minuteStep={10}
            disabledTime={() => {
              /** 禁用0~16 */
              return { disabledHours: () => Array.from({ length: 16 }, (_item, index) => index) };
            }}
            value={moment(memoryTime)}
            hideDisabledOptions={true}
          />
        </div>
      </div>
      <></>
    </TranslateWraper>
  );
}
const TranslateWraper = styled.div<{ tx: string }>`
  width: 25rem;
  height: 5rem;
  margin-top: 10rem;
  font-size: 18px;
  /* font-size: 1.3rem; */
  /* min-font */
  overflow-x: hidden;
  .translate {
    display: flex;
    align-items: center;
    transition: transform 0.75s;
    transform: translateX(${(props) => props.tx});

    &-picker {
      flex-shrink: 0;
      &-back {
        line-height: 100%;
        padding: 4px 10px;
        color: #bfbfbf;
      }
    }
    &-btn {
      flex-shrink: 0;
    }
    &-btn {
      width: 25rem;
    }
  }
`;
