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
import CategoryList from '../../components/backend/category/CategoryList';


class LogoCategoryListPage extends Component {
  static propTypes = {
    categories: React.PropTypes.array.isRequired,
  };

  render() {
    let {categories} = this.props;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Categories List:</h3>
                  <CategoryList categories={categories} />
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
}, LogoCategoryListPage);
