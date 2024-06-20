import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [credential, setCredential] = useState({ name: '', email: '', bio: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tempBio, setTempBio] = useState('');
    const host = "http://localhost:3060"

    const fetchProfile = async () => {

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No auth token found');
                setLoading(false);
                return;
            }
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Assuming the token is stored in localStorage
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCredential({ name: data.name, email: data.email, bio: data.bio });
                setLoading(false);
            } else {
                console.error('Failed to fetch profile data');
                setError('Failed to fetch profile data');
                setLoading(false);
            }
        } catch (error) {
            console.error('An error occurred while fetching profile data:', error);
            setError('An error occurred while fetching profile data');
            setLoading(false);
        }
    };



    const handleInputChange = (event) => {
        setTempBio(event.target.value);
    };

    const handleAddBio = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3060/api/auth/updatebio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ bio: tempBio })
            });

            if (response.ok) {
                const data = await response.json();
                setCredential({name:credential.name,email:credential.email,bio:data.bio})
                setTempBio('');
            } else {
                //console.error('Failed to update bio', response.status, response.statusText);
                setError(`Failed to update bio: ${response.statusText}`);
            }
        } catch (error) {
            //console.error('An error occurred while updating bio:', error);
            setError('An error occurred while updating bio');
        }
    };


    useEffect(() => {
        fetchProfile();
        
    }, []);


    if (loading) {
        return <div >Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container my-4">
            <div className="row justify-content-center">

                <div className="card w-35">
                    <div className="card-body">
                        <h3 className='text-black card-title '>{credential.name}</h3>
                        <h3 className="text card-title">{credential.email}</h3>
                        <p className="card-text">{credential.bio}</p>

                    </div>

                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write something..."
                        value={tempBio}
                        onChange={handleInputChange}
                    ></textarea>
                    <button onClick={handleAddBio} className="btn btn-primary mt-2">
                        Add Bio
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Profile;

