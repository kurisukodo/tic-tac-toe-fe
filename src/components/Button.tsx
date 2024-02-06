'use client';

import { BTN_TYPES } from '@/lib/constants';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { ReactNode } from 'react';

const BTN_COMMON = {
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    padding: '12px 22px',
    color: '#2A3F49',
};

const BTN_TEAL = {
    ...BTN_COMMON,
    backgroundColor: '#30C4C0 !important',
    boxShadow: '0px 6px 0px 0px rgba(20,138,133,0.75)',
    '&:disabled': {
        backgroundColor: '#148A85 !important',
    },
    '&:hover': {
        boxShadow: '0px 6px 0px 0px rgba(20,138,133,0.75)',
    },
};

const BTN_YELLOW = {
    ...BTN_COMMON,
    backgroundColor: '#F1B135 !important',
    boxShadow: '0px 6px 0px 0px rgb(195,147,45)',
    '&:disabled': {
        backgroundColor: '#F1B135 !important',
    },
    '&:hover': {
        boxShadow: '0px 6px 0px 0px rgb(195,147,45)',
    },
};

const BTN_GREY = {
    ...BTN_COMMON,
    backgroundColor: '#A9BEC7 !important',
    boxShadow: '0px 6px 0px 0px rgba(106,132,142,0.75)',
    '&:disabled': {
        backgroundColor: '#6A848E !important',
    },
    '&:hover': {
        boxShadow: '0px 6px 0px 0px rgba(106,132,142,0.75)',
    },
};

type ButtonProps = {
    variant: string;
    children: ReactNode;
} & Pick<MUIButtonProps, Exclude<keyof MUIButtonProps, 'variant'>>;

const Button = ({ variant, children, ...rest }: ButtonProps) => {
    const getButtonStyle = () => {
        if (variant === BTN_TYPES.teal) {
            return BTN_TEAL;
        }

        if (variant === BTN_TYPES.yellow) {
            return BTN_YELLOW;
        }

        return BTN_GREY;
    };

    return (
        <MUIButton
            fullWidth
            variant="contained"
            size="large"
            className="!mt-10"
            sx={getButtonStyle()}
            {...rest}>
            {children}
        </MUIButton>
    );
};

export default Button;
