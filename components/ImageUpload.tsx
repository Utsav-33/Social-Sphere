import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegImages } from "react-icons/fa";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);
  const [fileUploaded, setFileUploaded] = useState(false); // State to track if a file is uploaded

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
        setFileUploaded(true); // Mark that a file has been uploaded
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled: disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div className="flex items-center">
      <label
        {...getRootProps()}
        className="cursor-pointer"
        onClick={(e) => {
          if (fileUploaded) {
            e.preventDefault(); // Prevent default behavior if a file has been uploaded
          }
        }}
      >
        <FaRegImages size={24} className="text-white" />
        <input {...getInputProps()} style={{ display: 'none' }} />
        {base64 && (
          <div className="ml-2">
            <Image 
              src={base64} 
              height={50} 
              width={50} 
              alt="Uploaded Image" 
            />
          </div>
        )}
      </label>
      <span className="text-white ml-2">{label}</span>
    </div>
  );
};

export default ImageUpload;
