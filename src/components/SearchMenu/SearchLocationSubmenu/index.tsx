import styled from "styled-components";

import Form, { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";

import { FormInput, FormSelect, SubmitButton } from "src/components";
import { useState } from "react";
import { SearchContainer } from "../SearchContainer";

const mockFoodType = [
  {
    value: "korean",
    title: "한식",
  },
  {
    value: "chinese",
    title: "중식",
  },
  {
    value: "japanese",
    title: "일식",
  },
  {
    value: "western",
    title: "양식",
  },
  {
    value: "fusion",
    title: "퓨젼",
  },
];

const locationTypeOption = [
  {
    value: "travel",
    title: "여행/방문",
  },
  {
    value: "food",
    title: "맛집",
  },
];

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
            options={mockFoodType}
          />
        )}
        <FormInput name="location" placeholder="주소로 검색" />
        <SubmitButton
          text="찾아!"
          onSubmit={() => {
            console.log("1");
          }}
        />
      </Form>
    </SearchContainer>
  );
};
