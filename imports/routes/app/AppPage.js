import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
    Row,
    Col,
    Grid,
    Panel,
    Alert,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

import { Logos } from '../../api/Logos';
import App from '../../components/frontend/models/App';


class AppPage extends Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
    };

    render() {
        let {data} = this.props;
        return (
            <App logo={this.props.logo} />
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('logos');
    const data = Logos.find({}).fetch() || [];
    return {
        logo: data,
    };
}, AppPage);
