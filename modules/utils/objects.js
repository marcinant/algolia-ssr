const itHasLength = arr =>
  typeof arr === "object" && Object.keys(arr).length > 0;

const itHasValue = (value, len = 1, type = "string") =>
  !["", "undefined", undefined].includes(value) &&
  typeof value === type &&
  value.length >= len;

const isSearchFullfiled = obj => {
  return (
    (itHasValue(obj.title, 3) && /\S/.test(obj.title)) ||
    (itHasValue(obj.categories, 3) && /\S/.test(obj.categories))
  );
};

module.exports = {
  itHasLength,
  itHasValue,
  isSearchFullfiled
};
