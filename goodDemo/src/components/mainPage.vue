<template>
    <div>
        <div>
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <a href="#">
                            <img :src="img1" width="100%" @click="currentChange('mapMatching')">
                            <div class="carousel-caption" @click="currentChange('mapMatching')">
                                <h1>Map Matching</h1>
                                <p>Vehicle positioning and navigation systems play an important role in all areas of intelligent transportation. Therefore, the map matching algorithm for GPS, a single positioning device vehicle navigation system, plays a very
                                    important role.</p>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img :src="prediction" @click="currentChange('traffic')">
                            <div class="carousel-caption" @click="currentChange('traffic')">
                                <h1>Traffic Prediction</h1>
                                <p>Traffic prediction model predicts the traffic congestion in the following week and displays in thermogram</p>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img :src="routePlanning" @click="currentChange('planRoute')">
                            <div class="carousel-caption" @click="currentChange('planRoute')">
                                <h1>Route Planning</h1>
                                <p>Route planning model plans multi-destination driving route based on predicted traffic congestion and taxi drivers' experiences.</p>
                            </div>
                        </a>
                    </div>
                </div>
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <div class="row">
                <div class="middle-part grid col-md-4" @click="currentChange('mapMatching')" style="margin-right:100px;">
                    <figure class="effect-sadie">
                        <a><img class="ex_img" :src="img2" @click="currentChange('mapMatching')"></a>
                        <h2>Map<span>Matching</span></h2>
                        <p>This tool displays tracks of the map matching algorithm for GPS according to a series of big data input.<a href='#' @click="currentChange('mapmatching')">More...</a></p>
                    </figure>
                </div>
                <div class="middle-part grid col-md-4" @click="currentChange('traffic')" style="margin-right:100px;">
                    <figure class="effect-sadie">
                        <a><img class="ex_img" :src="thermogramImg" @click="currentChange('traffic')"></a>
                        <h2>Traffic<span>Prediction</span></h2>
                        <p>It predicts the traffic congestion in the following week and displays in thermogram.<a href='#' @click="currentChange('traffic')">More...</a></p>
                    </figure>
                </div>
                <div class="middle-part grid col-md-4" @click="currentChange('planRoute')" style="margin-right:100px;">
                    <figure class="effect-sadie">
                        <a><img class="ex_img" :src="planRouteImg" @click="currentChange('planRoute')"></a>
                        <h2>Route<span>Planning</span></h2>
                        <p>Plan multi-destination driving route based on predicted traffic congestion and taxi drivers' experiences.<a href='#' @click="currentChange('planRoute')">More...</a></p>
                    </figure>
                </div>
            </div>
            <div class="row">
                <div class="middle-part grid col-md-4" @click="currentChange('hotSpot')" style="margin-right:100px;">
                    <figure class="effect-sadie">
                        <a><img class="ex_img" :src="hotSpotImg" @click="currentChange('hotSpot')"></a>
                        <h2>Hot<span>Spot</span></h2>
                        <p>It provides with taxi drivers/passengers a 'hot' address to get more customer/take taxis conveniently.<a href='#' @click="currentChange('mapmatching')">More...</a></p>
                    </figure>
                </div>
            </div>
        </div>
        <footer>
            <div class="container setFooter">
                <p>Copyright © 2016-2017 Mobile Computing Group</p>
                <p>版权所有 © 2016-2017 移动计算课题组</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import demo from "./demo.vue";
    import thermogram from "./thermogram.vue";
    import planRoute from "./planRoute.vue";
    import hotSpot from './hotSpot.vue'
    export default {
        name: "mainPage",
        data() {
            return {
                img1: "static/images/map.jpg",
                logo: "static/images/logo.png",
                img2: "static/images/map_ex.png",
                prediction: "static/images/prediction.png",
                routePlanning: "static/images/routePlanning.png",
                thermogramImg: "static/images/thermogram.jpg",
                planRouteImg: "static/images/routePlan.jpg",
                hotSpotImg: 'static/images/hotspot_ex.png',
                demo: demo,
                planRoute: planRoute,
                thermogram: thermogram,
                hotSpot: hotSpot
            };
        },
        props: ["currentView"],
        methods: {
            currentChange: function(str) {
                switch (str) {
                    case "mapMatching":
                        // this.myView = demo
                        this.$emit("change-title", "Map-Matching");
                        this.$emit("main-on-change", demo);
                        break;
                    case "traffic":
                        // this.myView = thermogram
                        this.$emit("change-title", "Traffic-Prediction");
                        this.$emit("main-on-change", thermogram);
                        break;
                    case "planRoute":
                        // this.myView = planRoute
                        this.$emit("change-title", "Route-Planning");
                        this.$emit("main-on-change", planRoute);
                        break;
                    case "hotSpot":
                        // this.myView = planRoute
                        this.$emit("change-title", "Hot-Spot");
                        this.$emit("main-on-change", hotSpot);
                        break;
                }
            }
        },
        watch: {}
    };
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav");
        }
    });
</script>

<style scoped type="text/css">
    @import "../css/set1.css";
    @import "../css/app_css.css";
    .setFooter {
        background: #26292f;
        height: 90px;
        width: 100%;
        position: relative;
        top: 120px;
        z-index: 13;
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
</style>