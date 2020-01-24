import React from 'react';
import { AvInput, AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Label, Button, Col, FormGroup } from "reactstrap";
import Fade from 'react-fade-in';
import { Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoginAction from '../../../Action/Login/login-action';


class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        let data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.action.User.login(data, this.props);
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            alert('You Are Currently Logged In So Without Logout You Cant Access Login Page....')
            this.props.history.push('/dashboard')
        }
    }
    render() {
        return (
            <div>

                <center><Fade>
                    <AvForm style={{ width: '40vw', textAlign: 'left', marginTop: '10px' }} onSubmit={this.onSubmit}>
                        <hr color='black' style={{ border: '2px solid' }} /> <center><h3>Sign In</h3> </center><hr color='black' style={{ border: '2px solid' }} />
                        <FormGroup row>
                            <Label for='Username' sm={3}>Username</Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvInput type='text' name='username' required onChange={this.onChange} />
                                    <AvFeedback>Username is required</AvFeedback>
                                </AvGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='Password' sm={3}>Password</Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvInput type='password' name='password' onChange={this.onChange} required />
                                    <AvFeedback>Password is required</AvFeedback>
                                </AvGroup>
                            </Col>
                        </FormGroup>
                        <hr color='black' />
                        <FormGroup row >
                            <Col>
                                <Button type='submit' outline color='dark' size='md' disabled={(Object.values(this.state).includes('')) ? true : false} >&nbsp;&nbsp;Login&nbsp;&nbsp; </Button>
                                <Button outline color='dark' size='md' style={{ marginLeft: '10px' }}>&nbsp;&nbsp;Reset&nbsp;&nbsp;</Button>
                            </Col>
                        </FormGroup>
                        <hr color='black' />
                        <div style={{ textAlign: 'right' }}>
                            Don't have an account ? <NavLink tag={Link} to='/register-user'>Sign Up</NavLink>
                        </div>
                    </AvForm></Fade>
                </center>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    action: {
        User: bindActionCreators(LoginAction, dispatch)
    }
})
export default connect(null, mapDispatchToProps)(Login);