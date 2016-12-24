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
import LogoList from '../../components/backend/logo/LogoList';


class LogoListPage extends Component {
  static propTypes = {
    logos: React.PropTypes.array.isRequired,
  };

  render() {
    let {logos} = this.props;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Styles List</h3>
                  <LogoList logos={logos} />
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
  Meteor.subscribe('logos');
  const logos = Logos.find({}).fetch() || [];
  return {
    logos: logos,
  };
}, LogoListPage);
