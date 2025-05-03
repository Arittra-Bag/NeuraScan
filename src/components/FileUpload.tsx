
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { 
    getRootProps, 
    getInputProps, 
    isDragActive, 
    isDragAccept, 
    isDragReject 
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });
  
  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer relative overflow-hidden",
        "bg-black/60 backdrop-blur-sm",
        isDragAccept ? "border-green-500" : 
        isDragReject ? "border-red-500" : "border-purple-500/20",
      )}
    >
      <input {...getInputProps()} />
      
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
          <Upload className="w-12 h-12 text-purple-400" />
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-4">
          {isDragReject ? (
            "Unsupported File Format"
          ) : isDragAccept ? (
            "Drop Your MRI Scan Here"
          ) : (
            "Upload Your MRI Scan"
          )}
        </h3>
        
        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
          {isDragReject ? (
            "Please upload only image files in the supported formats."
          ) : (
            "Drag & drop your file here, or click to select from your device."
          )}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {['JPEG', 'PNG'].map((format) => (
            <div key={format} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/30 text-purple-300 text-xs">
              <FileImage className="w-3 h-3" />
              {format}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FileUpload;
