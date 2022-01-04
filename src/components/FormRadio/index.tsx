import { Form, Radio } from "antd";

interface FormRadioProps {
  name: string;
  label?: string;
  options: {
    value: boolean | string | number;
    label: string;
  }[];
}

export const FormRadio = (props: FormInputProps) => {
  const { name, label, options } = props;

  return (
    <Form.Item label={label} name={name}>
      <Radio.Group options={options} />
    </Form.Item>
  );
};
