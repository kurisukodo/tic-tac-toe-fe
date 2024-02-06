import { DIFFICULTIES } from '@/lib/constants';
import { atom } from 'recoil';

export type GameState = {
    started: boolean;
    status: string;
    email: string | null;
    difficulty: string;
    playerTurn: boolean;
};

export const INITIAL_GAME_STATE = {
    started: false,
    status: 'idle',
    email: null,
    difficulty: DIFFICULTIES.easy,
    playerTurn: true,
};

const gameState = atom<GameState>({
    key: 'gameState',
    default: INITIAL_GAME_STATE,
});

export { gameState };
