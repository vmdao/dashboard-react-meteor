import React from 'react';
import { Component } from 'react';

class DomainRow extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    componentWillMount() {
        var prefix = this.state.data.prefix || '';
        this.state.events.addListener(prefix + this.state.data.nameLast, domain => {
            var props = this.props;
            if (!domain) return;
            props.data.stocked = domain.stocked;
            props.data.price = props.data.price;
            this.setState(props);
        });
    }

    render() {
        console.log(12345, this)
        return (
            <li>
                <a target="_blank" id={'.' + this.props.data.nameLast}
                    href={this.props.searchText !== '' ? this.state.data.stocked ? 'https://www.namecheap.com/domains/whois/results.aspx?domain=' + this.props.searchText : 'https://designtool.co' : ''}
                    className={'list ' + (this.props.searchText !== '' ? this.state.data.stocked ? 'list__bad' : 'list__good' : '')} >
                    <div className="list-item">
                        <div className="list-item-text">
                            <span className="typed-text">
                                {this.props.data.prefix ? this.props.data.prefix : ''}{this.props.searchText !== '' ? this.props.searchText : this.props.data.name}
                            </span>
                            <em>.{this.props.data.nameLast}</em></div>
                        <div className="list-item-save"></div>
                    </div>
                    <div className="list-state">
                        <div className="list-state-loader"></div>
                        <div className="list-state-value">{this.state.data.stocked ? 'WHOIS' : this.state.data.price}</div>
                    </div>
                </a>
            </li>
        )
    }
}

export default DomainRow;