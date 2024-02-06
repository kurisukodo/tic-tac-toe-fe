'use client';

import Button from '@/components/Button';
import CircleIcon from '@/icons/CircleIcon';
import CrossIcon from '@/icons/CrossIcon';
import { BTN_TYPES, EMAIL_REGEX } from '@/lib/constants';
import { GameState, gameState } from '@/recoil/game-state';
import { Box, Container, Fade, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

const EMAIL_MUI_STYLES = {
    '& .MuiInputBase-root': {
        color: '#A9BDC9',
        backgroundColor: '#192A33',
        borderRadius: '0.75rem',
        '&:after': {
            borderColor: '#A9BDC9',
        },
        '&:before': {
            borderColor: '#192A33',
            borderRadius: '0.75rem',
        },
        '& .MuiInputBase-input': {
            textAlign: 'center',
        },
    },
};

const PlayerScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [game, setGame] = useRecoilState<GameState>(gameState);

    const handleStartGame = () => {
        setGame((prev) => ({
            ...prev,
            started: true,
            email,
        }));
        setEmail('');
    };

    const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let result = EMAIL_REGEX.test(value);
        setEmailError(result ? '' : 'Email is invalid.');
        setEmail(value);
    };

    const isInvalidEmail = () => {
        return emailError !== '' || email === '';
    };

    return (
        <Fade in={!game.started}>
            <Container className="absolute flex h-full max-w-[430px] flex-col justify-center p-8">
                <Stack direction="row" spacing={1} justifyContent="center">
                    <CrossIcon className="h-8 w-8" />
                    <CircleIcon className="h-8 w-8" />
                </Stack>
                <Box className="mt-8 rounded-xl bg-[#1F3540] p-6 shadow-[0_6px_0_0_rgb(16,33,42)]">
                    <div className="mb-6 text-center font-semibold uppercase text-[#8DA5AF]">
                        Enter your email
                    </div>
                    <TextField
                        hiddenLabel
                        fullWidth
                        autoFocus
                        variant="filled"
                        className="rounded-xl"
                        value={email}
                        error={emailError !== ''}
                        helperText={emailError}
                        onChange={handleEmailOnChange}
                        sx={EMAIL_MUI_STYLES}
                    />
                </Box>
                <Button
                    variant={BTN_TYPES.teal}
                    disabled={isInvalidEmail()}
                    onClick={handleStartGame}>
                    Start Game
                </Button>
            </Container>
        </Fade>
    );
};

export default PlayerScreen;
