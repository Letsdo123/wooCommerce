import TabManager from "../tab_manager/TabManager";

const PageManager = ({ pageConfigObj, tabConfigObj }) => {
    // Dynamic tab configurations
    const { tabs, activeTab, setActiveTab } = tabConfigObj
    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="mb-6 flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{pageConfigObj.pageHeader.title}</h1>
                <p className="text-gray-600">{pageConfigObj.pageHeader.description}</p>
            </div>
            {/* Page Content */}
            <div className="page-container">
                {tabs && tabs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        Content without tab
                    </div>
                ) : (<TabManager tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />)}
            </div>
        </div>
    );
};

export default PageManager;
