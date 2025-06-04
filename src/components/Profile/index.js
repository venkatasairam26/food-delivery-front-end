import './index.css';
import Header from '../header';

const Profile = () => {
  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-description">Manage your account details and preferences here.</p>
        {/* Additional profile content can be added here */}
      </div>
    </div>
  );
}
export default Profile;