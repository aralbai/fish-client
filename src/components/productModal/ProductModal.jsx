import { Close } from "@mui/icons-material";
import styles from "./ProductModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProductModal({ isModalOpen, setIsModalOpen }) {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({
    title: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: product.title,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, data)
      .then((res) => {
        toast.success(res.data);
        setProduct({
          title: "",
        });
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Создать новый продукт</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название продукта"
            value={product.title}
            setData={setProduct}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
