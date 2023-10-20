import {
  Container as MapDiv,
  NaverMap,
  // Marker,
  useNavermaps,
  Overlay,
  useMap,
} from 'react-naver-maps';

import { useState } from 'react';
import { makeMarkerClustering } from './marker-cluster';

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

    const marker1 = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.450795, 127.128816),
      map1,
    });
    const marker2 = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.448, 127.1278),
      map1,
    });
    const marker3 = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.447, 127.1282),
      map1,
    });
    const marker4 = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.4487, 127.128),
      map1,
    });

    markers.push(marker1, marker2, marker3, marker4);

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
      stylingFunction: (clusterMarker: any, count: number) => {
        clusterMarker.getElement().querySelector('div:first-child').innerText = count;
      },
    });

    return cluster;
  });

  return <Overlay element={cluster} />;
}

function MyMap() {
  // instead of window.naver.maps
  const navermaps = useNavermaps();

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.450795, 127.128816)}
      defaultZoom={16}
      zoomControl // zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      }}
    >
      <MarkerCluster />
    </NaverMap>
  );
}

export default function map() {
  return (
    <MapDiv
      style={{
        width: '100%',
        height: '600px',
      }}
    >
      <MyMap />
    </MapDiv>
  );
}
