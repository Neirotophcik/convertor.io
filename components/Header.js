function Header() {
    try {
        return (
            <header data-name="header" data-file="components/Header.js" className="gradient-bg py-6 px-4 shadow-lg">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <i className="fas fa-image text-3xl text-blue-400"></i>
                        <h1 className="text-3xl font-bold text-white">Конвертер изображений</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a 
                            href="https://vk.com/neirotophcik" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-col items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <div className="flex items-center">
                                <i className="fab fa-vk mr-2"></i>
                                <span>Мы ВКонтакте</span>
                            </div>
                            <span className="text-xs mt-1 opacity-80">Каталог нейросетей</span>
                        </a>
                    </div>
                </div>
                <div className="absolute top-6 right-4">
                    <OnlineCounter />
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}