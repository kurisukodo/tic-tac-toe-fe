'use client';

import axiosClient, { ApiResponse } from '@/lib/axios';
import { GAME_STATUS } from '@/lib/constants';
import { GameState, gameState } from '@/recoil/game-state';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import StatisticBoardItem from './StatisticBoardItem';

type StatisticData = {
    won: number;
    lost: number;
    drawn: number;
};

type StatisticDataDto = {
    won: number;
    lost: number;
    drawn: number;
    total: number;
};

const StatisticBoard = () => {
    const game = useRecoilValue<GameState>(gameState);
    const [statisticsData, setStatisticsData] = useState<StatisticData>({
        lost: 0,
        won: 0,
        drawn: 0,
    });

    const { data, refetch } = useQuery<ApiResponse<StatisticDataDto>>({
        queryKey: ['statistics'],
        queryFn: () =>
            axiosClient
                .get('/statistics', { headers: { 'game-email': game.email } })
                .then((res) => res.data),
        enabled: game.started,
    });

    useEffect(() => {
        if (data !== undefined) {
            setStatisticsData((prev) => ({
                ...prev,
                ...data.data,
            }));
        }
    }, [data]);

    useEffect(() => {
        if (game.status !== GAME_STATUS.idle) {
            refetch();
        }
    }, [game.status]);

    return (
        <Grid container spacing={2} className="mt-6 w-full">
            <Grid item xs={4}>
                <StatisticBoardItem type={GAME_STATUS.won}>
                    {statisticsData.won}
                </StatisticBoardItem>
            </Grid>
            <Grid item xs={4} className="aspect-square">
                <StatisticBoardItem type={GAME_STATUS.drawn}>
                    {statisticsData.drawn}
                </StatisticBoardItem>
            </Grid>
            <Grid item xs={4} className="aspect-square">
                <StatisticBoardItem type={GAME_STATUS.lost}>
                    {statisticsData.lost}
                </StatisticBoardItem>
            </Grid>
        </Grid>
    );
};

export default StatisticBoard;
