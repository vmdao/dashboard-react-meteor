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
  render() {
    let {data} = this.props;
    if (!data) return;
    let {status} = data;
    let {lastLogin} = status
    return (

      <tr>
        <td>{data.fullname}</td>
        <td>{data.username}</td>
        <td>{data.emails[0].address}</td>
        <td>{data.active}</td>
        <td>{lastLogin.ipAddr}</td>
        <td>{status.online}</td>
        <td></td>
        <td></td>
      </tr>
    );
  }
}


export default class AccountList extends Component {
  static propTypes = {
    data: React.PropTypes.array,
  };
  componentDidMount() {
    // $(ReactDOM.findDOMNode(this.table)).dataTable({
    //   responsive: true,
    //   columnDefs: [
    //     {  className: 'dt-body-right' }
    //   ]
    // });
  }
  render() {
    let {data} = this.props;
    if (data.length < 1) return null;
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
                data.map(item => {
                  return <Account data={item} key={item._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

