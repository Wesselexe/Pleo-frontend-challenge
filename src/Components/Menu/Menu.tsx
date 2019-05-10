import React from "react";
import { FormControl, Button } from 'react-bootstrap';

import './Menu.css'

interface MenuProps {
    // filter: any
    // Add explicit types to props, especially functions so you can validate that arguments are the right ones.
    filter: (filterText:string) => void
}

class Menu extends React.Component<MenuProps> {

    // Type the State as well
    state = {
        // You store the search text inside the Menu component but also in ExpenseView
        // The goal is to have a single source of truth for your state. ExpenseView should pass that value down,
        // and Menu should only call `this.props.filter(ev.target.value)` or  `this.props.filter("")`
        searchText: ""
    }

    handleChange = (event:any) => {
        this.setState({searchText: event.target.value})
        this.props.filter(event.target.value)
    }

    clearFilter = (event:React.MouseEvent) => {
        this.setState({searchText: ""})
        this.props.filter("")
    }

    render() {
        return (
            <div className="menu-box">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.searchText} onChange={this.handleChange} />
                <Button variant="warning" onClick={this.clearFilter}>Clear</Button>
            </div>
        )
    }
}

export default Menu;