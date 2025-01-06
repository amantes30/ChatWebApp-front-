export default function InputField({ id, label, type }) {
  return (
    <label htmlFor={id}>
      {label}:
      <input required type={type} id={id} name={id} />
    </label>
  );
}
