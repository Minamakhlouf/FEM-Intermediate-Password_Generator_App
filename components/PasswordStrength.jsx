import styles from "./PasswordStrength.module.css"

export default function PasswordStrength({sliderValue, categories}) {
    let strengthArray = ["", "", "", ""]
    let message = ""
    let score = 0; 
    score += categories; 
    if (sliderValue >= 8) {score += 1}
    if (sliderValue >= 12) {score += 2}
    if (sliderValue >= 16) {score += 3}

    if (sliderValue === 0 || categories === 0 || categories > sliderValue) {
        message = ""
    } else if (score <= 2) {
        message = "TOO WEAK!"; 
        strengthArray = ["#F64A4A", "", "", ""]
    } else if (score <= 4) {
        message = "WEAK"; 
        strengthArray = ["#FB7C58", "#FB7C58", "", ""]
    } else if (score <= 6) {
        message = "MEDIUM"
        strengthArray = ["#F8CD65", "#F8CD65", "#F8CD65", ""]
    } else if (score >= 7) {
        message = "STRONG"
        strengthArray = ["#A4FFAF", "#A4FFAF", "#A4FFAF", "#A4FFAF"]
    }

    return (
        <div class={styles.container}>
            <div className={styles.category}>STRENGTH</div>
            <div className={styles["result-flex"]}>
                <p className={styles.value} aria-live="polite">{message}</p>
                <div className={styles["bar-flex"]}>
                    {strengthArray.map((bar, index) => <div key={index} class={styles.bar} style={{backgroundColor: `${bar}`, border: `${bar === "" ? "1px solid white" : `1px solid ${bar}`}`}}></div>)}
                </div>
            </div>
        </div>
    )
}