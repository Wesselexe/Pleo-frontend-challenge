const endpoint: string = "http://localhost:3000/expenses";

// function to GET expenses from the API

/*
It would be nice here to add the correct types, this is where the data comes into your app.
You can use json2ts.com to convert the API response to a TS interface.
*/

// From json2ts
export interface Amount {
    value: string;
    currency: string;
}

export interface User {
    first: string;
    last: string;
    email: string;
}

export interface Expense {
    id: string;
    amount: Amount;
    date: Date;
    merchant: string;
    receipts: any[];
    comment: string;
    category: string;
    user: User;
    index: number;
}

export interface Response {
    expenses: Expense[];
    total: number;
}

// Now `fetch` returns a promise of `Response`
const fetchExpenses = (): Promise<Response> => {
    return fetch(endpoint)
        .then(response => response.json())
        .then((result) => {
            if (result) {
                return result
            }
        })
}

// function to GET all expenses from the API
const fetchAll = async (numPages: number) => {
    let midleResult: any[] = [];
    // Don't fetch too much data for nothing, fetch enough data to fill up the screen, then
    // watch the scroll position and make an "infinite scroll" or add a simple pagination
    for (let i = 0; i <= numPages; i++) {
        await fetch(endpoint + "?limit=25&offset=" + (25 * i))
            .then(response => response.json())
            .then((result) => {
                if (result) {
                    result.expenses.forEach((it: any): void => {
                        midleResult.push(it)
                    })
                }
            })
    }
    return midleResult
}

// Function to add a comment
// Same here, add the return type
const addComment = (id: string, comment: string): Promise<Expense> => {
    return fetch((endpoint + "/" + id), {
            method: 'POST',
            body: JSON.stringify({
                comment: comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error));
}

// Function to upload receipt
// Again return type
const addReceipt = async (id: string, file: any): Promise<Expense> => {
    let data = new FormData()
    data.append('receipt', file)
    return fetch((endpoint + "/" + id + "/receipts"), {
            method: 'POST',
            body: data
        }).then(res => res.json())
        .catch(error => console.error('Error:', error));
}

// This is not needed, instead export each function individually
// Ex: export const addReceipt = async (id: string, file: any): Promise<Expense> => {
export {
    fetchExpenses,
    addComment,
    addReceipt,
    fetchAll
};