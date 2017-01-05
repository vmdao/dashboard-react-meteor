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

import { LogoStyles } from '../../api/LogoStyles';
import LogoStyleEdit from '../../components/backend/logo-style/LogoStyleEdit';


class LogoStyleEditPage extends Component {
    static propTypes = {
        data: React.PropTypes.object,
    };
    render() {
        let { data } = this.props;
        if (!data) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Style</h3>
                                    <LogoStyleEdit data={data} />
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
    let { id } = params;
    let _id = id;
    Meteor.subscribe('logoStyles', _id);
    return {
        data: LogoStyles.find({ _id }).fetch()[0],
    };
}, LogoStyleEditPage);
