import { DIFFICULTIES } from '@/lib/constants';
import { atom } from 'recoil';

export type BoardState = string[][];

export const INITIAL_BOARD_STATE: BoardState = Array.from({ length: 3 }, () => Array(3).fill(''));

const boardState = atom<BoardState>({
    key: 'boardState',
    default: INITIAL_BOARD_STATE,
});

export { boardState };
