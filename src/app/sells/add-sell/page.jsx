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

export default function AddSell() {
  const [products, setProducts] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [sell, setSell] = useState({
    productId: "",
    custumerId: "",
    amount: "",
    price: "",
    addedDate: new Date(),
  });

  useEffect(() => {
    fetchData("/products", setProducts);

    fetchData("/custumers", setCustumers);
  }, []);

  return (
    <div className={styles.addProduct}>
      <h1>Продажи</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новую продажу</h1>
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
          onSubmit={(e) => handleSubmit(e, "create", "sells", sell, setSell)}
        >
          <div className={styles.inputGroup}>
            <Select
              name="productId"
              mapData={products}
              text="title"
              defValue="Выберите продукт"
              setData={setSell}
            />
            <Select
              name="custumerId"
              mapData={custumers}
              text="fullname"
              defValue="Выберите клиента"
              setData={setSell}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="amount"
              placeholder="Количество"
              value={sell.amount}
              setData={setSell}
            />
            <Input
              type="number"
              name="price"
              placeholder="Цена"
              value={sell.price}
              setData={setSell}
            />
            <DatePick defDate={sell.addedDate} setDate={setSell} />
          </div>

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
