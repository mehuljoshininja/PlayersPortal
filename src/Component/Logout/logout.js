function logout(props) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('profile');

    window.location.reload();
    props.history.push('/login');
}

export default logout;