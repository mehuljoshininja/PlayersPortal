import React from 'react';
import {Button,Input} from 'reactstrap';
// import { MdDeleteForever } from 'react-icons/md';
// import { FaUserEdit } from 'react-icons/fa';
const baseImgUrl = 'http://localhost:3000/uploads/';


class Player extends React.Component {

    ascSortOrder = (prop) => {  
        // console.log('order :')
        return function(a, b) {  
            if (a[prop] > b[prop]) {  
                // console.log('order :',1)
                return 1;  
            } else if (a[prop] < b[prop]) {  
                // console.log('order :',-1)
                return -1;  
            }  
            return 0;  
        }  
    }  

    descSortOrder = (prop) => {  
        // console.log('order :')
        return function(a, b) {  
            if (a[prop] < b[prop]) {  
                // console.log('order :',1)
                return 1;  
            } else if (a[prop] > b[prop]) {  
                // console.log('order :',-1)
                return -1;  
            }  
            return 0;  
        }  
    }  

     render(){
        // console.log('order : ',this.props.order)
        if(this.props.order === 'Ascending'){
            this.props.player.sort(this.ascSortOrder('name'))
        } else if(this.props.order === 'Descending'){
            this.props.player.sort(this.descSortOrder('name'))
        }
        let flag=0

        return(
            <>
                {
                    this.props.player.map((player) => {
                        if(player.name.toLowerCase().includes(this.props.search)) {
                            if(player.team.includes(this.props.team)){
                                flag=1
                                return <tr>
                                    <th>
                                        <Input type='checkbox' name='check' value={player._id} onChange={this.props.check} />
                                    </th>
                                    <td value={player._id} >
                                        <img src={baseImgUrl + player.profilephoto} alt='' style={{border:'1px solid black', borderRadius:'25px',width:'50px',height:'50px'}} onClick={this.props.img} />
                                    </td>
                                    <td value={player._id} onClick={this.props.view}>{player.name}</td>
                                    <td value={player._id} onClick={this.props.view}>{player.team}</td>
                                    <td value={player._id} onClick={this.props.view}>{player.role}</td>
                                    <td colSpan='2'>
                                        <Button outline color='success' value={player._id} onClick={this.props.edit} style={{width:'70px'}}> Edit </Button>&nbsp;
                                        <Button outline color='danger' value={player._id} onClick={this.props.delete}>Delete </Button>
                                    </td>    
                                </tr>
                            }
                        }  
                        return null;
                    }) 
                    
                }
                {(!flag)? <tr><th style={{backgroundColor:'#f2f2f2'}} colSpan='8'>No Records Found</th></tr> : null}
            </>
        )
    }
}

export default Player;