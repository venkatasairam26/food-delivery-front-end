import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import './index.css';
import appUrl from '../../context/storeContext';

const apiStatusContext = {
    initial: "INITIAL",
    success: "SUCCESS",
    inProgress: "PROGRESS",
    failure: "FAILURE"
}

const Profile = () => {
    const history = useHistory();
    const [apiResponse, setApiResponse] = useState({
        apiStatus: 'INITIAL',
        data: null,
        errorMsg: null
    });

    const onLogoutClicked = () =>{
        Cookies.remove('jwt_token')
        history.replace('/login')
    }
    
    useEffect(() => {
        getProfileData()}, []);

    const getProfileData = async () => {
        setApiResponse({
            apiStatus: apiStatusContext.inProgress,
            data: null,
            errorMsg: null
        });

        const jwtToken = Cookies.get('jwt_token');
        const apiUrl = appUrl + '/profile';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(apiUrl, options);
            
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setApiResponse({
                    apiStatus: apiStatusContext.success,
                    data: data,
                    errorMsg: null
                });
            } else {
                throw new Error('Failed to fetch profile data');
            }
        } catch (error) {
            setApiResponse({
                apiStatus: apiStatusContext.failure,
                data: null,
                errorMsg: error.message
            });
        }
    }
    
    const renderProfileContent = () => {
        const { apiStatus, data, errorMsg } = apiResponse;

        switch (apiStatus) {
            case apiStatusContext.success:
                return (
                    <div className="profile-details">
                        <h2>name: {data.username}</h2>
                        <p>Email: {data.email}</p>
                        {/* Add more profile details as needed */}
                    </div>
                );
            case apiStatusContext.failure:
                return <p className="error-message">Error: {errorMsg}</p>;
            case apiStatusContext.inProgress:
                return <p className="loading-message">Loading...</p>;
            default:
                return null;
        }
    }

  return (
    <div className="profile-container">
       <div className="profile-card">
         <h1>Profile</h1>
        {renderProfileContent()}
        <button className='login-button' onClick={onLogoutClicked}>LogOut</button>
       </div>
    </div>
  );
}
export default Profile;