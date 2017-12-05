<template>
  <div style="margin-bottom: -50px;">
    <component :is="currentView" @main-on-change="mainOnChange" @bar-on-change="barOnChange" @change-title="navBarTitleChange"></component>
    <navBar :title="navBarTitle"></navBar>
    <!-- <router-view/> -->
  </div>
</template>

<script>
  import mainPage from './components/mainPage';
  import navBar from './components/navBar';
  import planRoute from './components/planRoute';

  export default {
    name: 'app',
    components: {
      mainPage,
      navBar,
      planRoute,
    },
    data() {
      return {
        mainPage: mainPage,
        currentView: mainPage,
        img1: '../static/images/map.jpg',
        logo: '../static/images/logo.png',
        img2: '../static/images/map_ex.png',
        navBarTitle: "Map-Matching",
      }
    },
    methods: {
      mainOnChange(val) {
        this.currentView = val; //④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      },
      barOnChange(val) {
        this.currentView = val;
      },
      navBarTitleChange(val) {
        this.navBarTitle = val
      },
    }
  }
</script>

<style>
  @import "/css/app_css.css";
</style>
