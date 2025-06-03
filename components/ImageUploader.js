function ImageUploader({ onImageUpload }) {
    try {
        const [isDragging, setIsDragging] = React.useState(false);
        const fileInputRef = React.useRef(null);

        const handleDragOver = (e) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            setIsDragging(false);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        };

        const handleFileSelect = (file) => {
            if (file && file.type.startsWith('image/')) {
                onImageUpload(file);
            }
        };

        const handleClick = () => {
            fileInputRef.current?.click();
        };

        return (
            <div data-name="image-uploader" data-file="components/ImageUploader.js" 
                 className={`upload-zone p-8 rounded-lg text-center cursor-pointer ${
                     isDragging ? 'border-blue-400 bg-blue-50 bg-opacity-10' : ''
                 }`}
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
                 onDrop={handleDrop}
                 onClick={handleClick}>
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-lg mb-2">Перетащите изображение или нажмите для выбора</p>
                <p className="text-sm text-gray-400">Поддерживаются: JPG, PNG, GIF, WEBP, BMP</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                />
            </div>
        );
    } catch (error) {
        console.error('ImageUploader component error:', error);
        reportError(error);
    }
}
