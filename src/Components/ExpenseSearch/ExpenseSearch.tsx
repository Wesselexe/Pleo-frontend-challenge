import React from "react";

class ExpenseSearch extends React.Component {
    componentDidMount() {
        fetch("http://localhost:3000/expenses?limit=5")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result) // obejct
                console.log(typeof result.expenses)
                this.setState({items: result.expenses[0].amount.value})
                this.setState({arrayOfExpenses: result.expenses})
                let output = 0
                result.expenses.map((it:any) => {
                    return output += Number(it.amount.value)
                })
                this.setState({items: output})
            }
        ) 
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default ExpenseSearch;