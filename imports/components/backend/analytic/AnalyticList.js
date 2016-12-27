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
  edit = () => {
    this.props.router.push(`/analytic/${this.props.analytic._id}`);
  }
  render() {
    let {analytic} = this.props;
    if (!analytic) return;
    return (
      <tr onClick={this.edit}>
        <td>{analytic.referer}</td>
      </tr>
    );
  }
}

export default class AnalyticList extends Component {
  static propTypes = {
    analytics: React.PropTypes.array,
  };
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.table)).dataTable({
      responsive: true,
      columnDefs: [
        { targets: [-1, -3], className: 'dt-body-right' }
      ]
    });
  }
  render() {
    let {analytics} = this.props;
    if (analytics.length === 0) return null;
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
              </tr>
            </thead>
            <tbody>
              {
                analytics.map(analytic => {
                  return <Analytic analytic={analytic} key={analytic._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}
