import styles from './info-item.module.scss'

export const InfoItem = ({ title, content }) => <li className={styles.item}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.content}>{content}</p>
</li>
