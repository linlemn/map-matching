// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import Option from 'element-ui/lib/option';
import DatePicker from 'element-ui/lib/date-picker';
import Input from 'element-ui/lib/input';
import Button from 'element-ui/lib/button';
import Card from 'element-ui/lib/card';
import Popover from 'element-ui/lib/popover';
import Radio from 'element-ui/lib/radio';
import RadioGroup from 'element-ui/lib/radio-group';
import RadioButton from 'element-ui/lib/radio-button';
import Upload from 'element-ui/lib/upload'

import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import VueAMap from 'vue-amap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Button);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Option)
Vue.use(Popover);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(VueChartkick, {
    Chartkick
});

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: '68612098266e626913da5e9c6fe6cbd0',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation']
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

//全局变量header
Vue.prototype.urlHeader = 'http://101.132.142.238:8080'