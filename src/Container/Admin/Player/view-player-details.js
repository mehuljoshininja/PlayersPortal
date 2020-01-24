import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IoMdArrowRoundBack } from 'react-icons/io';

import {
    Col, Card, Row, CardImg, CardBody,
    UncontrolledTooltip,
    Button,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import * as PlayerAction from '../../../Action/Player/player-action';

const baseImgUrl = 'http://localhost:3000/uploads/';

class ViewPlayerDetails extends React.Component {
    componentWillMount() {
        let { data } = this.props.location
        if (!data) {
            this.props.history.replace('/dashboard')
        }
    }
    render() {
        let { data } = this.props.location
        return (<center>
            <div style={{ marginTop: '10px' }}>
                <div style={{ width: '25vw' }}>
                    {
                        this.props.player.map((player) => (data.id.includes(player._id))
                            ?
                            <>
                                <Row>
                                    <Col>
                                        <center>
                                            <Card style={{ borderRadius: '50px', border: '2px solid black', backgroundColor: '#FFFAFA' }}>
                                                <CardImg top src={baseImgUrl + player.profilephoto} alt="Photo" style={{ width: '10vw', height: '10vw', borderRadius: '500px', marginTop: '3vh', border: '1px solid black' }} />
                                                <div style={{ marginTop: '3vh' }}>
                                                    <h5>{player.playername}</h5>
                                                </div>
                                                <hr style={{ borderColor: 'gray' }} />
                                                <CardBody style={{ textAlign: 'left', fontSize: '16px', marginLeft: '10px', marginTop: '0vh' }}>
                                                    <table width='100%'>
                                                        <tr>
                                                            <td>Born Date</td>
                                                            <th>{player.borndate}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>Role</td>
                                                            <th>{player.role}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>Batting Style</td>
                                                            <th>{player.batsman}</th>
                                                        </tr>
                                                        <tr>
                                                            <td>Bowling Style</td>
                                                            <th>{player.bowler}</th>
                                                        </tr>
                                                    </table>
                                                </CardBody>
                                            </Card>
                                        </center>
                                    </Col>
                                </Row>
                                <hr />
                            </>
                            : null)
                    }
                </div>
                <div>
                    <div style={{ textAlign: 'left' }}>
                        <NavLink tag={Link} to='/dashboard' ><Button outline style={{ width: '4vw' }} id='back'><IoMdArrowRoundBack /></Button></NavLink>
                        <UncontrolledTooltip placement='right' target='back'>Back</UncontrolledTooltip>
                    </div>
                </div>
            </div></center>
        )
    }
}

const mapStateToProps = (state) => {
    let player = []
    let players = state.Player
    for (let index in players) {
        player.push({ '_id': players[index]._id, 'profilephoto': players[index].profilephoto, 'playername': players[index].playername, 'borndate': players[index].borndate, 'role': players[index].role, 'team': players[index].team, 'batsman': players[index].batsman, 'bowler': players[index].bowler })
    }

    return {
        player
    };
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        player: bindActionCreators(PlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlayerDetails);