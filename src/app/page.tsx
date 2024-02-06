'use client';

import StatusModal from '@/components/StatusModal';
import GameScreen from '@/screens/GameScreen';
import PlayerScreen from '@/screens/PlayerScreen';

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center">
            <PlayerScreen />
            <GameScreen />
            <StatusModal />
        </main>
    );
}
