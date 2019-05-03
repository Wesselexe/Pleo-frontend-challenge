import React from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import './ExpenseView.css'
import fetchExpenses from '../../Api/Api'

class ExpenseView extends React.Component {
    state = {
        expenses: []
    }

    componentDidMount() {
        this.setState({
            expenses: fetchExpenses()
        }) 
    }

    render() {
        return (
            <div>
                {
                    this.state.expenses.map((it) => {
                        return <ExpenseSearch key={it} Expense={it} />
                    })
                }
            </div>
        )
    }
}

export default ExpenseView;