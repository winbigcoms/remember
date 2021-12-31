import { Button } from "antd";
import styled from "styled-components";

interface SubmitButtonProps {
  text: string;
  onSubmit: () => {};
}

const SubmitButtonElement = styled(Button)`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #c8cefd;
  margin: auto;
  display: block;
`;

export const SubmitButton = (props: SubmitButtonProps) => {
  const { text, onSubmit } = props;

  return <SubmitButtonElement onClick={onSubmit}>{text}</SubmitButtonElement>;
};
