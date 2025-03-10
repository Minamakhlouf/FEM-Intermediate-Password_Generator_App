import styles from "./Form.module.css"
import { useState } from "react"
import Checkbox from "./Checkbox"
import PasswordStrength from "./PasswordStrength"

export default function Form({handlePasswordChange}) {
    const [sliderValue, setSliderValue] = useState(6)
    const [categories, setCategories] = useState(4); 

    let errorMsg = ""

    if (categories === 0) {
        errorMsg = "Add more checkboxes"
    } else if (sliderValue < categories) {
        errorMsg = "Increase character length"; 
    }

    const handleChange = (e) => {
        setSliderValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (categories === 0 || categories > sliderValue) {
            return
        }
        let characterObject = {
            lowercase: "abcdefghijklmnopqrstuvwxyz", 
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
            symbols: "!@#$%^&*()_+-=[]{}|;:.<>?/",
            numbers: "0123456789"
        }
        let characterCategories = ["uppercase", "lowercase", "symbols", "numbers"]
        let formData = new FormData(e.target); 
        let characters = Number(formData.get("characters")); 
        let formDataObject = Object.fromEntries(formData.entries()); 
        let filteredCategories = characterCategories.filter(category => formDataObject.hasOwnProperty(category))
        let indexArray = []; 
        let outputArray = []; 
        for (let i = 0; i < characters; i++) {
            indexArray[i] = i; 
            outputArray[i] = null; 
        }
        filteredCategories.forEach(category => {
            let randomCharacter = characterObject[category][Math.floor(Math.random() * characterObject[category].length)]
            let randomIndex = Math.floor(Math.random() * indexArray.length); 
            outputArray[randomIndex] = randomCharacter; 
            indexArray.splice(randomIndex, 1)
        })
        for (let i = 0; i < outputArray.length; i++) {
            if (outputArray[i] === null) {
                let category = filteredCategories[Math.floor(Math.random() * filteredCategories.length)]
                let randomCharacter = characterObject[category][Math.floor(Math.random() * characterObject[category].length)]
                outputArray[i] = randomCharacter; 
            }
        }
        handlePasswordChange(outputArray.join(""))
    }

    const handleCategories = (change) => {
        if (change) {
            setCategories(prev => {
                return prev - 1
            })
        } else {
            setCategories(prev => {
                return prev + 1; 
            })
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles["character-flex"]}>
                <span>Character Length</span>
                <span>{sliderValue}</span>
            </div>
            <div className={styles['slider-container']}>
                <input type="range" min="1" max="20" step="1" value={sliderValue} onChange={handleChange} name="characters" aria-label="Select password length"/>
                <div className={styles.slider}>
                    <div className={styles["circle-container"]}>
                        <div className={styles.circle} style={{left: `${((sliderValue - 1) / 19) * 100}%` }}></div>
                    </div>
                    <div className={styles.progress} style={{width: `${((sliderValue - 1) / 19) * 100}%`}}></div>
                </div>
            </div>
            <div className={styles["checkbox-container"]}>
                <Checkbox inputName={"uppercase"} labelText={"Include Uppercase Letters"} handleCategories={handleCategories}/>
                <Checkbox inputName={"lowercase"} labelText={"Include Lowercase Letters"} handleCategories={handleCategories}/>
                <Checkbox inputName={"numbers"} labelText={"Include Numbers"} handleCategories={handleCategories}/>
                <Checkbox inputName={"symbols"} labelText={"Include Symbols"} handleCategories={handleCategories}/>
            </div>
            <PasswordStrength sliderValue={sliderValue} categories={categories}/>
            <button className={`${styles.button} ${errorMsg ? styles.error : ""}`}>
                {
                    errorMsg ? errorMsg : <div>Generate <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"/></svg></div>
                }
            </button>
        </form>
    )
}