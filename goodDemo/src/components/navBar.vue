<template>
    <div>
        <nav class="navbar navbar-fixed-top my-navbar" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                    <!-- <img class="navbar-brand" :src="logo" width="100%"> -->
                    <div class="navbar-brand" width="100%" >{{title}}</div>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <ul class="nav navbar-nav">
                            <li><a href="#" @click="toHome()">Home<span class="sr-only">(current)</span></a></li>
                            <li class="dropdown shade">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Schemes <span class="caret"></span></a>
                                <ul class="dropdown-menu shade" role="menu">
                                    <li>
                                        <a href="#">Map Matching</a>
                                    </li>
                                    <li>
                                        <a href="#">Traffic Prediction</a>
                                    </li>
                                    <li>
                                        <a href="#">Route Planning</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li><a href="#">More...</a></li>
                                </ul>
                            </li>
                            <li data-toggle="modal" data-target="#about"><a href="#">About us</a></li>
                            <li data-toggle="modal" data-target="#about"><a href="#">Help</a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- <footer class="bottom">
                    <div class="container setFooter">
                    <p>Copyright © 2016-2017 Mobile Computing Group</p>
                    <p>版权所有 © 2016-2017 移动计算课题组</p>
                    </div>
                </footer>   -->
    </div>
</template>

<script>
    import demo from './demo';
    import mainPage from './mainPage';
    import "../../static/images/logo.png";
    import planRoute from './planRoute'

    export default {
        name: 'navBar',
        component: {
            demo
        },
        data() {
            return {
                logo: 'static/images/logo.png',
                mainPage,
                myView: this.currentView,
            }
        },
        props: ['currentView', 'title'],
        methods: {
            toHome: function() {
                this.myView = mainPage
            }
        },
        watch: {
            currentView(val) {
                this.myView = val; //新增result的watch，监听变更并同步到myResult上
            },
            myView(val) {
                this.$emit("bar-on-change", val); //③组件内对myResult变更后向外部发送事件通知
            },
            title(val) {
                $(".nav-brand").innerHTML = val;
            }
        },
    }
</script>

<style type="text/css">
    @import "../css/app_css.css";
    .navbar-brand {
        font-family: "Impact";
        color: #ffffff;
        font-size: 36px;
    }
</style>