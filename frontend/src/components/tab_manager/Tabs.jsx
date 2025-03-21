const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="bg-white rounded-lg shadow mb-6 border-b px-4">
            <div className="flex space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`py-4 px-4 focus:outline-none ${
                            activeTab === tab.key ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <div className="flex items-center space-x-2">
                            {tab.icon && <tab.icon className="h-5 w-5" />}  {/* Renders the Icon */}
                            <span>{tab.label}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
