'use client';

import Button from '@/components/Button';
import GameBoard from '@/components/GameBoard';
import Select from '@/components/Select';
import StatisticBoard from '@/components/StatisticBoard';
import CircleIcon from '@/icons/CircleIcon';
import CrossIcon from '@/icons/CrossIcon';
import { BTN_TYPES, DIFFICULTIES } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { BoardState, INITIAL_BOARD_STATE, boardState } from '@/recoil/board-state';
import { GameState, INITIAL_GAME_STATE, gameState } from '@/recoil/game-state';
import { Box, Container, Fade, MenuItem, SelectChangeEvent, Stack } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';

const GameScreen = () => {
    const [game, setGame] = useRecoilState<GameState>(gameState);
    const setBoard = useSetRecoilState<BoardState>(boardState);

    const changePlayer = () => {
        setGame(INITIAL_GAME_STATE);
        setBoard(INITIAL_BOARD_STATE);
    };

    const handleDifficultyChange = (e: SelectChangeEvent<string>) => {
        let value = e.target.value;
        setGame((prev) => ({
            ...prev,
            difficulty: value,
        }));
    };

    return (
        <Fade in={game.started}>
            <Container className="absolute flex h-full max-w-[430px] flex-col justify-center p-8">
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <CrossIcon className="h-8 w-8" />
                        <CircleIcon className="h-8 w-8" />
                    </Stack>
                    <Select
                        value={game.difficulty}
                        onChange={handleDifficultyChange}
                        defaultValue={DIFFICULTIES.easy}>
                        {Object.values(DIFFICULTIES).map((difficulty) => (
                            <MenuItem key={difficulty} value={difficulty}>
                                {capitalizeFirstLetter(difficulty)}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Box className="my-8 -mr-4 ">
                    <GameBoard />
                    <StatisticBoard />
                </Box>
                <Button variant={BTN_TYPES.grey} onClick={changePlayer}>
                    Change Player
                </Button>
            </Container>
        </Fade>
    );
};

export default GameScreen;
