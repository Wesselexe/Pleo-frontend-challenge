const endpoint:string = "http://localhost:3000/expenses?limit=50";

const fetchExpenses = (limit?:string, offset?:string):any => {
    return fetch(endpoint)
    .then(response => response.json())
    .then((result) => {
        if (result.expenses) {
            console.log(result.expenses)
            console.log(result.expenses[0].id)
            return result.expenses
        }
    })
}

export default fetchExpenses;