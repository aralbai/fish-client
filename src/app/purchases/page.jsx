"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, FilterList } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import PurchasesFilter from "../../components/filters/purchasesFilter/PurchasesFilter";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Pagination from "@/components/pagination/Pagination";

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
    <ProtectedRoute>
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
              <thead style={{ fontWeight: "bold" }}>
                <tr>
                  <td rowSpan={2}>Н</td>
                  <td rowSpan={2}>Сатыўшы</td>
                  <td rowSpan={2}>Продукт</td>
                  <td rowSpan={2}>Муғдары (кг)</td>
                  <td rowSpan={2}>Баҳасы (сwм)</td>
                  <td rowSpan={2}>Сумма (сwм)</td>
                  <td rowSpan={2}>Скидка (сwм)</td>
                  <td rowSpan={2}>Кемшилик (кг)</td>
                  <td rowSpan={2}>Қалдық (кг)</td>
                  <td colSpan={2}>Итого (кг)</td>
                  <td rowSpan={2}>Сәне</td>
                </tr>
                <tr>
                  <td>Муғдары</td>
                  <td>Қалдық</td>
                </tr>
              </thead>
              <tbody>
                {rows.map(([key, group], i) => {
                  const total = group.reduce((sum, p) => sum + p.amount, 0);
                  const totalRemaining = group.reduce(
                    (sum, p) => sum + p.remainingAmount,
                    0
                  );

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
                          <td>
                            <Link
                              href={{
                                pathname: "/purchases/single-purchase",
                                query: { purchaseId: p._id },
                              }}
                              style={{
                                color: "#1976D2",
                                display: "block",
                              }}
                            >
                              {p.product.title}
                            </Link>
                          </td>
                          <td>
                            {p.amount
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.amount / 1000)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.price
                              ? Intl.NumberFormat("ru-RU")
                                  .format(p.price)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.totalPrice
                              ? Intl.NumberFormat("ru-RU")
                                  .format(p.totalPrice)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.discount
                              ? Intl.NumberFormat("ru-RU")
                                  .format(p.discount)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.shortage
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.shortage / 1000)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.remainingAmount
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.remainingAmount / 1000)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          {index === 0 && (
                            <>
                              <td rowSpan={group.length}>
                                {total
                                  ? Intl.NumberFormat("uz-UZ")
                                      .format(total / 1000)
                                      .replace(/,/g, " ")
                                  : 0}
                              </td>
                              <td rowSpan={group.length}>
                                {totalRemaining
                                  ? Intl.NumberFormat("uz-UZ")
                                      .format(totalRemaining / 1000)
                                      .replace(/,/g, " ")
                                  : 0}
                              </td>
                              <td rowSpan={group.length}>
                                {format(new Date(p.addedDate), "dd.MM.yyyy")}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalDocuments={totalDocuments}
              setPage={setPage}
              title={"Всего продаж:"}
            />
          </div>

          {purchases.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
