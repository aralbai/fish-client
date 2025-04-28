"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/input/Input";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import CustumerModal from "@/components/custumerModal/CustumerModal";
import { format } from "date-fns";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function AddSell() {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [sell, setSell] = useState({
    purchaseId: "Потокти сайлаң",
    product: {
      id: "",
      title: "Продукт сайлаң",
    },
    custumer: {
      id: "",
      fullname: "Клиентти сайлаң",
    },
    amount: "",
    price: "",
    discount: "",
    debt: "",
    addedDate: new Date(),
  });

  const [isModalOPen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData("/custumers", setCustumers);

    fetchData("/purchases/active", setPurchases);
  }, [isModalOPen, sell]);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...sell,
      discount: sell.discount === "" ? 0 : sell.discount,
      debt: sell.debt === "" ? 0 : parseFloat(sell.debt),
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/sells`, data)
      .then((res) => {
        toast.success(res.data);

        setSell({
          ...sell,
          purchaseId: "Потокти сайлаң",
          product: {
            id: "",
            title: "Продукт сайлаң",
          },
          amount: "",
          price: "",
          discount: "",
          debt: "",
          addedDate: new Date(),
        })
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const givenPurchase = purchases.find((p) => p._id === value);
    const values = value.split("-");

    if (name === "purchase") {
      setSell((prev) => ({
        ...prev,
        purchaseId: value,
        product: {
          id: givenPurchase?.product?.id,
          title: givenPurchase?.product?.title,
        },
      }));
    }

    if (name === "custumer") {
      setSell((prev) => ({
        ...prev,
        custumer: {
          id: values[0],
          fullname: values[1],
        },
        custumerName: "Клиент",
      }));
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.addProduct}>
        <h1>Сатыў</h1>

        <div className={styles.form}>
          <div className={styles.top}>
            <h1>Добавить новую продажу</h1>
            <Link href="/sells">
              <KeyboardBackspace />
              <p>Артқа қайтыў</p>
            </Link>
          </div>

          <form onSubmit={pageHandleSubmit}>
            {/* Purchase Product  */}
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <select
                  name="purchase"
                  value={sell.purchaseId}
                  onChange={(e) => handleChange(e)}
                  required
                >
                  <option value="" hidden>
                    {sell.purchaseId}
                  </option>
                  {purchases.map((purchase) => (
                    <option key={purchase._id} value={purchase?._id}>
                      {purchase.product.title +
                        " " +
                        purchase.supplier.title +
                        " " +
                        format(purchase.addedDate, "dd.MM.yyyy") +
                        " " +
                        purchase.remainingAmount / 1000 +
                        "kg" +
                        " "}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formInput}>
                <select name="" id="" disabled>
                  <option value={sell.product.id}>{sell.product.title}</option>
                </select>
              </div>
            </div>

            {/* Custumer AddedDate  */}
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <select
                  name="custumer"
                  value={sell.custumer.id}
                  onChange={(e) => handleChange(e)}
                  required={true}
                >
                  <option value={sell.custumer.id} hidden>
                    {sell?.custumer?.fullname}
                  </option>
                  {custumers.map((custumer) => (
                    <option
                      key={custumer._id}
                      value={`${custumer?._id}-${custumer.fullname}`}
                    >
                      {custumer?.fullname}
                    </option>
                  ))}
                </select>

                <div onClick={() => setIsModalOpen(true)}>
                  <PrimaryBtn type="button">+</PrimaryBtn>
                </div>
              </div>

              <div className={styles.formInput}>
                <DatePick defDate={sell.addedDate} setDate={setSell} />
              </div>
            </div>

            {/* Amount Price  */}
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Муғдары"
                  value={sell.amount}
                  setData={setSell}
                  required
                />
              </div>
              <div className={styles.formInput}>
                <Input
                  type="number"
                  name="price"
                  placeholder="Баҳасы"
                  value={sell.price}
                  setData={setSell}
                  required={true}
                />
              </div>
            </div>

            {/* Discount Debt  */}
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <Input
                  type="number"
                  name="discount"
                  placeholder="Скидка"
                  value={sell.discount}
                  setData={setSell}
                />
              </div>
              <div className={styles.formInput}>
                <input
                  type="number"
                  placeholder="Қарыз"
                  value={sell.debt}
                  onChange={(e) =>
                    setSell((prev) => ({
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
                      .format(sell.amount * sell.price)
                      .replace(/,/g, " ")}
                  </b>
                </div>

                <div className={styles.calc}>
                  <p>Төленди:</p>
                  <b>
                    {Intl.NumberFormat("uz-UZ")
                      .format(
                        sell.amount * sell.price - sell.discount - sell.debt
                      )
                      .replace(/,/g, " ")}
                  </b>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.calc}>
                  <p>Скидка:</p>
                  <b>
                    {Intl.NumberFormat("uz-UZ")
                      .format(sell.discount)
                      .replace(/,/g, " ")}
                  </b>
                </div>

                <div className={styles.calc}>
                  <p>Қарыз:</p>
                  <b>
                    {Intl.NumberFormat("uz-UZ")
                      .format(sell.debt)
                      .replace(/,/g, " ")}
                  </b>
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
              </div>
              <div className={styles.formInput}></div>
            </div>
          </form>
        </div>

        <CustumerModal
          isModalOpen={isModalOPen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </ProtectedRoute>
  );
}
