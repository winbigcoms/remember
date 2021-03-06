import styled from "styled-components";

import Form, { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";

import { FormInput, FormSelect, SubmitButton } from "src/components";
import { useState } from "react";
import { SearchContainer } from "../SearchContainer";
import { foodType, locationTypeOption } from "src/const";

export const SearchLocationSubmenu = () => {
  const [form] = useForm();

  const [locationType, setLocationType] = useState<"food" | "travel">("food");

  const onFormChange = (changeValue) => {
    const key = Object.keys(changeValue)[0];

    if (key === "locationType") {
      setLocationType(changeValue[key]);
    }
  };

  return (
    <SearchContainer>
      <Form
        form={form}
        onValuesChange={onFormChange}
        initialValues={{
          locationType,
        }}
      >
        <FormInput name="keyword" placeholder="키워드(메모) 검색" />
        <FormSelect
          name="locationType"
          options={locationTypeOption}
          placeholder="장소 타입 선택"
        />
        {locationType === "food" && (
          <FormSelect
            name="foodType"
            placeholder="음식 종류로 검색"
            options={foodType}
          />
        )}
        <FormInput name="location" placeholder="주소로 검색" />
        <SubmitButton text="찾아!" onSubmit={() => {}} />
      </Form>
    </SearchContainer>
  );
};
