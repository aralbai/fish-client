import axios from "axios";

export const fetchData = async (route, setData) => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}${route}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
