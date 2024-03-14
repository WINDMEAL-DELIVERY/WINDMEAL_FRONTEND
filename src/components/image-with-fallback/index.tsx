import Image from 'next/image';
import { useState } from 'react';
import defaultImg from 'public/kakao.png';
import { ImageProps } from '@/types/type';

// 이미지가 저장되어있지 않아 리턴 받는 값 "none" 이거나 이미지 가져오는 중 에러 발생 시 디폴트 이미지
export default function StoreImage({ src, height, width }: ImageProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  const displaySrc =
    src !== 'none' ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}` : defaultImg;

  return (
    <Image
      alt="Image"
      src={isImgError ? defaultImg : displaySrc}
      width={width}
      height={height}
      onError={() => setIsImgError(true)}
    />
  );
}
