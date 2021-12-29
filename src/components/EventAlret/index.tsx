import { Button, Popover } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const EventAlretElement = styled(Popover)`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 60px;
  height: 60px;
  border: 1px solid #c8cefd;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 100;
  background-color: #fff;

  button {
    border: none;
    box-shadow: none;
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 20px;
    height: 20px;
    left: -5px;
    top: -5px;
    border-radius: 10px;
    background-color: #c8cefd;
    z-index: 1;
    font-size: 12px;
  }
`;

const alretText = <span>다음 기념일이 곧 옵니다!</span>;

interface EventAlretProps {
  anniversarys?: { title: string; dDay: number }[];
}

export const EventAlret = (props: EventAlretProps) => {
  const { anniversarys } = props;

  const [isChecked, setIsChecked] = useState(false);

  const contents = anniversarys ? (
    <div>
      {anniversarys.map((data, idx) => (
        <React.Fragment key={idx}>
          <p>{data.title}</p>
          <p>앞으로 {data.dDay}일</p>
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div>기념일이 없군요!</div>
  );

  return (
    <EventAlretElement
      placement="bottomRight"
      title={alretText}
      trigger="click"
      content={contents}
    >
      {!isChecked && anniversarys && <span>{anniversarys.length}</span>}
      <Button
        onClick={() => {
          if (!isChecked) {
            setIsChecked(true);
          }
        }}
      >
        알림
      </Button>
    </EventAlretElement>
  );
};
