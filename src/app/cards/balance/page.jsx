"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import {
  ArrowRightAlt,
  FilterList,
  KeyboardBackspace,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import BalanceFilter from "@/components/filters/balanceFilter/BalanceFilter";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Balance() {
  const [deposits, setDeposits] = useState([]);
  const [sells, setSells] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: new Date(2025, 0, 1, 0, 0, 0),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchData(
      `/purchases/total/price?startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setPurchases
    );
    fetchData(
      `/outcomes/total?startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setOutcomes
    );
    fetchData(
      `/sells/total?startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setSells
    );
    fetchData(
      `/deposits/total?startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setDeposits
    );
    fetchData(
      `/withdraws/total?startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setWithdraws
    );
  }, [filters]);

  const profit = sells.totalSales - purchases.totalPurchases;

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Баланс</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Баланс</h1>

            <Link href="/">
              <KeyboardBackspace />
              <p>Артқа қайтыў</p>
            </Link>
          </div>

          <div className={styles.tableTop}>
            <div className={styles.filter}>
              <button onClick={() => setBalanceModalOpen((prev) => !prev)}>
                <FilterList /> Фильтр
              </button>
              <BalanceFilter
                isModalOpen={balanceModalOpen}
                setIsModalOpen={setBalanceModalOpen}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <td>Қай жерге</td>
                  <td>Сумма</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Тазасын киритиў</td>
                  <td>
                    {purchases.totalPurchases
                      ? Intl.NumberFormat("ru-RU")
                          .format(purchases.totalPurchases)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td>
                    <Link href="/purchases">
                      <div>
                        <ArrowRightAlt />
                      </div>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Сатыў</td>
                  <td>
                    {sells.totalSales
                      ? Intl.NumberFormat("ru-RU")
                          .format(sells.totalSales)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td>
                    <Link href="/sells">
                      <div>
                        <ArrowRightAlt />
                      </div>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Расход</td>
                  <td>
                    {outcomes.totalOutcomes
                      ? Intl.NumberFormat("ru-RU")
                          .format(outcomes.totalOutcomes)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td>
                    <Link href="/finance/outcomes">
                      <div>
                        <ArrowRightAlt />
                      </div>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Баланс толтырыў</td>
                  <td>
                    {deposits.totalDeposits
                      ? Intl.NumberFormat("ru-RU")
                          .format(deposits.totalDeposits)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td>
                    <Link href="/finance/deposits">
                      <div>
                        <ArrowRightAlt />
                      </div>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Баланстан шығарыў</td>
                  <td>
                    {withdraws.totalWithdraws
                      ? Intl.NumberFormat("ru-RU")
                          .format(withdraws.totalWithdraws)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td>
                    <Link href="/finance/withdraws">
                      <div>
                        <ArrowRightAlt />
                      </div>
                    </Link>
                  </td>
                </tr>
                <tr
                  style={
                    profit < 0
                      ? { backgroundColor: "#FF6378", color: "#fff" }
                      : { backgroundColor: "#28A745", color: "#fff" }
                  }
                >
                  <td>Прибыль</td>
                  <td>
                    {profit
                      ? Intl.NumberFormat("ru-RU")
                          .format(profit)
                          .replace(/,/g, " ")
                      : 0}
                  </td>
                  <td style={{ padding: "30px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
