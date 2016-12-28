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

import { LogoCategories } from '../../api/LogoCategories';
import LogoCategoryEdit from '../../components/backend/logo-category/LogoCategoryEdit';


class LogoCategoryEditPage extends Component {
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
                                    <h3>Edit Category:</h3>
                                    <LogoCategoryEdit data={data} />
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
    Meteor.subscribe('logoCategories', _id);
    return {
        data: LogoCategories.find({ _id }).fetch()[0],
    };
}, LogoCategoryEditPage);
