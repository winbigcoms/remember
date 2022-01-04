export const getLocationType = (category_name: string) => {
  const typeArr = category_name
    .split(">")
    .map((data) => data.trim())
    .includes("음식점");

  return typeArr ? "food" : "travel";
};

export const showLocationType = (category_name: string) => {
  const typeArr = category_name
    .split(">")
    .map((data) => data.trim())
    .includes("음식점");

  return typeArr ? "음식점" : "여행지";
};
