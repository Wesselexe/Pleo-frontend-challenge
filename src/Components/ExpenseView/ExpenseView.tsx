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
                123
            </div>
        )
    }
}

export default ExpenseView;