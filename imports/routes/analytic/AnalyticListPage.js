import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
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
                  <h3>Analytics List:</h3>
                  <AnalyticList data={data} />
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

// export default createContainer(() => {
//   Meteor.subscribe('analytics');
//   const analytics = Analytics.find().fetch() || [];
//   console.log(456, analytics)
//   return {
//     analytics: analytics,
//   };
// }, AnalyticListPage);
function composer(props, onData) {
  console.log(321, VisitTracker.visits.find().fetch());
  Tracker.autorun(() => {
    onData(null, {
      data: VisitTracker.visits.find().fetch(),
    });
  })

}

export default compose(composer)(AnalyticListPage);