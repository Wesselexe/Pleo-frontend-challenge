import React from "react";
import ExpenseSearch from '../ExpenseSearch/ExpenseSearch'
import Menu from '../Menu/Menu'
import './ExpenseView.css'
import { fetchExpenses } from '../../Api/Api'


  interface State {
    items: any[],
    totalPages: number;
    isLoaded: boolean,
    filter: string,
    users:string[]
} 


class ExpenseView extends React.Component {
    state: State = {
        items: [],
        totalPages: 0,
        isLoaded: false,
        filter: "",
        users: []
    };

    componentDidMount() {
        const request = async () => {
            const response = await fetchExpenses();
            // new code
            this.setState({totalPages: response.total / 25 + 1}) ;
            await console.log(this.state.totalPages)
            // end of new code
            await this.setState({items: response.expenses})
            await this.postInit();
            await this.setState({isLoaded: true})
        }
        request();
    }

    postInit = () => {
        this.state.items.map((data) => {
            if (this.state.users.indexOf(data.user.first) === -1) {
                return this.state.users.push(data.user.first)
            }
        })
    }

    refresh = ():void => {
        const request = async () => {
            const response = await fetchExpenses()
            await console.log(response.expenses)
            await this.setState({
                items: response.expenses,
                isLoaded: true
            })
            if (this.state.filter !== "") {
                this.filterUsers(this.state.filter);
            }
        }
        request();
    }

    filterUsers = (user:any) => {
        if (user === "Users") {
            this.refresh();
            this.setState({filter: ""})
            return
        }
        
        const filteredView = this.state.items.filter((it) => {   
            if (it.user.first === user) {
                return it
            }
        })

        console.log(filteredView)
        this.setState({
            items: filteredView,
            filter: user
        })
    }

    render() {
        const { isLoaded, items } = this.state;

        if (isLoaded) {
            return (
                <div>
                    <Menu users={this.state.users} filter={this.filterUsers}/>
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