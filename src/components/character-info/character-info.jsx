import { useContext } from "react";
import { AppContext } from "../../app";
import { createPortal } from "react-dom";

import styles from './character-info.module.scss';
import { InfoItem } from "./info-item";

export const CharacterInfo = () => {
    const { currentItem, setCurrentItem } = useContext(AppContext)

    return createPortal(<div className={styles.wrapper}>
        <div onClick={()=>setCurrentItem(null)} className={styles.backdrop}></div>
        <div className={styles.modal}>
            <img className={styles.backgroundImg} src={currentItem.image} alt="character-img" />
            <div className={styles.info}>
                <ul className={styles.list}>
                    <InfoItem title={'Name:'} content={currentItem.name}/>
                    <InfoItem title={'Origin:'} content={currentItem.origin?.name}/>
                    <InfoItem title={'Status:'} content={currentItem.status}/>
                    <InfoItem title={'Location:'} content={currentItem.location?.name}/>
                    <InfoItem title={'Species:'} content={currentItem.species}/>
                    <InfoItem title={'Gender:'} content={currentItem.gender}/>
                </ul>
            </div>
        </div>
    </div>, document.body)
}