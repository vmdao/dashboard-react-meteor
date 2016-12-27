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

import { LogoSuggestOrders } from '../../api/LogoSuggestOrders';
import LogoSuggestOrderEdit from '../../components/backend/logo-suggestorder/LogoSuggestOrderEdit';


class LogoSuggestOrderEditPage extends Component {
    static propTypes = {
        data: React.PropTypes.object,
    };
    render() {
        let data= this.props.data;
        if (!data) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Logo Suggest</h3>
                                    <LogoTagEdit data={data} />
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

export default createContainer(({ params }) => {
    let _id  = params.id;
    Meteor.subscribe('logoSuggestOrder', _id);
    return {
        data: LogoSuggestOrders.find({ _id }).fetch()[0],
    };
}, LogoSuggestOrderEdit);
