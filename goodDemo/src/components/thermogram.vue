<template>
    <div class="page">
        <div id="map_id" style="height: 100%">
            <v-map ref="map" style="height: 100%" :zoom="zoom" :center="center" @l-click="onMapClick($event)">
                <v-tilelayer :url="url" :attribution="attribution" :maxZoom="maxZoom"></v-tilelayer>
            </v-map>
            <div id="navigate-container">
                <input type="file" name="upload" id="upload" accept="text/plain" @change="uploadChange($event)" />
                <input type="button" id="clickMe" value="清空数据" @onclick="clickMe()" style="margin-right:70px;" />
            </div>
            <timeline v-on:click.native="getDateValueTheSame()" v-if="flag"></timeline>
        </div>
    </div>
</template>

<script>
    import Vue2Leaflet from 'vue2-leaflet'
    import test from '../assets/py/edge_geometry.json'
    import '../assets/js/leaflet-heat'
    // import '../assets/js/leaflet.polylineDecorator'
    import timeline from './thermogram_chart.vue'
    import {
        storeData
    } from '../assets/js/timeknots'
    export default {
        data() {
            return {
                zoom: 13,
                center: L.latLng(31.217, 121.429),
                url: 'https://api.tiles.mapbox.com/v4/' + 'mapbox.streets' + '/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 30,
                resultArr: [],
                maxTracksPerColumn: [],
                clickDate: storeData.clickDate,
                flag: false,
                totalArr: [],
                edgeGeometry: [],
                heatLayer: [],
                points: [],
            }
        },
        components: {
            'v-map': Vue2Leaflet.Map,
            'v-tilelayer': Vue2Leaflet.TileLayer,
            'v-popup': Vue2Leaflet.Popup,
            'timeline': timeline
        },
        methods: {
            onMapClick: function(e) {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(this.$refs.map.mapObject)
                this.test++
            },
            uploadChange: function(e) {
                this.clearMyMap();
                this.getFileContent(e.target, this.callback_func);
            },
            clickMe: function() {
                var obj = document.getElementById('upload');
                obj.value = '';
                this.resultArr = [];
                this.clearMyMap();
            },
            clearMyMap: function() {
                for (var i in this.$refs.map.mapObject._layers) {
                    if (this.$refs.map.mapObject._layers[i]._path != undefined) {
                        try {
                            this.$refs.map.mapObject.removeLayer(this.$refs.map.mapObject._layers[i]);
                        } catch (e) {
                            console.log("problem with " + e + this.$refs.map.mapObject._layers[i]);
                        }
                    }
                }
            },
            getFileContent: function(fileInput, callback) {
                if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
                    //下面这一句相当于JQuery的：var file =$("#upload").prop('files')[0];
                    var file = fileInput.files[0];
                    var patt = /.+(.csv)/;
                    if (!patt.test(file.name)) {
                        alert("Please choose csv file");
                        return;
                    }
                    this.clearMyMap();
                    var flag = false
                    var arrTemp = []
                    var reader_onloadend = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            var arrLine = evt.target.result.split("\n");
                            var arrTemp = [];
                            for (var i = 0; i < arrLine.length; i++) {
                                arrTemp.push(arrLine[i].split(","));
                            }
                            callback(arrTemp);
                        };
                    }
                    if (window.FileReader) {
                        var reader = new FileReader()
                        reader.onloadend = function(evt) {
                            reader_onloadend(evt)
                        };
                        // 包含中文内容用gbk编码
                        // reader.readAsArrayBuffer(file, 'gbk');
                        reader.readAsText(file, 'gbk');
                    }
                }
            },
            callback_func: function(arr) {
                //0点起
                this.totalArr = arr
                this.getMaxTracksValue(arr)
                this.integrate(0, this.totalArr)
                this.flag = true
            },
            integrate: function(time, arr) {
                let column = time + 1
                this.dealData(column, arr)
            },
            draw: function(arr) {
                var heatLayer = L.heatLayer(arr, {
                    radius: 25,
                }).addTo(this.$refs.map.mapObject)
                this.heatLayer = heatLayer
            },
            dealData: function(column, arr) {
                // this.getPoints()
                // var data = this.points
                var data = this.getPoints()
                var j = 0
                
                // var e = test.edgeGeometry
                // var len = this.len
                for (var i = 0; i < test.edgeGeometry.length; i++) {
                    //获取segment中点的经纬度
                    var rowIncludesPoints = test.edgeGeometry[arr[i][0]]
                    // for (var k = 2; k < rowIncludesPoints.length; k++) {
                    //     points.push(rowIncludesPoints[k])
                    // }
                    //一个小时累计经过的轨迹数量
                    var maxTracksNum = 0.0
                    // tracksNum += parseInt(arr[i+1][column])
                    maxTracksNum += parseFloat(arr[i + 1][column]) / parseFloat(this.maxTracksPerColumn[column - 1])
                    for (var n = 0; n < rowIncludesPoints.length - 2; j++, n++) {
                        //将经过的轨迹量转化为热力图值
                        // data[j].push(maxTracksNum)
                        data[j][2] = maxTracksNum
                    }
                }
                this.draw(data)
            },
            getMaxTracksValue: function(arr) {
                var temp = []
                var i = 0
                for (var j = 1; j < arr[i].length; j++) {
                    for (i = 0; i < arr.length; i++) {
                        temp.push(arr[i][j])
                    }
                    this.maxTracksPerColumn.push(this.max(temp))
                    temp.length = 0
                    i = 0
                }
            },
            max: function(arr) {
                var max = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] > max) {
                        max = arr[i]
                    }
                }
                return max
            },
            getDateValueTheSame: function() {
                this.clickDate = storeData.clickDate
            },
            getPoints: function() {
                // this.points.length = 0
                var points = []
                var e = test.edgeGeometry
                for(var i = 0; i < e.length; i++) {
                    for(var j = 2; j < e[i].length; j++) {
                        points.push(e[i][j])
                    }
                }
                return points
            },
        },
        watch: {
            clickDate: function(val) {
                var temp = new Date(val).toLocaleTimeString('chinese',{hour12:false})
                console.log(temp)
                var time = temp.substring(0, 2)
                console.log(time)
                this.clearMyMap()
                this.$refs.map.mapObject.removeLayer(this.heatLayer)
                this.integrate(parseInt(time), this.totalArr)
            },
            // test: function(val) {
            //     console.log(val)
            // }
        },
        // mounted: function() {
        //     this.edgeGeometry = test.edgeGeometry
        // },
    }
</script>

<style scoped lang="stylus">

    #navigate-container {
        position: absolute;
        left: 70px;
        top: 300px;
        z-index: 1000;
        vertical-align: middle;
    }

    #upload {
        height: 20px;
        width: 180px;
        font-size: 10px;
    }
</style>
