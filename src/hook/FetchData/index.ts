import { useState, useEffect, useCallback } from "react"

interface Props {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: BodyInit;
}

const useFetchData = <T,>({url, method, body} : Props) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);

    const fetchList = useCallback(
        async () => {
            setLoading(true)
            const request = {
                method: method,
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
                ...(body && { body: body }),
            }
            const fetching = await fetch(url, request)
    
            const response = await fetching.json()
            setData(response?.results)
            setLoading(false)
    
            return response
        },
        [body, method, url]
    )

    useEffect(
        () => {
            fetchList()
        },
        [fetchList]
    )

    return {
        isLoading,
        data
    }
}

export default useFetchData