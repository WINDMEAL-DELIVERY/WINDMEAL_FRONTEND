/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Overlay,
  useMap,
  Marker,
} from 'react-naver-maps';

import {
  OptionButtonContainer,
  OptionButton,
  TopContainer,
  OptionText,
  FirstContainer,
  CartButton,
} from '@components/map/styles';
import { RefObject, createRef, useEffect, useRef, useState } from 'react';
import AutoCompleteBox from '@/components/auto-complete-box';
import { makeMarkerClustering } from '@/components/map/marker-cluster';
import { MyMapProps, StoreProp } from '@/types/type';
import MapMarker from '@components/map-marker';
import {
  MapCluster1,
  MapCluster2,
  MapCluster3,
  MapCluster4,
  MapCluster5,
} from '@/components/map-cluster';
import { IconCart, IconDown, IconRefresh } from 'public/svgs';
import BottomModal from '@/components/bottom-modal';
import Destination from '@/components/bottom-modal/Destination';
import ETA from '@/components/bottom-modal/ETA';
import StoreType from '@/components/bottom-modal/Storetype';
import BottomNonModal from '@components/bottom-modal/BottomNonModal';
import StoreInfo from '@components/store-info';
import { useQuery } from 'react-query';
import { getMapStoreList } from '@/apis/store/store';

function MarkerCluster({
  markers,
}: {
  markers: RefObject<naver.maps.Marker>[];
}) {
  const navermaps = useNavermaps();
  const map1 = useMap();

  const MarkerClustering = makeMarkerClustering(window.naver);

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

  const getCluster = () => {
    const markerList = markers.map(_marker => {
      return _marker.current;
    });

    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 17, // 조절하면 클러스터링이 되는 기준이 달라짐 (map zoom level)
      map: map1,
      markers: markerList.filter(marker => marker),
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

    return cluster;
  };

  const [cluster, setCluster] = useState(getCluster());

  useEffect(() => {
    // 클러스트 객체 생성해서, 상태에 저장
    setCluster(getCluster());
  }, [markers]);

  return (
    <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />
  );
}

function MyMap({ selected, selectFlag, handleSelect }: MyMapProps) {
  const navermaps = useNavermaps();
  const mapRef = useRef<naver.maps.Map>(null);
  const [, setMap] = useState<naver.maps.Map | null>(null);
  const [elRefs, setElRefs] = useState<RefObject<naver.maps.Marker>[]>([]);
  const [stores, setStores] = useState<StoreProp[]>([]);
  const [storesLength, setStoresLength] = useState<number>(0);

  useQuery<StoreProp[]>(
    ['storeList'],
    async () => {
      const { data } = await getMapStoreList({
        // placeId: a,
        // eta,
        storeCategory: '음식점',
        isOpen: true,
      });
      return data;
    },
    {
      onSuccess: storeList => {
        console.log('response for store list', storeList);
        setStores(storeList);
        setStoresLength(storeList.length);
        // 이전 렌더링 된 마커 삭제
        elRefs.forEach(marker => {
          marker.current?.setMap(null);
        });
      },
      onError: err => console.log('error', err),
    },
  );

  useEffect(() => {
    setElRefs(refs =>
      Array(storesLength)
        .fill(null)
        .map((_, i) => refs[i] || createRef()),
    );
    console.log('storesLength', storesLength, elRefs);
  }, [storesLength]);

  useEffect(() => {
    if (mapRef.current) {
      const store = stores.find(e => e.storeName === selected);
      if (store) {
        const loc = new navermaps.LatLng(store.longitude, store.latitude);
        mapRef.current.setCenter(loc);
        mapRef.current.setZoom(18);
      }
    }
  }, [selected, selectFlag]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.450795, 127.128816)}
      defaultZoom={16}
      ref={setMap}
    >
      <MarkerCluster markers={elRefs} />
      {stores.map((store, idx) => (
        <Marker
          ref={elRefs[idx]}
          key={store.storeName}
          position={
            new window.naver.maps.LatLng(store.longitude, store.latitude)
          }
          title={store.storeName}
          icon={{
            content: MapMarker({
              name: store.storeName,
              requests: store.orderCount,
            }),
          }}
          onClick={() => handleSelect(store.storeName)}
        />
      ))}
    </NaverMap>
  );
}

export default function Map() {
  // 위 식당 중 selectedValue와 동일한 객체의 x,y 좌표를 불러와서 포커싱함
  const [selected, setSelected] = useState<string>();
  const [selectFlag, setSelectFlag] = useState<number>(0);
  const [openStoreInfo, setOpenStoreInfo] = useState<boolean>(false);
  const [openBottomModal, setOpenBottomModal] = useState<number>(0);
  const [modalKey, setModalKey] = useState<number>(1);
  const [nonModalKey, setNonModalKey] = useState<number>(1);

  const handleSelect = (selectedValue: string) => {
    setSelected(selectedValue);
    setSelectFlag(selectFlag + 1);
    setOpenStoreInfo(true);
    setNonModalKey(prev => prev + 1);
  };

  const handleClickOption = (optionId: number) => {
    setOpenBottomModal(optionId);
    setModalKey(prev => prev + 1);
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
          <AutoCompleteBox handleSelect={handleSelect} />
          <CartButton>
            <IconCart />
          </CartButton>
        </FirstContainer>
        <OptionButtonContainer>
          <OptionButton>
            <OptionText>초기화</OptionText>
            <IconRefresh />
          </OptionButton>
          <OptionButton>
            <OptionText onClick={() => handleClickOption(1)}>
              도착시간
            </OptionText>
            <IconDown />
          </OptionButton>
          <OptionButton onClick={() => handleClickOption(2)}>
            <OptionText>배달지</OptionText>
            <IconDown />
          </OptionButton>
          <OptionButton onClick={() => handleClickOption(3)}>
            <OptionText>가게종류</OptionText>
            <IconDown />
          </OptionButton>
          <OptionButton>
            <OptionText>영업중</OptionText>
          </OptionButton>
        </OptionButtonContainer>
      </TopContainer>
      <MyMap
        selected={selected}
        selectFlag={selectFlag}
        handleSelect={handleSelect}
      />
      {openStoreInfo && (
        <BottomNonModal
          key={`storeInfo_${nonModalKey}`}
          content={<StoreInfo />}
        />
      )}
      {openBottomModal === 1 && (
        <BottomModal key={`ETA_${modalKey}`} content={<ETA />} />
      )}
      {openBottomModal === 2 && (
        <BottomModal
          key={`Destination_${modalKey}`}
          content={<Destination />}
        />
      )}
      {openBottomModal === 3 && (
        <BottomModal key={`StoreType_${modalKey}`} content={<StoreType />} />
      )}
    </MapDiv>
  );
}
