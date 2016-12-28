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
class LogoSuggestOrder extends Component {
  edit = () => {
    this.props.router.push(`/backend/logo-suggestorders/edit/${this.props.data._id}`);
  }
  render() {
    let {data} = this.props;
    if (!data) return;
    let category = data.category || {};
    let style = data.style || {};
    let type = data.type || {};
    return (
      <tr onClick={this.edit} style={data.active == 0 ?{backgroundColor: '#f5f5f5'}: {}}>
        <td>{category.name}</td>
        <td>{style.name}</td>
        <td>{type.name}</td>
        <td>{'Create logo has ' + category.name + ' category. Style is ' + style.name + ' And Type is ' + type.name}</td>
        <td>{data.count}</td>
      </tr>
    );
  }
}

export default class LogoSuggestOrderList extends Component {
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
    let data = this.props.data || [];
    if (data.length === 0) return null;
    return (
      <Grid>
        <Row>
          <Table ref={(c) => this.table = c} className='display' cellSpacing='0' width='100%'>
            <thead>
              <tr>
                <th>Category</th>
                <th>Style</th>
                <th>Type</th>
                <th>Desciption</th>
                <th>Maked</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(item => {
                  return <LogoSuggestOrder data={item} key={item._id} />
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

