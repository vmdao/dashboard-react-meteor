import React, { Component } from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Home from './routes/Home';
import LoginPage from './routes/login/LoginPage';

import LogoCategoryListPage from './routes/category/LogoCategoryListPage';
import LogoCategoryCreatePage from './routes/category/LogoCategoryCreatePage';
import LogoCategoryEditPage from './routes/category/LogoCategoryEditPage';

import LogoStyleListPage from './routes/style/LogoStyleListPage';
import LogoStyleCreatePage from './routes/style/LogoStyleCreatePage';
import LogoStyleEditPage from './routes/style/LogoStyleEditPage';

import LogoTagListPage from './routes/logo-tag/LogoTagListPage';
import LogoTagCreatePage from './routes/logo-tag/LogoTagCreatePage';
import LogoTagEditPage from './routes/logo-tag/LogoTagEditPage';

import LogoListPage from './routes/logo/LogoListPage';
import LogoCreatePage from './routes/logo/LogoCreatePage';
import LogoEditPage from './routes/logo/LogoEditPage';

import AccountListPage from './routes/account/AccountListPage';
import AccountCreatePage from './routes/account/AccountCreatePage';
import AccountEditPage from './routes/account/AccountEditPage';
import AccountOnlineListPage from './routes/account/AccountOnlineListPage';
import AnalyticListPage from './routes/analytic/AnalyticListPage';

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
  <Router>
    <Route path='login' component={LoginPage}>
    </Route>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/category' component={LogoCategoryListPage} />
      <Route path='/category/create' component={LogoCategoryCreatePage} />
      <Route path='/category/edit/:id' component={LogoCategoryEditPage} />

      <Route path='/style' component={LogoStyleListPage} />
      <Route path='/style/create' component={LogoStyleCreatePage} />
      <Route path='/style/edit/:id' component={LogoStyleEditPage} />

      <Route path='/backend/logo-tags' component={LogoTagListPage} />
      <Route path='/backend/logo-tags/create' component={LogoTagCreatePage} />
      <Route path='/backend/logo-tags/edit/:id' component={LogoTagEditPage} />

      <Route path='/logo' component={LogoListPage} />
      <Route path='/logo/create' component={LogoCreatePage} />
      <Route path='/logo/edit/:id' component={LogoEditPage} />

      <Route path='/account' component={AccountListPage} />
      <Route path='/account/create' component={AccountCreatePage} />
      <Route path='/account/edit/:id' component={AccountEditPage} />
      <Route path='/account/online' component={AccountOnlineListPage} />

      <Route path='/analytic' component={AnalyticListPage} />
    
    </Route>
  </Router>
);
