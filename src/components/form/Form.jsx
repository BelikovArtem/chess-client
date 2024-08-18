import styles from "./form.module.css"
import check from "../../assets/check.png"
import error from "../../assets/error.png"
import show from "../../assets/show.png"
import hide from "../../assets/hide.png"

import { useState } from "react"

export default function Form(
  {
    htmlFor, labelText,
    isValid, onChangeHandler,
    type, input, minSymbolCount
  }
) {
  const [inputType, setInputType] = useState(type)
  const [isInFocus, setIsInFocus] = useState(false)

  function tooglePassword() {
    setInputType(inputType === "text" ? "password" : "text")
  }

  return (
    <form>
      <section>
        {labelText}
        <label htmlFor={htmlFor}>
          <img
            alt="check"
            src={check}
            className={isValid ? styles.valid : styles.hide}
            width={24}
            height={24}
          />
          <img
            alt="error"
            src={error}
            className={isValid || !input ? styles.hide : styles.valid}
            width={24}
            height={24}
          />
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={inputType}
            id={htmlFor}
            autoComplete="off"
            onChange={
              (e) => {
                onChangeHandler(e.target.value)
              }
            }
            required
            aria-invalid={isValid ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={
              () => setIsInFocus(true)
            }
            onBlur={
              () => setIsInFocus(false)
            }
          />
          {type === "password" ?
            <img
              alt={inputType === "text" ? "Hide" : "Show"}
              src={inputType === "text" ? hide : show}
              onClick={tooglePassword}
              width={24}
              height={24}
              className={styles.togglePassword}
            />
            : null
          }
        </div>
      </section>
      <p
        id="uidnote"
        className={
          isInFocus && input && !isValid ?
            styles.instructions : styles.hide
        }
      >
        {minSymbolCount} to 30 characters.<br />
        Any numbers or letters.<br />
        Whitespaces and special symbols are not allowed.<br />
      </p>
    </form>
  )
}