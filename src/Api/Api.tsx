const endpoint:string = "http://localhost:3000/expenses";

// function to GET expenses from the API
const fetchExpenses = (limit?:string, offset?:string):any => {
    return fetch(endpoint)
    .then(response => response.json())
    .then((result) => {
        if (result) {
            return result
        }
    })
}

// Function to add a comment
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

// Function to upload receipt
const addReceipt = (id:string, file:any) => {
    let data = new FormData()
    data.append('receipt', file)
    return fetch((endpoint + "/" + id + "/receipts"), {
        method: 'POST',
        body: data
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

export { fetchExpenses, addComment, addReceipt};
