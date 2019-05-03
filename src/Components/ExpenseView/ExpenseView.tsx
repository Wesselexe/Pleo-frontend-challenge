import React from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import './ExpenseView.css'
import fetchExpenses from '../../Api/Api'


  interface State {
    items: any[],
    isLoaded: boolean,
}
  

class ExpenseView extends React.Component {
    state: State = {
        items: [],
        isLoaded: false
    };

    componentDidMount() {
        const request = async () => {
            const a = await fetchExpenses()
            await console.log(a)
            await this.setState({
                items: a,
                isLoaded: true // change
            })
        }
        request();
    }

    render() {
        const { isLoaded, items } = this.state;

        if (isLoaded) {
            return (
                <div>
                    {
                        items.map((data) => {
                            return <ExpenseSearch key={data.index} id={data.id} amount={data.amount} date={data.date} merchant={data.merchant} receipts={data.receipts} comment={data.comment} category={data.category} user={data.user} index={data.index}/>
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <h1>LOADING</h1>
                    
                </div>
            )
        }
    }
}

export default ExpenseView;