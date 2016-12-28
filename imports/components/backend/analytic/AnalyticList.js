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
    let {data} = this.props;
    if (!data) return;
    return (
      <tr onClick={this.edit}>
        <td>{data.referer}</td>
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
        { targets: [-1, -3], className: 'dt-body-right' }
      ]
    });
  }
  render() {
    console.log(12, this.props)
    let {data} = this.props;
    if (data.length === 0) return null;
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
