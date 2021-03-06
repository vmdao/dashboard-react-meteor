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
import LogoTagList from '../../components/backend/logo-tag/LogoTagList';


class LogoTagListPage extends Component {
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
                  <h3>Tags List</h3>
                  <LogoTagList data={data} />
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
  Meteor.subscribe('logoTags');
  return {
    data: LogoTags.find({}).fetch() || [],
  };
}, LogoTagListPage);
