import React from 'react';
import { Component } from 'react';
import DomainRow from './DomainRow';

class Domain extends Component {
    constructor(props) {
        super(props);
        this.state = { isCollapse: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(prevState => ({
            isCollapse: !prevState.isCollapse
        }));
    }
    render() {
        console.log(this.props)
        return (
            <div id="EducationDomains" className="EducationDomains">
                <section className={'section ' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                    <div className="menu center">
                        <h3 className="menu-title">{this.props.data.title}</h3>
                        <div onClick={this.handleClick} className="menu-collapse"></div>
                    </div>
                    <ul className="grid-row">
                        {this.props.data.domains.map((vaule, index) => {
                            return <DomainRow key={index}
                                data={vaule}
                                events={this.props.events}
                                searchText={this.props.searchText} />
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}

export default Domain;