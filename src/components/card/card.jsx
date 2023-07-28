import { forwardRef, useContext } from 'react';
import { AppContext } from '../../app';
import styles from './card.module.scss';

export const Card = forwardRef(({item}, ref) => {
    const {setCurrentItem} = useContext(AppContext);

    return <button ref={ref} className={styles.card} data-item={item.id} onClick={()=>setCurrentItem(item)}>
        <img src={item.image} className={styles.cardImg} alt='character-img'/>
        <h3 className={styles.cardTitle}>{item.name}</h3>
    </button>
})