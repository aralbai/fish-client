"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import { handleSubmit } from "@/utils/handleSubmit";

export default function AddPurchase() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    productId: "",
    supplierId: "",
    carNumber: "",
    amount: "",
    price: "",
    addedDate: new Date(),
  });

  useEffect(() => {
    fetchData("/products", setProducts);

    fetchData("/suppliers", setSuppliers);
  }, []);

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...purchase,
      remainingAmount: purchase.amount,
    };

    console.log(data);

    handleSubmit(e, "create", "purchases", data, setPurchase);
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
            url="/purchases"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <Select
              name="productId"
              mapData={products}
              text="title"
              defValue="Выберите продукт"
              setData={setPurchase}
            />
            <Select
              name="supplierId"
              mapData={suppliers}
              text="title"
              defValue="Выберите поставщика"
              setData={setPurchase}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="amount"
              placeholder="Количество"
              value={purchase.amount}
              setData={setPurchase}
            />
            <Input
              type="number"
              name="price"
              placeholder="Цена"
              value={purchase.price}
              setData={setPurchase}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="carNumber"
              placeholder="Номер автомобиля"
              value={purchase.carNumber}
              setData={setPurchase}
            />
            <DatePick defDate={purchase.addedDate} setDate={setPurchase} />
          </div>

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
