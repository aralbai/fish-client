"use client";
import styles from "./page.module.scss";
import {
  KeyboardBackspace,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "@/utils/fetchData";

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [type, setType] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    role: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      password: newPassword,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/users");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(`/users/${userId}`, setUser);
  }, [userId]);

  console.log(newPassword);

  return (
    <div className={styles.addProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
          <Link href="/users">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Полное имя"
                value={user.fullname}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className={styles.formInput}>
              <input
                type="text"
                placeholder="Имя пользователя"
                value={user.username}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <span>
                <input
                  type={type ? "password" : "text"}
                  placeholder="Пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className={styles.show}
                  type="button"
                  onClick={() => setType(!type)}
                >
                  {type ? <VisibilityOff /> : <RemoveRedEye />}
                </button>
              </span>
            </div>

            <div className={styles.formInput}>
              <select
                name=""
                id=""
                value={user.role}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                required
              >
                <option value="" hidden>
                  Роль
                </option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
            </div>
            <div className={styles.formInput}></div>
            <div className={styles.formInput}></div>
          </div>
        </form>
      </div>
    </div>
  );
}
