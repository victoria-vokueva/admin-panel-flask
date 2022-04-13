import React from "react";
import MyCircleButton from "../UI/myCircleButton/MyCircleButton"

class Header extends React.Component {
    constructor(props) {
        super(props);
    
    this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(event) {
        console.log("buy")
        this.props.getActive(!this.props.isActive);
      };


    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <MyCircleButton
                        id="sidebarCollapse"   
                        icon={this.props.isActive ? "fa-align-left" : "fa-align-justify"}
                        onClick={this.handleToggle}>
                    </MyCircleButton>
                </div>
            </nav>
        );
    }
}

export default Header