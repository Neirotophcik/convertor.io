function ResizeControls({ dimensions, onDimensionChange, aspectRatio }) {
    try {
        const [keepOriginalSize, setKeepOriginalSize] = React.useState(true);
        const [lockAspectRatio, setLockAspectRatio] = React.useState(true);
        const [width, setWidth] = React.useState(dimensions.width);
        const [height, setHeight] = React.useState(dimensions.height);
        
        React.useEffect(() => {
            if (dimensions.width && dimensions.height) {
                setWidth(dimensions.width);
                setHeight(dimensions.height);
            }
        }, [dimensions]);
        
        React.useEffect(() => {
            if (keepOriginalSize) {
                onDimensionChange({ 
                    width: dimensions.width, 
                    height: dimensions.height,
                    keepOriginalSize: true
                });
            } else {
                onDimensionChange({ 
                    width, 
                    height,
                    keepOriginalSize: false
                });
            }
        }, [keepOriginalSize, width, height, dimensions.width, dimensions.height]);
        
        const handleWidthChange = (e) => {
            const newWidth = parseInt(e.target.value);
            setWidth(newWidth);
            
            if (lockAspectRatio && aspectRatio) {
                setHeight(Math.round(newWidth / aspectRatio));
            }
        };
        
        const handleHeightChange = (e) => {
            const newHeight = parseInt(e.target.value);
            setHeight(newHeight);
            
            if (lockAspectRatio && aspectRatio) {
                setWidth(Math.round(newHeight * aspectRatio));
            }
        };
        
        return (
            <div data-name="resize-controls" data-file="components/ResizeControls.js" className="p-4">
                <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={keepOriginalSize}
                            onChange={() => setKeepOriginalSize(!keepOriginalSize)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-medium">Сохранить оригинальный размер</span>
                    </label>
                </div>
                
                {!keepOriginalSize && (
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center cursor-pointer mb-2">
                                <input
                                    type="checkbox"
                                    checked={lockAspectRatio}
                                    onChange={() => setLockAspectRatio(!lockAspectRatio)}
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium">Сохранить пропорции</span>
                            </label>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Ширина (px)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    value={width || ''}
                                    onChange={handleWidthChange}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Высота (px)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    value={height || ''}
                                    onChange={handleHeightChange}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
                                />
                            </div>
                        </div>
                        
                        {dimensions.width && dimensions.height && (
                            <div className="text-xs text-gray-400 mt-2">
                                Оригинальный размер: {dimensions.width} × {dimensions.height} px
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ResizeControls component error:', error);
        reportError(error);
    }
}