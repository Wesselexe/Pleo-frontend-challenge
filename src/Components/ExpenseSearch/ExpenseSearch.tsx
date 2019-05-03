import React from "react";

interface Expense {
    id:string,
    amount:object,
    date:string,
    merchant:string,
    receipts:[],
    comment:string,
    category:string,
    user:object,
    index:number
}

class ExpenseSearch extends React.Component<Expense> { 
    render() {
        return (
            <div className="expense-box">
                <div className="expense-text">
                    <h1>Expense information: {this.props.user}</h1>
                </div>
                <div className="receipts-box">
                    <img className="receipt" alt="Receipt" src="https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg" />
                </div>
            </div>
        )
    }
}

export default ExpenseSearch;