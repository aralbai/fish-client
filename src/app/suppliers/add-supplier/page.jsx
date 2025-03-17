"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import Input from "@/components/input/Input";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddSupplier() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({
    title: "",
    phone: "",
    address: "",
    addedUserId: user?.id,
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, supplier)
      .then((res) => {
        toast.success(res.data);

        router.push("/suppliers");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
          <PrimaryBtn
            type="link"
            title="Вернуться к списку"
            url="/suppliers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="title"
              placeholder="Название поставщика"
              value={supplier.title}
              setData={setSupplier}
              required={true}
            />
            <Input
              type="text"
              name="phone"
              placeholder="Номер телефона"
              value={supplier.phone}
              setData={setSupplier}
              required={false}
            />
            <Input
              type="text"
              name="address"
              placeholder="Адрес"
              value={supplier.address}
              setData={setSupplier}
              required={false}
            />
          </div>

          <div className={styles.inputGroup}>
            <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
