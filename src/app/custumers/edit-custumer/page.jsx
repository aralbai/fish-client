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

export default function EditCustumer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const custumerId = searchParams.get("custumerId");

  const [changedCustumer, setChangedCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = async (e) => {
    const { _id, _v, updatedAt, createdAt, ...data } = changedCustumer;

    handleSubmit(e, custumerId, "custumers", data, setChangedCustumer);

    router.push("/custumers");
  };

  useEffect(() => {
    fetchData(`/custumers/${custumerId}`, setChangedCustumer);
  }, []);

  return (
    <div className={styles.editProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/custumers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="fullname"
            placeholder="Название поставщика"
            value={changedCustumer.fullname}
            setData={setChangedCustumer}
            required={true}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={changedCustumer.phone}
            setData={setChangedCustumer}
            required={false}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={changedCustumer.address}
            setData={setChangedCustumer}
            required={false}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
