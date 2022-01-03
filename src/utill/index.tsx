export const getLocationType = (category_name: string) => {
  const typeArr = category_name
    .split(">")
    .map((data) => data.trim())
    .includes("음식점");

  return typeArr ? "food" : "travel";
};
