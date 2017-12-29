<template>
  <div>
    <div v-if="isLogin">
      <nav class="navbar navbar-fixed-top my-navbar" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                </div>
                <div class="collapse navbar-collapse nav-style" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <ul class="nav navbar-nav">
                            <li><a href="#home" @click="toHome">Home<span class="sr-only">(current)</span></a></li>
                            <li class="dropdown shade">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Schemes <span class="caret"></span></a>
                                <ul class="dropdown-menu shade" role="menu">
                                    <li>
                                        <a href="#" @click="mainOnChange">Map Matching</a>
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
                            <li data-toggle="modal" data-target="#about"><a href="#mine" @click="toMine">About Me</a></li>
                            <li data-toggle="modal" data-target="#about"><a href="#">Help</a></li>
                            <li data-toggle="modal" data-target="#about"><a href="#" @click="logout">Logout</a></li>
                        </ul>
                    </ul>
                </div>
            </div>
      </nav>
      <component :is="currentView"
      @main-on-change="mainOnChange">
      </component>  
    </div>
    <div v-else>
      <loginReg  @login-success="loginSuccess"></loginReg>
    </div>
    <div id="particle"></div>
    
    <!-- <router-view/> -->
  </div>
</template>

<script>
  import mainPage from './components/mainPage';
  import planRoute from './components/planRoute';
  import mine from './components/mine';
  import loginReg from './components/loginRegister';

  export default {
    name: 'app',
    components: {
      mainPage,
      planRoute,
      mine,
      loginReg,
    },
    data() {
      return {
        mainPage: mainPage,
        currentView: mainPage,
        mine: mine,
        img1: '../static/images/map.jpg',
        logo: '../static/images/logo.png',
        img2: '../static/images/map_ex.png',
        navBarTitle: "Map-Matching",
        isLogin: true,
      }
    },
    methods: {
      mainOnChange(val){
        this.currentView = val
      },
      loginSuccess(val){
        this.isLogin = val;
      },
      toMine: function(){
        this.currentView = mine;
      },
      toHome: function(){
        this.currentView = mainPage;
      },
      logout: function(){
        this.isLogin = false;
        this.$message({
            message: '注销成功！',
            type: 'success'
        });
      }
    }
  }
</script>

<style>
@import "./css/app_css.css";

  body{
    background: #eeeeee;
  }

  .nav-style{
    color: #eeeeee;
    font-size: 16px;
    font-family: Helvetica;
  }
</style>
