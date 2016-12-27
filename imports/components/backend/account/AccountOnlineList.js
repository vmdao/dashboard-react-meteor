import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';

import {
  Row,
  Col,
  Grid,
  Table,
} from '@sketchpixy/rubix';

@withRouter
class Account extends Component {
  edit = () => {
    this.props.router.push(`/account/edit/${this.props.account._id}`);
  }
  render() {
    let {account} = this.props;
    if (!account) return;
    let {status} = account;
    let {lastLogin} = status
    return (

      <tr onClick={this.edit}>
        <td>{account.fullname}</td>
        <td>{account.username}</td>
        <td>{account.emails[0].address}</td>
        <td>{account.active}</td>
        <td>{lastLogin.ipAddr}</td>
        <td>{status.online}</td>
        <td>{lastLogin.date}</td>
        <td>{account.createdAt.toString()}</td>
      </tr>
    );
  }
}


export default class AccountList extends Component {
  static propTypes = {
    accounts: React.PropTypes.array,
  };
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.table)).dataTable({
      responsive: true,
      columnDefs: [
        {  className: 'dt-body-right' }
      ]
    });
  }
  render() {
    let {accounts} = this.props;
    if (accounts.length === 0) return null;
    return (
      <Grid>
        <Row>
          <Table ref={(c) => this.table = c} className='display' cellSpacing='0' width='100%'>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Active</th>
                <th>IP</th>
                <th>Online</th>
                <th>Last Login</th>
                <th>Date Register</th>
              </tr>
            </thead>
            <tbody>
              {
                accounts.map(account => {
                  return <Account account={account} key={account._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

