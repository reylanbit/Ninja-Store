export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const calculateDiscount = (price, discountPercentage) => {
    return price * (1 - discountPercentage / 100);
};
