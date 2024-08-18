import { useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./authorization.module.css"
import Form from "../../components/form/Form"
import Button from "../../components/button/Button.jsx"

import api from "../../api/api.js"

// any numbers or letters, min length - 4, max length - 30
const nameValidator = /^[a-zA-Z0-9]{4,30}$/
// any numbers or letters, min length - 8, max length - 30
const pswdValidator = /^[a-zA-Z0-9]{8,30}$/

export default function Authorization() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [password, setPassword] = useState("")
  const [isValidName, setIsValidName] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)

  function nameChangeHandler(name) {
    setName(name)
    setIsValidName(nameValidator.test(name))
  }

  function passwordChangeHandler(password) {
    setPassword(password)
    setIsValidPassword(pswdValidator.test(password))
  }

  async function handleSignIn() {
    if (!isValidName || !isValidPassword) {
      setErrMsg("Invalid name or password")
      return
    }

    const resBody = await api.signIn(name, password)

    if (typeof resBody === "string") {
      setErrMsg(resBody)
    } else {
      // navigate user to the homepage
      navigate("/")
    }
  }

  async function handleSignUp() {
    if (!isValidName || !isValidPassword) {
      setErrMsg("Invalid name or password")
      return
    }

    const resBody = await api.signUp(name, password)

    if (typeof resBody === "string") {
      setErrMsg(resBody)
    } else {
      // navigate user to the homepage
      navigate("/")
    }
  }

  return (
    <div className={styles.contentContainer}>
      <h1>
        Authorization
      </h1>
      <Form
        htmlFor="name"
        labelText="Username:"
        isValid={isValidName}
        onChangeHandler={nameChangeHandler}
        type="text"
        input={name}
        minSymbolCount={4}
      />
      <Form
        htmlFor="password"
        labelText="Password:"
        isValid={isValidPassword}
        onChangeHandler={passwordChangeHandler}
        type="password"
        input={password}
        minSymbolCount={8}
      />
      <p
        className={errMsg ? styles.errorMessage : styles.hide}
      >
        {errMsg}
      </p>
      <Button
        onClickHandler={handleSignIn}
        text="Sign in"
      />
      <Button
        onClickHandler={handleSignUp}
        text="Sign up"
      />
    </div >
  )
}