import axios from "axios";
import { toast } from "react-toastify";

export const handleSubmit = async (e, reqType, route, data, setData) => {
  e.preventDefault();

  if (reqType === "create") {
    await axios
      .post(`http://localhost:5000/api/${route}`, data)
      .then((res) => {
        // Showing toast success message
        toast.success(res.data);

        // Setting all values of object to empty string
        Object.keys(data).forEach((key) => {
          setData((prev) => ({
            ...prev,
            [key]: "",
          }));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await axios
      .put(`http://localhost:5000/api/${route}/${reqType}`, data)
      .then((res) => {
        // Showing toast success message
        toast.success(res.data);

        // Setting all values of object to empty string
        Object.keys(data).forEach((key) => {
          setData((prev) => ({
            ...prev,
            [key]: "",
          }));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
