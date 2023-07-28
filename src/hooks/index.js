import { useEffect } from "react"

export const useNoScroll = (condition) => {
    useEffect(() => {
        document.body.style.overflowY = condition ? "hidden" : "visible";
    }, [condition]);
};