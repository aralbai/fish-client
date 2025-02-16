"use client";
import styles from "./page.module.scss";
import { Add, KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import CheckBox from "@/components/checkBox/CheckBox";
import SellModal from "@/components/sellModal/SellModal";

export default function AddSell() {
  const [products, setProducts] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [sell, setSell] = useState({
    productId: "",
    custumerId: "",
    custumerTitle: "",
    amount: "",
    price: "",
    addedDate: new Date(),
  });

  const [checkWholesale, setCheckWholesale] = useState(false);
  const [checkClient, setCheckClient] = useState(false);
  const [isModalOPen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData("/products", setProducts);

    fetchData("/custumers", setCustumers);
  }, [isModalOPen]);

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...sell,
      price: checkWholesale ? sell.price : sell.price * sell.amount,
    };

    console.log(data);

    // handleSubmit(e, "create", "sells", sell, setSell);
  };

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

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Select
                name="productId"
                mapData={products}
                text="title"
                defValue="Выберите продукт"
                setData={setSell}
              />
            </div>

            <div className={styles.formInput}>
              <CheckBox
                id="checkClient"
                value={checkClient}
                setData={setCheckClient}
              />
              <label htmlFor="checkClient">Bez client</label>
            </div>

            {checkClient ? (
              <div>
                <Input
                  type="text"
                  name="amount"
                  placeholder="Количество"
                  value={sell.amount}
                  setData={setSell}
                />
              </div>
            ) : (
              <div className={styles.client}>
                <div className={styles.formInput}>
                  <Select
                    name="custumerId"
                    mapData={custumers}
                    text="fullname"
                    defValue="Выберите клиента"
                    setData={setSell}
                  />
                </div>

                <div className={styles.formInput}>
                  <PrimaryBtn type="link" url="/custumers/add-custumer">
                    +
                  </PrimaryBtn>
                </div>
              </div>
            )}
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

          <div className={styles.bottom}>
            <div className={styles.checkBox}>
              <CheckBox
                id="checkWholesale"
                value={checkWholesale}
                setData={setCheckWholesale}
              />
              <label htmlFor="checkWholesale">Рассчитать оптом</label>
            </div>
            <div className={styles.calc}>
              <p>Total:</p>
              <b>
                {checkWholesale
                  ? Intl.NumberFormat("uz-UZ")
                      .format(sell.price)
                      .replace(/,/g, " ")
                  : Intl.NumberFormat("uz-UZ")
                      .format(sell.amount * sell.price)
                      .replace(/,/g, " ")}
                <b> SWM</b>
              </b>
            </div>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>

      <SellModal isModalOpen={isModalOPen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
