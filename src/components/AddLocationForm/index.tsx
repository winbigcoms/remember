import Form, { useForm } from "antd/lib/form/Form";

import styled from "styled-components";

import { FormInput } from "src/components";

import { SearchResult } from "src/types/searchResultType";
import { useEffect } from "react";

const AddLocationFormElement = styled.div`
  padding-top: 67px;
  height: 650px;
  width: 940px;

  label {
    width: 100px;
  }
`;

interface AddLocationFormProps {
  detailPage: SearchResult;
}

export const AddLocationForm = (props: AddLocationFormProps) => {
  const { detailPage } = props;

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: detailPage.place_name,
    });
  });

  return (
    <AddLocationFormElement>
      <Form form={form}>
        <FormInput name="title" label="장소명" />
        <FormInput name="wanted" label="가고 싶은 사람" />
        <FormInput name="memo" label="메모" />
      </Form>
    </AddLocationFormElement>
  );
};
