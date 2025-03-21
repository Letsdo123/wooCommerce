import Tabs from "./Tabs";
import TabPane from "./TabPane";

const TabManager = ({ tabs=[], activeTab="", setActiveTab=null }) => {
    // Dynamic tab configurations
    return (
        <>
            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* TabPane - Dynamic content rendering */}
            <TabPane activeTab={activeTab} tabs={tabs} />
        </>
    );
};

export default TabManager;
