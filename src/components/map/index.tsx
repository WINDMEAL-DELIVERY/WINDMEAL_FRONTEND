import {
  Container as MapDiv,
  NaverMap,
  // Marker,
  useNavermaps,
  Overlay,
  useMap,
  Marker,
} from 'react-naver-maps';

import { useEffect, useState } from 'react';
import AutoCompleteBox from '@/components/auto-complete-box';
import { makeMarkerClustering } from './marker-cluster';

interface cafeProp {
  x: number;
  y: number;
  requests: number;
  cafeName: string;
}

const cafes: cafeProp[] = [
  {
    x: 37.450795,
    y: 127.128816,
    requests: 100,
    cafeName: '카페 1',
  },
  {
    x: 37.448,
    y: 127.1278,
    requests: 75,
    cafeName: '카페 2',
  },
  {
    x: 37.447,
    y: 127.1282,
    requests: 120,
    cafeName: '컴포즈 커피',
  },
  {
    x: 37.4487,
    y: 127.128,
    requests: 50,
    cafeName: '신의 한컵',
  },
  {
    x: 37.4495,
    y: 127.1292,
    requests: 90,
    cafeName: '커피만',
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

    for (let i = 0; i < cafes.length; i += 1) {
      const cafeData: cafeProp = cafes[i];
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(cafeData.x, cafeData.y),
        map1,
        requests: cafeData.requests,
        title: cafeData.cafeName,
      });

      markers.push(marker);
    }

    // eslint-disable-next-line no-shadow
    const cluster = new MarkerClustering({
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

    return cluster;
  });

  return <Overlay element={cluster} />;
}

function MyMap({ selected }) {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  const [map, setMap] = useState();

  useEffect(() => {
    const cafe = cafes.filter(e => e.cafeName === selected);
    if (cafe.length > 0) {
      const loc = new navermaps.LatLng(cafe[0].x, cafe[0].y);
      console.log(cafe, loc)
      if (map) map.setCenter(loc);
    }
  }, [selected]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.450795, 127.128816)}
      defaultZoom={16}
      zoomControl // zoomControl={true}
      ref={setMap}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      }}
    >
      {cafes.map(cafe => (
        <Marker
          key={cafe.cafeName}
          position={new window.naver.maps.LatLng(cafe.x, cafe.y)}
          title={cafe.cafeName}
          icon={{
            content: `<button><div>${cafe.cafeName}</div></button>`,
          }}
        />
      ))}
      <MarkerCluster />
    </NaverMap>
  );
}

export default function Map() {
  // 위 식당 중 selectedValue와 동일한 객체의 x,y 좌표를 불러와서 포커싱함

  const [selected, setSelected] = useState<string>();

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AutoCompleteBox selected={selected} setSelected={setSelected} />
      <MyMap selected={selected} />
    </MapDiv>
  );
}
