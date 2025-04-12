"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, FilterList } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import PurchasesFilter from "../../components/filters/purchasesFilter/PurchasesFilter";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filters, setFilters] = useState({
    product: {
      id: "",
      title: "Все",
    },
    supplier: {
      id: "",
      title: "Все",
    },
    status: "",
    startDate: new Date(2025, 0, 1, 0, 0, 0),
    endDate: new Date(),
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const tableRef = useRef(null);

  // page number and total pages for pagination
  const [totalDocuments, setTotalDocuments] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Guruhlash xaridor va sana bo‘yicha
  const grouped = {};

  purchases?.forEach((p) => {
    const supplierName = p.supplier?.title || "No Name";
    const date = new Date(p.addedDate).toISOString().split("T")[0]; // YYYY-MM-DD

    const key = `${supplierName}-${date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const rows = Object.entries(grouped); // [ [key, purchases], ... ]

  useEffect(() => {
    fetchData(
      `/purchases?productId=${filters?.product?.id}&supplierId=${filters?.supplier?.id}&status=${filters?.status}&startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setPurchases
    );
    fetchData("/products", setProducts);
    fetchData("/suppliers", setSuppliers);
  }, [filters]);

  return (
    <div className={styles.products}>
      <h1>Сатып алыў</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Сатып алыў</h1>
          <Link href="/purchases/add-purchase">
            <Add />
            <p>Тазасын киритиў</p>
          </Link>
        </div>

        <div className={styles.tableTop}>
          <div className={styles.filter}>
            <button onClick={() => setFilterModalOpen((prev) => !prev)}>
              <FilterList /> Фильтр
            </button>
            <PurchasesFilter
              isModalOpen={filterModalOpen}
              setIsModalOpen={setFilterModalOpen}
              products={products}
              suppliers={suppliers}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <TableTop tableRef={tableRef} />
        </div>

        <div className={styles.tableContainer}>
          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Н</td>
                <td>Сатыўшы</td>
                <td>Продукт</td>
                <td>Муғдары</td>
                <td>Баҳасы</td>
                <td>Сумма</td>
                <td>Скидка</td>
                <td>Кемшилик</td>
                <td>Қалдық</td>
                <td>Итого</td>
                <td>Сәне</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {rows.map(([key, group], i) => {
                const total = group.reduce((sum, p) => sum + p.totalPrice, 0);

                return (
                  <React.Fragment key={key}>
                    {group.map((p, index) => (
                      <tr key={p._id}>
                        {index === 0 && (
                          <>
                            <td rowSpan={group.length}>{i + 1}</td>
                            <td rowSpan={group.length}>{p.supplier.title}</td>
                          </>
                        )}
                        <td>{p.product.title}</td>
                        <td>
                          {p.amount
                            ? Intl.NumberFormat("uz-UZ").format(p.amount / 1000)
                            : 0}
                        </td>
                        <td>
                          {p.price
                            ? Intl.NumberFormat("ru-RU").format(p.price)
                            : 0}
                        </td>
                        <td>
                          {p.totalPrice
                            ? Intl.NumberFormat("ru-RU").format(p.totalPrice)
                            : 0}
                        </td>
                        <td>
                          {p.discount
                            ? Intl.NumberFormat("ru-RU").format(p.discount)
                            : 0}
                        </td>
                        <td>
                          {p.shortage
                            ? Intl.NumberFormat("ru-RU").format(p.shortage)
                            : 0}
                        </td>
                        <td>
                          {p.remainingAmount
                            ? Intl.NumberFormat("uz-UZ").format(
                                p.remainingAmount / 1000
                              )
                            : 0}
                        </td>
                        {index === 0 && (
                          <>
                            <td rowSpan={group.length}>
                              {total
                                ? Intl.NumberFormat("ru-RU").format(total)
                                : 0}
                            </td>
                            <td rowSpan={group.length}>
                              {format(new Date(p.addedDate), "dd.MM.yyyy")}
                            </td>
                          </>
                        )}
                        <td className={styles.action}>
                          <Link
                            href={{
                              pathname: "/sells/single-sell",
                              query: { sellId: p._id },
                            }}
                          >
                            <ArrowRightAlt />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {purchases.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
