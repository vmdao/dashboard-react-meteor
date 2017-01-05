import React from 'react';
import { Component } from 'react';

class DomainSocialRow extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }

    componentWillMount() {
        this.state.events.addListener(this.state.data.nameLast, social => {
            var props = this.props;
            if (!social) return;
            props.data.stocked = social.stocked;
            this.setState(props)
        });
    }

    render() {
        return (
            <li>
                <a target="_blank"
                    href={this.props.searchText !== '' ? this.state.data.stocked ? this.props.data.address + this.props.searchText : this.props.data.address + 'sigin.up' : ''}
                    className={'list ' + (this.props.searchText !== '' ? this.state.data.stocked ? 'list__bad' : 'list__good' : '')} id={this.props.data.name}>
                    <div className="list-item">
                        <div className="list-item-image"> <img src={'/images/' + this.props.data.nameLast + '.svg'} alt={this.props.data.name} /> </div>
                        <div className="list-item-text"><em>@</em>
                            <span className="typed-text">{this.props.searchText !== '' ? this.props.searchText : ''}</span>
                        </div>
                        <div className="list-item-save"></div>
                    </div>
                    <div className="list-state">
                        <div className="list-state-loader"></div>
                        <div className="list-state-value">{this.state.searchText !== '' ? this.state.data.stocked ? 'Taken' : 'Get it' : ''}</div>
                    </div>
                </a>
            </li>
        )
    }
}

export default DomainSocialRow;