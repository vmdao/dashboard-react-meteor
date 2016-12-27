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
class LogoType extends Component {
  edit = () => {
    this.props.router.push(`/bankend/logo-type/edit/${this.props.data._id}`);
  }
  render() {
    let data = this.props.data;
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

export default class LogoTypeList extends Component {
  static propTypes = {
    logoTypes: React.PropTypes.array,
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
    let datas = this.props.logoTypes || [];
    if (datas.length === 0) return null;
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
                datas.map(data => {
                  return <LogoType data={data} key={data._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

