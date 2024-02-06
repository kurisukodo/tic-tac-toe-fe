'use client';

import { GAME_STATUS } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

type StatisticBoardItemProps = {
    type: string;
    children: ReactNode;
};

const StatisticBoardItem = ({ type, children }: StatisticBoardItemProps) => {
    const getItemStyle = () => {
        if (type === GAME_STATUS.won) {
            return 'bg-[#30C4C0]';
        }

        if (type === GAME_STATUS.lost) {
            return 'bg-[#F1B135]';
        }

        return 'bg-[#A9BEC7]';
    };

    return (
        <Box className={`rounded-xl p-3 ${getItemStyle()}`}>
            <div className="mb-1 text-center text-xs font-semibold uppercase text-[#1A2B34]">
                {capitalizeFirstLetter(type)}
            </div>
            <div className="text-center text-xl font-bold text-[#1A2B34]">
                {children}
            </div>
        </Box>
    );
};

export default StatisticBoardItem;
