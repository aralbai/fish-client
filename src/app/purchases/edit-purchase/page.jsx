"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import DatePick from "@/components/datePicker/DatePicker";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

export default function EditSupplier() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [changedPurchase, setChangedPurchase] = useState({
    product: "",
    supplier: "",
    amount: "",
    price: "",
    carNumber: "",
    addedDate: new Date(),
    discount: "",
    debt: "",
    minAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const values = value.split("-");

    setChangedPurchase((prev) => ({
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
      ...changedPurchase,

      discount:
        parseFloat(changedPurchase.discount) === ""
          ? 0
          : parseFloat(changedPurchase.discount),
      debt:
        parseFloat(changedPurchase.debt) === ""
          ? 0
          : parseFloat(changedPurchase.debt),
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${purchaseId}`, data)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

    router.push("/purchases");
  };

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/suppliers", setSuppliers);

    const fetchPurchase = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${purchaseId}`)
        .then((res) => {
          setChangedPurchase({
            ...res.data,
            minAmount: res?.data?.amount - res?.data?.remainingAmount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPurchase();
  }, []);

  return (
    <div className={styles.editProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        {/* Title and back button  */}
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
          {/* Product Supplier */}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="">Product</label>
              <select
                name="product"
                value={changedPurchase?.product?.id}
                onChange={(e) => handleChange(e)}
              >
                <option value={changedPurchase?.product?.id} hidden>
                  {changedPurchase?.product?.title}
                </option>
                {products?.map((product) => (
                  <option
                    value={`${product?._id}-${product?.title}`}
                    key={product?._id}
                  >
                    {product?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.input}>
              <label htmlFor="">Supplier</label>
              <select
                name="supplier"
                value={changedPurchase?.supplier?.id}
                onChange={(e) => handleChange(e)}
              >
                <option value={changedPurchase?.supplier?.id} hidden>
                  {changedPurchase?.supplier?.title}
                </option>
                {suppliers?.map((supplier) => (
                  <option
                    value={`${supplier?._id}-${supplier?.title}`}
                    key={supplier?._id}
                  >
                    {supplier?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount PerKilo  */}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="">Amount</label>
              <input
                type="number"
                name="Amount"
                min={changedPurchase.minAmount}
                value={changedPurchase.amount}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.input}>
              <label htmlFor="">Price</label>
              <input
                type="number"
                name="Amount"
                value={changedPurchase.price}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* CarNumber AddedDate  */}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="">Car Number</label>
              <input
                type="text"
                value={changedPurchase.carNumber}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    carNumber: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.input}>
              <label htmlFor="">Added date</label>
              <DatePick
                defDate={changedPurchase.addedDate}
                setDate={setChangedPurchase}
              />
            </div>
          </div>

          {/* Discount Debt  */}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="">Discount</label>
              <input
                type="number"
                value={changedPurchase.discount}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.input}>
              <label htmlFor="">Debt</label>
              <input
                type="number"
                value={changedPurchase.debt}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    debt: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Calculate total */}
          <div className={styles.bottom}>
            <div className={styles.row}>
              <div className={styles.calc}>
                <p>Итого:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(
                      parseFloat(changedPurchase.amount) *
                        parseFloat(changedPurchase.price)
                    )
                    .replace(/,/g, " ")}
                  <b> SWM</b>
                </b>
              </div>

              <div className={styles.calc}>
                <p>Скидка:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(changedPurchase.discount)
                    .replace(/,/g, " ")}
                  <b> SWM</b>
                </b>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.calc}>
                <p>Оплачено:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(
                      changedPurchase.amount * changedPurchase.price -
                        changedPurchase.discount -
                        changedPurchase.debt
                    )
                    .replace(/,/g, " ")}
                  <b> SWM</b>
                </b>
              </div>
              <div className={styles.calc}>
                <p>Долг:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(changedPurchase.debt)
                    .replace(/,/g, " ")}
                  <b> SWM</b>
                </b>
              </div>
            </div>
          </div>
          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
