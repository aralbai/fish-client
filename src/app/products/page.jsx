"use client";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("/products", setProducts);
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
              <td>Движение</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/products/edit-product",
                      query: { productId: product._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/products",
                        product._id,
                        products,
                        setProducts
                      )
                    }
                  >
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
