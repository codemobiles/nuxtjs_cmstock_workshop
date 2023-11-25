export const useFormRule = () => {
    return {
        rules: {
            name: [
                {
                    required: true,
                    message: "Please input name",
                },
                {
                    min: 6,
                    // max: 12,
                    message: "Length should be at least 6",
                    trigger: "blur",
                },
            ],
            price: [
                {
                    required: true,
                    message: "Please input price",
                },
            ],
            stock: [
                {
                    required: true,
                    message: "Please input amount of stock",
                },
            ],
            image: [
                {
                    required: true,
                    message: "Please select image",
                },
            ],
        },
    };
};
