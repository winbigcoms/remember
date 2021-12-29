import { Form } from "antd";

import Input from "antd/lib/input/Input";

interface FormInputProps {
  name: string;
  placeholder: string;
  label?: string;
}

export const FormInput = (props: FormInputProps) => {
  const { name, placeholder, label } = props;

  return (
    <Form.Item label={label} name={name}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};
