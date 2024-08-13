import "./Button.css"

export default function Button({ onClickHandler, text }) {
  return (
    <button onClick={onClickHandler} className="custom-button">
      {text}
    </button>
  );
}