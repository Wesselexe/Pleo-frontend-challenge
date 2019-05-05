import React from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import './ExpenseView.css'
import { fetchExpenses } from '../../Api/Api'


  interface State {
    items: any[],
    isLoaded: boolean,
    users:string[]
} 


class ExpenseView extends React.Component {
    state: State = {
        items: [],
        isLoaded: false,
        users: []
    };

    refresh = ():void => {
        const request = async () => {
            const response = await fetchExpenses()
            await console.log(response)
            await this.setState({
                items: response,
                isLoaded: true // change
            })
        }
        request();
    }

    componentDidMount() {
        const request = async () => {
            const response = await fetchExpenses()
            await console.log(response)
            await this.setState({
                items: response,
                isLoaded: true // change
            })
        }
        request();
        const users = this.state.items.map(it => {
            
        })
        this.setState({
            users: users
        })
    }

    render() {
        const { isLoaded, items } = this.state;

        if (isLoaded) {
            return (
                <div>
                    {
                        items.map((data) => {
                            return <ExpenseSearch key={data.index} update={this.refresh} id={data.id} amount={data.amount} date={data.date} merchant={data.merchant} receipts={data.receipts} comment={data.comment} category={data.category} user={data.user} index={data.index}/>
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