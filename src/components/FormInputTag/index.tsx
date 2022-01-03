import { Form, FormInstance } from "antd";

import Input from "antd/lib/input/Input";
import { MouseEvent, useRef, useState } from "react";
import { TagBox } from "..";

interface FormInputTagProps {
  name: string;
  placeholder: string;
  label?: string;
  form: FormInstance;
}

export const FormInputTag = (props: FormInputTagProps) => {
  const {
    name,
    placeholder = "엔터를 누르면 추가가 되요",
    label,
    form,
  } = props;

  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const onPressEnter = (value: string) => {
    setTags((state) => [...state, value.target.value]);

    inputRef.current.state.value = "";
    form.setFieldsValue({ [name]: "" });
  };

  const onRemoveTag = (title: string) => {
    setTags((initTags) => initTags.filter((text) => text !== title));
  };

  return (
    <Form.Item label={label} name={name}>
      <TagBox name={name} TagItems={tags} onRemoveTag={onRemoveTag} />
      <Input
        placeholder={placeholder}
        onPressEnter={onPressEnter}
        value={inputRef.current?.value}
        ref={inputRef}
      />
    </Form.Item>
  );
};
