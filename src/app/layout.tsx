import type { Metadata } from 'next';
import { Playpen_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const playpenSans = Playpen_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Tic Tac Toe',
    description: 'A simple tic tac toe game.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={playpenSans.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
