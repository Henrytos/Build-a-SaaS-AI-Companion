"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(true);
  }, []);

  if (!isMuted) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-start">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="pcsu2gxa"
      >
        <Image
          className="w-40 h-40 object-cover border border-dashed border-zinc-100 rounded-lg p-4"
          width={160}
          height={160}
          src={value || "/default-image.png"}
          alt="image upload"
        />
      </CldUploadButton>
    </div>
  );
};
