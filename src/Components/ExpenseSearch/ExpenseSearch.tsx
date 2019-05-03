import React from "react";

class ExpenseSearch extends React.Component {
    render() {
        return (
            <div className="expense-box">
                <div className="expense-text">
                    <h1>Expense information</h1>
                </div>
                <div className="receipts-box">
                    <img className="receipt" alt="Receipt" src="https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg" />
                </div>
            </div>
        )
    }
}

export default ExpenseSearch;