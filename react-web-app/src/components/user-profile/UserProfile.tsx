import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  getCurrentUserProfile,
  selectUserProfile,
  modifyUserProfile,
} from '../../store/features/user-profile-slice';
import './UserProfile.css';
import { UserProfile as UserProfileModel } from '../../models/UserProfile'; 

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => selectUserProfile(state)); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
  });

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  
  useEffect(() => {
    if (userProfile) {
      setFormData({
        email: userProfile.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        address: userProfile.address || '', 
      });
    }
  }, [userProfile]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSave = () => {
    if (userProfile) {
  
      const updatedProfile: UserProfileModel = {
        ...userProfile, 
        ...formData, 
      };
      dispatch(modifyUserProfile({ updatedProfile }));
      setIsEditing(false); 
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {isEditing ? (
        <div className="edit-profile">
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          <label>First Name:</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
          <label>Last Name:</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
          <label>Address:</label>
          <input name="address" value={formData.address} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-details">
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>First Name:</strong> {userProfile.firstName}</p>
          <p><strong>Last Name:</strong> {userProfile.lastName}</p>
          <p><strong>Address:</strong> {userProfile.address}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
