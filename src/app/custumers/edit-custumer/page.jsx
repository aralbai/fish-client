"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Input from "@/components/input/Input";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditCustumer() {
  const searchParams = useSearchParams();
  const custumerId = searchParams.get("id");
  const custumerFullname = searchParams.get("fullname");
  const custumerPhone = searchParams.get("phone");
  const custumerAddress = searchParams.get("address");

  const [changedCustumer, setChangedCustumer] = useState({
    fullname: custumerFullname,
    phone: custumerPhone,
    address: custumerAddress,
  });

  const [inputErr, setInputErr] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Example validation: Check if the input is empty
    const errorMessage =
      value.trim() === "" ? "Обязательное поле для ввода" : "";

    setChangedCustumer((prevData) => ({
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

    if (changedCustumer.fullname === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        fullname: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (changedCustumer.phone === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        phone: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (changedCustumer.address === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        address: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (
      changedCustumer.fullname === custumerFullname &&
      changedCustumer.phone === custumerPhone &&
      changedCustumer.address === custumerAddress
    ) {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        fullname: "Ничего не изменилось",
      }));
      countErr += 1;
    }

    if (countErr > 0) {
      return;
    }

    await axios
      .put(`http://localhost:5000/api/custumers/${custumerId}`, changedCustumer)
      .then((res) => {
        toast.success(res.data);
        setChangedCustumer({
          fullname: "",
          phone: "",
          address: "",
        });
        setInputErr({
          fullname: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
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
            fullname="Вернуться к списку"
            url="/custumers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullname"
            placeholder="Название поставщика"
            value={changedCustumer.fullname}
            handleChange={handleChange}
            err={inputErr.fullname}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={changedCustumer.phone}
            handleChange={handleChange}
            err={inputErr.phone}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={changedCustumer.address}
            handleChange={handleChange}
            err={inputErr.address}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
