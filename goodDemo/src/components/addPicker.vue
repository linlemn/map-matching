<template>
    <div id="block">
        <div id="button">
            <el-button type="text" icon="el-icon-plus" v-on:click="addAPicker" style="color: #26292F"></el-button>
        </div>
    </div>
</template>

<script>
    import AMap from 'AMap'
    export default {
        data() {
            return {
                pickerCounter: -1,
                pickerNum: -1
            }
        },
        methods: {
            addAPicker: function() {
                this.pickerCounter++
                    this.pickerNum++
                    this.$parent.addAPicker(this.pickerNum)
            },
            deleteAPicker: function() {
                if(this.pickerCounter == -1) {
                    return
                }
                this.pickerCounter--
            }
        },
    }
</script>

<style>
    #block {
        position: relative;
        height: 210px;
        width: 265px;
        background: #ffffff;
        /* box-shadow: 0px, 2px, 10px, #26282D; */
        left: 2.5%;
        border-radius: 3px;
        border: 0.1px solid #26282D;
        margin: 0 10px 10px 10px;
    }
    #button {
        position: relative;
        left: 48%;
        top: 40%;
    }
</style>
