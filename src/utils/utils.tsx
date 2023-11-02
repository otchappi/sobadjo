import Fee from "../types/fee";
import Path from "../types/path";
import Result from "../types/result";

export function findInterval(amount:number, data: Fee[]): number {
    switch(true) {
        case amount < data[0].min:
            return -1;
        case amount > data[data.length - 1].max:
            return -2;
        case (amount >= data[0].min && amount <= data[data.length - 1].max):
            let left = 0;
            let right = data.length - 1;
        
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
        
                if (amount >= data[mid].min && amount <= data[mid].max) {
                    return mid;
                } else if (amount < data[mid].min) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        break;
        default:
            return -3;
    }
    return -3;
}

export function findMinInterval(amount:number, data: Fee[]): number {
    for (let i = 0; i < data.length; i++) {
        if (amount / data[i].max < 5) {
            return i;
        }
    }
    return -1;
}

export function sumCost(path : Path[]): number {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
        if (path[i] && path[i].amount !== undefined) {
            sum += path[i].amount;
        }
    }

    return sum;
}

export function sumFee(path : Path[], data: Fee[]): number {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
        if (path[i] && path[i].index !== undefined) {
            sum += data[path[i].index].fee;
        }
    }
    return sum;
}

export function removeDuplicates(arr: any[], data: Fee[]): any[] {
    if(arr.length != 0) {
        const seen = new Set();
        const costSeen = new Set();
        const result =  arr.filter((item) => {
            const stringified = JSON.stringify(item);
            const totalFees = sumFee(item, data);
            if (seen.has(stringified) || costSeen.has(totalFees)) {
                return false;
            }
            seen.add(stringified);
            costSeen.add(totalFees)
            return true;
        });
    
        return result.sort((a, b) => sumFee(a, data) - sumFee(b, data));
    }
    return arr;
}

export function findSingletonPaths(amount: number, data: Fee[]): any[] {
    if (amount > 10000) {
        const paths: any[] = [];
        const value: number = amount;
        const minIntervalIndex:number = findMinInterval(amount, data);
        
        function find(amount: number, action: Path, path:Path[]) {
            if (amount == 0) {
                paths.push(path);
            } else {
                for (let i = action.index - 1; i >= 0; i--) {
                    if (amount > 0 && data[i].min <= amount) {
                        let remaining: number = 0;
                        let actionAmount: number = 0;
                        if (amount >= data[i].max) {
                            remaining = amount - data[i].max;
                            actionAmount = data[i].max;
                        } else {
                            remaining = 0;
                            actionAmount = amount;
                        }
                        let newAction: Path = {index: i, amount: actionAmount};
                        path.push(newAction);
                        find(remaining, newAction, path);
                        amount -= sumCost(path);
                    }
                }
            }
            
        }
    
        for (let i = findInterval(amount, data) - 1; i >= minIntervalIndex + 1; i--) {
            const action: Path = { index: i, amount: data[i].max };
            let path = [];
            path.push(action);
            find(amount - data[i].max, action, path);
        }
        
        for (let i = findInterval(amount, data) - 1; i >= minIntervalIndex; i--) {
            const reste: number = value % data[i].max;
            const quotient: number = parseInt((value / data[i].max).toString());
            let path = [];
            for(let j = quotient; j > 0; j--) {
                let newAction = {index: i, amount: data[i].max};
                path.push(newAction);
            }
            if(reste > 0) {
                let newAction = {index: findInterval(reste, data), amount: reste};
                path.push(newAction);
            }
            const action: Path = { index: i, amount: data[i].max };
            const totalAmount: number = sumCost(path);
            find(amount - totalAmount, action, path);
        }
        
        //TODO : Gérer le cas i == minInterval Index
    
        return removeDuplicates(paths, data);
    } else {
        return [];
    }
}

export function economiser(amount: number, data: Fee[]): Result {
    let paths: any[] = [];
    const pathHeader: Path[] = [];
    let erreur: string = "";
    switch(findInterval(amount, data)) {
        case -1 :
            erreur = "Désolé votre opérateur n'accepte pas le retrait de " + amount.toLocaleString('fr-FR') + " Fcfa.";
        break;
        case -3 :
            erreur = "Le montant " + amount.toLocaleString('fr-FR') + " Fcfa est invalide";
        break;
        case -2 :
            const lastIntervalIndex: number = data.length-1;
            const reste: number = amount % data[lastIntervalIndex].max;
            const quotient: number = parseInt( (amount / data[lastIntervalIndex].max).toString());
            for(let j = quotient; j > 0; j--) {
                let newAction = {index: lastIntervalIndex, amount: data[lastIntervalIndex].max};
                pathHeader.push(newAction);
            }
            if(reste > 0) {
                paths = findSingletonPaths(reste, data);
            }
        break;
        default:
            paths = findSingletonPaths(amount, data);
        break;
    }
    return {erreur: erreur, path: paths, pathHeader: pathHeader};
}