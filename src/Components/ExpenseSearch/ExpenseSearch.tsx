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
    render() {
        return (
            <div className="expense-box">
                <div className="expense-text">
                    <h3>information: {this.props.user.first} {this.props.user.last}</h3>
                    <h3>Amount: {this.props.amount.value} · {this.props.amount.currency} </h3>
                    <h3>Merchant: {this.props.merchant}</h3>
                </div>
                <div className="receipts-box">
                    <img className="receipt" alt="Receipt" src="https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg" />
                </div>
            </div>
        )
    }
}

export default ExpenseSearch;