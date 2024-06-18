import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [credential, setCredential] = useState({ name: '', email: '' });

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3020/api/auth/getuser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Assuming the token is stored in localStorage
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCredential({ Name: data.name, email: data.email });
            } else {
                console.error('Failed to fetch profile data');
            }
        } catch (error) {
            console.error('An error occurred while fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h1 className='text-black '>{credential.name}</h1>
                    <h2 className="text">{credential.email}</h2>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Write something..."
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
