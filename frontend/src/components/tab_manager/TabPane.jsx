const TabPane = ({ activeTab, tabs }) => {
    const activeTabData = tabs.find((tab) => tab.key === activeTab);
    console.log(activeTabData);
    if (!activeTabData || !activeTabData.content) return null;
    const ActiveComponent = activeTabData.content;
    return (
        <div className="tab-pane">
            <div id={activeTabData.key} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Here we will replace content  */}
                {ActiveComponent}
            </div>
        </div>
    );
};

export default TabPane;
