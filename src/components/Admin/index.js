import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        };
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.unsubscribe = this.props.firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];
                snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid: doc.id }),
                );
                this.setState({
                    users,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                <p>
                    The Admin Page is accessible by every signed in admin user.
                </p>

                {loading && <div>Loading ...</div>}
                <UserList users={users} />
            </div>
        );
    }
}
const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
                <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
                <span>
          <strong>Username:</strong> {user.username}
        </span>
            </li>
        ))}
    </ul>
);
const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
    withAuthorization(condition),
    withFirebase,
)(AdminPage);