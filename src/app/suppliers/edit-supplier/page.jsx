"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import { fetchData } from "@/utils/fetchData";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditSupplier() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("supplierId");

  const [changedSupplier, setChangedSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: changedSupplier.title,
      phone: changedSupplier.phone,
      address: changedSupplier.address,
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`, data)
      .then((res) => {
        toast.success(res.data);

        router.push(`/suppliers/single-supplier?supplierId=${supplierId}`);
      })
      .catch((err) => {
        toast.success(err?.response?.data?.message);
      });
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
