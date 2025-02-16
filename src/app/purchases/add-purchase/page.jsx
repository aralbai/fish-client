"use client";
import styles from "./page.module.scss";
import { Add, KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import { handleSubmit } from "@/utils/handleSubmit";
import ProductModal from "@/components/productModal/ProductModal";
import SupplierModal from "@/components/supplierModal/SupplierModal";

export default function AddPurchase() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    product: "Выберите продукт",
    supplier: "Выберите поставщика",
    carNumber: "",
    amount: "",
    price: "",
    discount: "",
    addedDate: new Date(),
  });

  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);

  useEffect(() => {
    fetchData("/products", setProducts);

    fetchData("/suppliers", setSuppliers);
  }, []);

  const pageHandleSubmit = (e) => {
    const data = {
      ...purchase,
      remainingAmount: purchase.amount,
      price: purchase.price * purchase.amount - purchase.discount,
    };

    handleSubmit(e, "create", "purchases", data, setPurchase);

    setPurchase({
      product: "Выберите продукт",
      supplier: "Выберите поставщика",
      carNumber: "",
      amount: "",
      price: "",
      discount: "",
      addedDate: new Date(),
    });
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
              name="product"
              mapData={products}
              text="title"
              defValue={purchase.product}
              setData={setPurchase}
            />
            <div onClick={() => setIsProductOpen(true)}>
              <PrimaryBtn type="button">
                <Add />
              </PrimaryBtn>
            </div>
            <Select
              name="supplier"
              mapData={suppliers}
              text="title"
              defValue={purchase.supplier}
              setData={setPurchase}
            />
            <div onClick={() => setIsSupplierOpen(true)}>
              <PrimaryBtn type="button">
                <Add />
              </PrimaryBtn>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="amount"
              placeholder="Количество"
              value={purchase.amount}
              setData={setPurchase}
              required={true}
            />
            <Input
              type="number"
              name="price"
              placeholder="Цена"
              value={purchase.price}
              setData={setPurchase}
              required={true}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="carNumber"
              placeholder="Номер автомобиля"
              value={purchase.carNumber}
              setData={setPurchase}
              required={true}
            />
            <DatePick defDate={purchase.addedDate} setDate={setPurchase} />
          </div>

          <div className={styles.bottom}>
            <div className={styles.discount}>
              <Input
                type="number"
                name="discount"
                placeholder="Discount"
                value={purchase.discount}
                setData={setPurchase}
                required={false}
              />
            </div>
            <div className={styles.calc}>
              <p>Total:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(purchase.amount * purchase.price - purchase.discount)
                  .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>

      <ProductModal
        isModalOpen={isProductOpen}
        setIsModalOpen={setIsProductOpen}
      />

      <SupplierModal
        isModalOpen={isSupplierOpen}
        setIsModalOpen={setIsSupplierOpen}
      />
    </div>
  );
}
