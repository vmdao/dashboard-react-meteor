import React, {Component} from 'react';
import LoginForm from '../../components/backend/auth/LoginForm';
export default class AuthenticationPage extends Component {

  render() {
    const style = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'block',
      overflow: 'auto',
      position: 'fixed',
      background: '#43525A',
    } 
    return (
      <div id='auth-container' style={style} className='login'>
        <div id='auth-row' style={{margin: 'auto', display: 'block', marginTop: 50}}>
          <div id='auth-cell'>
          <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}
