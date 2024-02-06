export const isNullOrEmpty = (value: string): boolean => {
    return value === null || value === '' || value === ' ';
};

export const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
