<template>
<div>
    <div id="user-info" class="panel panel-default">
        <a><img :src="avatar" class="img-circle" id="user-avatar" @click="dialogAvatarVisible = true"></a>
        <el-dialog title="Upload Avatar" :visible.sync="dialogAvatarVisible" center>
            <el-upload
                action="https://echo.paw.cloud"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="handleAvatarSuccess">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setAvatar" style="z-index: 2002">OK</el-button>
            </div>
        </el-dialog>

        <h1 id="user-name">{{username}}</h1>
        <p id="introduction">{{introduction}}</p>
        <div class="change-part">
            <el-button class="button-font" type="text" @click="changeIntroduction">Set Introduction</el-button>
            <button class="button-font">|</button>
            <el-button class="button-font" type="text" @click="dialogFormVisible = true">Set Password</el-button>
            <div>              
                <el-dialog title="Set Password" :visible.sync="dialogFormVisible">
                    Old Password
                    <el-input v-model="form.oldPwd" auto-complete="off" placeholder="Enter your old password" type="password"></el-input>
                    <p> </p>
                    <!-- 验证码
                    <el-input v-model="form.verification" auto-complete="off" placeholder="请输入您的收到的验证码"></el-input>
                    <p> </p> -->
                    New Password
                    <el-input v-model="form.newPwd" auto-complete="off" placeholder="Enter your new password" type="password"></el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="changePwd">OK</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>

    <div id="bottom-part">
        <div class="uk-grid-small uk-child-width-expand@s uk-text-center" uk-grid>
            <div class="uk-card card-bg">
                <div class="card">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle uk-text-left" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">Destinations Collects</h3>
                                <p class="uk-margin-remove-top uk-margin-remove-bottom card-font card-margin" >Collect your destinations</p>
                                <hr>
                            </div>                           
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <ul class="uk-list">
                            <li v-for="des in Destinations">
                                <a class="uk-link-reset" @click="clickPointsCollects(des)">
                                    <el-alert
                                        :title=des.title
                                        type="success"
                                        show-icon
                                        @close="deleteDestination(des.id)">
                                    </el-alert>
                                </a>
                            </li>
                        </ul>
                    </div>               
                </div>
            </div>
            <div class="uk-card card-bg">
                <div class="card">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle uk-text-left" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">Routes Collects</h3>
                                <p class="uk-margin-remove-top uk-margin-remove-bottom card-font card-margin">Collect your paths</p>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        
                    </div>               
                </div>
            </div>
            <div class="uk-card card-bg">
                <div class="card">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle uk-text-left" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">Hotspot Collects</h3>
                                <p class="uk-margin-remove-top uk-margin-remove-bottom card-font card-margin">Collect the hotspot</p>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                      <ul class="uk-nav uk-nav-parent-icon uk-nav-primary" uk-nav>
                        <!-- <li class="uk-active"><a href="#">Active</a></li> -->
                        <li class="uk-parent">
                            <a href="#" style="backgroud: white">Load Hotspots Collects</a>
                            <ul class="uk-nav-sub uk-list">
                              <li v-for="des in psgHotspots">
                                <a class="uk-link-reset" @click="clickPointsCollects(des)">
                                    <el-alert
                                        :title=des.title
                                        type="success"
                                        show-icon
                                        @close="deleteHotspot(des.id, '2')">
                                    </el-alert>
                                </a>
                              </li>
                            </ul>
                        </li>
                        <hr>
                        <li class="uk-parent">
                            <a href="#">Passengers Hotspots Collects</a>
                            <ul class="uk-nav-sub uk-list">
                               <li v-for="des in loadHotspots">
                                <a class="uk-link-reset" @click="clickPointsCollects(des)">
                                    <el-alert
                                        :title=des.title
                                        type="success"
                                        show-icon
                                        @close="deleteHotspot(des.id, '1')">
                                    </el-alert>
                                </a>
                              </li>
                            </ul>
                        </li>
                        <hr>
                    </ul>        
                  </div>               
                </div>
            </div>
            <div class="uk-card card-bg">
                <div class="card">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle uk-text-left" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">Routes History</h3>
                                <p class="uk-margin-remove-top uk-margin-remove-bottom card-font">Latest path you have planned</p>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                    </div>               
                </div>
            </div>
        </div>
    </div>
    <footer class="bottom">
        <div class="container setFooter">
            <p>Copyright © 2016-2017 Mobile Computing Group</p>
            <!-- <p>版权所有 © 2016-2017 移动计算课题组</p> -->
         </div>
    </footer>  
</div>

</template>

<script>
export default {
  name: "mine",
  data() {
    return {
      avatar: "static/images/map_ex.png",
      username: "bibi",
      introduction: "Latest path you have planned",
      Destinations: [],
      titles: [],
      Paths: [],
      Historys: [],
      hotspots: [],
      dialogFormVisible: false,
      dialogAvatarVisible: false,
      form: {
        oldPwd: "",
        verificationCode: "",
        newPwd: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      tempImage: "",
      isDeleteDestination: false,
      psgHotspots: [],
      loadHotspots: [],
    };
  },
  methods: {
    deleteHotspot(id, type){
      console.log(id, type);
      let self = this;
      this.isDeleteDestination = true;
      var subUrl = ''
      if (type == "1") {
        subUrl = '/favorites/psgHotNode'
      }else {
        subUrl = '/favorites/loadHotNode'
      }
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + subUrl,
        type: "POST",
        data: {
          id: id,
          _method: "DELETE"
        },
        dataType: "json",
        success: function(data) {
          console.log(subUrl,data)
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            self.$message({
              type: "success",
              message: "Successfully delete!"
            });
          } else {
            self.$message.error("Fail! Please reload the website!");
          }
        },
        error: function(er) {
          self.$message.error("Network Error");
        }
      });
    },
    changeIntroduction() {
      this.$prompt("Please Enter your new introduction", "Set Introdction", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          let self = this;
          if (value == "") {
            self.$message.error("");
          }
          $.ajax({
            crossDomain: true,
            xhrFields: { withCredentials: true },
            url: self.urlHeader + "/users/introduction",
            data: {
              introduction: value
            },
            type: "POST",
            dataType: "json",
            success: function(data) {
              if (data.rspCode == "200" && data.rspMsg == "操作成功") {
                self.introduction = value;
                self.$message({
                  type: "success",
                  message: "Introdction Successfully Set！"
                });
              } else {
                self.$message.error(data.rspMsg);
              }
            },
            error: function(er) {
              self.$message.error("Network Error！");
            }
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "Input Cancel"
          });
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.tempImage = URL.createObjectURL(file.raw);
    },
    setAvatar() {
      // console.log(this.tempImage);
      this.avatar = this.tempImage;
      this.dialogAvatarVisible = false;
    },
    changePwd() {
      let self = this;
      if (self.form.newPwd == self.form.oldPwd) {
        self.$message.error("The same password！Please reset!");
        return;
      }
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/users/newPassword",
        data: {
          oldPassword: self.form.oldPwd,
          newPassword: self.form.newPwd
        },
        type: "POST",
        dataType: "json",
        success: function(data) {
          // console.log(data);
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            self.$message({
              type: "success",
              message: "Successfully Set Password！"
            });
          } else {
            self.$message.error(data.rspMsg);
            dialogFormVisible = false;
          }
        },
        error: function(er) {
          self.$message.error("Network Error！");
        }
      });
    },
    getUserInfo() {
      let self = this;
      this.Destinations = []
      this.psgHotspots = []
      this.loadHotspots = []
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/users/info",
        type: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data);
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            self.username = data.data.userName;
            self.introduction = data.data.introduction;
            if (data.data.destinationFavorites.destinations.length != 0) {
              var des;
              for (des in data.data.destinationFavorites.destinations) {
                var coordinates = [];
                coordinates.push(
                  data.data.destinationFavorites.destinations[des].longitude
                );
                coordinates.push(
                  data.data.destinationFavorites.destinations[des].latitude
                );
                self.queryForLocationTitles1(
                  coordinates,
                  data.data.destinationFavorites.destinations[des].id
                );
              }
            }
            if (data.data.psgHotFavorites.psgHotNodes.length != 0) {
              var des;
              for (des in data.data.psgHotFavorites.psgHotNodes) {
                var coordinates = [];
                coordinates.push(
                  data.data.psgHotFavorites.psgHotNodes[des].longitude
                );
                coordinates.push(
                  data.data.psgHotFavorites.psgHotNodes[des].latitude
                );
                self.queryForLocationTitles2(
                  coordinates,
                  data.data.psgHotFavorites.psgHotNodes[des].id
                );
              }
            }
            if (data.data.loadHotFavorites.loadHotNodes.length != 0) {
              var des;
              for (des in data.data.loadHotFavorites.loadHotNodes) {
                var coordinates = [];
                coordinates.push(
                  data.data.loadHotFavorites.loadHotNodes[des].longitude
                );
                coordinates.push(
                  data.data.loadHotFavorites.loadHotNodes[des].latitude
                );
                self.queryForLocationTitles3(
                  coordinates,
                  data.data.loadHotFavorites.loadHotNodes[des].id
                );
              }
            }
          } else {
            self.$message.error(data.rspMsg);
          }
        },
        error: function(er) {
          self.$message.error("Network Error");
        }
      });
    },
    queryForLocationTitles1(coordinates, id) {
      //根据经纬度获取poi
      let self = this;
      AMap.service("AMap.Geocoder", function() {
        //回调函数
        //实例化Geocoder
        let geocoder = new AMap.Geocoder({
          city: "021" //城市，默认：“全国”
        });
        //TODO: 使用geocoder 对象完成相关功能
        geocoder.getAddress(coordinates, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            //获得了有效的地址信息:
            //即，result.regeocode.formattedAddress
            var temp = { id: "", title: "", coordinates: [] };
            temp.title = result.regeocode.formattedAddress;
            temp.id = id;
            temp.coordinates = coordinates;
            self.Destinations.push(temp);
          } else {
            //获取地址失败
            self.$message.error("Network Error!");
            self.titles.push("Error");
          }
        });
      });
    },
    queryForLocationTitles2(coordinates, id) {
      //根据经纬度获取poi
      let self = this;
      AMap.service("AMap.Geocoder", function() {
        //回调函数
        //实例化Geocoder
        let geocoder = new AMap.Geocoder({
          city: "021" //城市，默认：“全国”
        });
        //TODO: 使用geocoder 对象完成相关功能
        geocoder.getAddress(coordinates, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            //获得了有效的地址信息:
            //即，result.regeocode.formattedAddress
            var temp = { id: "", title: "", coordinates: [] };
            temp.title = result.regeocode.formattedAddress;
            temp.id = id;
            temp.coordinates = coordinates;
            self.psgHotspots.push(temp);
          } else {
            //获取地址失败
            self.$message.error("Network Error!");
            self.titles.push("Error");
          }
        });
      });
    },
    queryForLocationTitles3(coordinates, id) {
      //根据经纬度获取poi
      let self = this;
      AMap.service("AMap.Geocoder", function() {
        //回调函数
        //实例化Geocoder
        let geocoder = new AMap.Geocoder({
          city: "021" //城市，默认：“全国”
        });
        //TODO: 使用geocoder 对象完成相关功能
        geocoder.getAddress(coordinates, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            //获得了有效的地址信息:
            //即，result.regeocode.formattedAddress
            var temp = { id: "", title: "", coordinates: [] };
            temp.title = result.regeocode.formattedAddress;
            temp.id = id;
            temp.coordinates = coordinates;
            self.loadHotspots.push(temp);
          } else {
            //获取地址失败
            self.$message.error("Network Error!");
            self.titles.push("Error");
          }
        });
      });
    },
    clickPointsCollects(coordinates) {
      if (!this.isDeleteDestination) {
        this.$emit("click-on-point", coordinates);
        console.log(coordinates);
      }
      this.isDeleteDestination = false;
    },
    deleteDestination(id) {
      console.log(id);
      let self = this;
      this.isDeleteDestination = true;
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/favorites/destination",
        type: "POST",
        data: {
          id: id,
          _method: "DELETE"
        },
        dataType: "json",
        success: function(data) {
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            self.$message({
              type: "success",
              message: "Successfully delete!"
            });
          } else {
            self.$message.error(data.rspMsg + "! Please reload the website!");
          }
        },
        error: function(er) {
          self.$message.error("Network Error");
        }
      });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style>
/* @import "../css/app_css.css"; */
.my-navbar {
  padding: 0;
  background: #26292f;
  height: 70px;
  padding: 15px;
}
.el-upload__input {
  opacity: 0;
  position: relative;
  top: 100%;
}

input[type="file"] {
  display: none;
}

.el-icon-success:before {
  content: "\E61D";
}

.el-alert--success {
  background: #717171;
  color: white;
}

.el-alert__title {
  text-align: left;
}

.el-icon-close:before {
  position: relative;
  left: 10px;
}

.uk-card-body {
  padding: 10px 30px;
}
</style>


<style scoped type="text/css">
.uk-nav-primary>li>a {
    text-align: left;
    font-size: 17px;
    line-height: 1.5;
    color: white;
}

.uk-nav-primary>li>a {
    font-family: Helvetica Neue;
    font-weight: 500;
}

body {
  background: #616161;
}

html {
  overflow: hidden;
}

.bottom {
  position: absolute;
  bottom: 12%;
}

.setFooter {
  background: #26292f;
  height: 100px;
  width: 550%;
  position: relative;
  top: 130px;
  z-index: 13;
  /* padding-bottom: 5px; */
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

#user-info {
  background: #616161;
  position: absolute;
  width: 100%;
  height: 25%;
  top: 8%;
  border: none;
  /* border-color: #424242; */
}

.my-navbar {
  padding: 0;
  background: #26292f;
  height: 70px;
  padding: 15px;
}

#user-avatar {
  height: 50%;
  position: absolute;
  top: 20%;
  left: 10%;
}

#user-name {
  position: absolute;
  left: 25%;
  /* top: 13%; */
  color: white;
  font-weight: 300;
  font-size: 48px;
}

#bottom-part {
  position: absolute;
  top: 33%;
  width: 100%;
  padding-bottom: 20px;
  padding-right: 10px;
  background: #616161;
}

#introduction {
  position: relative;
  left: 25%;
  top: 40%;
  color: white;
  font-weight: 300;
  font-size: 18px;
  width: 50%;
}

.card {
  background: #757575;
  overflow: auto;
  height: 463px;
}

.card-bg {
  background: #616161;
}

/* .setFooter {
  width: 500%;
  height: 80px;
  font-size: 13px;
} */

.card-font {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #ffffff;
  font-weight: 800;
}

.card-font-h3 {
  color: #ffffff;
  margin-bottom: 10px;
}

.card-margin {
  margin-bottom: -30px;
}

.change-part {
  position: relative;
  left: 25%;
  top: 40%;
  font-family: Arial, Helvetica, sans-serif;
}

.button-font {
  background: #616161;
  font-size: 12px;
  color: #eeeeee;
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  font-weight: 200;
}

.button-font:hover {
  color: #ffffff;
}

.li-p {
  color: white;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 100;
}

.li-p:hover {
  color: #bdbdbd;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.codrops-header {
  margin: 0 auto;
  padding: 2em;
  text-align: center;
}

.codrops-header h1 {
  margin: 0;
  font-weight: 800;
  font-size: 3em;
  font-family: "Merriweather Sans", sans-serif;
}

.codrops-header p {
  padding: 0.35em 0 1.25em;
  margin: 0;
  font-size: 1.65em;
  opacity: 0.7;
}
</style>



