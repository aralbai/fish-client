"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import { fetchData } from "@/utils/fetchData";
import { handleSubmit } from "@/utils/handleSubmit";
import { useRouter } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [changedProduct, setChangedProduct] = useState({
    title: "",
  });

  useEffect(() => {
    fetchData(`/products/${productId}`, setChangedProduct);
  }, []);

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    const { _id, _v, updatedAt, createdAt, ...data } = changedProduct;

    handleSubmit(e, changedProduct._id, data, setChangedProduct);

    router.push("/products");
  };

  console.log(changedProduct);

  return (
    <div className={styles.editProduct}>
      <h1>Продукты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый продукт</h1>
          <PrimaryBtn
            type="link"
            title="Вернуться к списку"
            url="/products"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Количество"
            value={changedProduct.title}
            setData={setChangedProduct}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
