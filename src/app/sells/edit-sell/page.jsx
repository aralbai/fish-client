"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Input from "@/components/input/Input";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditSupplier() {
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("id");
  const supplierTitle = searchParams.get("title");
  const supplierPhone = searchParams.get("phone");
  const supplierAddress = searchParams.get("address");

  const [changedSupplier, setChangedSupplier] = useState({
    title: supplierTitle,
    phone: supplierPhone,
    address: supplierAddress,
  });

  const [inputErr, setInputErr] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Example validation: Check if the input is empty
    const errorMessage =
      value.trim() === "" ? "Обязательное поле для ввода" : "";

    setChangedSupplier((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setInputErr((prevData) => ({
      ...prevData,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let countErr = 0;

    if (changedSupplier.title === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        title: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (changedSupplier.phone === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        phone: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (changedSupplier.address === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        address: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (
      changedSupplier.title === supplierTitle &&
      changedSupplier.phone === supplierPhone &&
      changedSupplier.address === supplierAddress
    ) {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        title: "Ничего не изменилось",
      }));
      countErr += 1;
    }

    if (countErr > 0) {
      return;
    }

    await axios
      .put(`http://localhost:5000/api/suppliers/${supplierId}`, changedSupplier)
      .then((res) => {
        toast.success(res.data);
        setChangedSupplier({
          title: "",
          phone: "",
          address: "",
        });
        setInputErr({
          title: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название поставщика"
            value={changedSupplier.title}
            handleChange={handleChange}
            err={inputErr.title}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={changedSupplier.phone}
            handleChange={handleChange}
            err={inputErr.phone}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={changedSupplier.address}
            handleChange={handleChange}
            err={inputErr.address}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
