import { useEffect, useState } from "react"

export const useIsOnline = () => {
    const [currentStatus, setStatus] = useState(navigator.onLine)

    useEffect(() => {
        const updateBrowserStatus = () => {
            setStatus(navigator.onLine)
        }

    window.addEventListener('online', updateBrowserStatus)
    window.addEventListener('offline', updateBrowserStatus)

    return () => {
        window.removeEventListener('online', updateBrowserStatus)
        window.removeEventListener('offline', updateBrowserStatus)
    }
    }, [])

    return currentStatus;
}