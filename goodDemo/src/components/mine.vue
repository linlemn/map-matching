<template>
<div>
    <div id="user-info" class="panel panel-default">
        <a><img :src="avatar" class="img-circle" id="user-avatar" @click="dialogAvatarVisible = true"></a>
        <el-dialog title="上传头像" :visible.sync="dialogAvatarVisible" center>
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
                <el-button type="primary" @click="setAvatar" style="z-index: 2002">确 定</el-button>
            </div>
        </el-dialog>

        <h1 id="user-name">{{username}}</h1>
        <p id="introduction">{{introduction}}</p>
        <div class="change-part">
            <el-button class="button-font" type="text" @click="changeIntroduction">修改简介</el-button>
            <button class="button-font">|</button>
            <el-button class="button-font" type="text" @click="dialogFormVisible = true">修改密码</el-button>
            <div>              
                <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                    旧密码
                    <el-input v-model="form.oldPwd" auto-complete="off" placeholder="请输入您的旧密码" ></el-input>
                    <p> </p>
                    <!-- 验证码
                    <el-input v-model="form.verification" auto-complete="off" placeholder="请输入您的收到的验证码"></el-input>
                    <p> </p> -->
                    新密码
                    <el-input v-model="form.newPwd" auto-complete="off" placeholder="请输入您的新密码"></el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="changePwd">确 定</el-button>
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
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">目的地收藏夹</h3>
                                <p class="uk-margin-remove-top uk-margin-remove-bottom card-font card-margin" >Collect your destinations</p>
                                <hr>
                            </div>                           
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <ul class="uk-list uk-list-divider">
                            <li v-for="des in Destinations">
                                <a class="uk-link-reset"><p class="li-p">{{des.title}}<i class="fa fa-angle-right" style="color: white; position: relative; left:10%;"></i></p></a>
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
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">路径收藏夹</h3>
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
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">热点收藏夹</h3>
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
                                <h3 class="uk-card-title uk-margin-remove-bottom card-font card-font-h3">路径规划历史</h3>
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
// import "../../node_modules/uikit/dist/js/uikit";
// import "../../node_modules/uikit/dist/js/uikit-icons";

export default {
  name: "mine",
  data() {
    return {
      avatar: "static/images/map_ex.png",
      username: "bibi",
      introduction: "Latest path you have planned",
      Destinations: [
        { title: "同济大学嘉定校区" },
        { title: "同济大学嘉定校区" },
        { title: "同济大学嘉定校区" }
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
      rs: ""
    };
  },
  methods: {
    changeIntroduction() {
      this.$prompt("请输入您的新简介", "修改简介", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "修改成功！"
          });
          this.introduction = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
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
      //   if(this.form.oldPwd == this.form.newPwd){
      //       this.$message.error('新密码与旧密码相同！');
      //   }else{
      //   let self = this;
      //   $.post(this.urlHeader + '/users/newPassword', {
      //     newPassword: self.form.newPwd,
      //     // userName: this.username4Reg,
      //     oldPassword: self.form.oldPwd,
      //     },
      //     function(data) {
      //         if (data.rspCode == 200 && data.rspMsg == '操作成功'){
      //             console.log(data)
      //             self.form.oldPwd='';
      //             self.form.newPwd='';
      //             self.$message({
      //                 message: '修改成功！',
      //                 type: 'success'
      //             });
      //             self.dialogFormVisible = false
      //         }else{
      //             self.$message.error(data.rspMsg);
      //             return;
      //         }
      //     });
      let self = this;
      $.post(
        this.urlHeader + "/users/login",
        {
          userName: "test",
          passWord: "newtest"
        },
        function(data) {
          console.log(data);
          self.rs = data.rspCode;
          // console.log(self.rs)
          console.log(self.rs);
          if (self.rs == "200") {
            $.post(
              self.urlHeader + "/users/newPassword",
              {
                oldPassword: "test",
                newPassword: "newtest"
              },
              function(data) {
                console.log(data);
              }
            );
          }
        }
      );

      // axios.get(this.urlHeader + '/users/introduction')
      //     .then(function (response) {
      //         console.log(response);
      //     })
      //     .catch(function (error) {
      //         console.log(error);
      //     });

      // $.get(this.urlHeader + '/users/info', {
      // },
      // function(data) {
      //     console.log(data)
      //     self.$message.error(data.rspMsg);
      // });
      //   }
    }
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
</style>


<style scoped type="text/css">
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
  width: 700%;
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

.el-upload__input {
  opacity: 0;
  position: relative;
  top: 100%;
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



