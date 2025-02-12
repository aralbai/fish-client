import styles from "./Select.module.scss";

export default function Select({
  name,
  mapData,
  err,
  setData,
  setErr,
  defValue,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Example validation: Check if the input is empty
    const errorMessage =
      value.trim() === "" ? "Обязательное поле для ввода" : "";

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErr((prevData) => ({
      ...prevData,
      [name]: errorMessage,
    }));
  };

  return (
    <div className={styles.input}>
      <select name={name} onChange={(e) => handleChange(e)}>
        <option value="" hidden>
          {defValue}
        </option>
        {mapData.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.title}
          </option>
        ))}
      </select>
      <p>{err}</p>
    </div>
  );
}
