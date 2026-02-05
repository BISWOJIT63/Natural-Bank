export const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const generateCardNumber = (type) => {
    const prefix = type === 'debit' ? '4532' : '5412';
    return `${prefix} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
};

export const generateCVV = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};

export const generateExpiry = () => {
    const year = new Date().getFullYear() + 5;
    const month = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
    return `${month}/${String(year).slice(2)}`;
};
