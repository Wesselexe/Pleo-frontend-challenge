export interface Expense {
    id:string,
    amount:Amount,
    date:string,
    merchant:string,
    receipts:any[],
    comment:string,
    category:string,
    user:User,
    index:number,
    refresh:any
}

export interface Response {
    expenses: Expense[];
    total: number;
}


export interface Amount {
    value:string,
    currency:string
}

export interface User {
    first:string,
    last:string,
    email:string
}