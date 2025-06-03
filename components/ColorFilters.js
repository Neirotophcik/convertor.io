function ColorFilters({ filters, onFilterChange }) {
    try {
        const filterOptions = [
            { key: 'brightness', label: 'Яркость', min: 0, max: 200, step: 1, unit: '%' },
            { key: 'contrast', label: 'Контрастность', min: 0, max: 200, step: 1, unit: '%' },
            { key: 'saturation', label: 'Насыщенность', min: 0, max: 200, step: 1, unit: '%' },
            { key: 'hue', label: 'Оттенок', min: 0, max: 360, step: 1, unit: '°' },
            { key: 'blur', label: 'Размытие', min: 0, max: 10, step: 0.1, unit: 'px' },
            { key: 'sepia', label: 'Сепия', min: 0, max: 100, step: 1, unit: '%' }
        ];

        const resetToOriginal = () => {
            onFilterChange('brightness', 100);
            onFilterChange('contrast', 100);
            onFilterChange('saturation', 100);
            onFilterChange('hue', 0);
            onFilterChange('blur', 0);
            onFilterChange('sepia', 0);
        };

        return (
            <div data-name="color-filters" data-file="components/ColorFilters.js" 
                 className="card-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <i className="fas fa-palette mr-2 text-purple-400"></i>
                        Цветовые фильтры
                    </h3>
                    <button
                        onClick={resetToOriginal}
                        className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm">
                        <i className="fas fa-undo mr-1"></i>
                        Оригинал
                    </button>
                </div>
                <div className="space-y-4">
                    {filterOptions.map((option) => (
                        <div key={option.key} className="flex items-center justify-between">
                            <label className="text-sm font-medium w-24">{option.label}</label>
                            <div className="flex-1 mx-4">
                                <input
                                    type="range"
                                    min={option.min}
                                    max={option.max}
                                    step={option.step}
                                    value={filters[option.key] || (option.key === 'brightness' || option.key === 'contrast' || option.key === 'saturation' ? 100 : option.min)}
                                    onChange={(e) => onFilterChange(option.key, parseFloat(e.target.value))}
                                    className="slider-thumb w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <span className="text-sm text-gray-400 w-12 text-right">
                                {filters[option.key] || (option.key === 'brightness' || option.key === 'contrast' || option.key === 'saturation' ? 100 : option.min)}{option.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ColorFilters component error:', error);
        reportError(error);
    }
}