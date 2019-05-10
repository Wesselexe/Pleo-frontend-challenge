import React, { Fragment } from "react";

import { addComment, addReceipt } from '../../Api/Api'
import noreceipt from '../../noreceipt.png'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

/// Ah there are the interfaces! You could have extracted those in src/Api/Types.ts and import them where they are needed.
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
    refresh:any
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

// Naming of this component is misleading, I thought it was the expense search bar.
// Could be simply `Expense`, `ExpenseRow`, ... 
class ExpenseSearch extends React.Component<Expense> {

    state: State = {
        receipts: [],
        activeExpense: false,
        commentText: "",
        receiptNumber: 0
    }

    componentDidMount() {
        if (this.props.receipts.length > 0) {
            // This sort of data manipulation should be done on the Api/Api.ts level (outside the component)
            const receipts = this.props.receipts.map(it => {
                return "http://localhost:3000" + it.url
            })
            this.setState({receipts: receipts})
        } else {
            this.setState({receipts: [noreceipt]})
        }
    }
    
    // ComponentDidUpdate is an antipattern. The reason you need this right now is because you store the expenses in the state
    // but you do some manipulations to the values. A state library would help on this, or wrapping the expenses outside this component could be good.
    // I suggest reading on async rendering https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    componentDidUpdate(prevProps:Expense) {
        if (this.props.receipts !== prevProps.receipts) {
            if (this.props.receipts.length > 0) {
                const receipts = this.props.receipts.map(it => {
                    return "http://localhost:3000" + it.url
                })
                this.setState({
                    receipts: receipts,
                    receiptNumber: this.props.receipts.length -1
                })
            } else {
                this.setState({receipts: [noreceipt]})
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
        // add feedback here. Add a spinner or something hooked to a state boolean, like `fetching`
        event.preventDefault();
        await addComment(this.props.id, this.state.commentText);
        this.props.refresh();
    }

    uploadReceiptButton = (event:React.MouseEvent) => {
        (this.refs.fileUploader as HTMLElement).click();
    }

    // receipts need to be shown when user uploads one.
    uploadReceipt = async (event:any) => {
        // add feedback here. Add a spinner or something hooked to a state boolean, like `uploading`
        // this.setState({uploading: true})
        await addReceipt(this.props.id, event.target.files[0]);
        // this.setState({uploading: false})
        await this.props.refresh();
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
                        <h5>Comment: {this.props.comment} </h5>
                    </div>
                    <div className="receipts-box">
                        <img className="receipt" alt="Receipt" src={this.state.receipts[this.state.receiptNumber]} />
                    </div>
                </div>
            )
        } else {
            return (
                // You can use the <></> shorthand for <Fragment></Fragment>
                <Fragment> 
                    <div className='active-expense-box'>
                        <div className="expense-text">
                            <h4>User: {this.props.user.first} {this.props.user.last}</h4>
                            <h4>Amount: {this.props.amount.value} · {this.props.amount.currency} </h4>
                            <h4>Merchant: {this.props.merchant}</h4>
                        </div>
                        <div className="mid-box">
                            <h6>{this.props.category}</h6>
                            <Form>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><h5>Comment</h5></Form.Label>
                                    <Form.Control as="textarea" rows="11" type="text" defaultValue={this.props.comment} onChange={this.updateCommentText}/>
                                </Form.Group>
                                <Button variant="warning" type="submit" onClick={this.commentConfirm}>
                                    Update comment
                                </Button>
                            </Form>
                        </div>
                        <div className="receipts-box">
                            <img className="receipt receipt-active" alt="Receipt" src={this.state.receipts[this.state.receiptNumber]} />
                            <div className="receipt-options">
                                <input type="file" id="file" accept="image/*" ref="fileUploader" style={{display: "none"}} onChange={this.uploadReceipt}></input>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="warning" onClick={() => this.changeReceipt("left")}>Left</Button>
                                    <Button variant="warning" onClick={this.uploadReceiptButton} >Upload receipt</Button>
                                    <Button variant="warning" onClick={() => this.changeReceipt("right")}>Right</Button>
                                </ButtonGroup>
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

// you could do all this at the declaration of the component
// Ex export default class ExpenseSearch extends React.Component<Expense> {
export default ExpenseSearch;