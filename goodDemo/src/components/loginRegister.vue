<template>
    <div>
        <div>
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m" id="login-box">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand">
                            <h1 class="login-header" >iTrip</h1>
                            <h1 class="login-header" style="font-size: 36px; font-weight: 100; font-family: Helvetica Neue; margin-top:-10px; margin-bottom: 20px;">Traffic Congestion Prediction & Multi-destination Route Planning</h1>
                        </div>
                    </div>
                    <ul class="uk-child-width-expand" uk-tab>
                        <li class="uk-active"><a href="#email" data-toggle="tab"><p>Email Login</p></a></li>
                        <li><a href="#username" data-toggle="tab"><p>Username Login</p></a></li>
                        <li><a href="#register" data-toggle="tab"><p>Register</p></a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade in active" id="email">
                            <div style="margin-top: 30px;">
                                <el-input placeholder="Please enter your email" v-model="emailAddress4Login" style="width: 480px">
                                    <i class="el-icon-message el-input__icon" slot="prefix"></i>
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">
                                <el-input prefix-icon="fa fa-key fa-fw" placeholder="Please enter your password" v-model="pwd4Email" style="width: 480px" type="password">
                                </el-input>
                            </div>
                            <div class="uk-card-footer">
                                 <el-button type="info" style="width: 480px; background: #424242 font-weight: 100" @click="loginOnEmail">Login</el-button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="username">
                            <div style="margin-top: 30px;">
                                <el-input prefix-icon="fa fa-user fa-fw" placeholder="Please enter your username" v-model="userName4Login" style="width: 480px">
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">
                                <el-input prefix-icon="fa fa-key fa-fw" placeholder="Please enter your password" v-model="pwd4Username" style="width: 480px" type="password">
                                </el-input>
                            </div>
                            <div class="uk-card-footer">
                                 <el-button type="info" style="width: 480px; background: #424242 font-weight: 100" @click="loginOnUsername">Login</el-button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="register">
                            <div style="margin-top: 30px;">
                                <el-input prefix-icon="fa fa-user fa-fw" placeholder="Please enter a new username" v-model="username4Reg" style="width: 480px">
                                </el-input>
                            </div>
                            <div style="margin-top: 30px;">
                                <el-input placeholder="Please enter an email address" v-model="emailAddress4Reg" style="width: 480px">
                                        <i class="el-icon-message el-input__icon" slot="prefix"></i>
                                </el-input>
                            </div>
                            <div style="margin-top: 30px; margin-bottom: 50px;">
                                <el-input prefix-icon="fa fa-key fa-fw" placeholder="Please enter your password" v-model="pwd4Reg" style="width: 480px" type="password">
                                </el-input>
                            </div>
                            <div class="uk-card-footer">
                                 <el-button type="info" style="width: 480px; background: #424242 font-weight: 100" @click="register">Register</el-button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div id="particles">
        </div>
    </div>
</template>

<script>
// import "../../node_modules/uikit/dist/js/uikit";
// import "../../node_modules/uikit/dist/js/uikit-icons";
import "../assets/js/demo";
import "../assets/js/jquery.particleground";
import mianPage from "./mainPage.vue";

export default {
  name: "login-register",
  props: ["isLogin"],
  data() {
    return {
      activeName: "second",
      emailAddress4Login: "",
      userName4Login: "",
      pwd4Email: "",
      pwd4Username: "",
      emailAddress4Reg: "",
      username4Reg: "",
      pwd4Reg: "",
      isEmailRight: false,
      myLogin: this.isLogin
    };
  },
  methods: {
    loginOnEmail() {
      let self = this;
      if (this.checkRegEmail(this.emailAddress4Login)) {
        $.ajax({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          url: this.urlHeader + "/users/login",
          data: {
            email: self.emailAddress4Login,
            passWord: self.pwd4Email
          },
          type: "post",
          success: function(data) {
            if (data.rspCode == "200" && data.rspMsg == "操作成功") {
              self.myLogin = true;
              self.pwd4Email = "";
              self.emailAddress4Login = "";
              self.$emit("login-success", true);
            } else {
              self.pwd4Email = "";
              self.emailAddress4Login = "";
              self.$message.error(data.rspMsg);
              return;
            }
          },
          error: function(data) {
            self.$message.error("网络错误！");
            return;
          }
        });
      } else {
        return;
      }
    },
    loginOnUsername() {
      let self = this;
      $.ajax({
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        url: this.urlHeader + "/users/login",
        data: {
          userName: this.userName4Login,
          passWord: this.pwd4Username
        },
        type: "post",
        success: function(data) {
          if (data.rspCode == "200" && data.rspMsg == "操作成功") {
            self.pwd4Username = "";
            self.userName4Login = "";
            self.myLogin = true;
            self.$emit("login-success", true);
          } else {
            self.pwd4Username = "";
            self.userName4Login = "";
            self.$message.error(data.rspMsg);
            return;
          }
        },
        error: function(data) {
          self.$message.error("网络错误！");
          return;
        }
      });
    },
    register() {
      let self = this;
      if (this.checkRegEmail(this.emailAddress4Login)) {
        $.ajax({
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          },
          url: this.urlHeader + "/users/regist",
          data: {
            email: self.emailAddress4Reg,
            userName: this.username4Reg,
            passWord: this.pwd4Reg
          },
          type: "post",
          success: function(data) {
            if (data.rspCode == 200 && data.rspMsg == "操作成功") {
              console.log(data);
              self.emailAddress4Reg = "";
              self.username4Reg = "";
              self.pwd4Reg = "";
              self.$message({
                message: "注册成功！",
                type: "success"
              });
            } else {
              self.$message.error(data.rspMsg);
              return;
            }
          },
          error: function(data) {
            self.$message.error("网络错误！");
            return;
          }
        });
      } else {
        return;
      }
    },
    checkRegEmail(emailAddress) {
      var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (this.emailAddress == "") {
        this.$message.error("请输入邮箱！");
        this.isEmailRight = false;
        return false;
      } else if (!regEmail.test(emailAddress)) {
        this.$message.error("邮箱格式不正确！");
        this.isEmailRight = false;
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
/* @import "../../node_modules/uikit/dist/css/uikit.min.css";
@import "../../node_modules/uikit/dist/css/uikit-rtl.min.css"; */
/* @import "../css/login-reg.css";
@import "../css/particle.css"; */
</style>

<style scoped>
body {
  background: #eeeeee;
}

.login-header {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #424242;
  text-align: center;
  font-size: 64px;
}

#login-box {
  margin: 0 auto;
  text-align: center;
  z-index: 10;
}

/*
CSS Reset
http://meyerweb.com/eric/tools/css/reset/
*/

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

#particles {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #eeeeee;
}

p {
  margin: 0 0 30px 0;
  font-size: 20px;
}

@media only screen and (max-width: 1000px) {
  h1 {
    font-size: 70px;
  }
}

@media only screen and (max-width: 800px) {
  h1 {
    font-size: 48px;
  }
  h1::after {
    height: 8px;
  }
}

@media only screen and (max-width: 568px) {
  .intro {
    padding: 0 10px;
  }
  h1 {
    font-size: 30px;
  }
  h1::after {
    height: 6px;
  }
  p {
    font-size: 18px;
  }
  .btn {
    font-size: 16px;
  }
}

@media only screen and (max-width: 320px) {
  h1 {
    font-size: 28px;
  }
  h1::after {
    height: 4px;
  }
}
</style>



