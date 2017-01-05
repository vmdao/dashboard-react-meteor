import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange = (e) => {
    this._nav.search(e.target.value);
  }
  getPath = (path) => {
    return path;
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <FormControl type='text' placeholder='Search...' onChange={this.handleChange} className='sidebar-search' style={{ border: 'none', background: 'none', margin: '10px 0 0 0', borderBottom: '1px solid #666', color: 'white' }} />
              <div className='sidebar-nav-container'>
                <SidebarNav style={{ marginBottom: 0 }} ref={(c) => this._nav = c}>

                  { /** Pages Section */}
                  <div className='sidebar-header'>PAGES</div>
                  <SidebarNavItem glyph='icon-feather-play' name='Go Site' href='/' />
                  <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-feather-shuffle' name='Suggest Logo' href='/backend/logo-suggestorders' />
                      <SidebarNavItem glyph='icon-feather-bell' name='Account Online' href='/backend/accounts/online' />
                      <SidebarNavItem glyph='icon-feather-monitor' name='Analytic seft' href='/backend/analytics' />
                    </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-feather-briefcase' name='App'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-feather-layout' name='Category'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-feather-layout' name='All Categories' href='/backend/logo-categories' />
                          <SidebarNavItem glyph='icon-feather-layout' name='Add New Category' href='/backend/logo-categories/create' />
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-feather-book' name='Type'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-feather-book' name='All Types' href='/backend/logo-types' />
                          <SidebarNavItem glyph='icon-feather-book' name='Add New Type' href='/backend/logo-types/create' />
                        </SidebarNav>
                      </SidebarNavItem>

                      <SidebarNavItem glyph='icon-feather-layers' name='Style'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-feather-layers' name='All Style' href='/backend/logo-styles' />
                          <SidebarNavItem glyph='icon-feather-layers' name='Add New Style' href='/backend/logo-styles/create' />

                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-feather-tag' name='Tag'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-feather-tag' name='All Tags' href='/backend/logo-tags' />
                          <SidebarNavItem glyph='icon-feather-tag' name='Add New Tag' href='/backend/logo-tags/create' />
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-outlined-todolist' name='Suggest Logo' href='/backend/logo-suggestorders' />

                      <SidebarNavItem glyph='icon-outlined-todolist' name='Logo'>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-outlined-todolist' name='All Logo' href='/backend/logos' />
                          <SidebarNavItem glyph='icon-outlined-todolist' name='Add New Logo' href='/backend/logos/create' />
                        </SidebarNav>
                      </SidebarNavItem>

                    </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-stroke-gap-icons-Users' name='Account'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-stroke-gap-icons-Users' name='All Account' href='/backend/accounts' />
                      <SidebarNavItem glyph='icon-stroke-gap-icons-Users' name='Add New Account' href='/backend/accounts/create' />
                    </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-stroke-gap-icons-ClipboardChart' name='Payment' href='/backend/payments'></SidebarNavItem>
                  <SidebarNavItem glyph='icon-stroke-gap-icons-ClipboardChart' name='Analytic'>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-stroke-gap-icons-ClipboardChart' name='Account Online' href='/backend/accounts/online' />
                      <SidebarNavItem glyph='icon-stroke-gap-icons-ClipboardChart' name='Analytic seft' href='/backend/analytics' />
                    </SidebarNav>
                  </SidebarNavItem>
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

class DummySidebar extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-header'>DUMMY SIDEBAR</div>
            <LoremIpsum query='1p' />
          </Col>
        </Row>
      </Grid>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='http://www.uplevo.com/admin/dashboart/asset/image/logo-uplevo.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{ top: 23, fontSize: 16, lineHeight: 1, position: 'relative' }}>Minh Dao Vu</div>
                <div>
                  <Progress id='demo-progress' value={30} color='#ffffff' />
                  <a href='#'>
                    <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                  </a>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
