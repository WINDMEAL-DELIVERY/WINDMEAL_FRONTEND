import React, { useState, useEffect } from 'react';
import {
  AddButton,
  AddContainer,
  DeleteButton,
  LogoContainer,
} from '@/components/add-file/styles';
import { AddfileProps } from '@/types/type';
import Dialog from '../dialog';

export default function AddFile({ imageUrl, onImageUpload }: AddfileProps) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

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

  const onDelete = () => {
    setIsDialogVisible(true);
  };

  const handleModalConfirm = () => {
    setImageSrc(null);
    setIsDialogVisible(false);
  };

  const handleModalCancel = () => {
    setIsDialogVisible(false);
  };

  return (
    <>
      <LogoContainer>
        <AddButton type="file" accept="image/*" onChange={onUpload} />
        {imageSrc && <AddContainer src={imageSrc} />}
        {/* {imageSrc && (
          <DeleteButton onClick={onDelete}>이미지 삭제</DeleteButton>
        )} */}
      </LogoContainer>

      <Dialog
        size={20}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        visible={isDialogVisible}
        title="임시 모달"
        description="이미지를 삭제하시겠습니까?"
      />
    </>
  );
}
