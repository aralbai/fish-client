"use client";
import styles from "./page.module.scss";
import {
  KeyboardBackspace,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddUser() {
  const [type, setType] = useState(true);
  const [user, setUser] = useState({
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
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });

    setUser({
      username: "",
      role: "",
      password: "",
    });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/users"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Login"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required={true}
            />
            <span>
              <input
                type={type ? "password" : "text"}
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required={true}
              />
              <button
                className={styles.show}
                type="button"
                onClick={() => setType(!type)}
              >
                {type ? <VisibilityOff /> : <RemoveRedEye />}
              </button>
            </span>

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
              required={true}
            >
              <option value="" hidden>
                Choose
              </option>
              <option value="admin">admin</option>
            </select>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
