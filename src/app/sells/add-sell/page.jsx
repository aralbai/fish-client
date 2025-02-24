"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import DatePick from "@/components/datePicker/DatePicker";
import { fetchData } from "@/utils/fetchData";
import CheckBox from "@/components/checkBox/CheckBox";
import { handleSubmit } from "@/utils/handleSubmit";
import CustumerModal from "@/components/custumerModal/CustumerModal";
import { format } from "date-fns";

export default function AddSell() {
  const [purchases, setPurchases] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [sell, setSell] = useState({
    purchase: "Выберите поток",
    product: "Выберите продукт",
    custumer: "Выберите клиента",
    custumerName: "",
    amount: "",
    price: "",
    discount: "",
    debt: "",
    addedDate: new Date(),
  });

  const [checkClient, setCheckClient] = useState(false);
  const [isModalOPen, setIsModalOpen] = useState(false);
  const [checkAmount, setCheckAmount] = useState(9999999999999999999999999999n);

  useEffect(() => {
    fetchData("/custumers", setCustumers);

    fetchData("/purchases/active", setPurchases);
  }, [isModalOPen, sell]);

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...sell,
      custumer: checkClient ? sell.custumerName : sell.custumer,
      price: sell.price * sell.amount - sell.discount,
      discount: sell.discount === "" ? 0 : sell.discount,
      debt: sell.debt === "" ? 0 : sell.debt,
      given: sell.price * sell.amount - sell.discount - sell.debt,
    };

    handleSubmit(e, "create", "sells", data, setSell);

    setSell({
      purchase: "Выберите поток",
      product: "Выберите продукт",
      custumer: "Выберите клиента",
      custumerName: "",
      amount: "",
      price: "",
      discount: "",
      debt: "",
      addedDate: new Date(),
    });
  };

  const handleChange = (e) => {
    const givenPurchase = purchases.find((p) => p._id === e.target.value);

    setSell((prev) => ({
      ...prev,
      purchase: e.target.value,
      product: givenPurchase.product.title,
    }));

    setCheckAmount(givenPurchase.remainingAmount);
  };

  console.log(checkAmount);

  return (
    <div className={styles.addProduct}>
      <h1>Продажи</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новую продажу</h1>
          <PrimaryBtn
            type="link"
            title="Вернуться к списку"
            url="/sells"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput} hidden>
              <select
                required
                value={sell.purchase}
                onChange={(e) => handleChange(e)}
              >
                <option value="" hidden>
                  {sell.purchase}
                </option>
                {purchases.map((purchase) => (
                  <option key={purchase._id} value={purchase._id}>
                    {purchase.product.title +
                      " " +
                      purchase.supplier.title +
                      " " +
                      format(purchase.addedDate, "dd.MM.yyyy") +
                      " " +
                      purchase.remainingAmount +
                      "kg" +
                      " "}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formInput}>
              <select name="" id="" disabled>
                <option value={sell.product}>{sell.product}</option>
              </select>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <div className={styles.formInputCheck}>
                <CheckBox
                  id="checkClient"
                  value={checkClient}
                  setData={setCheckClient}
                />
                <label htmlFor="checkClient">Не клиент</label>
              </div>

              {checkClient ? (
                <div className={styles.client}>
                  <Input
                    type="text"
                    name="custumerName"
                    placeholder="Имя клиента"
                    value={sell.custumerName}
                    setData={setSell}
                    required={true}
                  />
                </div>
              ) : (
                <div className={styles.client}>
                  <Select
                    name="custumer"
                    mapData={custumers}
                    text="fullname"
                    defValue={sell.custumer}
                    setData={setSell}
                  />

                  <div onClick={() => setIsModalOpen(true)}>
                    <PrimaryBtn type="button">+</PrimaryBtn>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.formInput}>
              <DatePick defDate={sell.addedDate} setDate={setSell} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="amount"
                placeholder="Количество"
                value={sell.amount}
                setData={setSell}
                required={true}
                max={checkAmount}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="price"
                placeholder="Цена"
                value={sell.price}
                setData={setSell}
                required={true}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="discount"
                placeholder="Скидка"
                value={sell.discount}
                setData={setSell}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="debt"
                placeholder="Долг"
                value={sell.debt}
                setData={setSell}
                required={false}
              />
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.calc}>
              <p>Итого:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(sell.price * sell.amount)
                  .replace(/,/g, " ")}

                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Скидка:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(sell.discount)
                  .replace(/,/g, " ")}

                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Долг:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(sell.debt)
                  .replace(/,/g, " ")}

                <b> SWM</b>
              </b>
            </div>
            <div className={styles.calc}>
              <p>Оплачено:</p>
              <b>
                {Intl.NumberFormat("uz-UZ")
                  .format(sell.price * sell.amount - sell.discount - sell.debt)
                  .replace(/,/g, " ")}

                <b> SWM</b>
              </b>
            </div>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>

      <CustumerModal
        isModalOpen={isModalOPen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
