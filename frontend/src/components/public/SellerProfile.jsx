import React from 'react';
import ProfileView from './ProfileView';

function SellerProfile({ profileData, documents }) {
  const handleEdit = (updatedData) => {
    // Here you would typically make an API call to update the data
    console.log('Updating delivery profile:', updatedData);
    setProfileData(updatedData);
  };

  // Ensure profileData is fully populated before rendering ProfileView
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileView
          data={profileData}
          documents={documents}
          onEdit={handleEdit}
        />
      </div>
    );
  }

export default SellerProfile;