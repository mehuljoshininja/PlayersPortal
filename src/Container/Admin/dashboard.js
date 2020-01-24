import React from 'react';
import { 
    Nav, Navbar, NavbarBrand, NavItem, NavLink,
    Input, InputGroup, InputGroupAddon, 
    Button, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Table,
    Modal, ModalBody 
} from 'reactstrap';
import Fade from 'react-fade-in';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { MdGroupAdd, MdSort } from 'react-icons/md';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { TiArrowUnsorted } from 'react-icons/ti';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Players from '../Admin/Player/players'
import * as PlayerAction from '../../Action/Player/player-action'
import Pagination from '../Pagination/pagination';

class Dashboard extends React.Component {
    state ={
        search:'',
        team:'',
        img:'',
        order:'',
        check:0,
        playerPerPage:3,
        currentPage:1,
        index:0,
        modal:0
    }


    toggle = (event) => {
        this.setState({
        img: event.target.src,
		modal: !this.state.modal
        })      
    }
  
    inputHandle_Search = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    changeHandle_Filter = (event) => {
        this.setState({
            team: event.target.value
        })
    }

    changeHandle_Order = (event) => {
        this.setState({
            order: event.target.value
        })
    }

    viewDetails = (event) => {
        let tag = event.target
        let ids = [];
        if(tag.getAttribute('value')) {
            ids.push(tag.getAttribute('value'))
        } else {
            if(this.state.check){
                const checkboxies = document.getElementsByName('check');
                for(let item of checkboxies) {
                    if(item.checked) {
                        ids.push(item.value)
                    }
                }
            }
        }
        this.props.history.push({pathname:'/view-player-details',data:{
            id: ids
            }
        })    
    }

    handle_CheckAll = (event) => {
        const checkboxies =  document.getElementsByName('check');
        
        if(event.target.checked){
            this.setState({
                check:1
            })
            for(let element of checkboxies){
                // console.log(element)
                element.checked = true
            }
        } else {
            this.setState({
                check:0
            })
            for(let element of checkboxies){
                element.checked = false
            }
        }
    }

    handle_Check = () => {
        const checkboxies =  document.getElementsByName('check');
        let checkAll = document.getElementsByName('check-all')[0];
        let flag = false;

        for(let element of checkboxies){
            if(!element.checked){
                // console.log(checkAll)
                checkAll.checked = false;
                flag=false;
                break;
            } else {
                flag=true;
                this.setState({
                    check:1
                })
            }
        }

        if(flag) {
            this.setState({
                check:1
            })
            checkAll.checked = true;
        } 
    }

    edit = (event) => {
        this.props.history.push({pathname:'/edit-player',data:{
            id: event.target.value
            }
        })
    }

    delete = (event) => {
        if(window.confirm('Are You Sure To Delete Record ?')){
            this.props.action.player.deletePlayer({id:event.target.value}, this.props)
        }
    }

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }
    componentWillMount(){
        this.props.action.player.fetchData();
    }  

    render(){
        const indexOfLastPlayer = this.state.currentPage * this.state.playerPerPage;
        const indexOfFirstPlayer = indexOfLastPlayer - this.state.playerPerPage;
        const currentPlayers = this.props.player.slice(indexOfFirstPlayer, indexOfLastPlayer)
        return(
            <div style={{width:'100vw',textAlign:'left',marginTop:'10px'}}>
                <Fade>
                <div>
                    <Navbar expand='sm'style={{backgroundColor:'#f2f2f2',marginLeft:'10px',marginRight:'10px',borderRadius:'5px',height:'50px'}}>
                        <NavbarBrand>
                        <InputGroup>
                            <Input  muted placeholder='Search' onChange={this.inputHandle_Search} size='sm' style={{width:'200px',borderRadius:'10px'}} required/>
                            
                            <InputGroupAddon addonType="append">
                                <FaSearch style={{marginLeft:'5px', marginTop:'7px'}}/>
                            </InputGroupAddon>
                        </InputGroup>
                        </NavbarBrand>
                        <Nav navbar className='ml-auto'>
                            <NavItem>
                                <NavLink>
                                    <UncontrolledDropdown direction="left" size='md'>
                                        <DropdownToggle caret outline>
                                            {(this.state.team)?this.state.team:<><FaFilter /></>}
                                        </DropdownToggle>
                                        <DropdownMenu  onClick={this.changeHandle_Filter}>
                                                <DropdownItem value=''>All</DropdownItem>
                                                <DropdownItem value='India'>India</DropdownItem>
                                                <DropdownItem value='Australia'>Australia</DropdownItem>
                                                <DropdownItem value='England'>England</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                               </NavLink>
                            </NavItem>
                            {
                                <NavItem>
                                    <NavLink>
                                        <UncontrolledDropdown direction="left"size='md' >
                                            <DropdownToggle caret outline>
                                                {(this.state.order)?this.state.order:<MdSort />}
                                            </DropdownToggle>
                                            <DropdownMenu  onClick={this.changeHandle_Order}>
                                                    <DropdownItem value=''><TiArrowUnsorted /> None</DropdownItem>
                                                    <DropdownItem value='Ascending'><AiOutlineSortAscending /> Ascending</DropdownItem>
                                                    <DropdownItem value='Descending'><AiOutlineSortDescending /> Descending</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </NavLink>
                                </NavItem>
                            }
                        </Nav>
                    </Navbar>
                </div>
                <div style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px', textAlign:'center'}}>
                    <Table hover size='md' responsive style={{border:'1px solid',cursor:'pointer'}}>
                        <thead style={{backgroundColor:'#343a40',color:'white'}}>
                            <th colSpan={8}>Players Details</th>
                        </thead>
                        <thead style={{backgroundColor:'light', borderBottom:'1px solid'}}>
                            <th>
                                <Input type='checkbox' name='check-all' onChange={this.handle_CheckAll}/><small><b>Select All</b></small>
                            </th>
                            {/* <th>#</th> */}
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Role</th>
                            <th>Action</th>
                        </thead>
                        <tbody >
                            {/* {
                                //splice(this.state.page-1,3)
                                this.props.player.map((player,index) => {
                                    if(player.name.toLowerCase().includes(this.state.search)) {
                                        if(player.team.includes(this.state.team)){
                                            return <tr>
                                                <th><Input type='checkbox' name='check' value={player._id} onChange={this.handle_Check} /></th>
                                                <th value={player._id} onClick={this.viewDetails}>{index+1}</th>
                                                <td value={player._id} ><img src={baseImgUrl + player.profilephoto} style={{border:'1px solid black', borderRadius:'25px',width:'50px',height:'50px'}} onClick={this.toggle} /></td>
                                                <td value={player._id} onClick={this.viewDetails}>{player.name}</td>
                                                <td value={player._id} onClick={this.viewDetails}>{player.team}</td>
                                                <td value={player._id} onClick={this.viewDetails}>{player.role}</td>
                                                <td colSpan='2'>
                                                    <Button outline color='success' value={player._id} onClick={this.edit}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>&nbsp;
                                                    <Button outline color='danger' value={player._id} onClick={this.delete}>Delete</Button>
                                                </td>    
                                            </tr>
                                        }
                                    }    
                                })
                            } */}
                            {/* player={this.props.player */}
                            {/* {console.log('current : ',this.state.currentPage)} */}
                            <Players player={currentPlayers} search={this.state.search} team={this.state.team} view={this.viewDetails} edit={this.edit} delete={this.delete} img={this.toggle} check={this.handle_Check} index={this.state.currentPage} order={this.state.order}/>
                        </tbody>
                </Table>
                </div>

                <div>
                <Navbar expand='sm'style={{backgroundColor:'#f2f2f2',marginLeft:'10px',marginRight:'10px',borderRadius:'5px',height:'50px'}}>
                        <NavbarBrand style={{fontSize:'15px'}}>
                            {/* <NavLink onClick={this.pagination} style={{float:'left',textAlign:'left'}}>
                                <Button outline size='sm'>Prev</Button>
                            </NavLink>
                            <NavLink onClick={this.pagination}>
                                <Button outline size='sm'>Next</Button>
                            </NavLink> */}
                            <Pagination playersPerPage={this.state.playerPerPage} totalPlayer={this.props.player.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
                        </NavbarBrand>
                        <Nav navbar className='ml-auto'>
                            <NavItem>
                                <NavLink>
                                    <Button tag={Link} to='/add-player' size='md' color='primary' outline ><MdGroupAdd style={{fontSize:'25px'}} /> Add Player</Button>
                               </NavLink>
                            </NavItem>
                            {
                                (this.state.check)?
                                    <>
                                        <NavItem>
                                            <NavLink>
                                            <Button size='md' outline color='info' onClick={this.viewDetails}>View Player</Button>
                                            </NavLink>
                                        </NavItem>

                                        {/* <NavItem>
                                            <NavLink>
                                            <Button size='md' outline color='danger'>Delete Player</Button>
                                            </NavLink>
                                        </NavItem> */}
                                    </>    
                                :''
                            }
                        </Nav>
                    </Navbar>
                </div>
                </Fade>
                <div>
				<Modal isOpen={this.state.modal}  toggle={this.toggle} style={{borderRadius:'50px',marginTop:'20vh'}}>
					<ModalBody style={{backgroundColor:'#f2f2f2'}}>
					<img src={this.state.img} alt='' style={{width:'100%',height:'50vh', borderRadius:'50px',border:'2px solid gray'}} />
					</ModalBody>
				</Modal>
				</div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {    
    let player=[]
    let players =  state.Player
    for (let index in players) {
        player.push({'_id': players[index]._id, 'profilephoto': players[index].profilephoto,'name': players[index].playername,'borndate' : players[index].borndate, 'team' : players[index].team, 'role' : players[index].role, 'batsman': players[index].batsman, 'bowler' : players[index].bowler})
    }
    // let d = [...player]
    // console.log('...: ',d.splice(1,3))
    return{
        player
    };
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        player: bindActionCreators (PlayerAction, dispatch)
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (Dashboard);