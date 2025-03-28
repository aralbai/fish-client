"use client";
import { useContext, useState } from "react";
import styles from "./page.module.scss";
import {
  Info,
  Lock,
  RemoveRedEye,
  Settings,
  VisibilityOff,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Password() {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState({
    id: user?.id,
    username: user?.username,
    current1: "",
    current2: "",
    new: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current1 !== password.current2) {
      return toast.error("Пароли не совпадают!");
    }

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/password/${password.id}`, {
        username: password.username,
        password: password.current1,
        newPassword: password.new,
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });

    setPassword({
      id: user?.id,
      username: user?.username,
      current1: "",
      current2: "",
      new: "",
    });
  };

  return (
    <div className={styles.password}>
      <ul className={styles.bar}>
        <li className={pathname === "/profile" ? styles.active : ""}>
          <Link href="/profile">
            <Info />
            <p>Информация</p>
          </Link>
        </li>
        <li className={pathname === "/profile/change" ? styles.active : ""}>
          <Link href="/profile/change">
            <Settings />
            <p>Изменить аккаунт</p>
          </Link>
        </li>
        <li className={pathname === "/profile/password" ? styles.active : ""}>
          <Link href="/profile/password">
            <Lock />
            <p>Изменить пароль</p>
          </Link>
        </li>
      </ul>

      <div className={styles.change}>
        <div className={styles.top}></div>

        <div className={styles.title}>
          <h2>Изменить информацию</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <span>
              <input
                type={show ? "text" : "password"}
                placeholder="Текущий пароль"
                value={password.current1}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    current1: e.target.value,
                  }))
                }
              />
              <button
                className={styles.show}
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <RemoveRedEye />}
              </button>
            </span>
            <span>
              <input
                type={show ? "text" : "password"}
                placeholder="Текущий пароль"
                value={password.current2}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    current2: e.target.value,
                  }))
                }
              />
              <button
                className={styles.show}
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <RemoveRedEye />}
              </button>
            </span>
            <span>
              <input
                type={show ? "text" : "password"}
                placeholder="Новый пароль"
                value={password.new}
                onChange={(e) =>
                  setPassword((prev) => ({
                    ...prev,
                    new: e.target.value,
                  }))
                }
              />
              <button
                className={styles.show}
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <RemoveRedEye />}
              </button>
            </span>
          </div>

          <button className={styles.submit}>Save</button>
        </form>
      </div>
    </div>
  );
}
