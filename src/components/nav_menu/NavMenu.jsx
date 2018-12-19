import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavMenu.scss";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false
        };

        this.onDropdownClick = this.onDropdownClick.bind(this);
    }

    onDropdownClick() {
        this.setState(prevState => ({
            dropdownVisible: !prevState.dropdownVisible
        }));
    }

    render() {
        const { dropdownVisible } = this.state;
        const visibility = dropdownVisible ? "visible" : "hidden";

        return (
            <div className="the-system-nav">
                <div className="the-system-nav-header">
                    <div
                        className="the-system-nav-header-button"
                        onClick={this.onDropdownClick}
                        onKeyPress={this.onDropdownClick}
                        role="button"
                        tabIndex="0"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className={`the-system-nav-dropdown ${visibility}`} />
            </div>
        );
    }
}

export default NavMenu;
