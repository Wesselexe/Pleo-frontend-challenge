import React from "react";
import { FormControl, Button } from 'react-bootstrap';

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