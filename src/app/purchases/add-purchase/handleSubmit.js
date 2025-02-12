import { inputErrorValidation } from "./inputErrorValidation";
import axios from "axios";
import { toast } from "react-toastify";

export const handleSubmit = async (
  e,
  data,
  inputErrors,
  setData,
  setInputErr
) => {
  e.preventDefault();

  const isError = inputErrorValidation(data, inputErrors, setInputErr);

  if (!isError) {
    return;
  }

  await axios
    .post("http://localhost:5000/api/purchases", data)
    .then((res) => {
      toast.success(res.data);
      setData({
        title: "",
        phone: "",
        address: "",
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err);
    });
};
