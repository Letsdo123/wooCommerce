import React, { useEffect } from 'react'
import { UserGroupIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import PageManager from '../../components/page_manager/PageManager';
import { useState } from 'react';
import SellerProfile from './SellerProfile';
import { useGetUserDataMutation } from '../../features/auth/authApi';
import { useSelector } from 'react-redux';


function permissionContent() {
    return (
        <div>
            <h1>Permission Content</h1>
        </div>
    )
}

function ProfileManager() {
    // const navigate = useNavigate();
    const [getUserData, { data, error, isLoading, isSuccess }] = useGetUserDataMutation();
    const [profileData, setProfileData] = useState(null);
    const [activeTab, setActiveTab] = useState("sellerProfile");
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
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    if (isSuccess && profileData) {
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
        const tabs = [
            {
                key: "sellerProfile",
                label: "Seller Profile",
                icon: UserGroupIcon,
                type: "SELLER",
                content: <SellerProfile profileData={profileData['SELLER']} documents={documents} />
            },
            {
                key: "logisticsProfile",
                label: "Logistics Profile",
                icon: ShieldCheckIcon,
                type: "LOGISTICS",
                content: permissionContent
            },
            // Add more tabs dynamically here...
        ];
        const tabConfigObj = {
            tabs: tabs,
            activeTab: activeTab,
            setActiveTab: setActiveTab
        }

        // This is the page configuration object
        const pageConfigObj = {
            pageHeader: {
                title: "Profile Management",
                description: "Manage your profile here"
            }
        }
        return (
            <div className='tab-test'>
                <PageManager pageConfigObj={pageConfigObj} tabConfigObj={tabConfigObj} />
            </div>
        )
    }
}

export default ProfileManager