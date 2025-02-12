"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import { handleSubmit } from "./handleSubmit";
import { fetchData } from "./fetchData";

import DatePick from "@/components/datePicker/DatePicker";

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

  const [inputErr, setInputErr] = useState({
    productId: "",
    supplierId: "",
    carNumber: "",
    amount: "",
    price: "",
    addedDate: "",
  });

  useEffect(() => {
    fetchData("products", setProducts);

    fetchData("suppliers", setSuppliers);
  }, []);

  console.log(purchase);

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

        <form
          onSubmit={(e) =>
            handleSubmit(e, purchase, inputErr, setPurchase, setInputErr)
          }
        >
          <div className={styles.inputGroup}>
            <Select
              name="productId"
              mapData={products}
              err={inputErr.productId}
              setData={setPurchase}
              setErr={setInputErr}
              defValue="Выберите продукт"
            />
            <Select
              name="supplierId"
              mapData={suppliers}
              err={inputErr.supplierId}
              setData={setPurchase}
              setErr={setInputErr}
              defValue="Выберите поставщика"
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="amout"
              placeholder="Количество"
              value={purchase.amount}
              err={inputErr.amount}
              setData={setPurchase}
              setError={setInputErr}
            />
            <Input
              type="number"
              name="supplierId"
              placeholder="Цена"
              value={purchase.price}
              err={inputErr.price}
              setData={setPurchase}
              setError={setInputErr}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="carNumber"
              placeholder="Номер автомобиля"
              value={purchase.carNumber}
              err={inputErr.carNumber}
              setData={setPurchase}
              setError={setInputErr}
            />
            <DatePick defDate={purchase.addedDate} setDate={setPurchase} />
          </div>

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
