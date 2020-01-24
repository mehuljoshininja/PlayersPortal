import React from 'react';

class UserDashboard extends React.Component {
    render() {
        return (
            <p> Welcome <b>{localStorage.getItem('username')}</b></p>
        )
    }
}

export default UserDashboard;