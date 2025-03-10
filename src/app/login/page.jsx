"use client";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import styles from "./page.module.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [type, setType] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/api/users/login`, user)
      .then((res) => {
        login(res?.data?.user, res?.data?.token);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });

    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div>
          <img src="/login.svg" alt="" />
        </div>

        <form onSubmit={handleSubmit}>
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
            />
            <button
              className={styles.show}
              type="button"
              onClick={() => setType(!type)}
            >
              {type ? <VisibilityOff /> : <RemoveRedEye />}
            </button>
          </span>

          <p>Forgot password?</p>

          <button className={styles.submit} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
