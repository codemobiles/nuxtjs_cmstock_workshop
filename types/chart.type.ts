export type ChartDataProp = {
    labels: string[];
    data: number[];
    backgroundColor: string[];
};

export type ChartOptionsProp = {
    responsive: boolean;
    plugins: {
        legend: {
            position: string;
            display: boolean;
        };
        title: {
            display: boolean;
            text: string;
        };
    };
};
