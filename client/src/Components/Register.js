import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUsersList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !mobile) {
            alert("Please fill in all fields!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/register', { name, mobile });
            console.log(response.data);
            alert("Successfully added!");
            fetchUsersList();
            setName('');
            setMobile('');
        } catch (error) {
            console.error("Error in adding user:", error);
            alert("Failed to register user!");
        }
    };

    const fetchUsersList = async () => {
        try {
            const fetchedUsers = await axios.get('http://localhost:3001/getusers');
            setUserData(fetchedUsers.data);
        } catch (error) {
            console.error("Error in fetching user:", error);
        }
    };

    const handelDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/getuser/` + id);
            if (response.status === 200) {
                alert("Deleted Succefully!");
            }
            fetchUsersList();
        } catch (error) {
            console.error("Error in adding user:", error);
            alert("Failed to delete user!");
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}  // Updates name state
                        placeholder='Enter your name'
                    />
                </label>
                <br />
                <label>
                    Mobile:
                    <input
                        type='text'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}  // Updates mobile state
                        placeholder='Enter your mobile'
                    />
                </label>
                <br />
                <button type='submit'>Register</button>
            </form>

            <div>
                <h2>Registered Users</h2>
                {userData.length > 0 ? (
                    <table border={1} align='center'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <button type='submit'>Update </button>
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handelDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data found!</p>
                )}
            </div>
        </div>
    );
};
