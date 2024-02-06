'use client';

import CircleIcon from '@/icons/CircleIcon';
import CrossIcon from '@/icons/CrossIcon';
import axiosClient from '@/lib/axios';
import { GAME_STATUS } from '@/lib/constants';
import { isNullOrEmpty } from '@/lib/utils';
import { BoardState, boardState } from '@/recoil/board-state';
import { GameState, gameState } from '@/recoil/game-state';
import { Button, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Howl } from 'howler';
import { useRecoilState } from 'recoil';

const GameBoard = () => {
    const [game, setGame] = useRecoilState<GameState>(gameState);
    const [board, setBoard] = useRecoilState<BoardState>(boardState);

    const buttonPressSound = new Howl({
        src: ['/assets/sounds/button-press.mp3'],
        volume: 0.5,
    });

    const gameplayMutation = useMutation({
        mutationFn: (data: any) =>
            axiosClient.post('/gameplays', data, {
                headers: {
                    'game-email': game.email,
                    'game-difficulty': game.difficulty,
                },
            }),
        onSuccess: (response) => {
            const data = response.data.data;
            if (data.status === GAME_STATUS.idle || data.status === GAME_STATUS.lost) {
                updateBoard(data.row, data.col, 'o');
            }

            setTimeout(
                () => {
                    setGame((prev) => ({
                        ...prev,
                        status: data.status,
                        playerTurn: true,
                    }));
                },
                data.status !== GAME_STATUS.idle ? 250 : 0
            );
        },
    });

    const handlePlayerMove = (row: number, col: number) => {
        if (!game.started || !game.playerTurn || !isNullOrEmpty(board[row][col])) {
            return;
        }

        buttonPressSound.play();

        updateBoard(row, col, 'x');
        setGame((prev) => ({
            ...prev,
            playerTurn: false,
        }));

        setTimeout(() => {
            gameplayMutation.mutate({ row, col });
        }, 300);
    };

    const updateBoard = (row: number, col: number, type: string) => {
        setBoard((prev) => {
            let newBoard = structuredClone(prev);
            newBoard[row][col] = type;

            return newBoard;
        });
    };

    return (
        <Grid container spacing={2} className="aspect-square w-full">
            {board.map((item, i) =>
                item.map((_, j) => (
                    <Grid key={`item-${i}${j}`} item xs={4} className="aspect-square">
                        <Button
                            className="h-full w-full !rounded-xl !bg-[#1F3540] !p-6 shadow-[0_6px_0_0_rgb(16,33,42)]"
                            onClick={() => handlePlayerMove(i, j)}>
                            <div
                                className={`h-full w-full transition-opacity duration-500 ${board[i][j] !== '' ? 'opacity-100' : 'opacity-0'}`}>
                                {board[i][j] === 'x' && <CrossIcon />}
                                {board[i][j] === 'o' && <CircleIcon />}
                            </div>
                        </Button>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default GameBoard;
