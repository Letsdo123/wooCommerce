import React from 'react'
import { UserGroupIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import PageManager from '../../components/page_manager/PageManager';



function categoryContent(){
    return (
        <div>
            <h1>Category Content</h1>
        </div>
    )
}

function permissionContent(){
    return (
        <div>
            <h1>Permission Content</h1>
        </div>
    )
}

function PageTest() {
    const tabs = [
        {
            key: "categories",
            label: "Category",
            icon: UserGroupIcon,
            type: "category",
            content:categoryContent
        },
        {
            key: "permissions",
            label: "Permissions",
            icon: ShieldCheckIcon,
            type: "permission",
            content:permissionContent
        },
        // Add more tabs dynamically here...
    ];
    const [activeTab, setActiveTab] = React.useState(tabs[0].key);

    const tabConfigObj = {
        tabs: tabs,
        activeTab: activeTab,
        setActiveTab: setActiveTab
    }

    const pageConfigObj = {
        pageHeader: {
            title: "Product Category Management",
            description: "Manage product category dynamically"
        },
        pageContent: categoryContent
    }

    return (
        <div className='tab-test'>
           <PageManager pageConfigObj={pageConfigObj} tabConfigObj={tabConfigObj} />
        </div>
    )
}

export default PageTest