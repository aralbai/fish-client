"use client";
import styles from "./page.module.scss";
import { Add, KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import ProductModal from "@/components/productModal/ProductModal";
import SupplierModal from "@/components/supplierModal/SupplierModal";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddPurchase() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    product: "Выберите продукт",
    supplier: "Выберите поставщика",
    carNumber: "",
    amount: "",
    price: "",
    given: "",
    debt: "",
    discount: "",
    addedDate: new Date(),
  });

  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);

  useEffect(() => {
    fetchData("/products", setProducts);

    fetchData("/suppliers", setSuppliers);
  }, [isProductOpen, isSupplierOpen]);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...purchase,
      totalPrice: purchase.price * purchase.amount - purchase.discount,
      discount: purchase.discount === "" ? 0 : purchase.discount,
      debt: purchase.debt === "" ? 0 : purchase.debt,
      given:
        purchase.price * purchase.amount - purchase.discount - purchase.debt,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/purchases`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/purchases");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
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

          <div className={styles.inputGroup}>
            <Input
              type="number"
              name="discount"
              placeholder="Скидка"
              value={purchase.discount}
              setData={setPurchase}
              required={false}
            />
            <Input
              type="number"
              name="debt"
              placeholder="Долг"
              value={purchase.debt}
              setData={setPurchase}
              required={false}
            />
          </div>

          <div className={styles.bottom}>
            <div className={styles.calc}>
              <p>Итого:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(purchase.amount * purchase.price)
                  .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Скидка:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(purchase.discount)
                  .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Долг:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(purchase.debt)
                  .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Оплачено:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(
                    purchase.amount * purchase.price -
                      purchase.discount -
                      purchase.debt
                  )
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
