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
import Link from "next/link";

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

        console.log(err);
      });
  };

  return (
    <div className={styles.editProduct}>
      <h1>Продукты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Изменить продукт</h1>
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
                placeholder="Количество"
                value={changedProduct.title}
                setData={setChangedProduct}
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
