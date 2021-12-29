import { Form } from "antd";
import Select from "antd/lib/select/index";

interface FormSelectProps {
  name: string;
  placeholder: string;
  label?: string;
  options: { value: string | number; title: string }[];
}

const { Option } = Select;

export const FormSelect = (props: FormSelectProps) => {
  const { name, placeholder, label, options } = props;

  return (
    <Form.Item label={label} name={name}>
      <Select placeholder={placeholder} size="large">
        {options &&
          options.map((data, idx) => (
            <Option value={data.value} key={idx}>
              {data.title}
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};
