export const getLocationType = (category_name: string) => {
  const typeArr = category_name.split(">");

  return typeArr[1] ? typeArr[1].trim() : typeArr[0].trim();
};
