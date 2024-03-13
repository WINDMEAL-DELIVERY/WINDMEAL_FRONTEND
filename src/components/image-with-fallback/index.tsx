import Image from 'next/image';
import { useState } from 'react';
import defaultImg from 'public/kakao.png';

interface ImageProps {
  src: string;
  width: number;
  height: number;
}

export default function StoreImage({ src, height, width }: ImageProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <Image
      alt="Image"
      src={isImgError ? defaultImg : src}
      width={width}
      height={height}
      onError={() => setIsImgError(true)}
    />
  );
}
