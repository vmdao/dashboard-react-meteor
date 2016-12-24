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
import LogoEdit from '../../components/backend/logo/LogoEdit';


class LogoEditPage extends Component {
    static propTypes = {
        logo: React.PropTypes.object,
    };
    render() {
        let { logo } = this.props;
        if (!logo) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Logo</h3>
                                    <LogoEdit logo={logo} />
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
    Meteor.subscribe('logos', _id);
    return {
        style: Logos.find({ _id }).fetch()[0],
    };
}, LogoEditPage);
