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

import AccountOnlineList from '../../components/backend/account/AccountOnlineList';


class AccountListPage extends Component {
  static propTypes = {
    accounts: React.PropTypes.array.isRequired,
  };

  render() {
    let {accounts} = this.props;
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{ padding: 0, paddingBottom: 25 }}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Accounts List:</h3>
                  <AccountOnlineList accounts={accounts} />
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
  Meteor.subscribe('userStatus');
  const accounts = Meteor.users.find({'status.online': true }).fetch() || [];
  console.log(123, accounts)
  return {
    accounts: accounts,
  };
}, AccountListPage);
