import axios from "axios";
import { toast } from "react-toastify";

export const handleSubmit = async (e, reqType, route, data, setData) => {
  e.preventDefault();

  if (reqType === "create") {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/${route}`, data)
      .then((res) => {
        // Showing toast success message
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/${route}/${reqType}`, data)
      .then((res) => {
        // Showing toast success message
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
