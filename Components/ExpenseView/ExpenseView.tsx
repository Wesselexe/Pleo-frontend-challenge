import React from "react";

class ExpenseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/expenses")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    items: result.amount
                })
            }
        )
    }

    render() {
        return (
            <div className="expense-box">
            <p>{this.state.items}</p>
            </div>
        )
    }
}

export default ExpenseView;