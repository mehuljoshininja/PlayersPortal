import * as PlayerServices from '../../Services/Player/player-services';
import { FETCH_DATA } from '../../Reducer/Default-Reducer/Player/player-reducer';

export const addPlayer = (data, props) => {
    return () => {
        PlayerServices.addPlayer(data)
            .then((response) => {
                if (response.status === 200) {
                    if (window.confirm("Do You Want To Add One More Player ?")) {
                        props.history.push('/add-player');
                    } else {
                        props.history.push('/dashboard');
                    }
                }
            })
            .catch((error) => {
                console.log('Something Went Wrong : ', error)
                alert('Something Went Wrong... Please Try Again...');
            })
    }
}


export const editPlayer = (data, props) => {
    return () => {
        PlayerServices.editPlayer(data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Record SucessFully Updated....')
                    props.history.push('/dashboard');
                    window.location.reload()
                } else {
                    alert('Something Went Wrong... Please Try Again...');
                }
            })
            .catch((error) => {
                console.log('Something Went Wrong : ', error)
                alert('Something Went Wrong... Please Try Again...');
            })
    }
}

export const deletePlayer = (data, props) => {
    return () => {
        PlayerServices.deletePlayer(data)
            .then((response) => {
                if (response.status === 200) {
                    alert('Record SucessFully Delete....')
                    window.location.reload()
                } else {
                    alert('Something Went Wrong... Please Try Again...');
                }
            })
            .catch((error) => {

                alert('Something Went Wrong... Please Try Again...');
            })
    }
}


export const fetchData = () => {
    // debugger
    return (dispatch) => {
        PlayerServices.fetchData()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: FETCH_DATA,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Something Went Wrong..')
            });
    }
}