import React, { useEffect, useState } from 'react';
import ProfileView from './ProfileView';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserDataMutation } from '../../features/auth/authApi';

function SellerProfile() {
  // const navigate = useNavigate();
  const [getUserData, { data, error, isLoading, isSuccess }] = useGetUserDataMutation();
  const [profileData, setProfileData] = useState(null);
  const { entityDetails } = useSelector((state) => state.auth);
  console.log("Entity details from redux:", entityDetails);
  const entityIds = Object.values(entityDetails);
  const entityTypes = Object.keys(entityDetails);
  console.log(`Entity Ids: ${entityIds}, Entity Types: ${entityTypes}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData({ entityIds, entityTypes });
        console.log("Get user data:", data);
        setProfileData(response.data.data);
        console.log("Inside SellerProfile component");
        if (error) {
          console.error("Error while fetching user data:", error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchData();
  }, [JSON.stringify(entityIds), JSON.stringify(entityTypes), getUserData]);
  // Sample delivery partner data
  const initialData = {
    business_name: "Swift Delivery Services",
    owner_name: "John Smith",
    business_email: "john.smith@swiftdelivery.com",
    business_mobile: "9876543210",
    gstin: "29ABCDE1234F1Z5",
    delivery_capacity: 50,
    address: {
      address: "123 Delivery Lane, Transport Hub",
      city: "Bangalore",
      state: "Karnataka",
      postal_code: "560001"
    },
    bank: {
      account_holder_name: "John Smith",
      bank_name: "State Bank of India",
      account_number: "1234567890",
      ifsc_code: "SBIN0123456",
      account_type: "savings",
      upi_id: "john@upi"
    }
  };
  // const [profileData, setProfileData] = useState(initialData);

  // Sample documents
  const documents = [
    {
      documentType: "identityProof",
      publicId: "delivery/documents/identity.pdf",
      fileType: "raw",
    },
    {
      documentType: "addressProof",
      publicId: "delivery/documents/address.pdf",
      fileType: "raw",
    },
    {
      documentType: "businessLicense",
      publicId: "delivery/documents/license.pdf",
      fileType: "raw",
    }
  ];

  const handleEdit = (updatedData) => {
    // Here you would typically make an API call to update the data
    console.log('Updating delivery profile:', updatedData);
    setProfileData(updatedData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  // Ensure profileData is fully populated before rendering ProfileView
  if (isSuccess && profileData) {
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
  return <p>Loading...</p>;
}

export default SellerProfile;