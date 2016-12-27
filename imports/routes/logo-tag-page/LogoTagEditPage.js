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

import { LogoTags } from '../../api/LogoTags';
import LogoTagEdit from '../../components/backend/logo-tag/LogoTagEdit';


class LogoTagEditPage extends Component {
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
                                    <h3>Edit Tag</h3>
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
    Meteor.subscribe('logoTags', _id);
    return {
        data: LogoTags.find({ _id }).fetch()[0],
    };
}, LogoTagEditPage);
