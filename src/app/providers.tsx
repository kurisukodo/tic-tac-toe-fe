'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient());

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </RecoilRoot>
    );
}
