import React from 'react';
import { AvInput, AvForm, AvGroup, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Label, Button, Input, FormGroup, Col, FormText, UncontrolledTooltip } from "reactstrap";
import Fade from 'react-fade-in';
import { Link, NavLink } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../../logo.svg';

import { NAME_REGX } from '../../../Validation/reguler-expressions';
import * as PlayerAction from '../../../Action/Player/player-action';

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.initState = {
            playername: '',
            profilephoto: '',
            borndate: '',
            role: '-',
            bowler: '-',
            batsman: '-',
            team: '',
            status: 'none'
        };
        this.state = this.initState;
    }

    onSubmit = (event) => {
        event.preventDefault();
        const date = new Date()
        const dob_year = new Date(this.state.borndate).getFullYear()

        if ((date.getFullYear() - dob_year) < 18) {
            alert('Age Must Be Above 17..')
            return
        }

        if (!['png', 'jpg', 'jpeg'].includes(this.state.profilephoto.name.split('.')[1])) {
            alert('Image Must Be Type Of png / jpg / jpeg');
            return;
        } else if (NAME_REGX.test(this.state.playername)) {
            alert('Playername Filed Must Conatins Only Alphabatics...')
            return
        } else {
            if (this.state.role.includes('Bowler')) {
                if (this.state.bowler === '-') {
                    alert('Please Select Bowling Style....')
                    this.temp = false;
                    return;
                }
            } else if (this.state.role.includes('Batsman')) {
                if (this.state.batsman === '-') {
                    alert('Please Select Batsman Style....')
                    this.temp = false;
                    return;
                }
            }

            if (Object.values(this.state).includes('') || !this.state.team) {
                alert('Please Enter The All Data....')
                this.temp = false;
                return;
            }

            let data = new FormData();
            data.append('playername', this.state.playername)
            data.append('profile', this.state.profilephoto)
            data.append('borndate', this.state.borndate)
            data.append('role', this.state.role)
            data.append('bowler', this.state.bowler)
            data.append('batsman', this.state.batsman)
            data.append('team', this.state.team)

            this.props.action.Player.addPlayer(data, this.props)
        }
    }

    onChange = (event) => {
        if (event.target.name === 'profilephoto') {
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

    onChecked = (event) => {
        let role = '';
        let roleData = document.getElementsByName('role');
        roleData.forEach(element => {
            if (element.checked) {
                if (role !== '') {
                    role = role + ' & ' + element.value
                } else {
                    role = element.value
                }
            }
        });
        this.setState({
            role: role
        })
    }

    onSelect = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const Dateobj = new Date();
        const CurrentDate = Dateobj.getFullYear() + '-0' + (Dateobj.getMonth() + 1) + '-' + (Dateobj.getDate() - 1);
        const batsman = <>
            <FormGroup row>
                <Label sm={3}>Batsman Style : </Label>
                <Col sm={9}>
                    <AvGroup>
                        <AvField type='select' name='batsman' onChange={this.onSelect} required errorMessage='Please select your Batting Style'>
                            <option value='-'>--- Select Batting Style ---</option>
                            <option value='Right'>Right</option>
                            <option value='Left'>Left</option>
                        </AvField >
                    </AvGroup>
                </Col>
            </FormGroup>
        </>
        const bowler = <>
            <FormGroup row>
                <Label sm={3}>Bowler Style : </Label>
                <Col sm={9}>
                    <AvGroup>
                        <AvField type='select' name='bowler' onChange={this.onSelect} required errorMessage='Please select your Bowling Style'>
                            <option value='-'>--- Select Bowling Style ---</option>
                            <option value='Right'>Right</option>
                            <option value='Left'>Left</option>
                        </AvField >
                    </AvGroup>
                </Col>
            </FormGroup>
        </>
        return (
            <div>
                <center>
                    <Fade>
                        <AvForm style={{ width: '40vw', textAlign: 'left', marginTop: '10px' }} onSubmit={this.onSubmit}>
                            <hr color='black' style={{ border: '2px solid' }} /> <center><h3>Add Player</h3> </center><hr color='black' style={{ border: '2px solid' }} />
                            <FormGroup row>
                                <Label for='playername' sm={3}>Player Name</Label>
                                <Col sm={9}>
                                    <AvGroup>
                                        <AvInput type='text' name='playername' required onChange={this.onChange} pattern="\w+" />
                                        <AvFeedback>Player name is required</AvFeedback>
                                    </AvGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='borndate' sm={3}>Born Date</Label>
                                <Col sm={9}>
                                    <AvGroup>
                                        <AvInput type='date' name='borndate' max={CurrentDate} sm='10' onBlur={this.onBlur} onChange={this.onChange} required />
                                        <AvFeedback>Please select your born date</AvFeedback>
                                    </AvGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="profilephoto" sm={3}>Profile Photo</Label>
                                <Col sm={6}>
                                    <AvGroup>
                                        <AvInput type="file" name="profilephoto" onChange={this.onChange} required />
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
                            <FormGroup row>
                                <Label sm={3}>Role</Label>
                                <Col sm={9}>
                                    <Label sm={4}> &nbsp;
                                    <Input type="checkbox" name="role" value='Batsman' onChange={this.onChecked} /> Batsman </Label>
                                    <Label sm={4}>
                                        <Input type="checkbox" name="role" value='Bowler' onChange={this.onChecked} /> Bowler
                                </Label>
                                </Col>
                            </FormGroup>
                            {
                                (this.state.role.includes('&'))
                                    ? <>
                                        {batsman}
                                        {bowler}
                                    </>
                                    : (this.state.role === 'Bowler')
                                        ?
                                        <>
                                            {bowler}
                                        </>
                                        : (this.state.role === 'Batsman')
                                            ?
                                            <>
                                                {batsman}
                                            </>
                                            : null
                            }
                            <FormGroup row>
                                <Label for='borndate' sm={3}>Team</Label>
                                <Col sm={9}>
                                    <AvGroup>
                                        <AvField type='select' name='team' onChange={this.onSelect} required errorMessage='Please select your team'>
                                            <option value=''>--- Select Team ---</option>
                                            <option value='India'>Inida</option>
                                            <option value='Australia'>Australia</option>
                                            <option value='England'>England</option>
                                        </AvField >
                                    </AvGroup>
                                </Col>
                            </FormGroup>
                            <hr color='black' />
                            <FormGroup row style={{ textAlign: 'left' }}>
                                <Col>
                                    <Button type='submit' outline color='dark' size='md' disabled={(Object.values(this.state).includes('')) ? true : false}>Add</Button>
                                    <Button outline color='dark' size='md' style={{ marginLeft: '10px' }}>&nbsp;&nbsp;Reset&nbsp;&nbsp;</Button>
                                </Col>
                            </FormGroup>
                            <hr color='black' />
                            <div>
                                <div style={{ textAlign: 'right' }}>
                                    <NavLink tag={Link} to='/dashboard' id='back'><Button outline style={{ width: '50px' }}><IoMdArrowRoundBack /></Button></NavLink>
                                    <UncontrolledTooltip placement='left' target='back'>Back</UncontrolledTooltip>
                                </div>
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
        Player: bindActionCreators(PlayerAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(AddPlayer);