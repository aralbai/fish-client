"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function Products() {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProducts(products.filter((product) => product._id !== id));
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
  }, []);

  return (
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

        <table>
          <thead>
            <tr>
              <td>Название продукта</td>
              <td>Кто добавил</td>
              <td>Кто изменился последним</td>
              <td>Дата создания</td>
              <td>Дата изменения</td>
              <td>Движение</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>admin</td>
                <td>admin</td>
                <td>
                  {format(new Date(product.createdAt), "dd.MM.yyyy / HH:mm:ss")}
                </td>
                <td>
                  {format(new Date(product.updatedAt), "dd.MM.yyyy / HH:mm:ss")}
                </td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/products/edit-product",
                      query: {
                        id: product._id,
                        title: product.title,
                      },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDelete(product._id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
