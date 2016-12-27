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

import { LogoTypes } from '../../api/LogoTypes';
import LogoTypeEdit from '../../components/backend/logo-type/LogoTypeEdit';

class LogoTypeEditPage extends Component {
    static propTypes = {
        data: React.PropTypes.object,
    };
    render() {
        let data = this.props.data;
        if (!data) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Type</h3>
                                    <LogoTag data={data} />
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
    Meteor.subscribe('logoTypes', _id);
    return {
        data: LogoTypes.find({ _id }).fetch()[0],
    };
}, LogoTypeEditPage);
