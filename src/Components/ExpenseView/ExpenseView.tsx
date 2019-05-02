import React from "react";

class ExpenseView extends React.Component {
    state = {
        items: 0,
        arrayOfExpenses: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/expenses?limit=5")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result) // obejct
                console.log(typeof result.expenses)
                this.setState({items: result.expenses[0].amount.value})
                this.setState({items: result.expenses[0].amount.value})
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
            <div className="expense-box">
                <p>{this.state.items}</p>
                <div className="expense-text">
                    array.forEach(element => {
                        
                    });
                </div>
                <div className="receipts-box"></div>
            </div>
        )
    }
}

export default ExpenseView;