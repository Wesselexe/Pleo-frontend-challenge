import React, { Fragment } from "react";

import { addComment } from '../../Api/Api'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


interface Expense {
    id:string,
    amount:Amount,
    date:string,
    merchant:string,
    receipts:[],
    comment:string,
    category:string,
    user:User,
    index:number,
    update:any
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
        activeExpense: false,
        commentText: ""
    }
    
    expenseClick = (event:React.MouseEvent):void => {
        this.setState({activeExpense: !this.state.activeExpense})
    }

    updateCommentText = (event:any) => {
        this.setState({commentText: event.target.value})
    }

    commentConfirm = async (event:React.MouseEvent) => {
        event.preventDefault();
        await addComment(this.props.id, this.state.commentText);
        this.props.update()
    }

    render() {
        if (this.state.activeExpense === false) {
            return (
                <div className="expense-box" onClick={this.expenseClick}>
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
        } else {
            return (
                <Fragment>
                    <div className='active-expense-box'>
                        <div className="expense-text">
                            <h4>User: {this.props.user.first} {this.props.user.last}</h4>
                            <h4>Amount: {this.props.amount.value} · {this.props.amount.currency} </h4>
                            <h4>Merchant: {this.props.merchant}</h4>
                        </div>
                        <div>
                            <h5>Category:</h5>
                            <h6>{this.props.category}</h6>
                            <Form>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><h5>Comment:</h5></Form.Label>
                                    <Form.Control type="text" defaultValue={this.props.comment} onChange={this.updateCommentText}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.commentConfirm}>
                                    Update comment
                                </Button>
                            </Form>
                        </div>
                        <div className="receipts-box">
                            <img className="receipt" alt="Receipt" src="https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg" />
                        </div>
                    </div>
                    <div>
                        <Button variant="primary" size="lg" block onClick={this.expenseClick}>
                            Close
                        </Button>
                    </div>
                </Fragment>
            )
        }
        
    }
}

export default ExpenseSearch;