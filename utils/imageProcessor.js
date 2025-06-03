function processImage(file, options) {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = function() {
                // Set canvas dimensions based on options
                const useOriginalSize = options.dimensions?.keepOriginalSize || false;
                
                // Use original dimensions or specified dimensions
                canvas.width = useOriginalSize ? img.width : (options.dimensions?.width || img.width);
                canvas.height = useOriginalSize ? img.height : (options.dimensions?.height || img.height);

                // Apply filters
                const filterString = buildFilterString(options.filters || {});
                ctx.filter = filterString;

                // Draw image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Reset filters before adding watermarks
                ctx.filter = 'none';

                // Add watermarks if specified
                if (options.watermarks && options.watermarks.length > 0) {
                    options.watermarks.forEach(watermark => {
                        if (watermark && watermark.text && watermark.position !== 'none') {
                            addWatermark(ctx, canvas, watermark);
                        }
                    });
                }

                // Convert to desired format
                const quality = (options.format === 'jpeg' || options.format === 'jpg') ? 0.9 : undefined;
                const mimeType = options.format === 'jpg' ? 'image/jpeg' : `image/${options.format}`;
                
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to process image'));
                    }
                }, mimeType, quality);
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(file);
        } catch (error) {
            reject(error);
        }
    });
}

function buildFilterString(filters) {
    const filterParts = [];
    
    if (filters.brightness !== undefined) {
        filterParts.push(`brightness(${filters.brightness}%)`);
    }
    if (filters.contrast !== undefined) {
        filterParts.push(`contrast(${filters.contrast}%)`);
    }
    if (filters.saturation !== undefined) {
        filterParts.push(`saturate(${filters.saturation}%)`);
    }
    if (filters.hue !== undefined) {
        filterParts.push(`hue-rotate(${filters.hue}deg)`);
    }
    if (filters.blur !== undefined && filters.blur > 0) {
        filterParts.push(`blur(${filters.blur}px)`);
    }
    if (filters.sepia !== undefined) {
        filterParts.push(`sepia(${filters.sepia}%)`);
    }

    return filterParts.join(' ') || 'none';
}

function addWatermark(ctx, canvas, watermark) {
    if (!watermark) return;
    
    ctx.save();
    ctx.globalAlpha = 0.8;
    
    const fontSize = watermark.fontSize || 20;
    const fontFamily = watermark.font || 'Arial';
    const color = watermark.color || '#ffffff';
    
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    
    const text = watermark.text || '';
    if (!text) {
        ctx.restore();
        return;
    }
    
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    
    let x, y;
    
    switch (watermark.position) {
        case 'top-left':
            x = 20;
            y = fontSize + 20;
            break;
        case 'top-right':
            x = canvas.width - textWidth - 20;
            y = fontSize + 20;
            break;
        case 'center':
            x = (canvas.width - textWidth) / 2;
            y = canvas.height / 2;
            break;
        case 'bottom-left':
            x = 20;
            y = canvas.height - 20;
            break;
        case 'bottom-right':
            x = canvas.width - textWidth - 20;
            y = canvas.height - 20;
            break;
        default:
            x = 20;
            y = fontSize + 20;
    }
    
    ctx.fillText(text, x, y);
    ctx.restore();
}