import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
interface propss {
    children: React.ReactNode
}
const QueryProvider: React.FC<propss> = ({ children }) => {
    const [queryClient] = useState(()=> new QueryClient());
    return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
    )
}

export default QueryProvider
