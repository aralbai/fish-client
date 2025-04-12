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
import { format } from "date-fns";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function EditSell() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const searchParams = useSearchParams();
  const sellId = searchParams.get("sellId");
  const purchaseId = searchParams.get("purchaseId");

  const [custumers, setCustumers] = useState([]);
  const [repays, setRepays] = useState([]);
  const [purchase, setPurchase] = useState({
    remainingAmount: 0,
  });

  const [changedSell, setChangedSell] = useState({
    custumer: {
      id: "",
      fullname: "",
    },
    addedDate: new Date(),
    prevAmount: 0,
    amount: 0,
    price: 0,
    discount: 0,
    debt: 0,
    maxAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const values = value.split("-");

    setChangedSell((prev) => ({
      ...prev,
      [name]: {
        id: values[0],
        title: values[1],
      },
    }));
  };

  useEffect(() => {
    fetchData("/custumers", setCustumers);
    fetchData(`/purchases/${purchaseId}`, setPurchase);
    fetchData(`/repays/${sellId}`, setRepays);

    const fetchSell = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sellId}`)
        .then((res) => {
          setChangedSell({
            ...res.data,
            maxAmount: changedSell?.maxAmount + res?.data?.amount,
            prevAmount: res.data.amount,
          });
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);

          console.log(err);
        });
    };

    fetchSell();
  }, []);

  let totalMaxAmount = 0;

  totalMaxAmount =
    parseFloat(changedSell?.maxAmount) + parseFloat(purchase?.remainingAmount);

  const maxDebt = changedSell.amount * changedSell.price - changedSell.discount;
  const maxDiscount = changedSell?.amount * changedSell?.price;
  const totalRepay =
    repays.length > 0
      ? repays.reduce((sum, repay) => sum + repay.amount, 0)
      : 0;

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...changedSell,
      purchaseId,
      totalRepay,
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sellId}`, data)
      .then((res) => {
        toast.success(res.data);

        router.push(`/sells/single-sell?sellId=${sellId}`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <ProtectedRoute>
      <div className={styles.editProduct}>
        <h1>Сатыў</h1>

        <div className={styles.form}>
          {/* Title and back button  */}
          <div className={styles.top}>
            <h1>Редактировать продаж</h1>
            <Link href="/sells">
              <KeyboardBackspace />
              <p>Артқа қайтыў</p>
            </Link>
          </div>

          <form onSubmit={pageHandleSubmit}>
            {/* Purchase Product */}
            <div className={styles.inputGroup}>
              {/* Purchase  */}
              <div className={styles.input}>
                <label htmlFor="">Покупка</label>
                <input
                  type="text"
                  name="purchase"
                  value={`${purchase?.supplier?.title} ${
                    purchase?.remainingAmount
                  }kg ${
                    purchase?.addedDate &&
                    format(new Date(purchase?.addedDate), "dd.MM.yyyy")
                  }`}
                  disabled
                />
              </div>

              {/* Product  */}
              <div className={styles.input}>
                <label htmlFor="">Продукт</label>
                <input
                  type="text"
                  name="product"
                  value={`${purchase?.product?.title}`}
                  disabled
                />
              </div>
            </div>

            {/* Custumer AddedDate */}
            <div className={styles.inputGroup}>
              {/* Custumer  */}
              <div className={styles.input}>
                <label htmlFor="">Клиент</label>
                <select
                  name="custumer"
                  value={changedSell?.custumer?.fullname}
                  onChange={(e) => handleChange(e)}
                >
                  <option value={changedSell?.custumer?.id} hidden>
                    {changedSell?.custumer?.fullname}
                  </option>
                  {custumers?.map((custumer) => (
                    <option
                      value={`${custumer?._id}-${custumer?.fullname}`}
                      key={custumer?._id}
                    >
                      {custumer?.fullname}
                    </option>
                  ))}
                </select>
              </div>

              {/* AddedDate  */}
              <div className={styles.input}>
                <label htmlFor="">Киритилген сәне</label>
                <DatePick
                  defDate={changedSell.addedDate}
                  setDate={setChangedSell}
                />
              </div>
            </div>

            {/* Amount Price  */}
            <div className={styles.inputGroup}>
              <div className={styles.input}>
                <label htmlFor="">Муғдары</label>
                <input
                  type="number"
                  name="amount"
                  max={totalMaxAmount}
                  value={changedSell.amount}
                  onChange={(e) =>
                    setChangedSell((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Price  */}
              <div className={styles.input}>
                <label htmlFor="">Баҳасы</label>
                <input
                  type="number"
                  name="Price"
                  value={changedSell.price}
                  onChange={(e) =>
                    setChangedSell((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Discount Debt  */}
            <div className={styles.inputGroup}>
              <div className={styles.input}>
                <label htmlFor="">Скидка</label>
                <input
                  type="number"
                  value={changedSell.discount}
                  max={maxDiscount}
                  onChange={(e) =>
                    setChangedSell((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }))
                  }
                />
              </div>

              <div className={styles.input}>
                <label htmlFor="">Қарыз</label>
                <input
                  type="number"
                  value={changedSell.debt}
                  max={maxDebt}
                  min={totalRepay}
                  onChange={(e) =>
                    setChangedSell((prev) => ({
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
                        parseFloat(changedSell.amount) *
                          parseFloat(changedSell.price)
                      )
                      .replace(/,/g, " ")}
                  </b>
                </div>

                <div className={styles.calc}>
                  <p>Төленди:</p>
                  <b>
                    {Intl.NumberFormat("uz-UZ")
                      .format(
                        changedSell.amount * changedSell.price -
                          changedSell.discount -
                          changedSell.debt
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
                      .format(changedSell.discount)
                      .replace(/,/g, " ")}
                  </b>
                </div>

                <div className={styles.calc}>
                  <p>Қарыз:</p>
                  <b>
                    {Intl.NumberFormat("uz-UZ")
                      .format(changedSell.debt)
                      .replace(/,/g, " ")}
                  </b>
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.input}>
                <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
              </div>

              <div className={styles.input}></div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
