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

import { LogoSuggestOrders } from '../../api/LogoSuggestOrders';
import LogoSuggestOrderList from '../../components/backend/logo-suggestorder/LogoSuggestOrderList';
 
class LogoSuggestOrderListPage extends Component {
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
                  <h3>Logo Suggest Order List</h3>
                  <LogoSuggestOrderList data={data} />
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
  Meteor.subscribe('logoSuggestOrders');
  return {
    data: LogoSuggestOrders.find({}).fetch() || [],
  };
}, LogoSuggestOrderListPage);
