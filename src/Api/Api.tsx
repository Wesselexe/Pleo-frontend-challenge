const endpoint:string = "http://localhost:3000/expenses";

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

const addComment = (id:string, comment:string) => {
    return fetch((endpoint + "/" + id), {
        method: 'POST',
        body: JSON.stringify({
            comment: comment
        }),
        headers:{
            'Content-Type': 'application/json'
          }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

export { fetchExpenses, addComment };
