function App() {
    try {
        const [originalFile, setOriginalFile] = React.useState(null);
        const [originalImageUrl, setOriginalImageUrl] = React.useState(null);
        const [processedImageUrl, setProcessedImageUrl] = React.useState(null);
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [selectedFormat, setSelectedFormat] = React.useState('jpeg');
        const [filters, setFilters] = React.useState({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0
        });
        const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
        const [aspectRatio, setAspectRatio] = React.useState(null);
        const [watermarks, setWatermarks] = React.useState([
            { id: 1, text: '', position: 'none', font: 'Arial', fontSize: 20, color: '#ffffff' }
        ]);
        const [activeTab, setActiveTab] = React.useState(0);

        const handleImageUpload = (file) => {
            setOriginalFile(file);
            const url = URL.createObjectURL(file);
            setOriginalImageUrl(url);
            
            // Get image dimensions
            const img = new Image();
            img.onload = () => {
                setDimensions({ width: img.width, height: img.height });
                setAspectRatio(img.width / img.height);
            };
            img.src = url;
        };

        const handleFilterChange = (filterName, value) => {
            setFilters(prev => ({ ...prev, [filterName]: value }));
        };

        const handleDimensionChange = (newDimensions) => {
            setDimensions(newDimensions);
        };

        const handleWatermarkChange = (id, changes) => {
            setWatermarks(prev => 
                prev.map(wm => wm.id === id ? { ...wm, ...changes } : wm)
            );
        };

        const addWatermark = () => {
            // Создаем новый ID, который гарантированно будет уникальным
            const newId = watermarks.length > 0 
                ? Math.max(...watermarks.map(wm => wm.id)) + 1 
                : 1;
                
            // Добавляем новый водяной знак с полным набором свойств
            setWatermarks(prev => [
                ...prev, 
                { 
                    id: newId, 
                    text: '', 
                    position: 'center', 
                    font: 'Arial', 
                    fontSize: 20, 
                    color: '#ffffff' 
                }
            ]);
        };

        const removeWatermark = (id) => {
            setWatermarks(prev => {
                // Не удаляем последний водяной знак
                if (prev.length <= 1) return prev;
                return prev.filter(wm => wm.id !== id);
            });
        };

        const processCurrentImage = async () => {
            if (!originalFile) return;
            
            setIsProcessing(true);
            try {
                const processedBlob = await processImage(originalFile, {
                    format: selectedFormat,
                    filters,
                    dimensions,
                    watermarks
                });
                
                const url = URL.createObjectURL(processedBlob);
                setProcessedImageUrl(url);
            } catch (error) {
                console.error('Image processing failed:', error);
            } finally {
                setIsProcessing(false);
            }
        };

        const handleDownload = () => {
            if (processedImageUrl) {
                const a = document.createElement('a');
                a.href = processedImageUrl;
                a.download = `converted-image.${selectedFormat}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };

        React.useEffect(() => {
            if (originalFile) {
                processCurrentImage();
            }
        }, [selectedFormat, filters, dimensions, watermarks]);

        return (
            <div data-name="app" data-file="app.js" className="min-h-screen bg-gray-900">
                <Header />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <ImageUploader onImageUpload={handleImageUpload} />
                            <ImagePreview 
                                originalImage={originalImageUrl}
                                processedImage={processedImageUrl}
                                isProcessing={isProcessing}
                                onDownload={handleDownload}
                            />
                        </div>
                        <div className="space-y-6">
                            <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab}>
                                <TabsContainer.Tab label="Формат" icon="fas fa-file-image">
                                    <FormatSelector 
                                        selectedFormat={selectedFormat}
                                        onFormatChange={setSelectedFormat}
                                    />
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Фильтры" icon="fas fa-sliders-h">
                                    <ColorFilters 
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                    />
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Размер" icon="fas fa-expand-arrows-alt">
                                    <ResizeControls 
                                        dimensions={dimensions}
                                        onDimensionChange={handleDimensionChange}
                                        aspectRatio={aspectRatio}
                                    />
                                </TabsContainer.Tab>
                                <TabsContainer.Tab label="Водяной знак" icon="fas fa-copyright">
                                    <WatermarkControls 
                                        watermarks={watermarks}
                                        onWatermarkChange={handleWatermarkChange}
                                        onAddWatermark={addWatermark}
                                        onRemoveWatermark={removeWatermark}
                                    />
                                </TabsContainer.Tab>
                            </TabsContainer>
                            
                            {originalFile && (
                                <ImageInfo 
                                    originalFile={originalFile}
                                    dimensions={dimensions}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));