<template>
    <div class="hotSpot">
        <div id="amapHotSpot">
            <div id="map-container"> </div>
        </div>
        <nav class="main-menu" style="z-index: 12; overflow: auto;">
            <ul>
                <li>
                    <div id="descrip">CHOOSE YOUR IDENTITY</div>
                </li>
                <li>
                    <el-radio-group v-model="role" id="descrip" fill="#26282D" size="mini">
                        <el-radio-button label="Driver"></el-radio-button>
                        <el-radio-button label="Passenger"></el-radio-button>
                    </el-radio-group>
                </li>
                <li>
                    <div id="descrip">Search Hot Spots</div>
                </li>
                <li>
                    <el-radio-group v-model="searchChoice" id="descrip" fill="#26282D" size="small" @change="searchChoiceChange()">
                        <el-radio-button label="Search Around Me"></el-radio-button>
                        <el-radio-button label="Search Other Place"></el-radio-button>
                    </el-radio-group>
                </li>
                <li v-show="searchChoice == 'Search Other Place'">
                    <div id="search-box">
                        <i class="icon-locate"></i>
                        <input id="inputBox" type="text" placeholder="Search For Hot Spot">
                    </div>
                </li>
            </ul>
        </nav>
        <footer class="bottom">
            <div class="container setFooter">
                <p>Copyright © 2016-2017 Mobile Computing Group</p>
                <p>版权所有 © 2016-2017 移动计算课题组</p>
            </div>
        </footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import AMap from "AMap";
    import AMapUI from "AMapUI";
    import {
        GPS
    } from '../assets/js/coordinateConverter'
    export default {
        data() {
            return {
                center: [121.59996, 31.197646],
                zoom: 13,
                role: 'Driver',
                searchChoice: 'Search Other Place',
                driverImg: '../../static/images/司机.png',
                passengerImg: '../../static/images/乘客.png',
                currentPosition: {},
                markers: [],
                mapObj: null,
            }
        },
        components: {},
        methods: {
            initMap: function() {
                let self = this;
                self.mapObj = new AMap.Map("amapHotSpot", {
                    center: this.center,
                    zoom: this.zoom
                });
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
                        panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    self.mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, "complete", result => {
                        self.mapObj.setCenter(result.position);
                        self.currentPosition = result.position
                    }); //  返回定位信息
                    AMap.event.addListener(geolocation, "error", result => {
                        self.currentPosition = {}
                        console.log(result);
                    }); //  返回定位出错信息
                });
            },
            autoComplete: function(target) {
                let self = this
                AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
                    var autoOptions = {
                        city: "上海", //城市，默认全国
                        input: inputBox //使用联想输入的input的id
                    };
                    var autocomplete = new AMap.Autocomplete(autoOptions);
                    AMap.event.addListener(autocomplete, "select", function(e) {
                        //TODO 针对选中的poi实现自己的功能
                        self.postHotSpot(e.poi.location)
                    });
                });
            },
            postHotSpot(location) {
                var self = this
                //转换为GPS坐标
                var transferToGPS = GPS.gcj_decrypt_exact(location.lat, location.lng)
                //如果当前身份是司机
                if (self.role == 'Driver') {
                    //请求载客热点
                    $.ajax({
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        url: self.urlHeader + "/loadHotNode/surroundHot",
                        data: {
                            latitude: transferToGPS.lat,
                            longitude: transferToGPS.lon
                        },
                        type: 'post',
                        dataType: "json",
                        success: function(data) {
                            console.log(data)
                            //清除地图上原有的marker
                            self.mapObj.clearMap();
                            //根据拿到的数据画marker
                            //画出一定范围内的热点
                            var psghot = data.data.psghot
                            var newCenterLat = 0
                            var newCenterLng = 0
                            for (var i = 0; i < psghot.length; i++) {
                                //转换为高德地图坐标
                                var transferToAmap = GPS.gcj_encrypt(parseFloat(psghot[i].lat), parseFloat(psghot[i].lon))
                                // var position = new AMap.LngLat(transferToAmap.lon, transferToAmap.lat)
                                self.addHotSpotMarker(transferToAmap)
                                newCenterLat += parseFloat(transferToAmap.lat)
                                newCenterLng += parseFloat(transferToAmap.lon)
                            }
                            self.markers.length = 0
                            //设定新中心
                            var transferToAmap = GPS.gcj_encrypt(parseFloat(psghot[0].lat), parseFloat(psghot[0].lon))
                            self.mapObj.setCenter(location)
                        },
                        error: function(err) {
                            console.log(err)
                        }
                    })
                }
            },
            addHotSpotMarker(position) {
                var self = this
                var marker
                var content
                //逆地理编码
                self.mapObj.plugin('AMap.Geocoder', function() {
                    var geocoder = new AMap.Geocoder({
                        city: "上海" //城市，默认：“全国”
                    });
                    //获取地址
                    geocoder.getAddress([parseFloat(position.lon), parseFloat(position.lat)], function(status, result) {
                        if (status == 'complete') {
                            content = result.regeocode.formattedAddress
                        }
                    })
                    //增加marker
                    AMapUI.loadUI(["overlay/SimpleMarker"], function(SimpleMarker) {
                        //启动页面
                        //创建SimpleMarker实例
                        marker = new SimpleMarker({
                            //前景文字
                            iconLabel: {
                                innerHTML: "<div>" + (self.markers.length + 1) + "</div>", //设置文字内容
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
                            position: [parseFloat(position.lon), parseFloat(position.lat)],
                            title: content,
                            topWhenClick: true,
                        });
                        var infoWindow = new AMap.InfoWindow({
                            content: content,
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
                        self.markers.push(marker);
                    });
                });
                self.markers.push(marker)
            },
            addMarkerFromFavourite() {},
            searchChoiceChange() {
                //如果查找所在地周边载客热点
                if (this.searchChoice == 'Search Around Me') {
                    console.log("!")
                    //检查定位是否成功
                    if (this.currentPosition.length == 0) {
                        alert("定位失败，无法进行查询")
                        return
                    } else {
                        this.postHotSpot(this.currentPosition)
                    }
                }
            },
        },
        mounted() {
            this.initMap()
            this.autoComplete()
            //登录
            $.ajax({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                url: this.urlHeader + "/users/login",
                data: {
                    userName: "test",
                    passWord: "test"
                },
                type: 'post',
                success: function(data) {
                    console.log(data)
                    //拿到数据
                }
            })
        }
    }
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
    

<style scoped>
    #amapHotSpot {
        position: absolute;
        width: 79%;
        /* height: 80%; */
        left: 21%;
        top: 8%;
        bottom: 10%;
        z-index: 10;
    }
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
    .my-navbar {
        padding: 0;
        background: #26292f;
        height: 70px;
        padding: 15px;
    }
    #descrip {
        position: relative;
        left: 8%;
        font-family: "Impact";
        font-size: 1.0em;
        top: 10px;
        /* margin: 5px; */
    }
    #inputBox {
        position: relative;
        width: 250px;
        height: 32px;
        border: none;
        box-shadow: 2px 2px 5px #CBCBCB;
        padding-inline-start: 30px;
        padding-inline-end: 20px;
    }
    input::-webkit-input-placeholder {
        color: #9B9B9B;
        font-size: 5px;
        font-weight: 200;
    }
    input::-moz-placeholder {
        color: #9B9B9B;
        font-size: 5px;
        font-weight: 200;
    }
    input::-ms-input-placeholder {
        color: #9B9B9B;
        font-size: 5px;
        font-weight: 200;
    }
    #search-box {
        position: relative;
        width: 220px;
        height: 30px;
        top: 20px;
        left: 25px;
        font-size: 4px;
        color: #26282D;
        font-weight: 250;
    }
    .icon-locate {
        position: absolute;
        left: 8px;
        z-index: 5;
        margin-top: 8px;
        background-image: url('../../static/images/定位.png');
        /*引入图片图片*/
        background-repeat: no-repeat;
        /*设置图片不重复*/
        background-position: 0px 0px;
        /*图片显示的位置*/
        width: 40px;
        /*设置图片显示的宽*/
        height: 35px;
        /*图片显示的高*/
    }
    input:focus {
        outline: none;
    }
</style>
