import axios from "axios";

export const fetchData = async (route, setData) => {
  await axios
    .get(`http://localhost:5000/api/${route}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
