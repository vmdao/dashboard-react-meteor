import React, { Component } from 'react';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Home from './routes/Home';


import LogoCategoryListPage from './routes/category/LogoCategoryListPage';
import LogoCategoryCreatePage from './routes/category/LogoCategoryCreatePage';
import LogoCategoryEditPage from './routes/category/LogoCategoryEditPage';

import LogoStyleListPage from './routes/style/LogoStyleListPage';
import LogoStyleCreatePage from './routes/style/LogoStyleCreatePage';
import LogoStyleEditPage from './routes/style/LogoStyleEditPage';

class App extends Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />

    <Route path='/category' component={LogoCategoryListPage} />
    <Route path='/category/create' component={LogoCategoryCreatePage} />
    <Route path='/category/edit/:id' component={LogoCategoryEditPage} />

    <Route path='/style' component={LogoStyleListPage} />
    <Route path='/style/create' component={LogoStyleCreatePage} />
    <Route path='/style/edit/:id' component={LogoStyleEditPage} />
  </Route>
);
