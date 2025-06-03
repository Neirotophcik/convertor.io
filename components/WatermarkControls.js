function WatermarkControls({ watermarks, onWatermarkChange, onAddWatermark, onRemoveWatermark }) {
    try {
        const [activeWatermarkIndex, setActiveWatermarkIndex] = React.useState(0);
        
        const positions = [
            { value: 'none', label: 'Без водяного знака', icon: 'fa-times' },
            { value: 'top-left', label: 'Слева сверху', icon: 'fa-arrow-up' },
            { value: 'top-right', label: 'Справа сверху', icon: 'fa-arrow-up' },
            { value: 'center', label: 'По центру', icon: 'fa-dot-circle' },
            { value: 'bottom-left', label: 'Слева снизу', icon: 'fa-arrow-down' },
            { value: 'bottom-right', label: 'Справа снизу', icon: 'fa-arrow-down' }
        ];

        const fonts = [
            { value: 'Arial', label: 'Arial' },
            { value: 'Times New Roman', label: 'Times' },
            { value: 'Helvetica', label: 'Helvetica' },
            { value: 'Georgia', label: 'Georgia' },
            { value: 'Verdana', label: 'Verdana' }
        ];
        
        // Убедимся, что активный индекс не выходит за пределы массива
        React.useEffect(() => {
            if (activeWatermarkIndex >= watermarks.length && watermarks.length > 0) {
                setActiveWatermarkIndex(watermarks.length - 1);
            }
        }, [watermarks.length, activeWatermarkIndex]);
        
        const activeWatermark = watermarks[activeWatermarkIndex];

        return (
            <div data-name="watermark-controls" data-file="components/WatermarkControls.js" 
                 className="p-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Водяные знаки</h3>
                    <button 
                        onClick={onAddWatermark}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center"
                    >
                        <i className="fas fa-plus mr-1"></i> Добавить
                    </button>
                </div>
                
                {watermarks.length > 0 && (
                    <>
                        <div className="flex border-b border-gray-700 mb-4 overflow-x-auto">
                            {watermarks.map((watermark, index) => (
                                <button
                                    key={watermark.id}
                                    className={`px-4 py-2 text-sm font-medium flex items-center whitespace-nowrap ${
                                        index === activeWatermarkIndex 
                                            ? 'text-blue-400 border-b-2 border-blue-400' 
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                    onClick={() => setActiveWatermarkIndex(index)}
                                >
                                    <span>Знак #{index + 1}</span>
                                    {watermarks.length > 1 && (
                                        <i 
                                            className="fas fa-times ml-2 text-xs hover:text-red-400" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveWatermark(watermark.id);
                                            }}
                                        ></i>
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        {activeWatermark && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Текст водяного знака</label>
                                    <input
                                        type="text"
                                        value={activeWatermark.text || ''}
                                        onChange={(e) => onWatermarkChange(activeWatermark.id, { text: e.target.value })}
                                        placeholder="Введите текст водяного знака"
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Шрифт</label>
                                        <select
                                            value={activeWatermark.font || 'Arial'}
                                            onChange={(e) => onWatermarkChange(activeWatermark.id, { font: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none">
                                            {fonts.map((font) => (
                                                <option key={font.value} value={font.value}>{font.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Размер</label>
                                        <input
                                            type="number"
                                            min="10"
                                            max="100"
                                            value={activeWatermark.fontSize || 20}
                                            onChange={(e) => onWatermarkChange(activeWatermark.id, { fontSize: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Цвет шрифта</label>
                                    <input
                                        type="color"
                                        value={activeWatermark.color || '#ffffff'}
                                        onChange={(e) => onWatermarkChange(activeWatermark.id, { color: e.target.value })}
                                        className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Позиция</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {positions.map((position) => (
                                            <button
                                                key={position.value}
                                                onClick={() => onWatermarkChange(activeWatermark.id, { position: position.value })}
                                                className={`p-3 rounded-lg border text-left transition-all ${
                                                    activeWatermark.position === position.value
                                                        ? 'border-yellow-400 bg-yellow-400 bg-opacity-20 text-yellow-300'
                                                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                                                }`}>
                                                <i className={`fas ${position.icon} mr-2`}></i>
                                                <span className="text-sm">{position.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                
                {watermarks.length === 0 && (
                    <div className="text-center py-6 text-gray-400">
                        <i className="fas fa-copyright text-3xl mb-2"></i>
                        <p>Нажмите "Добавить" для создания водяного знака</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('WatermarkControls component error:', error);
        reportError(error);
    }
}