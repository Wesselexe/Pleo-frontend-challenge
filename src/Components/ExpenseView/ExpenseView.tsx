import React, { Fragment } from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import './ExpenseView.css'
import fetchExpenses from '../../Api/Api'

interface SearchState  {
    expenses: Expense;
    isLoaded: false;
}

interface Expense {
    id: string;
    amount: object;
    date: string;
    merchant: string;
    receipts: [];
    comment: string;
    category: string;
    user: object;
    index: number;
  }

  interface State {
    items: any[],
    isLoaded: boolean,
}
  

class ExpenseView extends React.Component {
    state: State = {
        items: [{"id":"5b996064dfd5b783915112f5","amount":{"value":"1854.99","currency":"EUR"},"date":"2018-09-10T02:11:29.184Z","merchant":"KAGE","receipts":[],"comment":"","category":"","user":{"first":"Vickie","last":"Lee","email":"vickie.lee@pleo.io"},"index":0}],
        isLoaded: false
    };

    componentDidMount() {
        this.setState({
            expenses: fetchExpenses(),
            isLoaded: true
        }) 
    }

    render() {
        const { isLoaded, items } = this.state;
        
        return (
            <Fragment>
                {
                    items.map(function(data) {
                        return <ExpenseSearch id={data.id} amount={data.amount.value} date={data.date} merchant={data.merchant} receipts={data.receipts} comment={data.comment} category={data.category} user={data.user.first} index={data.index}/>
                    })
                }
            </Fragment>
        )
    }
}

export default ExpenseView;