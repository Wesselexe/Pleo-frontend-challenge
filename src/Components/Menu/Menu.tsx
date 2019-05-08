import React from "react";
import { DropdownButton, Dropdown, FormControl } from 'react-bootstrap';

import './Menu.css'

interface MenuProps {
    filter: any
}

class Menu extends React.Component<MenuProps> {

    state = {
        searchText: ""
    }

    handleChange = (event:any) => {
        this.setState({searchText: event.target.value})
        this.props.filter(event.target.value)
    }


    render() {
        return (
            <div className="menu-box">
                <ul>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange} />
                </ul>
            </div>
        )
    }
}

export default Menu;