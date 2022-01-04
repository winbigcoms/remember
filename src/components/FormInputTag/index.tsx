import { Form, FormInstance } from "antd";

import Input from "antd/lib/input/Input";
import {
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { TagBox } from "..";

interface FormInputTagProps {
  name: string;
  placeholder: string;
  label?: string;
  form: FormInstance;
  tags: string[];
  onPressEnter: (event: KeyboardEvent, inputRef: MutableRefObject) => void;
  onRemoveTag: (title: string) => void;
}

export const FormInputTag = (props: FormInputTagProps) => {
  const {
    name,
    placeholder = "엔터를 누르면 추가가 되요",
    label,
    form,
    tags,
    onPressEnter,
    onRemoveTag,
  } = props;

  const inputRef = useRef(null);

  return (
    <Form.Item label={label} name={name}>
      <TagBox name={name} TagItems={tags} onRemoveTag={onRemoveTag} />
      <Input
        placeholder={placeholder}
        onPressEnter={(e) => onPressEnter(e, inputRef)}
        value={inputRef.current?.value}
        ref={inputRef}
      />
    </Form.Item>
  );
};
