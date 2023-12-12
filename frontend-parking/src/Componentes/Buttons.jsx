import "./StyleSheets/Buttons.css";

export default function Buttons({ text, onClick }) {
  return (
    <button className="bottone5  max-sm:p-[0px]" onClick={onClick}>
      <p className=" max-sm:text-[0.5rem] text-center ">{text}</p>
    </button>
  );
}
