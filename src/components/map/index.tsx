/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { RefObject, createRef, useEffect, useRef, useState } from 'react';
import AutoCompleteBox from '@/components/auto-complete-box';
import Dialog from '@/components/dialog';
import { makeMarkerClustering } from '@/components/map/marker-cluster';
import { MyMapProps, StoreProp } from '@/types/type';

const stores: StoreProp[] = [
  {
    storeId: 1,
    location: {
      x: 37.450795,
      y: 127.128816,
    },
    requests: 100,
    name: '카페 1',
  },
  {
    storeId: 2,
    location: {
      x: 37.448,
      y: 127.1278,
    },
    requests: 75,
    name: '카페 2',
  },
  {
    storeId: 3,
    location: {
      x: 37.447,
      y: 127.1282,
    },
    requests: 120,
    name: '컴포즈 커피',
  },
  {
    storeId: 4,
    location: {
      x: 37.4487,
      y: 127.128,
    },
    requests: 50,
    name: '신의 한컵',
  },
  {
    storeId: 5,
    location: {
      x: 37.4495,
      y: 127.1292,
    },
    requests: 90,
    name: '커피만',
  },
];

function MarkerCluster({
  markers,
}: {
  markers: RefObject<naver.maps.Marker>[];
}) {
  const navermaps = useNavermaps();
  const map1 = useMap();

  const MarkerClustering = makeMarkerClustering(window.naver);

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;">a</div>',
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: new navermaps.Size(40, 40),
    anchor: new navermaps.Point(20, 20),
  };

  const getCluster = () => {
    const markerList = markers.map(_marker => {
      console.log('!', _marker);
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
      indexGenerator: [2, 4, 8, 12, 20],
      stylingFunction: (clusterMarker: any, count: number) => {
        const element = clusterMarker.getElement();
        if (element) {
          const firstChild = element.querySelector('div:first-child');
          if (firstChild) {
            firstChild.innerText = count;
          }
        }
      },
    });

    return cluster;
  };

  const [cluster, setCluster] = useState(getCluster());

  useEffect(() => {
    // 클러스트 객체 생성해서, 상태에 저장
    console.log('markers', markers);
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
  const arrLength = stores.length; // 받아온 store 개수

  useEffect(() => {
    setElRefs(refs =>
      Array(arrLength)
        .fill('')
        .map((_, i) => refs[i] || createRef()),
    );
    console.log('arrLength', arrLength);
  }, [arrLength]);

  useEffect(() => {
    if (mapRef.current) {
      const store = stores.find(e => e.name === selected);
      if (store) {
        const loc = new navermaps.LatLng(store.location.x, store.location.y);
        mapRef.current.setCenter(loc);
        mapRef.current.setZoom(18);
      }
    }
  }, [selected, selectFlag]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.450795, 127.128816)}
      defaultZoom={16}
      zoomControl
      ref={setMap} //
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      }}
    >
      <MarkerCluster markers={elRefs} />
      {stores.map((store, idx) => (
        <Marker
          ref={elRefs[idx]}
          key={store.name}
          position={
            new window.naver.maps.LatLng(store.location.x, store.location.y)
          }
          title={store.name}
          icon={{
            content: `<button style="cursor:pointer;border: 1px solid red;"><div>${store.name} ${store.requests}</div></button>`,
          }}
          onClick={() => handleSelect(store.name)}
        />
      ))}
    </NaverMap>
  );
}

export default function Map() {
  // 위 식당 중 selectedValue와 동일한 객체의 x,y 좌표를 불러와서 포커싱함
  const [selected, setSelected] = useState<string>();
  const [selectFlag, setSelectFlag] = useState<number>(0);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const handleSelect = (selectedValue: string) => {
    setSelected(selectedValue);
    setSelectFlag(selectFlag + 1);
    setIsDialogVisible(true);
  };

  const hideDialog = () => {
    setIsDialogVisible(false); // 다이얼로그를 숨김 설정
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
        <AutoCompleteBox handleSelect={handleSelect} />
        <OptionButtonContainer>
          <OptionButton>출발</OptionButton>
          <OptionButton>도착</OptionButton>
          <OptionButton>도착시간</OptionButton>
          <OptionButton>음식종류</OptionButton>
          <OptionButton>영업중</OptionButton>
        </OptionButtonContainer>
      </TopContainer>
      <MyMap
        selected={selected}
        selectFlag={selectFlag}
        handleSelect={handleSelect}
      />
      <Dialog
        size={30}
        visible={isDialogVisible}
        title="임시 모달"
        description="상점의 기본 사항들이 뜰 것"
        onCancel={hideDialog}
        onConfirm={hideDialog}
        confirmTitle="Close"
      />
    </MapDiv>
  );
}
