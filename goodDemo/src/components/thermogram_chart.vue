<template>
  <div class="page">
    <div id="timeline2" style="width:100%;height: 450px;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import test from '../assets/py/edge_geometry.json'
  import {
    TimeKnots,
    clickDate
  } from '../assets/js/timeknots.js'

  export default{
    data() {
      return {
        timeStamps: [],
        timeLabel: [],
      }
    },
    components: {},
    methods: {
      timeLineRect: function() {
        var height = $(document).height()
        TimeKnots.draw("#timeline2", this.timeStamps, {
          color: "#455A64",
          height: height,
          width: 200,
          showLabels: true,
          labelFormat: "%H:%M",
          dateFormat: "%H:%M",
          radius: 6,
          horizontalLayout: false
        })
      },
      getTimeStamp: function() {
        var description = "Click to see to thermogram of "
        for (var i = 0; i < 48; i++) {
          var time = new Date(test.time[i].starting_time).toUTCString().replace(/:\d{1,2}$/, ' ')
          this.timeStamps.push({
            date: time,
            name: description
          })
          i++
        }
      },
    },
    mounted: function() {
      this.getTimeStamp()
      this.timeLineRect()
    }
  }
  //监听点击时间变化
  // timeline.$watch('clickTime', timeline.$emit('integrate', parseInt()))
</script>

