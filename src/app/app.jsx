import styles from './app.module.scss';
import { createContext, useState } from 'react';

import { Button } from '../components/common/button';
import { CharacterInfo } from '../components/character-info';

import { useNoScroll } from '../hooks';
import { AppEternal } from './app-eternal';
import { AppPages } from './app-pages';

export const AppContext = createContext({
    currentItem: null,
    setCurrentItem:()=>{},
})


export const App = () => {
    const [currItem, setCurrItem] = useState(null);

    const [usePages, setUsePages] = useState(false);
    

    //остановка скроллинга страницы, если открыто модальное окно (для удобства)
    useNoScroll(!!currItem);

    return (<>
        <header className={styles.header}>
            <h2 className={styles.title}>Rick And Morty Wiki</h2>
            <div className={styles.controls}>
                <Button variant={'secondary'} onClick={()=>setUsePages((curr)=>!curr)}>Switch Mode</Button>
                <Button variant={'secondary'} onClick={() => window.scrollTo(0, 0)}>To Top</Button>
            </div>
        </header>
        <AppContext.Provider value={{currentItem:currItem, setCurrentItem:(val)=>setCurrItem(val)}}>
            <main className={styles.main}>
                {usePages ? <AppPages /> : <AppEternal />}
                {currItem && <CharacterInfo />}
            </main>
        </AppContext.Provider>
    </>
    );
}