import React, { useState, useEffect } from 'react';

const About = () => {
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3060/api/auth/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          setBio(data.bio || ''); // Ensure bio is always a string
          setLoading(false);
        } else {
          setError(`Failed to fetch bio: ${response.statusText}`);
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching bio');
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row  justify-content-center ">
        <div className="card w-50 p-4 shadow-sm min-vh-25 hover-shadow box-shadow">
          <p className="card-text">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
