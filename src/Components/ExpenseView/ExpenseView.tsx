import React from "react";
import { ExpenseRow } from '../ExpenseRow/ExpenseRow'
import Menu from '../Menu/Menu'
import './ExpenseView.css'
import { fetchExpenses, fetchAll } from '../../Api/Api'
import { number } from "prop-types";

  interface State {
    totalExpenses: any[],
    shownExpenses: any[],
    totalPages: number,
    pagesLoaded: number,
    pagesLoading: boolean,
    isLoaded: boolean,
    filter: string,
} 

class ExpenseView extends React.Component {
    state: State = {
        totalExpenses: [],
        shownExpenses: [],
        totalPages: 0,
        pagesLoaded: 0,
        pagesLoading: false,
        isLoaded: false,
        filter: ""
    };

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);

        const request = async () => {
            // Now with the correct types, response is of type `Response`
            const response = await fetchExpenses(0);
            this.setState({totalPages: Math.floor(response.total / 25 + 1)}) ;

            const allExpenses = await fetchExpenses(0);

            await this.setState({
                totalExpenses: allExpenses.expenses,
                shownExpenses: allExpenses.expenses
            })

            await this.setState({isLoaded: true})
        }
        request();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
      }

    refresh = (number?:number):void => {
        const request = async (page:number) => {
            const response = await fetchExpenses(page);
            await this.setState({
                totalExpenses: response.expenses,
                isLoaded: true
            })

            this.filterUsers(this.state.filter); 
        }
        request(0);
       // let pageCounter:number = 0;
       // while (this.state.shownExpenses.length < 3 && pageCounter <= this.state.totalPages) {
       //     console.log("Test to see if called")
       //     pageCounter += 1
       //     request(pageCounter);
       // }
    }

    loadMore = () => {
        this.setState({pagesLoading: true})
        const request = async (page:number) => {
            const response = await fetchExpenses(page);
            await this.setState({
                totalExpenses: this.state.totalExpenses.concat(response.expenses),
                isLoaded: true,
                pagesLoaded: this.state.pagesLoaded + 1
            })

            this.filterUsers(this.state.filter); 
        }

        request(this.state.pagesLoaded + 1);
    }

    filterUsers = (filterText:string) => {
        const filteredView = this.state.totalExpenses.filter((it) => {
            if (it.user.first.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return true
            } else if (it.user.last.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return true
            } else if (it.merchant.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return true
            } else if (it.comment.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return true
            } else if (it.amount.value.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                return true
            }
            return false
        })

        this.setState({
            filter: filterText,
            shownExpenses: filteredView,
            pagesLoading: false
        })
    }

    onScroll = () => {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          this.state.totalExpenses.length && !this.state.pagesLoading
        ) {
          this.loadMore();
        }
      }

    render() {
        const { isLoaded, shownExpenses } = this.state;

        if (isLoaded) {
            return (
                <div>
                    <Menu filter={this.filterUsers}/>
                    {
                        shownExpenses.map((data) => {
                            return <ExpenseRow key={data.index} refresh={this.refresh} id={data.id} amount={data.amount} date={data.date} merchant={data.merchant} receipts={data.receipts} comment={data.comment} category={data.category} user={data.user} index={data.index}/>
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <h1>LOADING...</h1>
                </div>
            )
        }
    }
}

export default ExpenseView;