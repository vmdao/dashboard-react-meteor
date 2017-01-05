import React from 'react';
import { Component } from 'react';
import DomainFeatureRow from './DomainFeatureRow';

class DomainFeature extends Component {
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
        return (
            <div id="DefaultTLDs" className="DefaultTLDs">
                <section className={'section section__default' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                    <div className="menu center">
                        <h3 className="menu-title">{this.props.data.title}</h3>
                        <div onClick={this.handleClick} className="menu-collapse"></div>
                    </div>
                    <ul className="grid-col">
                        {this.props.data.domains.map((value, index) => {
                            return <DomainFeatureRow key={index}
                                events={this.props.events}
                                data={value}
                                searchText={this.props.searchText} />;
                        })}
                    </ul>
                </section>
            </div >
        )
    }
}
export default DomainFeature;