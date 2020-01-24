import React from 'react';
import Fade from 'react-fade-in';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { AvInput, AvForm, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Label, Button, FormGroup, Col, FormText } from "reactstrap";
import logo from '../../../logo.svg';

import { NAME_REGX } from '../../../Validation/reguler-expressions';
import * as UserAction from '../../../Action/Registration/registration-action';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.initState = {
            username: '',
            profilephoto: '',
            password: '',
            status: 'none'
        };
        this.state = this.initState;
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (!['png', 'jpg', 'jpeg'].includes(this.state.profilephoto.name.split('.')[1])) {
            alert('Image Must Be Type Of png / jpg / jpeg');
            return;
        } else if (NAME_REGX.test(this.state.username)) {
            alert('Username Contain Only Alphabatics...')
            return;
        } else {
            let stateData = (Object.values(this.state));

            if (stateData.includes('')) {
                alert('Please Enter The All Data....')
                return;
            }

            //debugger;
            let formData = new FormData();
            formData.append('profile', this.state.profilephoto);
            formData.append('username', this.state.username);
            formData.append('password', this.state.password);

            this.props.action.User.register(formData, this.props);
        }
    }

    onChange = (event) => {
        if (event.target.name === 'confirmpassword') {
            if (this.state.password !== event.target.value) {
                this.setState({ status: 'cpassword' })
            } else {
                this.setState({ status: 'none' })
            }
        } else if (event.target.name === 'profilephoto') {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    document.getElementById('prof').src = event.target.result
                };
                reader.readAsDataURL(event.target.files[0]);
            }
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    onSelect = (event) => {
        this.setState({
            team: event.target.value
        })
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            alert('You Are Currently Logged In So Without Logout You Cant Access Register Page....')
            this.props.history.push('/dashboard')
        }
    }
    render() {
        let error_style = {
            marginTop: '.25rem',
            fontSize: '80%',
            color: '#dc3545'
        }
        return (
            <div>
                <center>
                    <Fade>
                        <AvForm style={{ width: '40vw', textAlign: 'left', marginTop: '10px' }} onSubmit={this.onSubmit} enctype='multipart/form-data'>
                            <hr color='black' style={{ border: '2px solid' }} /> <center><h3>Sign Up</h3> </center><hr color='black' style={{ border: '2px solid' }} />
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
                                        {(this.state.password && this.state.password.length < 5) ? <span style={error_style}>Password is too short</span> : (this.state.password.length > 8) ? <span style={error_style}>Password is too large</span> : null}
                                    </AvGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='Password' sm={3}>Confirm Password</Label>
                                <Col sm={9}>
                                    <AvGroup>
                                        <AvInput type='password' name='confirmpassword' onChange={this.onChange} required />
                                        <AvFeedback>Confrim Password is required</AvFeedback>
                                        {(this.state.status === 'cpassword') ? <span style={error_style}>Password and Confirm Password not match</span> : null}
                                    </AvGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="profilephoto" sm={3}>Profile Photo</Label>
                                <Col sm={6}>
                                    <AvGroup>
                                        <AvInput type="file" name="profilephoto" id="profilephoto" onChange={this.onChange} required />
                                        <AvFeedback>Please select your profile</AvFeedback>
                                        <FormText color="muted">
                                            Select Profile Photo(.jpg,.jpeg,.png)
                                        </FormText>
                                    </AvGroup>
                                </Col>
                                <Col sm={3}>
                                    <img id='prof' alt='' src={logo} style={{ width: '5vw', height: '10vh', borderRadius: '50px', border: '1px solid #343a40' }} />
                                </Col>
                            </FormGroup>
                            <hr color='black' />
                            <FormGroup row style={{ textAlign: 'left' }}>
                                <Col>
                                    <Button type='submit' outline color='dark' size='md' disabled={(Object.values(this.state).includes('')) ? true : false} >Register</Button>
                                    <Button outline color='dark' size='md' style={{ marginLeft: '10px' }}>&nbsp;&nbsp;Reset&nbsp;&nbsp;</Button>
                                </Col>
                            </FormGroup>
                            <hr color='black' />
                            <div>
                                <div style={{ textAlign: 'right' }}>Already register ? <NavLink tag={Link} to='/login'>Sign In</NavLink></div>
                            </div>
                        </AvForm>
                    </Fade>
                </center>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        User: bindActionCreators(UserAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(Register);