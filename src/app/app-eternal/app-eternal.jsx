import { useCallback, useEffect, useRef, useState } from "react"

import { Card } from "../../components/card";
import { Loader } from "../../components/common/loader";

import styles from './app-eternal.module.scss'

export const AppEternal = () => {
    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const lastItemRef = useRef();
    
    const loadMoreItems = useCallback(async () => {
        if (data?.items?.length > 0 && !data?.next) return;

        setIsLoading(true);

        try {
            const resp = await fetch((data?.items?.length > 0 ? data?.next : `https://rickandmortyapi.com/api/character`));

            const dat = await resp.json();
            
            //console.log('loading')
            setData((currData)=>{
                return {
                    next:dat?.info?.next,
                    items:!currData?.items ? dat?.results : [...currData.items, ...dat?.results]
            }});
            

        } catch (err) {
            console.error(err);
        }

        setIsLoading(false)
    }, [setData, data])

    useEffect(()=>{
        const options = {
            root: null,
            rootMargin: '15px',
            threshold: 0.1
        }
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry?.target);
                    loadMoreItems()
                }
            })
        }, options)
        
        if (lastItemRef.current) observer.observe(lastItemRef.current)
    }, [lastItemRef, loadMoreItems])

    useEffect(()=>{loadMoreItems()}, [])

    return <>
        {data?.items?.length > 0 && <div className={styles.cardGrid}>
        {data?.items?.map((item, index, arr)=>{
            if (index === arr.length - 1) {
                //console.log(item.name)
                return <Card key={item.id} item={item} ref={lastItemRef} />
            } else {
                return <Card key={item.id} item={item} />
            }
        })}
        </div>}
        {isLoading && <Loader />}
    </>
} 

