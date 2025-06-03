function ImagePreview({ originalImage, processedImage, isProcessing, onDownload }) {
    try {
        const [zoomState, setZoomState] = React.useState({
            original: { zoomed: false, dragging: false, x: 0, y: 0, startX: 0, startY: 0 },
            processed: { zoomed: false, dragging: false, x: 0, y: 0, startX: 0, startY: 0 }
        });
        
        const [fullscreenImage, setFullscreenImage] = React.useState(null);
        const [fullscreenType, setFullscreenType] = React.useState('original'); // 'original' или 'processed'
        const [clickStartTime, setClickStartTime] = React.useState(0);
        
        const handleMouseDown = (e, type) => {
            setClickStartTime(Date.now());
            if (zoomState[type].zoomed) {
                e.preventDefault();
                setZoomState(prev => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        dragging: true,
                        startX: e.clientX - prev[type].x,
                        startY: e.clientY - prev[type].y
                    }
                }));
            }
        };
        
        const handleMouseMove = (e, type) => {
            if (zoomState[type].dragging && zoomState[type].zoomed) {
                e.preventDefault();
                setZoomState(prev => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        x: e.clientX - prev[type].startX,
                        y: e.clientY - prev[type].startY
                    }
                }));
            }
        };
        
        const handleMouseUp = (e, type, imageUrl) => {
            const clickDuration = Date.now() - clickStartTime;
            const wasDragging = zoomState[type].dragging;
            
            setZoomState(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    dragging: false
                }
            }));
            
            // Если это был короткий клик (менее 200мс) и не было перетаскивания, открываем полноэкранный режим
            if (clickDuration < 200 && !wasDragging && !zoomState[type].zoomed) {
                openFullscreen(imageUrl, type);
            }
        };
        
        const handleMouseEnter = (type) => {
            setZoomState(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    zoomed: true
                }
            }));
        };
        
        const handleMouseLeave = (type) => {
            setZoomState(prev => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    zoomed: false,
                    dragging: false,
                    x: 0,
                    y: 0
                }
            }));
        };

        const getImageStyle = (type) => {
            const state = zoomState[type];
            return {
                transform: state.zoomed ? `scale(2) translate(${state.x / 20}px, ${state.y / 20}px)` : 'scale(1)',
                transition: state.dragging ? 'none' : 'transform 0.2s',
                cursor: state.zoomed ? (state.dragging ? 'grabbing' : 'grab') : 'zoom-in',
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
            };
        };
        
        const openFullscreen = (imageUrl, type) => {
            setFullscreenImage(imageUrl);
            setFullscreenType(type);
        };
        
        const closeFullscreen = () => {
            setFullscreenImage(null);
        };
        
        const toggleFullscreenType = () => {
            if (fullscreenType === 'original' && processedImage) {
                setFullscreenType('processed');
                setFullscreenImage(processedImage);
            } else if (fullscreenType === 'processed' && originalImage) {
                setFullscreenType('original');
                setFullscreenImage(originalImage);
            }
        };

        return (
            <div data-name="image-preview" data-file="components/ImagePreview.js" 
                 className="card-dark p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <i className="fas fa-eye mr-2 text-indigo-400"></i>
                    Предварительный просмотр
                </h3>
                
                {!originalImage && (
                    <div className="text-center py-12 text-gray-400">
                        <i className="fas fa-image text-4xl mb-4"></i>
                        <p>Загрузите изображение для предварительного просмотра</p>
                    </div>
                )}

                {originalImage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-300">Оригинал</h4>
                            <div className="preview-container bg-gray-800 rounded-lg p-4 overflow-hidden">
                                <div 
                                    className="w-full h-64 flex items-center justify-center overflow-hidden"
                                    onMouseDown={(e) => handleMouseDown(e, 'original')}
                                    onMouseMove={(e) => handleMouseMove(e, 'original')}
                                    onMouseUp={(e) => handleMouseUp(e, 'original', originalImage)}
                                    onMouseLeave={() => handleMouseLeave('original')}
                                    onMouseEnter={() => handleMouseEnter('original')}
                                >
                                    <img
                                        src={originalImage}
                                        alt="Оригинал"
                                        style={getImageStyle('original')}
                                        draggable="false"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <button 
                                        onClick={() => openFullscreen(originalImage, 'original')}
                                        className="text-xs text-blue-400 hover:text-blue-300"
                                    >
                                        <i className="fas fa-expand-arrows-alt mr-1"></i> Полный размер
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-300">Результат</h4>
                            <div className="preview-container bg-gray-800 rounded-lg p-4 relative overflow-hidden">
                                {isProcessing ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                                        <span className="ml-2 text-gray-400">Обработка...</span>
                                    </div>
                                ) : processedImage ? (
                                    <>
                                        <div 
                                            className="w-full h-64 flex items-center justify-center overflow-hidden"
                                            onMouseDown={(e) => handleMouseDown(e, 'processed')}
                                            onMouseMove={(e) => handleMouseMove(e, 'processed')}
                                            onMouseUp={(e) => handleMouseUp(e, 'processed', processedImage)}
                                            onMouseLeave={() => handleMouseLeave('processed')}
                                            onMouseEnter={() => handleMouseEnter('processed')}
                                        >
                                            <img
                                                src={processedImage}
                                                alt="Результат"
                                                style={getImageStyle('processed')}
                                                draggable="false"
                                            />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <button 
                                                onClick={() => openFullscreen(processedImage, 'processed')}
                                                className="text-xs text-blue-400 hover:text-blue-300"
                                            >
                                                <i className="fas fa-expand-arrows-alt mr-1"></i> Полный размер
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-64 text-gray-400">
                                        <p>Настройте параметры для просмотра результата</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {processedImage && !isProcessing && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={onDownload}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto">
                            <i className="fas fa-download mr-2"></i>
                            Скачать результат
                        </button>
                    </div>
                )}
                
                {fullscreenImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeFullscreen}>
                        <div className="relative max-w-full max-h-full">
                            <div className="absolute top-2 right-2 flex space-x-2">
                                {originalImage && processedImage && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFullscreenType();
                                        }}
                                        className="bg-gray-800 bg-opacity-70 text-white rounded-lg px-3 py-1 flex items-center text-sm"
                                    >
                                        <i className={`fas ${fullscreenType === 'original' ? 'fa-magic' : 'fa-image'} mr-2`}></i>
                                        {fullscreenType === 'original' ? 'С фильтрами' : 'Оригинал'}
                                    </button>
                                )}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeFullscreen();
                                    }}
                                    className="bg-gray-800 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <img 
                                src={fullscreenImage} 
                                alt={fullscreenType === 'original' ? 'Оригинал' : 'С фильтрами'} 
                                className="max-w-full max-h-[90vh] object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ImagePreview component error:', error);
        reportError(error);
    }
}