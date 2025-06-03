function OnlineCounter() {
    try {
        const [onlineCount, setOnlineCount] = React.useState(0);

        React.useEffect(() => {
            updateOnlineCount();
            const interval = setInterval(updateOnlineCount, 5000);
            return () => clearInterval(interval);
        }, []);

        const updateOnlineCount = async () => {
            try {
                const count = await getOnlineUsersCount();
                setOnlineCount(count);
            } catch (error) {
                console.error('Failed to update online count:', error);
            }
        };

        return (
            <div data-name="online-counter" data-file="components/OnlineCounter.js" 
                 className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{onlineCount} онлайн</span>
            </div>
        );
    } catch (error) {
        console.error('OnlineCounter component error:', error);
        reportError(error);
    }
}
