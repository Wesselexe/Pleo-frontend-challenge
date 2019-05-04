import React from "react";

interface Expense {
    id:string,
    amount:Amount,
    date:string,
    merchant:string,
    receipts:[],
    comment:string,
    category:string,
    user:User,
    index:number
}

interface Amount {
    value:string,
    currency:string
}

interface User {
    first:string,
    last:string,
    email:string
}

class ExpenseSearch extends React.Component<Expense> {
    state = {
        activeExpense: false
    }
    
    expenseClick(event:React.MouseEvent):void {
        this.setState({
            activeExpense: true
        })
    }

    render() {
        return (
            <div className={this.state.activeExpense ? 'active-box': "expense-box"} onClick={this.expenseClick}>
                <div className="expense-text">
                    <h4>User: {this.props.user.first} {this.props.user.last}</h4>
                    <h4>Amount: {this.props.amount.value} · {this.props.amount.currency} </h4>
                    <h4>Merchant: {this.props.merchant}</h4>
                    <h5>Category: {this.props.category}</h5>
                    <h5>Comment: {this.props.comment} </h5>
                </div>
                <div className="receipts-box">
                    <img className="receipt" alt="Receipt" src="https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg" />
                </div>
            </div>
        )
    }
}

export default ExpenseSearch;