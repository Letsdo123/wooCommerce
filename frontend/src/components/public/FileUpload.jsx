import React, { useCallback } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { useController } from 'react-hook-form';

function FileUpload({
    name,
    label,
    description,
    accept,
    maxSize = 5,
    control,
    required = false
}) {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({
        name,
        control,
        rules: { required }
    });

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const files = e.dataTransfer?.files || e.target.files;

        if (files?.length) {
            const file = files[0];
            if (file.size > maxSize * 1024 * 1024) {
                alert(`File size should not exceed ${maxSize}MB`);
                return;
            }
            onChange(file);
        }
    }, [maxSize, onChange]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const removeFile = useCallback((e) => {
        e.stopPropagation();
        onChange(null);
    }, [onChange]);

    return (
        <div className="space-y-2">
            <label className="form-label">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById(name).click()}
                className={`upload-zone group ${error ? 'border-red-500' : ''}`}
            >
                <input
                    id={name}
                    type="file"
                    accept={accept}
                    onChange={handleDrop}
                    className="hidden"
                />

                {value ? (
                    <div className="flex items-center space-x-4">
                        <FiFile className="w-8 h-8 text-primary" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">{value.name}</p>
                            <p className="text-xs text-gray-500">
                                {(value.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                ) : (
                    <>
                        <FiUpload className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                        <p className="mt-2 text-base font-medium text-gray-700">
                            Drop your file here, or <span className="text-primary">browse</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
}

export default FileUpload;