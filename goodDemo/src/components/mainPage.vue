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
                <img :src="img1" width="100%" @click="currentChange">
                <div class="carousel-caption" @click="currentChange">
                    <h1>Map Matching</h1>
                    <p>Vehicle positioning and navigation systems play an important role in all areas of intelligent transportation. Therefore, the map matching algorithm for GPS, a single positioning device vehicle navigation system, plays a very important role.</p>
                </div>
                </a>
            </div>
            <div class="item">
                <a href="#">
                <img src="img">
                <div class="carousel-caption">
                    <h1></h1>
                    <p></p>
                </div>
                </a>
            </div>
            <div class="item">
                <a href="#">
                <img src="img">
                <div class="carousel-caption">
                    <h1></h1>
                    <p></p>
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
    <div class="middle-part grid" @click="currentChange">
        <figure class="effect-sadie">
        <a><img class="ex_img" :src="img2"></a>
        <h2>Map<span>Matching</span></h2>      
                <p>This tool displays tracks of the map matching algorithm for GPS according to a series of big data input.<a href='#' @click="currentChange">More...</a></p>         	
        </figure>                            
    </div>

    <footer>
        <div class="container setFooter">
        <p>Copyright © 2016-2017 Mobile Computing Group</p>
        <p>版权所有 © 2016-2017 移动计算课题组</p>
        </div>
    </footer>   

    </div> 

  </div>
</template>

<script>
    import demo from './demo.vue';
    
    import "../../static/images/map.jpg";
    import "../../static/images/map_ex.png";

    export default {
        name: 'mainPage',
        data() {
            return {
                img1: 'static/images/map.jpg',
                logo: 'static/images/logo.png',
                img2: 'static/images/map_ex.png',
                demo,
                myView: this.currentView
            }
        },
        props: ['currentView'],
        methods: {
            currentChange: function() {
                this.myView = demo
            }
        },
        watch: {
            currentView(val) {
                this.myView = val; //新增result的watch，监听变更并同步到myResult上
            },
            myView(val) {
                this.$emit("main-on-change", val); //③组件内对myResult变更后向外部发送事件通知
            }
        }

    }

    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav");
        }
    })
</script>

<style type="text/css">
    @import "../css/set1.css";
    @import "../css/app_css.css";
</style>