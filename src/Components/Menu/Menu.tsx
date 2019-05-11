import React from "react";
import { FormControl, Button } from 'react-bootstrap';

import './Menu.css'

interface MenuProps {
    // filter: any
    // Add explicit types to props, especially functions so you can validate that arguments are the right ones.
    filterFunction: (filterText:string) => void,
    filterText: string
}

class Menu extends React.Component<MenuProps> {
    
    handleChange = (event:any) => {
        this.props.filterFunction(event.target.value)
    }

    clearFilter = (event:React.MouseEvent) => {
        this.props.filterFunction("")
    }

    render() {
        return (
            <div className="menu-box">
                <FormControl type="text" placeholder="Search" value={this.props.filterText} className="mr-sm-2" onChange={this.handleChange} />
                <Button variant="warning" onClick={this.clearFilter}>Clear</Button>
            </div>
        )
    }
}

export default Menu;