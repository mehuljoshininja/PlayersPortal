import React from 'react';
import { 
	Navbar, NavbarBrand, Nav, NavItem, NavLink,
	Modal, ModalBody, ModalHeader
	} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FiLogOut,FiLogIn } from 'react-icons/fi';
import { FaRegUserCircle,FaHome } from 'react-icons/fa';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

const baseImgUrl = 'http://localhost:3000/uploads/';

class Header extends React.Component {

	state = {
		modal:0
	}

	toggle = () => this.setState({
		modal: !this.state.modal
	})

    render(){
		const loggedIn = <>
							<NavItem >
								<NavLink tag={Link} to='/login' style={{fontSize:'20px'}}>
									<FiLogIn/> SignIn
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to='/register-user' style={{fontSize:'20px'}}>
									<FaRegUserCircle /> SignUp
								</NavLink>
							</NavItem>
						</>
		const notLoggedIn = <>
								<NavItem>
									<NavLink id='profile' onClick={this.toggle} >
										<img src={baseImgUrl + localStorage.getItem('profile')} alt='' style={{width:'3vw',borderRadius:'50px',border:'1px solid gray'}} />
										<UncontrolledTooltip placement='down' target='profile'>View Profile</UncontrolledTooltip>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} to='/logout' id='logout'>
										<FiLogOut  style={{width:'3vw',height:'35px',marginTop:'8px'}} />
										<UncontrolledTooltip placement='down' target='logout'>Logout</UncontrolledTooltip>
									</NavLink>
								</NavItem>
							</>						
        return(
            <div>
                <Navbar expand='md' color='dark' dark>
                    <NavbarBrand tag={Link} to='dashboard'>
						{(localStorage.getItem('token'))?<FaHome style={{fontSize:'30px'}}/>:''} Players<span style={{color:'lightgray'}}>Portal</span>
					</NavbarBrand>
                    <Nav className='ml-auto' navbar>
						{(!localStorage.getItem('token'))
							? <>
								{loggedIn}
							  </>
							: <>
								{notLoggedIn}
							  </>
						}
                    </Nav>
                </Navbar>

				<div>
				<Modal isOpen={this.state.modal}  toggle={this.toggle}>
					<ModalHeader style={{textAlign:'center'}}>
						{localStorage.getItem('username')}
					</ModalHeader>
					<ModalBody style={{backgroundColor:'#f2f2f2'}}>
						<img src={baseImgUrl + localStorage.getItem('profile')} alt='' style={{width:'100%', height:'50vh', borderRadius:'50px',border:'2px solid gray'}} />
					</ModalBody>
				</Modal>
				</div>
            </div>
        )
    }
}

export default Header;