"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function AddCustumer() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
    addedUserId: user?.id,
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/custumers`, custumer)
      .then((res) => {
        toast.success(res.data);

        router.push("/custumers");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Клиенты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый клиент</h1>
          <Link href="/custumers">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="fullname"
                placeholder="Имя клиента"
                value={custumer.fullname}
                setData={setCustumer}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="phone"
                placeholder="Номер телефона"
                value={custumer.phone}
                setData={setCustumer}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="address"
                placeholder="Адрес"
                value={custumer.address}
                setData={setCustumer}
                required={false}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
