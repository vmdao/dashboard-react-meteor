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
import CategoryCreate from '../../components/backend/category/CategoryCreate';


class LogoCategoryAddPage extends Component {
    static propTypes = {
        categories: React.PropTypes.array.isRequired,
    };

    render() {
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Categories List:</h3>
                                    <CategoryCreate />
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('logoCategories');
    const categories = LogoCategories.find({}).fetch() || [];
    return {
        categories: categories,
    };
}, LogoCategoryAddPage);
