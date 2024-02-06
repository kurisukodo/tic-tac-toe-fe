'use client';

import { Select as MUISelect, SelectProps } from '@mui/material';
import { PropsWithChildren } from 'react';

const SELECT_MUI_STYLES = {
    '& .MuiSvgIcon-root': {
        color: '#A6BEC6',
        right: 10,
    },
    '& .MuiSelect-select': {
        padding: '10px 32px 10px 20px !important',
    },
    '&:before, &:after': {
        all: 'unset',
    },
};

const SELECT_MUI_MENU_STYLES = {
    sx: {
        '& .MuiMenu-paper': {
            borderRadius: '0.75rem',
            backgroundColor: '#1F3540',
            color: '#A6BEC6',
            textTransform: 'uppercase',
        },
        '& .MuiMenuItem-root': {
            fontSize: '0.875rem',
            paddingTop: 1.5,
            paddingBottom: 1.5,
            '&.Mui-selected': {
                backgroundColor: '#10212a',
            },
            '&:hover': {
                backgroundColor: '#10212a',
            },
        },
    },
};

const Select = <T extends any>({ children, ...rest }: PropsWithChildren<SelectProps<T>>) => {
    return (
        <MUISelect
            displayEmpty
            variant="standard"
            className="text-semibold w-[130px] rounded-xl bg-[#1F3540] text-sm uppercase !text-[#A6BEC6] shadow-[0_6px_0_0_rgb(16,33,42)]"
            sx={SELECT_MUI_STYLES}
            MenuProps={SELECT_MUI_MENU_STYLES}
            {...rest}>
            {children}
        </MUISelect>
    );
};

export default Select;
