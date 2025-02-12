import styles from "./Input.module.scss";

export default function Input({
  type,
  name,
  placeholder,
  value,
  err,
  setData,
  setError,
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

    setError((prevData) => ({
      ...prevData,
      [name]: errorMessage,
    }));
  };

  return (
    <div className={styles.input}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <p>{err}</p>
    </div>
  );
}
