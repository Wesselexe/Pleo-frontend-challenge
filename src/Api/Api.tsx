const endpoint:string = "http://localhost:3000/expenses";

const fetchExpenses = (limit?:string, offset?:string) => {
    fetch(endpoint)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then((result) => {
        if (result.expenses) {
            console.log(result.expenses[0].index)
            console.log(result.expenses[0].id)
            return result.expenses
        }
    })
}




export default fetchExpenses;