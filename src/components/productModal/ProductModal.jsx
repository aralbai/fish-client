import { Close } from "@mui/icons-material";
import styles from "./ProductModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function ProductModal({ isModalOpen, setIsModalOpen }) {
  const [product, setProduct] = useState({
    title: "",
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, "create", "products", product, setProduct);

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Add new Product</h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Количество"
            value={product.title}
            setData={setProduct}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
