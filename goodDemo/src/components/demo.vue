<template>
    <div>
        <div id="map_id">
            <v-map ref="map" :zoom="zoom" :center="center" @l-click="onMapClick($event)">
                <v-tilelayer :url="url" :attribution="attribution" :maxZoom="maxZoom"></v-tilelayer>
            </v-map>
        </div>
        <nav class="main-menu" style="z-index: 12">
            <ul>
                <li>
                    <a href="#" style="left:10px">
                            <!-- <i class="fa fa-t" style="margin: 7px"></i> -->
                            <input type="file" name="upload" id="upload" accept="text/plain" @change="uploadChange($event)" />
                            <i class="fa fa-t"></i>
                        </a>
                </li>
                <li>
                    <a href="#" style="left:10px">
                        <input type="number" name="quantity_low" id="quantity_low" min="1" max="10000" :value="quantity_low_value">
                        <span id="title">   Low Quantity</span>
                        <!-- <p5 style="font-size: 5px;">(1-1000000)</p5> -->
                        <i class="fa fa-t"></i>
                    </a>
                </li>
                <li>
                    <a href="#" style="left:10px">
                        <input type="number" name="quantity_high" id="quantity_high" min="1" max="10000" :value="quantity_high_value">
                        <span id="title">   High Quantity</span>
                        <i class="fa fa-t"></i>
                    </a>
                </li>
                <li>
                    <a href="#" style="left:10px">
                        <select id="mySelect" @onchange="mySelect()" :value="my_select_value">
                                                            <option value="Arrow">Arrow</option>
                                                            <option value="No Arrow">No Arrow</option>
                                        </select>
                        <span id="title">     Show Directions</span>
                        <i class="fa fa-t"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-t"></i>
                        <input type="button" id="range" value="DONE" @onclick="range();" style="width:70px; height: 23px; font:7px; text-align:center" />
                    </a>
                </li>
            </ul>
            <div>
                <a href="#" id="trash">
                    <i class="fa fa-trash" style="margin: 5px"></i>
                    <!-- <span class="nav-text" v-on:click="clickMe" style="text-align: left">清空数据</span> -->
                </a>
            </div>
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
import Vue2Leaflet from "vue2-leaflet";
import test from "../assets/py/edge_geometry.json";
import "../../node_modules/leaflet-polylinedecorator/dist/leaflet.polylineDecorator";
var myIcon = L.icon({
  iconSize: [10, 10]
});
L.Icon.Default.prototype.options.iconSize = [10, 10];
L.Icon.Default.prototype.options.shadowSize = [0, 0];
L.Icon.Default.prototype.options.iconAnchor = [5, 5];
window.onload = function() {
  /**
         * 上传函数
         * @param fileInput DOM对象
         * @param callback 回调函数
         */
  String.prototype.endWith = function(endStr) {
    var d = this.length - endStr.length;
    return d >= 0 && this.lastIndexOf(endStr) == d;
  };
  //this.edgeGeometry = EdgeGeometry.edgeGeometry
};
export default {
  name: "example",
  components: {
    "v-map": Vue2Leaflet.Map,
    "v-tilelayer": Vue2Leaflet.TileLayer,
    "v-popup": Vue2Leaflet.Popup
  },
  data() {
    return {
      zoom: 13,
      center: L.latLng(31.217, 121.429),
      url:
        "https://api.tiles.mapbox.com/v4/" +
        "mapbox.streets" +
        "/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 30,
      L_VAL: 0,
      H_VAL: 10000,
      quantity_high_value: "",
      quantity_low_value: "",
      my_select_value: "Arrow",
      resultArr: [],
      edgeGeometry: [],
      flag: false,
      title: "Map-Matching"
    };
  },
  methods: {
    onMapClick: function(e) {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.$refs.map.mapObject);
    },
    uploadChange: function(e) {
      console.log(e);
      this.clearMyMap();
      this.getFileContent(e.target, this.callback_func);
    },
    clickMe: function() {
      var obj = document.getElementById("upload");
      obj.value = "";
      this.resultArr = [];
      this.clearMyMap();
    },
    clearMyMap: function() {
      for (var i in this.$refs.map.mapObject._layers) {
        if (this.$refs.map.mapObject._layers[i]._path != undefined) {
          try {
            this.$refs.map.mapObject.removeLayer(
              this.$refs.map.mapObject._layers[i]
            );
          } catch (e) {
            console.log(
              "problem with " + e + this.$refs.map.mapObject._layers[i]
            );
          }
        }
      }
    },
    range: function() {
      if (this.resultArr.length == 0) {
        alert("Please choose file first");
        return;
      }
      var quantity_high = this.quantity_high_value;
      var quantity_low = this.quantity_low_value;
      lowValue = parseInt(quantity_low);
      highValue = parseInt(quantity_high);
      if (quantity_low == "" || quantity_high == "") {
        this.clearMyMap();
        this.drawProjectLine();
        this.drawTrajsMap();
      } else if (lowValue >= highValue) {
        console.log(lowValue > highValue);
        alert("Incorrect: quantity_low>=quantity_high");
      } else if (
        lowValue > 10000000 ||
        highValue > 10000000 ||
        lowValue < 0 ||
        highValue < 0
      ) {
        alert("Incorrect: quantity<0 or quantity>10000000");
      } else {
        this.L_VAL = lowValue;
        this.H_VAL = highValue;
        this.clearMyMap();
        this.drawProjectLine(lowValue, highValue);
        this.drawTrajsMap(lowValue, highValue);
      }
    },
    mySelect: function() {
      var clearMyArrow = function() {
        for (i in this.$refs.map.mapObject._layers) {
          if (this.$refs.map.mapObject._layers[i]._path == "arrowHead") {
            try {
              this.$refs.map.mapObject.removeLayer(
                this.$refs.map.mapObject._layers[i]
              );
            } catch (e) {
              console.log(
                "problem with " + e + this.$refs.map.mapObject._layers[i]
              );
            }
          }
        }
      };
      if (this.resultArr.length == 0) {
        alert("Please choose file first");
        this.my_select_value = "Arrow";
        return;
      }
      var x = this.my_select_value;
      if (x == "Arrow") {
        this.clearMyMap();
        this.drawProjectLine(this.L_VAL, this.H_VAL);
        this.drawTrajsMap(this.L_VAL, this.H_VAL);
      } else if (x == "No Arrow") {
        clearMyArrow();
      }
    },
    getFileContent: function(fileInput, callback) {
      console.log(fileInput.files.length + ":" + fileInput.files[0].size);
      if (
        fileInput.files &&
        fileInput.files.length > 0 &&
        fileInput.files[0].size > 0
      ) {
        //下面这一句相当于JQuery的：var file =$("#upload").prop('files')[0];
        var file = fileInput.files[0];
        var patt = /.+(.csv)/;
        if (!patt.test(file.name)) {
          alert("Please choose csv file");
          return;
        }
        console.log("!!!");
        this.quantity_high_value = "";
        this.quantity_low_value = "";
        this.my_select_value = "Arrow";
        this.clearMyMap();
        var flag = false;
        var arrTemp = [];
        var reader_onloadend = function(evt) {
          if (evt.target.readyState == FileReader.DONE) {
            var arrLine = evt.target.result.split("\n");
            var arrTemp = [];
            for (var i = 0; i < arrLine.length; i++) {
              arrTemp.push(arrLine[i].split(","));
            }
            callback(arrTemp);
          }
        };
        if (window.FileReader) {
          var reader = new FileReader();
          reader.onloadend = function(evt) {
            reader_onloadend(evt);
          };
          // 包含中文内容用gbk编码
          // reader.readAsArrayBuffer(file, 'gbk');
          reader.readAsText(file, "gbk");
        }
      }
    },
    drawProjectLine: function(low_limit, high_limit) {
      if (this.resultArr.length == 0) {
        console.log("!!!!");
        return;
      }
      this.center = [
        this.resultArr[low_limit][1],
        this.resultArr[low_limit][2]
      ];
      this.zoom = 13;
      var limit = Math.min(high_limit, this.resultArr.length);
      console.log(low_limit, limit);
      for (var i = low_limit; i < limit - 1; i++) {
        L.polyline(
          [
            [this.resultArr[i][1], this.resultArr[i][2]],
            [this.resultArr[i][4], this.resultArr[i][5]]
          ],
          {
            color: "yellow",
            dashArray: "5, 10"
          }
        )
          .addTo(this.$refs.map.mapObject)
          .bindPopup("I am a projection.");
        L.circle([this.resultArr[i][1], this.resultArr[i][2]], 0.4, {
          color: "red",
          fillColor: "red",
          fillOpacity: 1
        })
          .addTo(this.$refs.map.mapObject)
          .bindPopup("I am a point.");
      }
    },
    drawTrajsMap: function(low_limit, high_limit) {
      if (this.resultArr.length == 0) {
        return;
      }
      var tempSID = -1;
      var limit = Math.min(high_limit, this.resultArr.length);
      for (var i = low_limit; i < limit - 1; i++) {
        var sid = this.resultArr[i][3];
        //   console.log(test.edgeGeometry);
        if (sid == tempSID) {
          continue;
        }
        tempSID = sid;
        var tempMap = [];
        //   console.log(test.edgeGeometry[sid]);
        for (var j = 3; j < test.edgeGeometry[sid].length; j++) {
          tempMap.push([
            test.edgeGeometry[sid][j - 1],
            test.edgeGeometry[sid][j]
          ]);
        }
        var arrow = L.polyline(tempMap, {}).addTo(this.$refs.map.mapObject);
        var arrowHead = L.polylineDecorator(arrow, {
          patterns: [
            {
              offset: "100%",
              repeat: 0,
              symbol: L.Symbol.arrowHead({
                pixelSize: 7,
                polygon: false,
                pathOptions: {
                  stroke: true
                }
              })
            }
          ]
        }).addTo(this.$refs.map.mapObject);
        arrowHead._path = "arrowHead";
      }
    },
    callback_func: function(arr) {
      this.resultArr = arr;
      this.drawProjectLine(this.L_VAL, this.H_VAL);
      this.drawTrajsMap(this.L_VAL, this.H_VAL);
    }
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
</style>

<style scoped type="text/css">
.setFooter {
  background: #26292f;
  height: 90px;
  width: 600%;
  position: relative;
  top:104px;
  z-index: 13;
  padding: 0px;
}

.setFooter p {
  position: relative;
  left: 40px;
  top:18px;
  color: white;
  font-weight: 200;
  font-family: Helvetica Neue;
  font-size: 13px;
}
#map_id {
  position: absolute;
  width: 79%;
  /* height: 85%; */
  top: 8%;
  left: 21%;
  bottom: 10%;
  z-index: 10;
}
input#quantity_low,
input#quantity_high {
  position: relative;
  left: 10%;
  top: 5px;
  height: 26px;
  width: 92px;
  border: 0.1px;
  border-radius: 8px;
  /* text-align: center; */
}
#title {
  position: relative;
  top: 5px;
  font-family: "Impact";
  font-size: 0.6em;
  color: #26292f;
  left: 18%;
}
select {
  position: relative;
  top: 5px;
  width: 92px;
  height: 26px;
  background: #ffffff;
  border-radius: 8px;
  border: 0.1px;
  left: 10%;
}
#range {
  position: relative;
  top: 5px;
  font-family: "Impact";
  font-size: 0.6em;
  color: #26292f;
  left: 33%;
  background: transparent;
  border: none;
}
</style>
