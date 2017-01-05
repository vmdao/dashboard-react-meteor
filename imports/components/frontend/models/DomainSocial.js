import React from 'react';
import { Component } from 'react';
import DomainSocialRow from './DomainSocialRow';

class DomainSocial extends Component {
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
            <div id="SocialNetworks" className="SocialNetworks">
                <section className={'socialnetworks section ' + (this.state.isCollapse ? ' section__collapsed' : '')}>
                    <div className="menu center">
                        <h3 className="menu-title">{this.props.data.title}</h3>
                        <div onClick={this.handleClick} className="menu-collapse"></div>
                    </div>
                    <ul className="grid-row social-networks">
                        {this.props.data.domains.map((vaule, index) => {
                            return <DomainSocialRow key={index}
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

export default DomainSocial;