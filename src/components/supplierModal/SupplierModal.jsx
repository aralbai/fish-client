import { Close } from "@mui/icons-material";
import styles from "./SupplierModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function SupplierModal({ isModalOpen, setIsModalOpen }) {
  const { user } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...supplier,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, data)
      .then((res) => {
        toast.success(res.data);
        setSupplier({
          title: "",
          phone: "",
          address: "",
        });
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Тазасын киритиў Сатыўшы</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название Сатыўшыа"
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

          <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
