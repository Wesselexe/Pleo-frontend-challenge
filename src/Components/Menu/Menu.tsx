import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';

class Menu extends React.Component {

    render() {
        return (
            <div className="menu-box">
                <ul className="filters">
                    <li>
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>;
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu;