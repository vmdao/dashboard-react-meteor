import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelContainer,
} from '@sketchpixy/rubix';

import LogoSuggestOrderCreate from '../../components/backend/logo-suggestorder/LogoSuggestOrderCreate';

export default class LogoSuggestOrderCreatePage extends Component {

    render() {
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Add New Logo Suggest </h3>
                                    <LogoSuggestOrderCreate />
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}
