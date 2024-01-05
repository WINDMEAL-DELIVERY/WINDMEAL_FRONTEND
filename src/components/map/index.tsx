import {
  Container as MapDiv,
  NaverMap,
  // Marker,
  useNavermaps,
  Overlay,
  useMap,
  Marker,
} from 'react-naver-maps';

import {
  OptionButtonContainer,
  OptionButton,
  TopContainer,
} from '@components/map/styles';
import { useEffect, useState } from 'react';
import AutoCompleteBox from '@/components/auto-complete-box';
import Dialog from '@/components/dialog';
import { makeMarkerClustering } from '@/components/map/marker-cluster';
import { MyMapProps, storeProp } from '@/types/type';

export default function Map() {
  return <div>빌드 테스트2</div>;
}
