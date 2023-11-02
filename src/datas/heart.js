const fee_ranges = [
    { "min": 50, "max": 3000, "fee": 50 },
    { "min": 3001, "max": 4000, "fee": 60 },
    { "min": 4001, "max": 5000, "fee": 75 },
    { "min": 5001, "max": 6000, "fee": 90 },
    { "min": 6001, "max": 7000, "fee": 105 },
    { "min": 7001, "max": 8000, "fee": 120 },
    { "min": 8001, "max": 10000, "fee": 150 },
    { "min": 10001, "max": 20000, "fee": 300 },
    { "min": 20001, "max": 25000, "fee": 375 },
    { "min": 25001, "max": 40000, "fee": 600 },
    { "min": 40001, "max": 50000, "fee": 750 },
    { "min": 50001, "max": 60000, "fee": 900 },
    { "min": 60001, "max": 75000, "fee": 1125 },
    { "min": 75001, "max": 90000, "fee": 1350 },
    { "min": 90001, "max": 100000, "fee": 1500 },
    { "min": 100001, "max": 150000, "fee": 2250 },
    { "min": 150001, "max": 200000, "fee": 3000 },
    { "min": 200001, "max": 233000, "fee": 3495 },
    { "min": 233001, "max": 500000, "fee": 3500 }
];

function findInterval(X) {
    switch(true) {
        case X<fee_ranges[0].min:
            return -1;
        case X>fee_ranges[fee_ranges.length - 1].max:
            return -2;
        case X>=fee_ranges[0].min && X<=fee_ranges[fee_ranges.length - 1].max:
            let left = 0;
            let right = fee_ranges.length - 1;
        
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
        
                if (X >= fee_ranges[mid].min && X <= fee_ranges[mid].max) {
                    return mid;
                } else if (X < fee_ranges[mid].min) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        default:
            return -3;
    }
}

function findMinInterval(X) {
    for (let i = 0; i < fee_ranges.length; i++) {
        if (X / fee_ranges[i].max < 5) {
            return i;
        }
    }
    return -1; // Aucun intervalle trouvé
}

function sumCost(path) {
    let sum = 0;

    for (let i = 0; i < path.length; i++) {
        if (path[i] && path[i].amount !== undefined) {
            sum += path[i].amount;
        }
    }

    return sum;
}

function sumFee(path) {
    let sum = 0;

    for (let i = 0; i < path.length; i++) {
        if (path[i] && path[i].index !== undefined) {
            sum += fee_ranges[path[i].index].fee;
        }
    }

    return sum;
}

function removeDuplicates(arr) {
    if(arr.length != 0) {
        const seen = new Set();
        const costSeen = new Set();
        const result =  arr.filter((item, index, self) => {
            const stringified = JSON.stringify(item);
            const totalFees = sumFee(item);
            if (seen.has(stringified) || costSeen.has(totalFees)) {
                return false; // Élément déjà vu, exclu du résultat
            }
            seen.add(stringified);
            costSeen.add(totalFees)
            return true;
        });
    
        return result.sort((a, b) => sumFee(a) - sumFee(b));
    }
    return arr;
}

function findSingletonPaths(X) {
    if (X > 10000) {
        const paths = [];
        const value = X;
        const minIntervalIndex = findMinInterval(X);
        
        function find(X, action, path) {
            //console.log(action);
            if (X == 0) {
                paths.push(path);
            } else {
                for (let i = action.index - 1; i >= 0; i--) {
                    if (X > 0 && fee_ranges[i].min <= X) {
                        let remaining = 0;
                        let amount = 0;
                        if (X >= fee_ranges[i].max) {
                            remaining = X - fee_ranges[i].max;
                            amount = fee_ranges[i].max;
                        } else {
                            remaining = X - X;
                            amount = X;
                        }
                        let newAction = {index: i, amount: amount};
                        path.push(newAction);
                        //console.log("Remaining : ", remaining)
                        find(remaining, newAction, path);
                        // Revert back for the next iteration
                        X -= sumCost(path);
                    }
                }
            }
            
        }
    
        for (let i = findInterval(X) - 1; i >= minIntervalIndex + 1; i--) {
            const action = { index: i, amount: fee_ranges[i].max };
            let path = [];
            path.push(action);
            find(X - fee_ranges[i].max, action, path);
            //console.log("Fin de la combinaison " , i , "\n");
        } 
        
        for (let i = findInterval(X) - 1; i >= minIntervalIndex; i--) {
            const reste = value%fee_ranges[i].max;
            const quotient = parseInt(value/fee_ranges[i].max);
            let path = [];
            for(let j = quotient; j > 0; j--) {
                let newAction = {index: i, amount: fee_ranges[i].max};
                path.push(newAction);
            }
            if(reste > 0) {
                let newAction = {index: findInterval(reste), amount: reste};
                path.push(newAction);
            }
            const action = { index: i, amount: fee_ranges[i].max };
            const totalAmount = sumCost(path);
            find(X - totalAmount, action, path);
            //console.log("Fin de la combinaison " , i , "\n");
        }
        
        //TODO : Gérer le cas i == minInterval Index
    
        return removeDuplicates(paths);
    } else {
        return [];
        /*if(X>=50)
            return "Faites le retrait de " + X + " directement et paye " + fee_ranges[findInterval(X)].fee;
        else
            return "Désolé votre opérateur n'accepte pas de retrait de " + X;*/
    }
    
}


// Montant à retirer
const X = 35000;
let paths = [];
let pathHeader = [];
let erreur = "";
switch(findInterval(X)) {
    case -1 :
        erreur = "Désolé votre opérateur n'accepte pas le retrait de " + X;
    break;
    case -3 :
        erreur = "Montant invalide";
    break;
    case -2 :
        const lastIntervalIndex = fee_ranges.length-1;
        const reste = X%fee_ranges[lastIntervalIndex].max;
        const quotient = parseInt(X/fee_ranges[lastIntervalIndex].max);
        for(let j = quotient; j > 0; j--) {
            let newAction = {index: lastIntervalIndex, amount: fee_ranges[lastIntervalIndex].max};
            pathHeader.push(newAction);
        }
        if(reste > 0) {
            paths = findSingletonPaths(reste);
        }
    break;
    default:
        paths = findSingletonPaths(X);
    break;
}

console.log(paths);
console.log(pathHeader);


