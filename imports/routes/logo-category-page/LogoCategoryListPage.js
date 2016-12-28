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
import LogoCategoryList from '../../components/backend/logo-category/LogoCategoryList';


class LogoCategoryListPage extends Component {
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
                  <h3>Categories List:</h3>
                  <LogoCategoryList data={data} />
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
    data: categories,
  };
}, LogoCategoryListPage);
