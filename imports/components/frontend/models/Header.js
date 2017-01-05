import React, { Component } from 'react';
import Search from './Search';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '', };
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(searchText, suggest) {
        this.setState({ searchText: searchText, type: suggest });
    }
    render() {
        return (
            <div className="landing-header">
                <div className="header">
                    <div className="logo-header">
                        <img src="https://app.smartmockups.com/images/app-icon.svg" />
                    </div>
                    <h1 className="headline-header">Branding app</h1>
                    <p className="sub-header">The easiest way to create stunning product screenshots without using Photoshop</p>
                </div>
                <Search className="search-box"
                    type={this.state.type}
                    onUserInput={this.handleUserInput} />
            </div>
        )
    }
}

export default Header