"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import { fetchData } from "@/utils/fetchData";
import { useRouter } from "next/navigation";

export default function EditSupplier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("supplierId");

  const [changedSupplier, setChangedSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = async (e) => {
    const { _id, _v, updatedAt, createdAt, ...data } = changedSupplier;

    handleSubmit(e, supplierId, "suppliers", data, setChangedSupplier);

    router.push("/suppliers");
  };

  useEffect(() => {
    fetchData(`/suppliers/${supplierId}`, setChangedSupplier);
  }, []);

  return (
    <div className={styles.editProduct}>
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
          <Input
            type="text"
            name="title"
            placeholder="Название поставщика"
            value={changedSupplier.title}
            setData={setChangedSupplier}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={changedSupplier.phone}
            setData={setChangedSupplier}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={changedSupplier.address}
            setData={setChangedSupplier}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
