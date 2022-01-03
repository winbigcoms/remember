import { Form } from "antd";
import Select from "antd/lib/select/index";

interface FormSelectProps {
  name: string;
  placeholder: string;
  label?: string;
  onChange?: (value) => void;
  options: { value: string | number; title: string }[];
}

const { Option } = Select;

export const FormSelect = (props: FormSelectProps) => {
  const { name, placeholder, label, options, onChange } = props;

  return (
    <Form.Item label={label} name={name}>
      <Select placeholder={placeholder} size="large" onChange={onChange}>
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
