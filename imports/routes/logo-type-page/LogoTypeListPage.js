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

import { LogoTypes } from '../../api/LogoTypes';
import LogoTypeList from '../../components/backend/logo-type/LogoTypeList';


class LogoTypeListPage extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  };

  render() {
    let data = this.props.data || [];
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Types List</h3>
                  <LogoTypeList data={data} />
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
  Meteor.subscribe('logoTypes');
  return {
    data: LogoTypes.find({}).fetch() || [],
  };
}, LogoTypeListPage);
