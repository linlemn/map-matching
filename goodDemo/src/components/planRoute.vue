<template>
    <div class="page">
        <div id="amap_id">
            <el-amap :zoom="zoom" :center="center" :plugin="plugin"></el-amap>
        </div>
        <nav class="main-menu" style="z-index: 12; overflow: auto;">
            <ul>
                <li>
                    <picker></picker>
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

<script>
    import picker from './picker.vue'
    export default {
        data() {
            let self = this;
            return {
                zoom: 13,
                center: [121.59996, 31.197646],
                lng: 0,
                lat: 0,
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.center = [self.lng, self.lat];
                                    self.loaded = true;
                                    self.$nextTick();
                                }
                            });
                        }
                    }
                }],
            }
        },
        components: {
            'picker': picker
        },
        methods: {},
    }
</script>

<style>
    @import "../css/style.css";
    @import "../css/app_css.css";
    @import "../css/set1.css";
    .my-navbar {
        padding: 0;
        background: #26292F;
        height: 70px;
        padding: 15px;
        
    }
    
</style>