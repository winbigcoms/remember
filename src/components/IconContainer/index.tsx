import Link from "next/link";
import styled from "styled-components";
import SearchOutlined from "@ant-design/icons";
import { ReactNode } from "react";

const IconContainerElement = styled.div`
  width: 60px;
  height: 100%;
  border: 1px solid #939efb;

  & > div {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #939efb;
  }
`;

interface IconContainerProps {
  icons: {
    icon: ReactNode;
    link: string;
  }[];
}

export const IconContainer = (props: IconContainerProps) => {
  const { icons } = props;
  return (
    <IconContainerElement>
      {icons.map((iconData, key) => (
        <div key={key}>
          <Link href={iconData.link}>
            <a>{iconData.icon}</a>
          </Link>
        </div>
      ))}
    </IconContainerElement>
  );
};
