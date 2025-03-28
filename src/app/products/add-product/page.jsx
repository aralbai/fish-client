"use client";
import styles from "./page.module.scss";
import Input from "@/components/input/Input";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { KeyboardBackspace } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProduct() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [product, setProduct] = useState({
    title: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: product.title,
      addedUserId: user.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/products");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Продукты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый продукт</h1>
          <Link href="/products">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="title"
                placeholder="Название продукта"
                value={product.title}
                setData={setProduct}
                required={true}
              />
            </div>

            <div className={styles.formInput}>
              <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
