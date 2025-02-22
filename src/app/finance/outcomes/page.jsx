"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import {
  Add,
  ArrowRight,
  ArrowRightAlt,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Outcomes() {
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchData("/outcomes", setOutcomes);

    fetchData("/purchases", setPurchases);
  }, []);

  let total = 0;
  let allOutcomes = 0;
  purchases.forEach((purchase) => {
    total += purchase.price - purchase.debt;
    allOutcomes += purchase.price - purchase.debt;
  });

  outcomes.forEach((outcome) => {
    allOutcomes += outcome.amount;
  });
  return (
    <div className={styles.outcomes}>
      <h1>Расходы</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все расходы</h1>
          <Link href="/finance/outcomes/add-outcome">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
              <td>{Intl.NumberFormat("ru-RU").format(allOutcomes)}</td>
              <td></td>
              <td></td>
              <td className={styles.action}>
                <Link href="/purchases">
                  <ArrowRightAlt />
                </Link>
              </td>
            </tr>
            <tr>
              <td>{Intl.NumberFormat("ru-RU").format(total)}</td>
              <td>Для покупки продуктов</td>
              <td></td>
              <td className={styles.action}>
                <Link href="/purchases">
                  <ArrowRightAlt />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Сумма</td>
              <td>Куда</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {outcomes?.map((outcome) => (
              <tr key={outcome._id}>
                <td>{Intl.NumberFormat("ru-RU").format(outcome.amount)}</td>
                <td>{outcome.purpose}</td>
                <td>{format(outcome.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/outcomes/edit-outcome",
                      query: { outcomeId: outcome._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/outcomes",
                        outcome._id,
                        outcomes,
                        setOutcomes
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
