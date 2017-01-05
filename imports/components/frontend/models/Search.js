import React from 'react';
import { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.refs.searchText.value
        );
    }

    render() {
        return (
            <div id="SearchBar" className="searchbar">
                <div className="center min-height">
                    <div id="search-bar-extension-state" className="container spread">
                        <div>
                            <input id="domain-input" type="text" onChange={this.handleChange} ref="searchText" className="searchbar-input" placeholder="Start typing" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                            <p className="smalltext-input-search">Type your name here</p>
                        </div>

                        <div className="faketext"> <span id="domain-actions-extension-text"></span> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
