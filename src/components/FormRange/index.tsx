import { Form, Slider } from "antd";
import { SliderMarks } from "antd/lib/slider";

interface FormRangeProps {
  name: string;
  label?: string;
  marker: SliderMarks;
  step: number;
  defaultValue: number | [number, number];
  type: string;
}

export const FormRange = (props: FormRangeProps) => {
  const { name, label, marker, step, type } = props;

  const TipFormatter = (value: number) => {
    return <div>{value / 2 + type}</div>;
  };

  return (
    <Form.Item label={label} name={name}>
      <Slider range marks={marker} step={step} tipFormatter={TipFormatter} />
    </Form.Item>
  );
};
