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
class Analytic extends Component {
  render() {
    let {data} = this.props;
    if (!data) return;
    let {trafficSource} = data;
    let {userAgent} = data;
    let {browser} = userAgent;
    let {device} = userAgent;
    let browserString = JSON.stringify( browser, null, 2);
    let deviceString = JSON.stringify( device, null, 2);
    let trafficSourceString = JSON.stringify( trafficSource, null, 2);
    console.log(typeof data.createdAt);
    return (
      <tr>
        <td>{data.ipAddress}</td>
        <td>{data.referer}</td>
        <td>{browserString}</td>
        <td>{deviceString}</td>
        <td></td>
        <td>{trafficSourceString}</td>
      </tr>
    );
  }
}

export default class AnalyticList extends Component {
  static propTypes = {
    data: React.PropTypes.array,
  };
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.table)).dataTable({
      responsive: true,
      columnDefs: [
        {className: 'dt-body-right' }
      ]
    });
  }
  render() {
    let {data} = this.props;
    if (data.length === 0) return null;
    return (
      <Grid>
        <Row>
          <Table ref={(c) => this.table = c} className='display' cellSpacing='0' width='100%'>
            <thead>
              <tr>
                <th>IP</th>
                <th>Referer</th>
                <th>Browser</th>
                <th>Device</th>
                <th>Time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(item => {
                  return <Analytic data={item} key={item._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}
