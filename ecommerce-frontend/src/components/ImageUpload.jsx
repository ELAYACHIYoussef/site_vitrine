import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ images = [], onChange, maxImages = 6 }) => {
    const [previews, setPreviews] = useState([]);

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const currentCount = images.length + previews.length;

        if (currentCount + files.length > maxImages) {
            alert(`Maximum ${maxImages} images autorisées`);
            return;
        }

        // Validate files
        const validFiles = files.filter(file => {
            // Check size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} est trop grand (max 5MB)`);
                return false;
            }

            // Check type
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                alert(`${file.name} n'est pas un format valide (jpg, png, webp)`);
                return false;
            }

            return true;
        });

        if (validFiles.length === 0) return;

        // Create previews
        const newPreviews = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviews(prev => [...prev, ...newPreviews]);
        onChange([...images, ...validFiles]);
    };

    const removeImage = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        const newImages = images.filter((_, i) => i !== index);

        // Revoke object URL
        URL.revokeObjectURL(previews[index].preview);

        setPreviews(newPreviews);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                    Images du Produit
                    <span className="text-slate-400 text-xs ml-2">
                        ({images.length}/{maxImages} images)
                    </span>
                </label>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Existing images */}
                {previews.map((item, index) => (
                    <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-50">
                            <img
                                src={item.preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* Upload placeholder */}
                {images.length < maxImages && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <span className="text-xs text-slate-500 group-hover:text-indigo-600 font-medium">
                            Ajouter
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <p className="text-xs text-slate-500">
                Format: JPG, PNG, WEBP • Taille max: 5MB par image • Max {maxImages} images
            </p>
        </div>
    );
};

export default ImageUpload;
