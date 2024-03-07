/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useMap,
} from 'react-naver-maps';

import {
  TopContainer,
  FirstContainer,
  CartButton,
} from '@components/map/styles';
import { useState } from 'react';
import AutoCompleteBox from '@/components/auto-complete-box';
import { makeMarkerClustering } from '@/components/map/marker-cluster';
import { MapStoreProps, StoreProp } from '@/types/type';
import MapMarker from '@components/map-marker';
import {
  MapCluster1,
  MapCluster2,
  MapCluster3,
  MapCluster4,
  MapCluster5,
} from '@/components/map-cluster';
import { IconCart } from 'public/svgs';
import BottomModal from '@/components/bottom-modal';
import Destination from '@/components/bottom-modal/Destination';
import ETA from '@/components/bottom-modal/ETA';
import StoreType from '@/components/bottom-modal/Storetype';
import BottomNonModal from '@components/bottom-modal/BottomNonModal';
import StoreInfo from '@components/store-info';
import { useQuery } from 'react-query';
import { getMapStoreList } from '@/apis/store/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storeState } from '@/states/mapOption';
import OptionButtonComponent from '@components/option-button-container';

function MarkerCluster({
  handleSelect,
}: {
  handleSelect: (selectedId: number) => void;
}) {
  const navermaps = useNavermaps();
  const map = useMap();
  const MarkerClustering = makeMarkerClustering(window.naver);
  const storeOption = useRecoilValue<MapStoreProps>(storeState);
  const [cluster, setCluster] = useState<any>(null); // 클러스터 상태

  const htmlMarker1 = {
    content: MapCluster1(),
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker2 = {
    content: MapCluster2(),
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker3 = {
    content: MapCluster3(),
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker4 = {
    content: MapCluster4(),
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker5 = {
    content: MapCluster5(),
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };

  // 클러스터 생성 함수
  const createCluster = (markers: any[]) => {
    if (cluster) {
      cluster.setMap(null);
    }
    const newCluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 17,
      map,
      markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
      indexGenerator: [2, 4, 6, 10, 20],
      stylingFunction: (clusterMarker: any, count: number) => {
        const element = clusterMarker.getElement();
        if (element) {
          const firstChild = element.querySelector('#count');
          if (firstChild) {
            firstChild.innerText = `+${count}`;
          }
        }
      },
    });
    setCluster(newCluster); // 새로운 클러스터 상태로 업데이트
  };

  // 마커 생성 함수
  const createMarkers = (storeList: StoreProp[]) => {
    const markers = storeList.map(store => {
      const latlng = new navermaps.LatLng(store.longitude, store.latitude);
      const marker = new naver.maps.Marker({
        position: latlng,
        title: store.storeName,
        icon: {
          content: MapMarker({
            name: store.storeName,
            requests: store.orderCount,
          }),
        },
      });
      marker.addListener('click', () => {
        map?.panTo(latlng, { duration: 1000 });
        handleSelect(store.storeId);
        // map?.setZoom(17); 줌 이벤트
      });

      return marker;
    });
    createCluster(markers); // 생성된 마커로 클러스터 생성
  };

  useQuery<StoreProp[]>(
    ['storeList', storeOption],
    async () => {
      const { data } = await getMapStoreList(storeOption);
      return data;
    },
    {
      onSuccess: storeList => {
        console.log('response for store list', storeList);
        createMarkers(storeList); // 데이터 성공적으로 불러왔을 때 마커 생성 호출
      },
      onError: err => console.log('error', err),
    },
  );

  return (
    <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />
  );
}

export default function Map() {
  // 위 식당 중 selectedValue와 동일한 객체의 x,y 좌표를 불러와서 포커싱함
  const [selected, setSelected] = useState<number>(-1);
  const [selectFlag, setSelectFlag] = useState<number>(0);
  const [openStoreInfo, setOpenStoreInfo] = useState<boolean>(false);
  const [openBottomModal, setOpenBottomModal] = useState<number>(0);
  const [modalKey, setModalKey] = useState<number>(1);
  const [nonModalKey, setNonModalKey] = useState<number>(1);
  const [option, setOption] = useRecoilState(storeState);
  const [, setMap] = useState<naver.maps.Map | null>(null);

  // 클릭 시에만, info 모달 뜸
  const handleSelect = (selectedId: number) => {
    setSelected(selectedId);
    setSelectFlag(selectFlag + 1);
    setOpenStoreInfo(true);
    setNonModalKey(prev => prev + 1);
  };

  const handleClickOption = (optionId: number) => {
    if (optionId === -1) setOption({}); // 초기화
    setOpenBottomModal(optionId);
    setModalKey(prev => prev + 1);
  };

  const submitOption = (newOptions?: object) => {
    setOption({
      ...option,
      ...newOptions,
    });
  };

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TopContainer>
        <FirstContainer>
          <AutoCompleteBox />
          <CartButton>
            <IconCart />
          </CartButton>
        </FirstContainer>
        <OptionButtonComponent handleClickOption={handleClickOption} isMap />
      </TopContainer>

      <NaverMap
        defaultCenter={{ lat: 37.450795, lng: 127.128816 }}
        defaultZoom={16}
        ref={setMap}
      >
        <MarkerCluster handleSelect={handleSelect} />
      </NaverMap>

      {openStoreInfo && (
        <BottomNonModal
          key={`storeInfo_${nonModalKey}`}
          content={<StoreInfo storeId={selected} />}
        />
      )}
      {openBottomModal === 1 && (
        <BottomModal
          key={`ETA_${modalKey}`}
          content={<ETA submitOption={submitOption} />}
        />
      )}
      {openBottomModal === 2 && (
        <BottomModal
          key={`Destination_${modalKey}`}
          content={<Destination submitOption={submitOption} />}
        />
      )}
      {openBottomModal === 3 && (
        <BottomModal
          key={`StoreType_${modalKey}`}
          content={<StoreType submitOption={submitOption} />}
        />
      )}
    </MapDiv>
  );
}
