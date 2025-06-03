function FormatSelector({ selectedFormat, onFormatChange }) {
    try {
        const formats = [
            { value: 'jpeg', label: 'JPEG', icon: 'fa-file-image' },
            { value: 'jpg', label: 'JPG', icon: 'fa-file-image' },
            { value: 'png', label: 'PNG', icon: 'fa-file-image' },
            { value: 'webp', label: 'WebP', icon: 'fa-file-image' },
            { value: 'gif', label: 'GIF', icon: 'fa-file-image' },
            { value: 'bmp', label: 'BMP', icon: 'fa-file-image' },
            { value: 'tiff', label: 'TIFF', icon: 'fa-file-image' },
            { value: 'ico', label: 'ICO', icon: 'fa-file-image' },
            { value: 'svg', label: 'SVG', icon: 'fa-file-code' }
        ];

        return (
            <div data-name="format-selector" data-file="components/FormatSelector.js" 
                 className="card-dark p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <i className="fas fa-exchange-alt mr-2 text-blue-400"></i>
                    Формат конвертации
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {formats.map((format) => (
                        <button
                            key={format.value}
                            onClick={() => onFormatChange(format.value)}
                            className={`p-3 rounded-lg border transition-all ${
                                selectedFormat === format.value
                                    ? 'border-blue-400 bg-blue-400 bg-opacity-20 text-blue-300'
                                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                            }`}>
                            <i className={`fas ${format.icon} mb-1`}></i>
                            <div className="text-sm font-medium">{format.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('FormatSelector component error:', error);
        reportError(error);
    }
}
