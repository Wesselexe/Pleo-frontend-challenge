import React from "react";
import { DropdownButton, Dropdown, FormControl } from 'react-bootstrap';

import './Menu.css'

interface MenuProps {
    users: string[],
    filter: any
}

class Menu extends React.Component<MenuProps> {

    state = {
        selectedUser: "Users"
    }

    handleClick = (event:React.MouseEvent) => {
        this.props.filter(event.currentTarget.id)
        console.log(event.currentTarget.id)
        this.setState({selectedUser: event.currentTarget.id})
    }

    handleChange = (event:any) => {
        
    }


    render() {
        const { users } = this.props;
        return (
            <div className="menu-box">
                <ul className="filters">
                    <DropdownButton variant="warning" id="dropdown-basic-button" title={this.state.selectedUser}>
                        <Dropdown.Item className="clear-filters" key="clear" id="Users" href="#" onClick={this.handleClick}>Clear filters</Dropdown.Item>
                        <Dropdown.Divider />
                        {
                            users.map((data) => {
                                return <Dropdown.Item key={data} id={data} href="#" onClick={this.handleClick}>{data}</Dropdown.Item>
                            })
                        }
                    </DropdownButton>
                </ul>
                <ul>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </ul>
            </div>
        )
    }
}

export default Menu;