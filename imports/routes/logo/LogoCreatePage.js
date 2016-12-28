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

import { LogoCategories } from '../../api/LogoCategories';
import { LogoStyles } from '../../api/LogoStyles';
import { LogoTypes } from '../../api/LogoTypes';
import { LogoTags } from '../../api/LogoTags';

import LogoCreate from '../../components/backend/logo/LogoCreate';

class LogoCreatePage extends Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
    };
    render() {
        let {data} = this.props;
        return (
            <PanelContainer>
                <Panel>
                    <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Add New Logo</h3>
                                    <LogoCreate data={data}/>
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
  Meteor.subscribe('logoStyles');
  Meteor.subscribe('logoTypes');
  Meteor.subscribe('logoTags');
  const data = {
    categories: LogoCategories.find({}).fetch() || [],
    styles: LogoStyles.find({}).fetch() || [],
    types: LogoTypes.find({}).fetch() || [],
    tags: LogoTags.find({}).fetch() || [],
  }
 
  return {
    data: data,
  };
}, LogoCreatePage);

