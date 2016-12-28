import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {
  Row,
  Col,
  Grid,
  Table,
} from '@sketchpixy/rubix';

@withRouter
class LogoTag extends Component {
  edit = () => {
    this.props.router.push(`/backend/logo-tags/edit/${this.props.data._id}`);
  }
  render() {
    let {data} = this.props;
    if (!data) return;
    return (
      <tr onClick={this.edit}>
        <td>{data.name}</td>
        <td>{data.code}</td>
        <td>{data.keyword}</td>
        <td>{data.active}</td>
      </tr>
    );
  }
}


export default class LogoTagList extends Component {
  static propTypes = {
    data: React.PropTypes.array,
  };
  componentDidMount() {
    // $(ReactDOM.findDOMNode(this.table)).dataTable({
    //   responsive: true,
    //   columnDefs: [
    //     { targets: [-1, -3], className: 'dt-body-right' }
    //   ]
    // });
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
                <th>Name</th>
                <th>Code</th>
                <th>Keyword</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(item => {
                  return <LogoTag data={item} key={item._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}