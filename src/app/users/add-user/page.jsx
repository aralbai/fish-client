"use client";
import styles from "./page.module.scss";
import {
  KeyboardBackspace,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();
  const [type, setType] = useState(true);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    role: "",
    password: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/api/users/register`, user)
      .then((res) => {
        toast.success(res?.data?.message);

        router.push("/users");
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
                  value={user.password}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
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
          </div>
        </form>
      </div>
    </div>
  );
}
