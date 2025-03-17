"use client";
import styles from "./page.module.scss";
import Input from "@/components/input/Input";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { KeyboardBackspace } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [changedProduct, setChangedProduct] = useState({
    title: "",
    changedUserId: user?.id,
  });

  useEffect(() => {
    fetchData(`/products/${productId}`, setChangedProduct);
  }, []);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
        title: changedProduct?.title,
        changedUserId: user?.id,
      })
      .then((res) => {
        toast.success(res.data);

        router.push("/products");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

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

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
