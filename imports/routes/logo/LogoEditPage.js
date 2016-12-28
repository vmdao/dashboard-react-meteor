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
import { LogoCategories } from '../../api/LogoCategories';
import { LogoStyles } from '../../api/LogoStyles';
import { LogoTypes } from '../../api/LogoTypes';
import { LogoTags } from '../../api/LogoTags';

import LogoEdit from '../../components/backend/logo/LogoEdit';


class LogoEditPage extends Component {
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
                                    <h3>Edit Logo</h3>
                                    <LogoEdit data={data} />
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
    Meteor.subscribe('logoCategories');
    Meteor.subscribe('logoStyles');
    Meteor.subscribe('logoTypes');
    Meteor.subscribe('logoTags');
    Meteor.subscribe('logo', _id);
    const data = {
        categories: LogoCategories.find({}).fetch() || [],
        styles: LogoStyles.find({}).fetch() || [],
        types: LogoTypes.find({}).fetch() || [],
        tags: LogoTags.find({}).fetch() || [],
        logo: Logos.find({ _id }).fetch()[0],
    }
    console.log('store', data);
    return {
        data: data
    };
}, LogoEditPage);
