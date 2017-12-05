<template>
    <div id="block">
      <el-amap-search-box id="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        searchOption: {
          city: '上海',
          citylimit: true,
          autoFitView: true,
        },
        markers: [],
      }
    },
    methods: {
      onSearchResult(pois) {
        // let latSum = 0;
        // let lngSum = 0;
        // if (pois.length > 0) {
        //   pois.forEach(poi => {
        //     let {
        //       lng,
        //       lat
        //     } = poi;
        //     lngSum += lng;
        //     latSum += lat;
        //     this.markers.push([poi.lng, poi.lat]);
        //   });
        //   let center = {
        //     lng: lngSum / pois.length,
        //     lat: latSum / pois.length
        //   };
        //   this.mapCenter = [center.lng, center.lat];
        let poi = pois[0]
        this.markers.push([poi.lng, poi.lat]);
          let center = {
              lng: poi.lng,
              lat: poi.lat
            };
          // this.mapCenter = [center.lng, center.lat];
        }
      },
      components: {
        "vue-datetime-picker": require("vue-datetime-picker"),
      },
      mounted () {
        // $(".search-box-wrapper").innerHTML[0].placeholder = "Search for your start point"
        // $(".search-btn").innerHTML = "Search"
        // console.log($(".search-box-wrapper")[0].firstChild.placeholder="Search for your start point")
        $(".search-box-wrapper")[0].firstChild.placeholder="Search for your start point"
      }
    }
</script>

<style>
  #block {
    height: 185px;
    width: 245px;
    background: #ffffff;
  }
  #search-box {
    position: relative;
    width: 205px;
    height: 26px;
    top: 16px;
    left: 20px;
    font-size: 10px;
    color: #9B9B9B;
  }
</style>
