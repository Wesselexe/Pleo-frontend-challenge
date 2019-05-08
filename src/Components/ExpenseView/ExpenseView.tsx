import React from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import Menu from '../Menu/Menu'
import './ExpenseView.css'
import { fetchExpenses, fetchAll } from '../../Api/Api'


  interface State {
    totalExpenses: any[],
    shownExpenses: any[],
    totalPages: number;
    isLoaded: boolean,
    filter: string,
} 


class ExpenseView extends React.Component {
    state: State = {
        totalExpenses: [],
        shownExpenses: [],
        totalPages: 0,
        isLoaded: false,
        filter: ""
    };

    componentDidMount() {
        const request = async () => {
            const response = await fetchExpenses();
            this.setState({totalPages: Math.floor(response.total / 25 + 1)}) ;

            const allExpenses = await fetchAll(this.state.totalPages);

            await this.setState({
                totalExpenses: allExpenses,
                shownExpenses: allExpenses
            })

            await this.setState({isLoaded: true})
        }
        request();
    }

    refresh = ():void => {
        const request = async () => {
            const response = await fetchAll(this.state.totalPages);
            await console.log(response)
            await this.setState({
                totalExpenses: response,
                isLoaded: true
            })

            this.filterUsers(this.state.filter); 
        }
        request();
    }

    filterUsers = (filterText:string) => {
        const filteredView = this.state.totalExpenses.filter((it) => {
            if (it.user.first.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return it
            } else if (it.user.last.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return it
            } else if (it.merchant.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return it
            } else if (it.comment.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return it
            } else if (it.amount.value.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return it
            }
        })

        this.setState({
            filter: filterText,
            shownExpenses: filteredView
        })
    }

    render() {
        const { isLoaded, shownExpenses } = this.state;

        if (isLoaded) {
            return (
                <div>
                    <Menu filter={this.filterUsers}/>
                    {
                        shownExpenses.map((data) => {
                            return <ExpenseSearch key={data.index} refresh={this.refresh} id={data.id} amount={data.amount} date={data.date} merchant={data.merchant} receipts={data.receipts} comment={data.comment} category={data.category} user={data.user} index={data.index}/>
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