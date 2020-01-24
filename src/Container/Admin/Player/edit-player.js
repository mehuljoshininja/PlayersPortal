import React from 'react';
import { AvInput, AvForm, AvGroup, AvFeedback, AvField } from 'availity-reactstrap-validation';
import {Label, Button, Input, FormGroup, Col, FormText, UncontrolledTooltip } from "reactstrap";
import Fade from 'react-fade-in';
import { Link, NavLink } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as PlayerAction from '../../../Action/Player/player-action';

const baseImgUrl = 'http://localhost:3000/uploads/'
class EditPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.initState = {
            id:'',
            playername: '',
            profilephoto: '',
            borndate: '',
            role: '-',
            bowler:'-',
            batsman:'-',
            team: '',
            status: 'none'
        };
        this.state = this.initState;
    }
    
    onSubmit = (event) => { 
        let stateData = (Object.values(this.state));
        // console.log('name: '+this.state.playername + ' team: ' + this.state.team + ' bdate: ' + this.state.borndate + ' bowl: ' +this.state.bowler + ' bat: ' +this.state.batsman +' role: '+ this.state.role)
        if(this.state.role.includes('Bowler')){
            if(this.state.bowler === '-'){
                alert('Please Select Bowling Style....')
                this.temp = false;
                return;
            }
        }else if(this.state.role.includes('Batsman')){
            if(this.state.batsman === '-'){
                alert('Please Select Batsman Style....')
                this.temp = false;
                return;
            }
        }

        if(stateData.includes('') ||  !this.state.team){
            alert('Please Enter The All Data....')
            this.temp = false;
            return;
        }       

        let data = new FormData();
        data.append('id',this.state.id)
        data.append('playername',this.state.playername)
        data.append('profile',this.state.profilephoto)
        data.append('borndate',this.state.borndate)
        data.append('role',this.state.role)
        data.append('bowler',this.state.bowler)
        data.append('batsman',this.state.batsman)
        data.append('team',this.state.team)
        this.props.action.player.editPlayer(data, this.props)
    }

    onChange = (event) => {
       if(event.target.name === 'profilephoto') {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    document.getElementById('prof').src = event.target.result
                };
                reader.readAsDataURL(event.target.files[0]);
            }
            this.setState({
                [event.target.name] : event.target.files[0]
            })
       } else {
            this.setState({
                [event.target.name] : event.target.value
            })
       }
    }

    onChecked = (event) => {
        let role='';
        let roleData = document.getElementsByName('role');
        let t = event.target.value
        if(!event.target.checked){
            this.setState({
                [t.toLowerCase()]: '-'
            })
        }
        roleData.forEach(element => {
            if(element.checked){
                if(role !== ''){
                    role = role + ' & ' + element.value
                }else{
                    role = element.value
                }
            }
        });
        this.setState({
            role:role
        })    
    }

    onSelect = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillMount(){
        const {data} = this.props.location
        
       if(data){
            this.props.player.map((player) => {
                console.log(player)
                if(data.id === player._id) {
                     this.setState({
                        id: player._id,
                        playername: player.playername,
                        profilephoto: player.profilephoto,
                        borndate: player.borndate,
                        role: player.role,
                        batsman: player.batsman,
                        bowler: player.bowler,
                        team: player.team
                    })
                }
                return null;
            })
       } else {
            this.props.history.push('/dashboard')
       }
    }

    componentDidMount(){
        const role = document.getElementsByName('role')
        for(let element of role){
            if(this.state.role.includes(element.value)) {
                element.checked = true
            }
        }
    }
    render() {
        const Dateobj = new Date();
        const CurrentDate = Dateobj.getFullYear()+'-0'+(Dateobj.getMonth()+1)+'-'+(Dateobj.getDate()-1);
        const batsman =  <FormGroup row>
                            <Label sm={3}>Batsman Style : </Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvField  type='select' name='batsman' id='batsman' value={this.state.batsman} onChange={this.onSelect} required errorMessage='Please select your Batting Style'>
                                        <option value='-'>--- Select Batting Style ---</option>
                                        <option value='Right'>Right</option>
                                        <option value='Left'>Left</option>
                                    </AvField >   
                                </AvGroup>
                            </Col>
                        </FormGroup>
        const bowler = <FormGroup row>
                            <Label sm={3}>Bowler Style : </Label>
                            <Col sm={9}>
                                <AvGroup>{console.log(this.state.batsman)}
                                    <AvField  type='select' name='bowler' id='bowler'  value={this.state.bowler} onChange={this.onSelect} required errorMessage='Please select your Bowling Style'>
                                        <option value='-'>--- Select Bowling Style ---</option>
                                        <option value='Right'>Right</option>
                                        <option value='Left'>Left</option>
                                    </AvField >   
                                </AvGroup>
                            </Col>
                        </FormGroup>
        return(
            <div>
                <center>
                    <Fade>
                    <AvForm style={{width:'40vw',textAlign:'left',marginTop:'10px'}} onSubmit={this.onSubmit}>
                        <hr color='black' style={{border:'2px solid'}} /> <center><h3>Add Player</h3> </center><hr color='black' style={{border:'2px solid'}} />
                        <FormGroup row>
                            <Label for='playername' sm={3}>Player Name</Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvInput type='text' name='playername' required onChange={this.onChange} pattern="\w+"  value={this.state.playername} />
                                    <AvFeedback>Player name is required</AvFeedback>
                                </AvGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='borndate' sm={3}>Born Date</Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvInput type='date' name='borndate' max={CurrentDate} sm='10' value={this.state.borndate} onChange={this.onChange} required/>
                                    <AvFeedback>Please select your born date</AvFeedback>
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
                                <img id='prof' alt='' src={baseImgUrl + this.state.profilephoto} style={{width:'5vw',height:'10vh',borderRadius:'50px',border:'1px solid #343a40'}} />
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
                            ? <> {batsman} {bowler} </>
                            : (this.state.role === 'Bowler')
                            ? <> {bowler} </> 
                            : (this.state.role === 'Batsman') 
                            ? <> {batsman} </> 
                            : null
                        }
                        <FormGroup row>
                            <Label for='borndate' sm={3}>Team</Label>
                            <Col sm={9}>
                                <AvGroup>
                                    <AvField  type='select' name='team'  value={this.state.team} onChange={this.onSelect} required errorMessage='Please select your team'>
                                        <option value='India' >Inida</option>
                                        <option value='Australia'>Australia</option>
                                        <option value='England'>England</option>
                                    </AvField >   
                                </AvGroup>
                            </Col>
                        </FormGroup>
                        <hr color='black' />
                        <FormGroup row style={{textAlign :'right'}}>
                            <Col >
                                <Button type='submit' outline color='dark' size='md' disabled={(Object.values(this.state).includes(''))?true:false} >Update</Button>
                                <Button outline color='dark' size='md' style={{marginLeft:'10px'}} tag={Link} to='/dashboard'>Cancel</Button>
                            </Col>
                        </FormGroup>
                        <hr color='black' />
                        <div>
                            <div style={{textAlign:'right'}}>
                                <NavLink tag={Link} to='/dashboard' id='back'><Button outline style={{width:'50px'}}><IoMdArrowRoundBack /></Button></NavLink>
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

const mapStateToProps = (state) => {
        let player=[]
        let players =  state.Player
        for (let index in players) {
            player.push({'_id': players[index]._id, 'profilephoto': players[index].profilephoto,'playername': players[index].playername,'borndate' : players[index].borndate, 'role' : players[index].role, 'team' : players[index].team, 'batsman': players[index].batsman, 'bowler' : players[index].bowler})
        }
        return{
            player
        };
    }

const mapDispatchToProps = (dispatch) => ({
    action: {
        player: bindActionCreators (PlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayer);