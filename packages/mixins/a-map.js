import AMapLoader from '@amap/amap-jsapi-loader'

export default function (key, version) {
  const initMap = async (key, version) => {
    const AMap = await AMapLoader.load({
      key: key || '822c5d6b3d25da7c2f9fe0b6a30d4e1c',
      version: version || '2.0', // '2.1Beta'
      plugins: [
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.HawkEye',
        'AMap.MapType',
        'AMap.Geolocation',
        'AMap.ControlBar',
        'AMap.GeoJSON',
        'AMap.MarkerCluster',
        'AMap.MouseTool',
        'AMap.3DTilesLayer'
      ]
    })

    return AMap
  }

  return {
    initMap
  }
}
