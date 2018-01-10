<template>
  <div class="page">
    <div v-loading="ifLoadingPath">
      <div id="amap_id">
        <div id="map-container"> </div>
      </div>
    </div>
    <div id="histogram">
      <histogram ref="histogram"></histogram>
    </div>
    <nav class="main-menu" style="z-index: 12; overflow: auto;">
      <ul id="pickers">
        <li>
          <div id="descrip">CHOOSE YOUR DESTINATION
            <el-tooltip effect="dark" content="Click here to add this route to favourites" placement="bottom">
              <el-button size="small" class="collect" type="text" style="position: relative; color: black; left: 17%" @click="addRouteToFavourites">COLLECT</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="Click here to plan a route" placement="bottom">
              <el-button size="small" class="collect" type="text" style="position: relative; left: 17%;  color: black" @click="getRoute">DONE</el-button>
            </el-tooltip>
          </div>
        </li>
        <li>
          <picker v-for="flag in flags" :key="picker" :map="mapObj" v-if="flag.value"></picker>
        </li>
      </ul>
      <ul id="addPicker">
        <li>
          <add-picekr ref="addPicker"></add-picekr>
        </li>
      </ul>
    </nav>
    <footer class="bottom">
      <div class="container setFooter">
        <p>Copyright © 2016-2017 Mobile Computing Group</p>
        <!-- <p>版权所有 © 2016-2017 移动计算课题组</p> -->
      </div>
    </footer>
  </div>
</template>

<script>
import picker from "./picker.vue";
import addPicker from "./addPicker.vue";
import histogram from "./histogram.vue";
import AMap from "AMap";
import AMapUI from "AMapUI";
import Qs from "qs";
import segmentLocations from "../assets/py/edge_geometry.json";
import { GPS } from "../assets/js/coordinateConverter";
export default {
  data() {
    let self = this;
    return {
      zoom: 13,
      // center: [121.59996, 31.197646],
      center: [121.59996, 31.197646],
      mapObj: null,
      pois: [],
      markers: [],
      pickers: [],
      flags: [],
      arriveTime: [],
      departureTime: [],
      currentPathId: -1,
      panLocation: this.isPanLocation,
      resetCenter: this.resetCenter,
      desCollectId: "",
      tempFavor: "",
      edgeGeometry: segmentLocations.edgeGeometry,
      ifLoadingPath: false
    };
  },
  props: ["isPanLocation", "resetCenter"],
  components: {
    picker: picker,
    addPicekr: addPicker,
    histogram: histogram
  },
  methods: {
    clearPickerBlock: function(identifier) {
      //找到identifier对应的flag值
      for (var i = 0; i < this.flags.length; i++) {
        if (this.flags[i].key == identifier) {
          this.flags.splice(i, 1, {
            key: identifier,
            value: false
          });
          break;
        }
      }
      console.log(this.flags);
      //removeMarker
      this.removeMarker(identifier);
      //addPicker中的counter--
      this.$refs.addPicker.deleteAPicker();
      //删除pickers中的picker
      for (var i = 0; i < this.pickers.length; i++) {
        if (this.pickers[i] == identifier) {
          this.pickers.splice(i, 1);
          break;
        }
      }
      //删除arriveTime
      for (var i = 0; i < this.arriveTime.length; i++) {
        if (this.arriveTime[i][0] == identifier) {
          this.arriveTime.splice(i, 1);
          break;
        }
      }
      //删除departTime
      for (var i = 0; i < this.departureTime.length; i++) {
        if (this.departureTime[i][0] == identifier) {
          this.departureTime.splice(i, 1);
          break;
        }
      }
      // //删除poi
      for (var i = 0; i < this.pois.length; i++) {
        if (this.pois[i][1] == identifier) {
          this.pois.splice(i, 1);
          break;
        }
      }
    },
    initMap: function() {
      let self = this;
      console.log("yes", self.center);
      self.mapObj = new AMap.Map("amap_id", {
        center: this.center,
        zoom: this.zoom
      });
      if (self.isPanLocation) {
        self.mapObj.plugin(["AMap.Geolocation"], function() {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: self.isPanLocation, //  定位成功后将定位到的位置作为地图中心点，默认：true
            // panToLocation: false,
            zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          self.mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", result => {
            self.mapObj.setCenter(result.position);
          }); //  返回定位信息
          AMap.event.addListener(geolocation, "error", result => {
            console.log(result);
          }); //  返回定位出错信息
        });
      }
    },
    addMarker: function(poi, identifier, transportation) {
      let self = this;
      function pushAPoi() {
        //push一个数组到pois
        for (var i = 0; i < self.pois.length; i++) {
          //如果已经有了poi就改变
          if (self.pois[i][1] == identifier) {
            self.pois.splice(i, 1, [poi, identifier, transportation]);
            return;
          }
        }
        //如果没有就直接push进去
        self.pois.push([poi, identifier, transportation]);
      }
      pushAPoi();
      var marker;
      AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
        //启动页面
        //创建SimpleMarker实例
        marker = new SimpleMarker({
          //前景文字
          iconLabel: {
            innerHTML: "<div>" + (identifier + 1) + "</div>", //设置文字内容
            style: {
              color: "#fff" //设置文字颜色
            }
          },
          //图标主题
          iconTheme: "fresh",
          //背景图标样式
          iconStyle: "black",
          //...其他Marker选项...，不包括content
          map: self.mapObj,
          position: poi.location
        });
        function openInfoWin() {
          infoWindow.open(self.mapObj, marker.getPosition());
        }
        //marker 点击时打开
        AMap.event.addListener(marker, "click", function() {
          openInfoWin();
        });
        self.markers.push([marker, identifier]);
        openInfoWin();
      });
      var infoWindow = new AMap.InfoWindow({
        content: self.createFavouriteDiv(poi),
        offset: new AMap.Pixel(0, -38),
        autoMove: true,
        closeWhenClickMap: true
      });
      self.mapObj.setCenter(poi.location);
    },
    removeMarker: function(identifier) {
      //去掉地图上的marker
      for (var i = 0; i < this.markers.length; i++) {
        if (this.markers[i][1] == identifier) {
          this.mapObj.remove(this.markers[i][0]);
          this.markers.splice(i, 1);
          break;
        }
      }
      //去掉pois里的poi
      for (var i = 0; i < this.pois.length; i++) {
        if (this.pois[i][1] == identifier) {
          this.pois.splice(i, 1);
          break;
        }
      }
    },
    addSimpleMarker() {
      //根据经纬度获取poi
      let self = this;
      AMap.service("AMap.Geocoder", function() {
        //回调函数
        //实例化Geocoder
        let geocoder = new AMap.Geocoder({
          city: "010" //城市，默认：“全国”
        });
        //TODO: 使用geocoder 对象完成相关功能
        geocoder.getAddress(self.resetCenter.coordinates, function(
          status,
          result
        ) {
          if (status === "complete" && result.info === "OK") {
            //获得了有效的地址信息:
            //即，result.regeocode.formattedAddress
            // console.log(result)
            var marker;
            AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
              //启动页面
              //创建SimpleMarker实例
              marker = new SimpleMarker({
                //图标主题
                iconTheme: "fresh",
                //背景图标样式
                iconStyle: "black",
                //...其他Marker选项...，不包括content
                map: self.mapObj,
                position: self.center
              });
              var infoWindow = new AMap.InfoWindow({
                content: self.addSimpleFavouriteDiv(
                  result.regeocode.formattedAddress
                ),
                offset: new AMap.Pixel(0, -38),
                autoMove: true,
                closeWhenClickMap: true
              });
              function openInfoWin() {
                infoWindow.open(self.mapObj, marker.getPosition());
              }
              //marker 点击时打开
              AMap.event.addListener(marker, "click", function() {
                openInfoWin();
              });
              openInfoWin();
            });
            // self.mapObj.setCenter(self.center);
          } else {
            //获取地址失败
            self.$message.error("Network Error!");
          }
        });
      });
    },
    addSimpleFavouriteDiv(poi) {
      var wrapper = document.createElement("div");
      var title = document.createElement("div");
      title.className = "title";
      title.innerText = poi;
      var favourite = document.createElement("div");
      favourite.className = "favourite";
      var favouriteImg = document.createElement("img");
      favouriteImg.src = "../../static/images/favourites_click.png";
      favouriteImg.id = "tempFav";
      favouriteImg.onclick = this.deleteFromCollect;
      favouriteImg.className = "favourite favouriteImg fromCollects";
      // favourite.innerHTML = '<img src="../../static/images/favourites_not_click.png">'
      favourite.appendChild(favouriteImg);
      wrapper.appendChild(title);
      wrapper.appendChild(favourite);
      // wrapper.appendChild(titleDetail);
      return wrapper;
    },
    deleteFromCollect() {
      let self = this;
      var favouriteImg = document.getElementById("tempFav");
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/favorites/destination",
        type: "POST",
        data: {
          id: self.resetCenter.id,
          _method: "DELETE"
        },
        dataType: "json",
        success: function(data) {
          console.log(data);
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            favouriteImg.src = "../../static/images/favourites_not_click.png";
            favouriteImg.onclick = self.addToCollect;
            self.$message({
              type: "success",
              message: "Successfully delete from destinations collects!"
            });
          } else {
            self.$message.error(data.rspMsg);
          }
        },
        error: function(er) {
          self.$message.error("Network Error");
        }
      });
    },
    addToCollect() {
      let self = this;
      var favourite = document.getElementById("tempFav");
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/favorites/destination",
        type: "POST",
        data: {
          latitude: self.resetCenter.coordinates[1],
          longitude: self.resetCenter.coordinates[0]
        },
        dataType: "json",
        success: function(data) {
          console.log(data);
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            favourite.src = "../../static/images/favourites_click.png";
            favourite.onclick = self.deleteFromCollect;
            self.$message({
              type: "success",
              message: "Successfully add to destinations collects!"
            });
          } else {
            self.$message.error(data.rspMsg);
          }
        },
        error: function(er) {
          self.$message.error("Network Error");
        }
      });
    },
    removePreArrTimeAddNew: function(identifier, time) {
      if (this.arriveTime.length == 0) {
        this.arriveTime.push([identifier, time]);
      } else {
        for (var i = 0; i < this.arriveTime.length; i++) {
          if (this.arriveTime[i][0] == identifier) {
            this.arriveTime.splice(i, 1, [identifier, time]);
            return;
          }
        }
        this.arriveTime.push([identifier, time]);
      }
    },
    removePreDeparTimeAddNew: function(identifier, time) {
      if (this.departureTime.length == 0) {
        this.departureTime.push([identifier, time]);
      } else {
        for (var i = 0; i < this.departureTime.length; i++) {
          if (this.departureTime[i][0] == identifier) {
            this.departureTime.splice(i, 1, [identifier, time]);
            return;
          }
        }
        this.departureTime.push([identifier, time]);
      }
    },
    addAPicker: function(identifier) {
      this.pickers.push(identifier);
      this.flags.push(true);
    },
    getIdentifier: function() {
      return this.$refs.addPicker.pickerNum;
    },
    setHistogramFlagFalse: function() {
      this.$refs.histogram.flag = false;
    },
    setHistogramData: function(latlng, timeStamp) {
      this.$refs.histogram.initData(latlng, timeStamp);
    },
    createFavouriteDiv: function(poi) {
      let self = this;
      var index = 0;
      function addFavourite(e) {
        for (var i = 0; i < self.pois.length; i++) {
          //找到收藏点的id
          if (
            self.pois[i][0].location.lat == poi.location.lat &&
            self.pois[i][0].location.lng == poi.location.lng
          ) {
            index = i;
            break;
          }
        }
        e.target.src = "../../static/images/favourites_click.png";
        $.ajax({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          url: self.urlHeader + "/psgHotNode",
          data: {
            latitude: poi.location.lat,
            longitude: poi.location.lng
          },
          type: "post",
          success: function(data) {
            console.log(data);
            //拿到数据
          }
        });
      }
      var wrapper = document.createElement("div");
      var title = document.createElement("div");
      title.id = "title";
      title.innerText = poi.name;
      var titleDetail = document.createElement("div");
      // titleDetail.appendChild(document.createElement('br'))
      titleDetail.id = "title detail";
      titleDetail.innerText = poi.address;
      var favourite = document.createElement("div");
      favourite.id = "favourite";
      var favouriteImg = document.createElement("img");
      favouriteImg.src = "../../static/images/favourites_not_click.png";
      favouriteImg.onclick = addFavourite;
      favouriteImg.id = "favourite favouriteImg";
      // favourite.innerHTML = '<img src="../../static/images/favourites_not_click.png">'
      favourite.appendChild(favouriteImg);
      wrapper.appendChild(title);
      wrapper.appendChild(favourite);
      wrapper.appendChild(titleDetail);
      return wrapper;
    },
    getRoute: function() {
      let self = this;
      if (this.pois.length != this.arriveTime.length) {
        console.log([this.pois.length, this.arriveTime.length]);
        alert("Please complete neccessary information!");
        return;
      } else if (this.pickers.length < 2) {
        alert("At least one destination must be filled in");
        return;
      }
      //清除直方图
      self.setHistogramFlagFalse();
      //清空之前的currentPathId
      self.currentPathId.length = 0;
      //清空除了marker之外的之前的覆盖物
      self.mapObj.clearMap();
      for (var i = 0; i < self.markers.length; i++) {
        self.markers[i][0].setMap(self.mapObj);
      }
      //post偏好出发时间的临时函数，下面会用到
      function postPreferLeaveTime(identifier) {
        var preferLeaveTime;
        for (var i = 0; i < self.departureTime; i++) {
          if (self.departureTime[i][0] == identifier) {
            //若用户已经设定了出发时间就post一个请求
            var pathId = self.currentPathId[self.currentPathId.length - 1];
            $.ajax({
              crossDomain: true,
              xhrFields: {
                withCredentials: true
              },
              url: self.urlHeader + "/path/preferLeaveTime",
              data: {
                pathId: pathId,
                // pathId: 1,
                preferLeaveTime: self.departureTime[i][1]
              },
              type: "post",
              dataType: "json",
              success: function(data) {
                console.log(data);
                //拿到数据
              }
            });
            break;
          }
        }
      }
      //发送目的地
      function postDestinations(destinations) {
        //post偏好出发时间
        postPreferLeaveTime(destinations[0][1]);
        var info = [];
        //整合终点信息
        for (var i = 0; i < destinations.length; i++) {
          var identifier = destinations[i][1];
          //转换高德坐标为openstreetmap坐标
          var transferToGPS = GPS.gcj_decrypt_exact(
            destinations[i][0].location.lat,
            destinations[i][0].location.lng
          );
          // //获取当前路径
          // var pathId = self.currentPathId[self.currentPathId.length - 1]
          //获取当前identifier对应的到达时间
          var arriveTime;
          for (var j = 0; j < self.arriveTime.length; j++) {
            if (self.arriveTime[j][0] == identifier) {
              arriveTime = self.arriveTime[j][1];
            }
          }
          info.push({
            latitude: transferToGPS.lat,
            longitude: transferToGPS.lon,
            arriveTime: arriveTime
          });
        }
        //设置遮罩
        self.ifLoadingPath = true;
        //发送终点
        $.ajax({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          // url: self.urlHeader + "/path/destinations",
          url: self.urlHeader + "/path/destinations_alg2", //第二个算法的url
          data: JSON.stringify(info),
          dataType: "json",
          type: "post",
          success: function(data) {
            //拿到数据
            console.log(data);
            //清空drivingdest
            drivingDest.length = 0;
            //绘制路径
            //拿到数据并且格式化数据
            // var segmentId = JSON.parse(data.data.recommendPath).detail.split(',')
            var segmentId = data.data.recommendPath
              .split(",")
              .splice(data.data.recommendPath.length - 1);
            for (var i = 0; i < segmentId.length; i++) {
              segmentId[i] = parseInt(segmentId[i]);
            }
            // var segmentId = [82357,87386,87384,87385,87389,695,696,697,842,843,844,13442,13440,13443,18458,852,853,854,855,23484,12635,12646,58812,23487,23488,23489,23490,23491,71489]
            //路径绘制
            for (var i = 0; i < segmentId.length; i++) {
              //拿到路段的经纬度
              var coordinates = self.edgeGeometry[segmentId[i]].slice(2);
              //转换成高德坐标系
              for (var j = 0; j < coordinates.length; j++) {
                var tranferLocation = GPS.gcj_encrypt(
                  coordinates[j][0],
                  coordinates[j][1]
                );
                coordinates[j] = new AMap.LngLat(
                  tranferLocation.lon,
                  tranferLocation.lat
                );
              }
              //在地图上之间画线
              var polyline = new AMap.Polyline({
                path: coordinates, //设置线覆盖物路径
                strokeOpacity: 1, //线透明度
                strokeWeight: 5, //线宽
                strokeStyle: "dashed", //线样式
                strokeDasharray: [10, 5], //补充线样式
                strokeColor: "#51CBA7"
              });
              polyline.setMap(self.mapObj);
              //拿到的路径id保存起来
              self.currentPathId.push(data.data.id);
              //关闭遮罩
              self.ifLoadingPath = false;
            }
            return;
          },
          contentType: "application/json"
        });
      }
      var drivingDest = [];
      //post目的地
      for (var i = 0; i < this.pois.length; i++) {
        //选择驾车的出行方式
        if (this.pois[i][2] == "Drive") {
          drivingDest.push(this.pois[i]);
          //若此时为最后一个点则开始规划路线
          if (i == this.pois.length - 1) {
            postDestinations(drivingDest);
          }
        } else {
          //选择非驾车的出行方式
          //此时若drivingDest是空，什么都不干，直接调用高德api取下一个点规划路径，否则post destinations，获取一条路径然后在地图上绘制
          if (drivingDest.length > 0) {
            //取下一个点作为终点
            drivingDest.push(this.pois[i + 1]);
            postDestinations(drivingDest);
          } else {
            //如果该点为最后一个点，退出循环
            if (i == this.pois.length - 1) {
              break;
            }
            // 否则在这一点和下一点之间规划路线
            switch (this.pois[i][2]) {
              case "Metro/Bus": //加载公交换乘插件
                console.log("bus");
                AMap.service(["AMap.Transfer"], function() {
                  var transOptions = {
                    map: self.mapObj,
                    city: "上海市", //公交城市
                    policy: AMap.TransferPolicy.LEAST_TIME, //乘车策略
                    hideMarkers: true
                  };
                  //构造公交换乘类
                  var trans = new AMap.Transfer(transOptions);
                  console.log(self.pois[i][0]);
                  //根据起、终点坐标查询公交换乘路线
                  var start = [
                    self.pois[i][0].location.lng,
                    self.pois[i][0].location.lat
                  ];
                  var end = [
                    self.pois[i + 1][0].location.lng,
                    self.pois[i + 1][0].location.lat
                  ];
                  trans.search(start, end, function(status, result) {
                    console.log([status, result]);
                  });
                });
                break;
              case "Walk":
                //步行导航
                console.log("walk");
                AMap.service(["AMap.Walking"], function() {
                  var MWalk = new AMap.Walking({
                    map: self.mapObj,
                    autoFitView: true,
                    hideMarkers: true
                  }); //构造路线导航类
                  //根据起终点坐标规划步行路线
                  var start = [
                    self.pois[i][0].location.lng,
                    self.pois[i][0].location.lat
                  ];
                  var end = [
                    self.pois[i + 1][0].location.lng,
                    self.pois[i + 1][0].location.lat
                  ];
                  MWalk.search(start, end, function(status, result) {
                    console.log([status, result]);
                    console.log(start);
                    console.log(end);
                  });
                });
                break;
            }
          }
        }
      }
    },
    changeTransportation: function(identifier, newTrans) {
      for (var i = 0; i < this.pois.length; i++) {
        if (this.pois[i][1] == identifier) {
          //找到了pois里已经有了记录的poi
          this.pois[i][2] = newTrans;
          return;
        }
      }
      //如果没有找到，先push一个poi为空的[null, identifier, trans]的数组
      this.pois.push([null, identifier, newTrans]);
    },
    addRouteToFavourites: function() {
      var self = this;
      if (this.currentPathId.length == 0) {
        alert("Please plan a route first!");
        return;
      }
      function postFavourite(i) {
        $.ajax({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          url: this.urlHeader + "/favorites/path",
          data: {
            pathId: self.currentPathId[i]
            // pathId: 1
          },
          type: "post",
          success: function(data) {
            console.log(data);
            //拿到数据
            i++;
            postFavourite(i);
          }
        });
      }
      //开始递归
      postFavourite(0);
    }
  },
  mounted() {
    //是否改变地图中心点
    if (!this.isPanLocation) {
      this.center = this.resetCenter.coordinates;
      this.desCollectId = this.resetCenter.id;
      this.addSimpleMarker();
    }

    console.log(this.isPanLocation);

    this.initMap();
  }
};
</script>

<style>
@import "../css/style.css";
@import "../css/app_css.css";
.my-navbar {
  padding: 0;
  background: #26292f;
  height: 70px;
  padding: 15px;
}
#favourite {
  position: relative;
  left: 48%;
  cursor: pointer;
  top: 0%;
  transition: all 0.4s;
}
#favouriteImg {
  position: relative;
}
#favouriteImg:hover {
  transform: scale(1.2);
}
#title {
  font-size: 1.2em;
  color: #26292f;
  /* text-indent: 10px; */
  padding: 5px;
  font-family: "PingFang SC";
  font-weight: 200;
}
#detail {
  font-size: 0.2rem;
  color: #424242;
  margin-top: -20px;
  margin-right: 25px;
}
</style>


<style scoped>
.setFooter {
  background: #26292f;
  height: 90px;
  width: 600%;
  position: relative;
  top: 104px;
  z-index: 13;
  padding: 0px;
}
.setFooter p {
  position: relative;
  left: 40px;
  top: 18px;
  color: white;
  font-weight: 200;
  font-family: Helvetica Neue;
  font-size: 13px;
}
#descrip {
  position: relative;
  left: 7%;
  font-family: "Impact";
  font-size: 0.5em;
  top: 5%;
  /* margin: 5px; */
}
#histogram {
  position: absolute;
  top: 55%;
  width: 100%;
}
.collect {
  transition: all 0.4s;
}
.collect:hover {
  transform: scale(1.2);
}
</style>