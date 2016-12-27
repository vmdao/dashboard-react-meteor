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


class LogoStyleListPage extends Component {
  static propTypes = {
    tags: React.PropTypes.array.isRequired,
  };

  render() {
    let datas = this.props.tags || [];
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Tags List</h3>
                  <LogoTagList datas={datas} />
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
    tags: LogoTags.find({}).fetch() || [],
  };
}, LogoTagListPage);
