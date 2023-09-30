import { useEffect, useState, ReactNode } from 'react'

interface ErrorBountryProps {
    children: ReactNode
}

const ErrorBountry: React.FC<ErrorBountryProps> = ({ children }) => {
    const [hasError, setHasError] = useState<boolean>(false)

    useEffect(() => {
        const errorHandler = (errorEvent: ErrorEvent) => {
            console.log(errorEvent.error);
            setHasError(true)
        }
        window.addEventListener('error', errorHandler);
        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, [])

    if (hasError) {
        return <h1>Something went wrong</h1>
    }
    return children
}

export default ErrorBountry