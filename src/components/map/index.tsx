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

interface storeProp {
  x: number;
  y: number;
  requests: number;
  storeName: string;
}

const stores: storeProp[] = [
  {
    x: 37.450795,
    y: 127.128816,
    requests: 100,
    storeName: '카페 1',
  },
  {
    x: 37.448,
    y: 127.1278,
    requests: 75,
    storeName: '카페 2',
  },
  {
    x: 37.447,
    y: 127.1282,
    requests: 120,
    storeName: '컴포즈 커피',
  },
  {
    x: 37.4487,
    y: 127.128,
    requests: 50,
    storeName: '신의 한컵',
  },
  {
    x: 37.4495,
    y: 127.1292,
    requests: 90,
    storeName: '커피만',
  },
];

function MarkerCluster() {
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

  // Customize Overlay 참고
  // https://zeakd.github.io/react-naver-maps/guides/customize-overlays/
  const [cluster] = useState(() => {
    const markers = [];

    for (let i = 0; i < stores.length; i += 1) {
      const storeData: storeProp = stores[i];
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(storeData.x, storeData.y),
        map1,
        requests: storeData.requests,
        title: storeData.storeName,
      });

      markers.push(marker);
    }

    const clusters = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 17,
      map1,
      markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
      indexGenerator: [2, 4, 8, 12, 20],
      stylingFunction: (clusterMarker: unknown, count: number) => {
        clusterMarker.getElement().querySelector('div:first-child').innerText =
          count;
      },
    });

    return clusters;
  });

  return <Overlay element={cluster} />;
}

function MyMap({ selected, selectFlag, handleSelect }: MyMapProps) {
  const navermaps = useNavermaps();
  const [map, setMap] = useState();

  // select 이벤트 발생 시 포커싱 하기 위함
  useEffect(() => {
    const store = stores.filter(e => e.storeName === selected);
    if (store.length > 0) {
      const loc = new navermaps.LatLng(store[0].x, store[0].y);
      if (map) {
        map.setCenter(loc);
        map.setZoom(18);
      }
    }
  }, [selected, selectFlag]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.450795, 127.128816)}
      defaultZoom={16}
      zoomControl
      ref={setMap}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      }}
    >
      {stores.map(store => (
        <Marker
          key={store.storeName}
          position={new window.naver.maps.LatLng(store.x, store.y)}
          title={store.storeName}
          icon={{
            content: `<button><div>${store.storeName}</div></button>`,
          }}
          onClick={() => handleSelect(store.storeName)}
        />
      ))}
      <MarkerCluster />
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
        height: '100%',
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
