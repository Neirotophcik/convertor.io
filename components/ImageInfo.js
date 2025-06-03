function ImageInfo({ originalFile, dimensions }) {
    try {
        if (!originalFile) return null;
        
        // Форматирование размера файла
        const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 Байт';
            const k = 1024;
            const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };
        
        return (
            <div className="card-dark p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                    <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                    Информация о файле
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-400">Имя файла:</p>
                        <p className="font-medium truncate">{originalFile.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Размер файла:</p>
                        <p className="font-medium">{formatFileSize(originalFile.size)}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Разрешение:</p>
                        <p className="font-medium">{dimensions.width} × {dimensions.height} px</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Тип файла:</p>
                        <p className="font-medium">{originalFile.type}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ImageInfo component error:', error);
        reportError(error);
    }
}