import Form, { useForm } from "antd/lib/form/Form";

import styled from "styled-components";

import { FormInput } from "src/components";

import { SearchResult } from "src/types/searchResultType";
import { useEffect, useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { FormRadio } from "../FormRadio";
import { FormRange } from "../FormRange";
import { FormSelect } from "../FormSelect";
import {
  amountRangeMarker,
  isVisitedRadio,
  locationTypeOption,
} from "src/const";
import { FormInputTag } from "../FormInputTag";
import { getLocationType } from "src/utill";

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
  const [locationType, setLocationType] = useState("travel");

  const onSubmit = () => {
    console.log(form.getFieldsValue());
  };

  const onChangeLocationType = (value) => {
    setLocationType(value);
  };

  useEffect(() => {
    const { place_name, category_group_name } = detailPage;

    const type = getLocationType(category_group_name);

    form.setFieldsValue({
      title: place_name,
      visited: false,
      type,
      amountRange: [2, 4],
    });

    setLocationType(type);
  }, [detailPage, form]);

  return (
    <AddLocationFormElement>
      <Form form={form}>
        <FormInput name="title" label="장소명" />
        <FormSelect
          name="type"
          label="목적"
          options={locationTypeOption}
          onChange={onChangeLocationType}
        />
        <FormInput name="wanted" label="제안한 사람" />
        <FormRadio options={isVisitedRadio} name="visited" label="방문 경험" />
        <FormRange
          name="amountRange"
          label="가격대"
          step={1}
          marker={amountRangeMarker}
          type="만원"
        />
        {locationType === "food" && (
          <FormInputTag label="메뉴들" name="menus" form={form} />
        )}
        <FormInput name="memo" label="메모" />
        <SubmitButton onSubmit={onSubmit} text="저장하기" />
      </Form>
    </AddLocationFormElement>
  );
};
