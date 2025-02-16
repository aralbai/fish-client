import { Close } from "@mui/icons-material";
import styles from "./SupplierModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function SupplierModal({ isModalOpen, setIsModalOpen }) {
  const [supplier, setSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, "create", "suppliers", supplier, setSupplier);

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Add new Supplier</h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название поставщика"
            value={supplier.title}
            setData={setSupplier}
            required={true}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={supplier.phone}
            setData={setSupplier}
            required={false}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={supplier.address}
            setData={setSupplier}
            required={false}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
