import React, { Fragment } from "react";

import { addComment, addReceipt } from '../../Api/Api'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface Expense {
    id:string,
    amount:Amount,
    date:string,
    merchant:string,
    receipts:Receipts[],
    comment:string,
    category:string,
    user:User,
    index:number,
    update:any
}

interface Receipts {
    url:string
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

interface State {
    receipts: string[],
    activeExpense: boolean,
    commentText: string,
    receiptNumber: number
}

class ExpenseSearch extends React.Component<Expense> {

    state: State = {
        receipts: [],
        activeExpense: false,
        commentText: "",
        receiptNumber: 0
    }

    componentDidMount() {
        if (this.props.receipts.length > 0) {
            const receipts = this.props.receipts.map(it => {
                return "http://localhost:3000" + it.url
            })
            this.setState({receipts: receipts})
        } else {
            this.setState({receipts: ["https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg"]})
        }
    }
    
    componentDidUpdate(prevProps:Expense) {
        if (this.props.receipts !== prevProps.receipts) {
            if (this.props.receipts.length > 0) {
                const receipts = this.props.receipts.map(it => {
                    return "http://localhost:3000" + it.url
                })
                this.setState({receipts: receipts})
            } else {
                this.setState({receipts: ["https://image.shutterstock.com/image-vector/receipt-paper-cartoon-vector-illustration-260nw-666049375.jpg"]})
            }
        }
    }
    
    expenseClick = (event:React.MouseEvent):void => {
        this.setState({activeExpense: !this.state.activeExpense})
    }

    updateCommentText = (event:any) => {
        this.setState({commentText: event.target.value})
    }

    commentConfirm = async (event:React.MouseEvent): Promise<void> => {
        event.preventDefault();
        await addComment(this.props.id, this.state.commentText);
        this.props.update();
    }

    uploadReceiptButton = (event:React.MouseEvent) => {
        (this.refs.fileUploader as HTMLElement).click();
    }

    // receipts need to be shown when user uploads one.
    uploadReceipt = async (event:any) => {
        await addReceipt(this.props.id, event.target.files[0]);
        await this.props.update()
        //await this.props.update();
        //await this.setState({receipts: this.state.receipts.push("http://localhost:3000/receipts/" + this.props.id + "-" + (this.state.receipts.length))})
    }

    changeReceipt = (id:string) => {
        if (id === "left" && this.state.receiptNumber > 0) {
            this.setState({receiptNumber: this.state.receiptNumber - 1})
        } else if (id === "left" && this.state.receiptNumber === 0) {
            this.setState({ receiptNumber: this.state.receipts.length - 1 });
        } else if (id === "right" && this.state.receiptNumber < this.state.receipts.length - 1) {
            this.setState({receiptNumber: this.state.receiptNumber + 1})
        } else {
            this.setState({receiptNumber: 0})
        }
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
                        <img className="receipt" alt="Receipt" src={this.state.receipts[0]} />
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
                        <div className="mid-box">
                            <h5>Category:</h5>
                            <h6>{this.props.category}</h6>
                            <Form>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><h5>Comment</h5></Form.Label>
                                    <Form.Control as="textarea" rows="6" type="text" defaultValue={this.props.comment} onChange={this.updateCommentText}/>
                                </Form.Group>
                                <Button variant="warning" type="submit" onClick={this.commentConfirm}>
                                    Update comment
                                </Button>
                            </Form>
                        </div>
                        <div className="receipts-box">
                            <img className="receipt" alt="Receipt" src={this.state.receipts[this.state.receiptNumber]} />
                            <div className="receipt-options">
                                <input type="file" id="file" ref="fileUploader" style={{display: "none"}} onChange={this.uploadReceipt}></input>
                                <Button variant="warning" onClick={() => this.changeReceipt("left")}>Left</Button>
                                <Button variant="warning" onClick={this.uploadReceiptButton} >Upload receipt</Button>
                                <Button variant="warning" onClick={() => this.changeReceipt("right")}>Right</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button variant="warning" size="lg" block onClick={this.expenseClick}>
                            Close
                        </Button>
                    </div>
                </Fragment>
            )
        }
        
    }
}

export default ExpenseSearch;