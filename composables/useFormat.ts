export const useFormat = () => {
    const toQuantity = (value = 0) => {
        return value.toLocaleString("th-TH", { minimumFractionDigits: 2 });
    };

    const toCurrency = (value = 0) => {
        return Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(value);
    };

    return {
        toQuantity,
        toCurrency,
    };
};
