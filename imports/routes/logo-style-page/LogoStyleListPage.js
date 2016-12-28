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

import { LogoStyles } from '../../api/LogoStyles';
import LogoStyleList from '../../components/backend/logo-style/LogoStyleList';


class LogoStyleListPage extends Component {
  static propTypes = {
    styles: React.PropTypes.array.isRequired,
  };

  render() {
    let {styles} = this.props;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Styles List</h3>
                  <LogoStyleList styles={styles} />
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
  Meteor.subscribe('logoStyles');
  const styles = LogoStyles.find({}).fetch() || [];
  return {
    styles: styles,
  };
}, LogoStyleListPage);
