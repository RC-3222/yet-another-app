import styles from './button.module.scss'

export const Button = ({ variant, onClick, children }) => {
    return <button
        className={`${styles.button} ${variant === 'secondary' ? styles.button_secondary : styles.button_primary}`}
        onClick={onClick}>{children}</button>
}