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

import AnalyticList from '../../components/backend/analytic/AnalyticList';


class AnalyticListPage extends Component {
  static propTypes = {
    analytics: React.PropTypes.array.isRequired,
  };

  render() {
    let {analytics} = this.props;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Analytics List:</h3>
                  <AnalyticList analytics={analytics} />
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
  const analytics = VisitTracker.visits.find().fetch() || [];
  console.log(123, VisitTracker.visits.find().fetch())
  console.log(456, analytics)
  return {
    analytics: analytics,
  };
}, AnalyticListPage);
