"use client";
import { useContext, useState } from "react";
import styles from "./page.module.scss";
import { AuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Info, Lock, Settings } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Change() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    id: user?.id,
    fullname: user?.fullname,
    username: user?.username,
    email: user?.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${newUser.id}`, newUser)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });

    logout();

    setNewUser({
      id: user?.id,
      fullname: user?.fullname,
      username: user?.username,
      email: user?.email,
    });

    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className={styles.changeInfo}>
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
              <input
                type="text"
                placeholder="Fullname"
                value={newUser?.fullname}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Username"
                value={newUser?.username}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={newUser?.email}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <button className={styles.submit}>Save</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
