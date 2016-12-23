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
import StyleEdit from '../../components/backend/style/StyleEdit';


class LogoStyleEditPage extends Component {
    static propTypes = {
        style: React.PropTypes.object,
    };
    render() {
        let { style } = this.props;
        if (!style) return null;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Edit Style</h3>
                                    <StyleEdit style={style} />
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
        style: LogoStyles.find({ _id }).fetch()[0],
    };
}, LogoStyleEditPage);
