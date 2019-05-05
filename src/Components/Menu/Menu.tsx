import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';

interface MenuProps {
    users: string[],
    filter: any
}

class Menu extends React.Component<MenuProps> {

    state = {
        selectedUser: ""
    }

    render() {
        const { users } = this.props;
        return (
            <div className="menu-box">
                <ul className="filters">
                    <DropdownButton id="dropdown-basic-button" title="Users">
                        {
                            users.map((data) => {
                                return <Dropdown.Item href="#/">data</Dropdown.Item>
                            })
                        }
                        
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </ul>
            </div>
        )
    }
}

export default Menu;