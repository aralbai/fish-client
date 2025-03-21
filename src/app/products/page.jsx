"use client";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";
import TableTop from "@/components/tableTop/TableTop";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { format } from "date-fns";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

export default function Products() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productId, setProductId] = useState("");
  const tableRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/users/all", setUsers);
  }, [isModalOpen]);

  const handleDeleteClick = (id) => {
    setProductId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Продукты</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Все продукты</h1>
            <Link href="/products/add-product">
              <Add />
              Создать новый
            </Link>
          </div>

          <TableTop tableRef={tableRef} />

          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Название продукта</td>
                <td>Добавлен</td>
                <td>Последнее изменение</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>
                    {user?.role === "superadmin"
                      ? users?.map((user) =>
                          user._id === product.addedUserId ? (
                            <Link
                              href="/users"
                              key={user._id}
                              style={{ color: "#1976D2" }}
                            >
                              {user.username} {" - "}
                            </Link>
                          ) : null
                        )
                      : ""}
                    {format(new Date(product.createdAt), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td>
                    {user?.role === "superadmin"
                      ? users?.map((user) =>
                          user._id === product.changedUserId ? (
                            <Link
                              href="/users"
                              key={user._id}
                              style={{ color: "#1976D2" }}
                            >
                              {user.username} {" - "}
                            </Link>
                          ) : null
                        )
                      : ""}
                    {format(new Date(product.updatedAt), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/products/edit-product",
                        query: { productId: product._id },
                      }}
                    >
                      <Edit />
                    </Link>

                    <button onClick={() => handleDeleteClick(product._id)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}
      />
    </ProtectedRoute>
  );
}
