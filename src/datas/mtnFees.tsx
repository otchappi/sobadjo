type fee = {
    id: number;
    min: number;
    max: number;
    fee: number;
};

const MTNFeeRanges : fee[] = [
    { id: 1, min: 100, max: 2500, fee: 50 },
    { id: 2, min: 2501, max: 3000, fee: 60 },
    { id: 3, min: 3001, max: 4000, fee: 80 },
    { id: 4, min: 4001, max: 5000, fee: 100 },
    { id: 5, min: 5001, max: 6000, fee: 120 },
    { id: 6, min: 6001, max: 7000, fee: 140 },
    { id: 7, min: 7001, max: 8000, fee: 160 },
    { id: 8, min: 8001, max: 9000, fee: 180 },
    { id: 9, min: 9001, max: 10000, fee: 200 },
    { id: 10, min: 10001, max: 20000, fee: 400 },
    { id: 11, min: 20001, max: 25000, fee: 500 },
    { id: 12, min: 25001, max: 40000, fee: 800 },
    { id: 13, min: 40001, max: 50000, fee: 1000 },
    { id: 14, min: 50001, max: 60000, fee: 1200 },
    { id: 15, min: 60001, max: 75000, fee: 1500 },
    { id: 16, min: 75001, max: 90000, fee: 1800 },
    { id: 17, min: 90001, max: 100000, fee: 2000 },
    { id: 18, min: 100001, max: 150000, fee: 3000 },
    { id: 19, min: 150001, max: 175000, fee: 3500 },
    { id: 20, min: 175001, max: 200000, fee: 4000 },
    { id: 21, min: 200001, max: 233000, fee: 4660 },
    { id: 22, min: 233001, max: 500000, fee: 3500 }
];

export default MTNFeeRanges;