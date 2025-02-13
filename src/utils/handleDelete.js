import axios from "axios";
import { toast } from "react-toastify";

export const handleDelete = async (route, id, data, setData) => {
  await axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}${route}/${id}`)
    .then((res) => {
      setData(data.filter((d) => d._id !== id));
      toast.success(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
