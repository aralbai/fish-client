export const handleChange = (e, setData) => {
  const { name, value } = e.target;

  // Change spesipec value of state
  setData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
