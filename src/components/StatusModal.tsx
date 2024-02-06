'use client';

import Button from '@/components/Button';
import CircleIcon from '@/icons/CircleIcon';
import CrossIcon from '@/icons/CrossIcon';
import { BTN_TYPES, GAME_STATUS } from '@/lib/constants';
import { BoardState, INITIAL_BOARD_STATE, boardState } from '@/recoil/board-state';
import { GameState, gameState } from '@/recoil/game-state';
import { Box, Modal, Stack } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';

const StatusModal = () => {
    const [game, setGame] = useRecoilState<GameState>(gameState);
    const setBoard = useSetRecoilState<BoardState>(boardState);

    const resetGame = () => {
        setGame((prev) => ({
            ...prev,
            status: GAME_STATUS.idle,
        }));
        setBoard(INITIAL_BOARD_STATE);
    };

    const getPopupColour = () => {
        if (game.status === GAME_STATUS.won) {
            return 'text-[#30C4C0]';
        }

        if (game.status === GAME_STATUS.lost) {
            return 'text-[#F1B135]';
        }

        return 'text-[#A9BEC7]';
    };

    const getPopupText = () => {
        if (game.status === GAME_STATUS.won) {
            return 'You won!';
        }

        if (game.status === GAME_STATUS.lost) {
            return 'You lost :(';
        }

        return GAME_STATUS.drawn;
    };

    const getPopupDesc = () => {
        return (
            <>
                {game.status === GAME_STATUS.won && <CrossIcon className="w-10" />}
                {game.status === GAME_STATUS.lost && <CircleIcon className="w-10" />}
                <div
                    className={`text-md text-center font-semibold uppercase tracking-wider lg:text-2xl ${getPopupColour()}`}>
                    {game.status === GAME_STATUS.drawn && 'nobody '}takes the round
                </div>
            </>
        );
    };

    return (
        <Modal className="flex flex-col justify-center" open={game.status !== GAME_STATUS.idle}>
            <Box className="flex flex-col items-center bg-[#1F3540] p-12">
                <div className="lg:text-md text-sm font-bold uppercase tracking-wider text-[#8CA4AE]">
                    {getPopupText()}
                </div>
                <Stack
                    className="my-4"
                    direction="row"
                    spacing={2}
                    justifyItems="center"
                    alignItems="center">
                    {getPopupDesc()}
                </Stack>
                <Stack
                    className="mb-4 mt-2"
                    direction="row"
                    spacing={2}
                    justifyItems="center"
                    alignItems="center">
                    <Button variant={BTN_TYPES.yellow} onClick={resetGame}>
                        Next Round
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default StatusModal;
