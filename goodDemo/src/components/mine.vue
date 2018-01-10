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
                            <!-- <ul class="uk-list"> -->
                            <li v-for="des in Destinations">
                                <a class="uk-link-reset" @click="clickPointsCollects(des.coordinates)">
                                    <el-alert
                                        :title=des.title
                                        type="success"
                                        @close="deleteDestination">
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
            <p>版权所有 © 2016-2017 移动计算课题组</p>
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
      Destinations: [
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        },
        {
          title: "同济大学嘉定校区",
          coordinates: [31.25115, 121.45864]
        }
      ],
      Paths: [],
      Hotspot: [],
      Historys: [],
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
      isDeleteDestination: false
    };
  },
  methods: {
    changeIntroduction() {
      this.$prompt("Please Enter your new introduction", "Set Introdction", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          let self = this;
          if (value == ''){
              self.$message.error("")
          }
          $.ajax({
            crossDomain: true,
            xhrFields: { withCredentials: true },
            url: self.urlHeader + "/users/introduction",
            data:{
                introduction: value,
            },
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data.rspCode == "200" && data.rspMsg == "操作成功"){
                    self.introduction = value
                    self.$message({
                        type: "success",
                        message: "Introdction Successfully Set！"
                    })
                }else{
                    self.$message.error(data.rspMsg)
                }
            },
            error: function(er) {
              self.$message.error("Network Error！")
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
      console.log(this.tempImage);
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
      $.ajax({
        crossDomain: true,
        xhrFields: { withCredentials: true },
        url: self.urlHeader + "/users/info",
        type: "GET",
        dataType: "json",
        success: function(data) {
          if (data.rspCode=="200" && data.rspMsg=="操作成功"){
            self.username = data.data.userName;
            self.introduction = data.data.introduction;
          }else{
            console.log(data);
            self.$message.error(data.rspMsg);
          }
        },
        error: function(er) {
          BackErr(er);
        }
      });
    },
    clickPointsCollects(coordinates) {
      if (!this.isDeleteDestination) {
        this.$emit("click-on-point", coordinates);
      }
      this.isDeleteDestination = false;
    },
    deleteDestination(order) {
      this.isDeleteDestination = true;
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
</style>


<style scoped type="text/css">
.el-alert--success {
  background: #757575;
  color: white;
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
  width: 500%;
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



