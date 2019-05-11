import { Expense, Response } from './Types'

const endpoint: string = "http://localhost:3000/expenses";

// function to GET expenses from the API

/*
It would be nice here to add the correct types, this is where the data comes into your app.
You can use json2ts.com to convert the API response to a TS interface.
*/



// Now `fetch` returns a promise of `Response`
export const fetchExpenses = (numPage:number): Promise<Response> => {
    return fetch(endpoint+ "?limit=25&offset=" + (25 * numPage))
        .then(response => response.json())
        .then((result) => {
            if (result) {
                result.expenses.forEach((it:Expense) => {
                    if (it.receipts.length > 0) {  
                        it.receipts = it.receipts.map(iter => {
                            return "http://localhost:3000" + iter.url
                        })
                    }
                })
                return result
            }
        })
}

// function to GET all expenses from the API
export const fetchAll = async (numPages: number) => {
    let midleResult: any[] = [];
    // Don't fetch too much data for nothing, fetch enough data to fill up the screen, then
    // watch the scroll position and make an "infinite scroll" or add a simple pagination
    for (let i = 0; i <= numPages; i++) {
        await fetch(endpoint + "?limit=10&offset=" + (25 * i))
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
export const addComment = (id: string, comment: string): Promise<Expense> => {
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
export const addReceipt = async (id: string, file: any): Promise<Expense> => {
    let data = new FormData()
    data.append('receipt', file)
    return fetch((endpoint + "/" + id + "/receipts"), {
            method: 'POST',
            body: data
        }).then(res => res.json())
        .catch(error => console.error('Error:', error));
}
