import styles from "./Checkbox.module.css"; 
import { useState } from "react";

export default function Checkbox({inputName, labelText, handleCategories}) {
    const [isChecked, setIsChecked] = useState(true)

    const checkboxHandler = (e) => {
        handleCategories(isChecked)
        setIsChecked((prevValue) => {
            return !prevValue
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles["check-symbol"]}>
                <input id={inputName} type="checkbox" name={inputName} onChange={checkboxHandler} checked={isChecked} value="true"/>
                <span>{isChecked ? <img src="/icon-check.svg" alt=""/> : ""}</span>
            </div>
            <label htmlFor={inputName}>{labelText}</label>
        </div>
    )
}