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
    product: "",
    supplier: "",
    carNumber: "",
    amount: "",
    price: "",
    perKilo: "",
    debt: "",
    discount: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const { _id, _v, updatedAt, createdAt, ...data } = changedPurchase;

    handleSubmit(e, purchaseId, "purchases", data, setChangedPurchase);

    router.push("/purchases");

    setChangedPurchase({
      product: "",
      supplier: "",
      carNumber: "",
      amount: "",
      price: "",
      debt: "",
      discount: "",
      addedDate: new Date(),
    });
  };

  useEffect(() => {
    fetchData(`/purchases/${purchaseId}`, setChangedPurchase);
    fetchData("/products", setProducts);
    fetchData("/suppliers", setSuppliers);
  }, []);

  console.log(changedPurchase);

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
          {/* Product Supplier CarNumber */}
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="">Product</label>
              <select
                name="productId"
                value={changedPurchase?.product?.id}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    product: e.target.value,
                  }))
                }
              >
                <option value={changedPurchase?.product?.id} hidden>
                  {changedPurchase?.product?.title}
                </option>
                {products?.map((product) => (
                  <option value={product?._id} key={product?._id}>
                    {product?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.input}>
              <label htmlFor="">Supplier</label>
              <select
                name="productId"
                value={changedPurchase?.supplier?.id}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    supplier: e.target.value,
                  }))
                }
              >
                <option value={changedPurchase?.supplier?.id} hidden>
                  {changedPurchase?.supplier?.title}
                </option>
                {suppliers?.map((supplier) => (
                  <option value={supplier?._id} key={supplier?._id}>
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
                value={changedPurchase.perKilo}
                onChange={(e) =>
                  setChangedPurchase((prev) => ({
                    ...prev,
                    perKilo: e.target.value,
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

          <div className={styles.bottom}>
            <div className={styles.row}>
              <div className={styles.calc}>
                <p>Итого:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(changedPurchase.amount * changedPurchase.perKilo)
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
                <p>Долг:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(changedPurchase.debt)
                    .replace(/,/g, " ")}
                  <b> SWM</b>
                </b>
              </div>
              <div className={styles.calc}>
                <p>Оплачено:</p>
                <b>
                  {Intl.NumberFormat("uz-UZ")
                    .format(
                      changedPurchase.amount * changedPurchase.perKilo -
                        changedPurchase.discount -
                        changedPurchase.debt
                    )
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
