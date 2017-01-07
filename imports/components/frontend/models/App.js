import React, { Component } from 'react';
import Workspace from './Workspace';
import Footer from './Footer';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: '', };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(searchText, suggest) {
        this.setState({ searchText: searchText, type: suggest });
    }
   
    render() {
        let {logo} = this.props || [];
        //if (logo.length === 0) return <div />;
        console.log(logo)
        return (
            <div>
                <div className="mobile-scroll">
                    <div className="content">
                        <Workspace
                            data={logo}
                            type={this.state.type}
                            searchText={this.state.searchText}
                            onUserInput={this.handleUserInput} />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
// <header className="header">
//                     <Header /> 
//                 </header>
export default App;
