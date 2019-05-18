import React from "react";
import { ExpenseRow } from "../ExpenseRow/ExpenseRow";
import Menu from "../Menu/Menu";
import "./ExpenseView.css";
import { fetchExpenses } from "../../Api/Api";

interface State {
  totalExpenses: any[];
  shownExpenses: any[];
  totalPages: number;
  pagesLoaded: number;
  pagesLoading: boolean;
  isLoaded: boolean;
  filter: string;
}

const ValidateMe = (txt: string, filterText: string) => {
  return txt.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
};

class ExpenseView extends React.Component<State> {
  state: State = {
    totalExpenses: [],
    shownExpenses: [],
    totalPages: 0,
    pagesLoaded: 0,
    pagesLoading: false,
    isLoaded: false,
    filter: ""
  };

  async componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);

    // Now with the correct types, response is of type `Response`
    const response = await fetchExpenses(0);
    if (response) {
      this.setState({ totalPages: Math.floor(response.total / 25) });
      await this.setState({
        totalExpenses: response.expenses,
        shownExpenses: response.expenses
      });
    }
    await this.setState({ isLoaded: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  refresh = (id: string, receipt: boolean, comment: string): void => {
    let indexOfExpense = this.state.totalExpenses.findIndex(it => it.id === id);
    let NewTotalExpenses = this.state.totalExpenses;
    if (receipt) {
      NewTotalExpenses[indexOfExpense].receipts.push(
        `http://localhost:3000/receipts/${id}-${
          NewTotalExpenses[indexOfExpense].receipts.length
        }`
      );
      this.setState({
        totalExpenses: NewTotalExpenses
      });
    } else if (comment) {
      NewTotalExpenses[indexOfExpense].comment = comment;
      this.setState({
        totalExpenses: NewTotalExpenses
      });
    }
  };

  loadMore = async () => {
    this.setState({ pagesLoading: true });
    const response = await fetchExpenses(this.state.pagesLoaded + 1);
    if (response) {
      await this.setState({
        totalExpenses: this.state.totalExpenses.concat(response.expenses),
        pagesLoaded: this.state.pagesLoaded + 1
      });
    }

    this.filterUsers(this.state.filter);
  };

  filterUsers = (filterText: string) => {
    const filteredView = this.state.totalExpenses.filter(it => {
      if (
        ValidateMe(it.user.first, filterText) ||
        ValidateMe(it.user.last, filterText) ||
        ValidateMe(it.merchant, filterText) ||
        ValidateMe(it.comment, filterText) ||
        ValidateMe(it.amount, filterText)
      ) {
        return true;
      }
      return false;
    });

    this.setState({
      filter: filterText,
      shownExpenses: filteredView,
      pagesLoading: false
    });
  };

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.pagesLoaded < this.state.totalPages &&
      !this.state.pagesLoading
    ) {
      this.loadMore();
    }
  };

  render() {
    const { isLoaded, shownExpenses } = this.state;

    if (isLoaded) {
      return (
        <div>
          <Menu
            filterFunction={this.filterUsers}
            filterText={this.state.filter}
          />
          {shownExpenses.map(data => {
            return (
              <ExpenseRow key={data.index} refresh={this.refresh} {...data} />
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING...</h1>
        </div>
      );
    }
  }
}

export default ExpenseView;
