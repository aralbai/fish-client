export const inputErrorValidation = async (data, errors, handleChange) => {
  let count = 0;

  Object.entries(data).map(([key, value]) => {
    if (value === "") {
      errors = { ...errors, [key]: "There is error" };
      handleChange(errors);

      count += 1;
    }
  });

  if (count > 0) {
    return true;
  }
};
