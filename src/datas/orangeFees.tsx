type fee = {
    id: number;
    min: number;
    max: number;
    fee: number;
};

const OrangeFeeRanges : fee[] = [
    { id: 1, min: 50, max: 3000, fee: 50 },
    { id: 2, min: 3001, max: 4000, fee: 60 },
    { id: 3, min: 4001, max: 5000, fee: 75 },
    { id: 4, min: 5001, max: 6000, fee: 90 },
    { id: 5, min: 6001, max: 7000, fee: 105 },
    { id: 6, min: 7001, max: 8000, fee: 120 },
    { id: 7, min: 8001, max: 10000, fee: 150 },
    { id: 8, min: 10001, max: 20000, fee: 300 },
    { id: 9, min: 20001, max: 25000, fee: 375 },
    { id: 10, min: 25001, max: 40000, fee: 600 },
    { id: 11, min: 40001, max: 50000, fee: 750 },
    { id: 12, min: 50001, max: 60000, fee: 900 },
    { id: 13, min: 60001, max: 75000, fee: 1125 },
    { id: 14, min: 75001, max: 90000, fee: 1350 },
    { id: 15, min: 90001, max: 100000, fee: 1500 },
    { id: 16, min: 100001, max: 150000, fee: 2250 },
    { id: 17, min: 150001, max: 200000, fee: 3000 },
    { id: 18, min: 200001, max: 233000, fee: 3495 },
    { id: 19, min: 233001, max: 500000, fee: 3500 }
];

export default OrangeFeeRanges;