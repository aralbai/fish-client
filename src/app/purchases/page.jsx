"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, FilterList } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
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
                <td>Продукт</td>
                <td>Сатыўшы</td>
                <td>Муғдары</td>
                <td>Скидка</td>
                <td>Сумма</td>
                <td>Кемшилик</td>
                <td>Қалдық</td>
                <td>Сәне</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {purchases?.map((purchase) => (
                <tr key={purchase._id}>
                  <td>{purchase.product?.title}</td>
                  <td>{purchase.supplier?.title}</td>
                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(purchase?.amount)
                      .replace(/,/g, " ")}
                  </td>

                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(purchase?.discount)
                      .replace(/,/g, " ")}
                  </td>
                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(purchase?.totalPrice)
                      .replace(/,/g, " ")}
                  </td>
                  <td>{purchase.shortage}</td>
                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(purchase.remainingAmount)
                      .replace(/,/g, " ")}
                  </td>
                  <td>{format(purchase.addedDate, "dd.MM.yyyy")}</td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/purchases/single-purchase",
                        query: { purchaseId: purchase._id },
                      }}
                    >
                      <ArrowRightAlt />
                    </Link>
                  </td>
                </tr>
              ))}
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
