import React from 'react';
import { Component } from 'react';

class DomainFeatureRow extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    componentWillMount() {
        this.state.events.addListener(this.state.data.nameLast, domain => {
            var props = this.props;
            if (!domain) return;
            props.data.stocked = domain.stocked;
            props.data.price = props.data.price;
            this.setState(props);
        });
    }

    render() {
        return <li>
            <a target="_blank"
                href={this.props.searchText !== '' ? this.state.data.stocked ? 'https://www.namecheap.com/domains/whois/results.aspx?domain=' + this.props.searchText : 'https://designtool.co' : ''}
                className={'list ' + (this.props.searchText !== '' ? this.state.data.stocked ? 'list__bad' : 'list__good' : '')} id={this.props.data.name}>
                <div className="list-item">
                    <div className="list-item-text default-tld">
                        <span className="typed-text">{this.props.searchText !== '' ? this.props.searchText : this.props.data.name}</span>
                        <em>{'.' + this.props.data.nameLast}</em>
                    </div>
                    <div className="list-item-save"></div>
                </div>
                <div className="list-state">
                    <div className="list-state-loader"></div>
                    <div className="list-state-value">
                        <span>
                            {this.props.searchText !== '' ? this.state.data.stocked ? 'WHOIS' : this.state.data.price : ''}
                        </span>
                    </div>
                </div>
            </a>
        </li>
    }
}

export default DomainFeatureRow;