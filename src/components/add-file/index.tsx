/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import {
  AddButton,
  AddContainer,
  LogoContainer,
} from '@/components/add-file/styles';
import { AddfileProps } from '@/types/type';

export default function AddFile({
  imageUrl,
  onImageUpload,
  onSubmit,
}: AddfileProps) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (imageUrl) setImageSrc(imageUrl);
  }, [imageUrl]);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    if (onImageUpload) {
      onImageUpload(file);
    }

    return new Promise<void>(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setImageSrc(null);
    }
  };

  useEffect(() => {
    if (onSubmit) {
      resetFileInput();
    }
  }, [onSubmit]);

  return (
    <LogoContainer>
      <AddButton
        type="file"
        accept="image/*"
        onChange={onUpload}
        ref={fileInputRef}
      />
      {imageSrc && <AddContainer src={imageSrc} />}
    </LogoContainer>
  );
}
