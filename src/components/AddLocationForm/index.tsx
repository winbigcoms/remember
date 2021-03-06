import Form, { useForm } from "antd/lib/form/Form";

import styled from "styled-components";

import { FormInput } from "src/components";

import { SearchResult } from "src/types/searchResultType";
import { MutableRefObject, useEffect, useState } from "react";
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
import { User } from "src/types/user";
import { AddLocationData } from "src/types/locationType";
import LocationService from "src/service/location";

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
  userData: User;
  onSearchLocationReset: () => void;
}

export const AddLocationForm = (props: AddLocationFormProps) => {
  const { detailPage, userData, onSearchLocationReset } = props;

  const [form] = useForm();
  const [locationType, setLocationType] = useState("travel");
  const [tags, setTags] = useState([]);

  const onPressEnter = (event: KeyboardEvent, inputRef: MutableRefObject) => {
    setTags((state) => [...state, event.target.value]);

    inputRef.current.state.value = "";
  };

  const onRemoveTag = (title: string) => {
    setTags((initTags) => initTags.filter((text) => text !== title));
  };

  const onSubmit = () => {
    const formDatas = form.getFieldsValue();
    const sendData: AddLocationData = {
      owner: userData.id,
      ...formDatas,
      amountRange: {
        min: formDatas.amountRange[0],
        max: formDatas.amountRange[1],
      },
      position: {
        x: detailPage.x,
        y: detailPage.y,
      },
      isWorked: true,
      menus: tags,
      place_url: detailPage.place_url,
    };

    const returnData = LocationService.add(sendData).then((res) => {
      console.log(res.data);
    });

    onSearchLocationReset();
  };

  const onChangeLocationType = (value) => {
    setLocationType(value);
  };

  useEffect(() => {
    const { place_name, category_name } = detailPage;

    const type = getLocationType(category_name);

    form.setFieldsValue({
      title: place_name,
      visited: false,
      type,
      amountRange: [2, 4],
      wanted: "",
      memo: "",
    });

    setLocationType(type);
  }, [detailPage, form]);

  return (
    <AddLocationFormElement>
      <Form form={form}>
        <FormInput name="title" label="?????????" />
        <FormSelect
          name="type"
          label="??????"
          options={locationTypeOption}
          onChange={onChangeLocationType}
        />
        <FormInput
          name="wanted"
          label="????????? ??????"
          placeholder="????????? ??? ????????? ??????????"
        />
        <FormRadio options={isVisitedRadio} name="visited" label="?????? ??????" />
        <FormRange
          name="amountRange"
          label="?????????"
          step={1}
          marker={amountRangeMarker}
          type="??????"
        />
        {locationType === "food" && (
          <FormInputTag
            label="?????????"
            name="menus"
            form={form}
            tags={tags}
            onRemoveTag={onRemoveTag}
            onPressEnter={onPressEnter}
          />
        )}
        <FormInput name="memo" label="??????" />
        <SubmitButton onSubmit={onSubmit} text="????????????" />
      </Form>
    </AddLocationFormElement>
  );
};
