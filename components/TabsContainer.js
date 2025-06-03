function TabsContainer({ children, activeTab, setActiveTab }) {
    const tabs = React.Children.toArray(children);
    
    return (
        <div className="card-dark rounded-lg overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-700 justify-between">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
                            activeTab === index 
                                ? 'text-blue-400 border-b-2 border-blue-400' 
                                : 'text-gray-400 hover:text-gray-200'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.icon && <i className={`${tab.props.icon} mr-2`}></i>}
                        <span>{tab.props.label}</span>
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabs[activeTab] || <div className="p-4 text-center text-gray-500">Содержимое не найдено</div>}
            </div>
        </div>
    );
}

function Tab({ children, label, icon }) {
    return (
        <div className="tab-content">
            {children}
        </div>
    );
}

// Экспортируем оба компонента
TabsContainer.Tab = Tab;