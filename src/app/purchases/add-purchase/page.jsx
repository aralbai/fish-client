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
import Link from "next/link";

export default function AddPurchase() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    product: {
      id: "",
      title: "Выберите продукт",
    },
    supplier: {
      id: "",
      title: "Выберите поставщика",
    },
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
  }, [isProductOpen, isSupplierOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const values = value.split("-");

    setPurchase((prev) => ({
      ...prev,
      [name]: {
        id: values[0],
        title: values[1],
      },
    }));
  };

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...purchase,
      discount: purchase.discount === "" ? 0 : purchase.discount,
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

        console.log(err);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
          <Link href="/purchases">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <form onSubmit={pageHandleSubmit}>
          {/* // Product Supplier  */}
          <div className={styles.inputGroup}>
            {/* // Product  */}
            <div className={styles.formInput}>
              <select
                name="product"
                value={`${purchase?.product?._id}-${purchase?.product.title}`}
                onChange={handleChange}
              >
                <option value="" hidden>
                  {purchase?.product?.title}
                </option>
                {products?.map((product) => (
                  <option
                    key={product?._id}
                    value={`${product?._id}-${product.title}`}
                  >
                    {product?.title}
                  </option>
                ))}
              </select>
              <div onClick={() => setIsProductOpen(true)}>
                <PrimaryBtn type="button">
                  <Add />
                </PrimaryBtn>
              </div>
            </div>

            {/* // Supplier  */}
            <div className={styles.formInput}>
              <select
                name="supplier"
                value={`${purchase?.supplier?._id}-${purchase?.supplier.title}`}
                onChange={handleChange}
              >
                <option value="" hidden>
                  {purchase?.supplier?.title}
                </option>
                {suppliers?.map((supplier) => (
                  <option
                    key={supplier?._id}
                    value={`${supplier?._id}-${supplier.title}`}
                  >
                    {supplier?.title}
                  </option>
                ))}
              </select>
              <div onClick={() => setIsSupplierOpen(true)}>
                <PrimaryBtn type="button">
                  <Add />
                </PrimaryBtn>
              </div>
            </div>
          </div>

          {/* Amount Price  */}
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="amount"
                placeholder="Количество"
                value={purchase.amount}
                setData={setPurchase}
                required={true}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="price"
                placeholder="Цена"
                value={purchase.price}
                setData={setPurchase}
                required={true}
              />
            </div>
          </div>

          {/* CarNumber Discount */}
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="carNumber"
                placeholder="Номер автомобиля"
                value={purchase.carNumber}
                setData={setPurchase}
                required={true}
              />
            </div>

            <div className={styles.formInput}>
              <Input
                type="number"
                name="discount"
                placeholder="Скидка"
                value={purchase.discount}
                setData={setPurchase}
                required={false}
              />
            </div>
          </div>

          {/* AddedDate  */}
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <DatePick defDate={purchase.addedDate} setDate={setPurchase} />
            </div>
            <div className={styles.formInput}></div>
          </div>

          {/* Calc values  */}
          <div className={styles.bottom}>
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
              <p>Итого:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(purchase.amount * purchase.price - purchase.discount)
                  .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
            </div>
            <div className={styles.formInput}></div>
          </div>
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
