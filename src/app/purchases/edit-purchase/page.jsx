"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import { fetchData } from "@/utils/fetchData";
import { handleSubmit } from "@/utils/handleSubmit";
import DatePick from "@/components/datePicker/DatePicker";
import Select from "@/components/select/Select";
import { useRouter } from "next/navigation";

export default function EditSupplier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [changedPurchase, setChangedPurchase] = useState({
    productId: "",
    supplierId: "",
    carNumber: "",
    amount: "",
    price: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const { _id, _v, updatedAt, createdAt, ...data } = changedPurchase;

    handleSubmit(e, purchaseId, "purchases", data, setChangedPurchase);

    router.push("/purchases");
  };

  useEffect(() => {
    fetchData(`/purchases/${purchaseId}`, setChangedPurchase);
    fetchData("/products", setProducts);
    fetchData("/suppliers", setSuppliers);
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
              setData={setChangedPurchase}
            />
            <Select
              name="supplierId"
              mapData={suppliers}
              text="title"
              defValue="Выберите поставщика"
              setData={setChangedPurchase}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="amount"
              placeholder="Количество"
              value={changedPurchase.amount}
              setData={setChangedPurchase}
            />
            <Input
              type="number"
              name="price"
              placeholder="Цена"
              value={changedPurchase.price}
              setData={setChangedPurchase}
            />
            <DatePick
              defDate={changedPurchase.addedDate}
              setDate={setChangedPurchase}
            />
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
