<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <img src="../../assets/logo.svg" style="width: 50px" />
        <div class="title">社区疫情管理系统</div>
      </div>
      <div class="right">
        <el-button round>注册</el-button>
        <el-button round>登录</el-button>
      </div>
      <el-dialog :visible.sync="dialogFormVisible">
        <h1 style="text-align: center; padding-bottom: 10px">登录</h1>
        <el-form :model="loginForm" ref="loginForm" :rules="rules">
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input v-model="loginForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="loginForm.password"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('loginForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('loginForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="navigation">
      <el-menu
        :default-active="$route.path.substring(1)"
        class="menu"
        mode="horizontal"
        light
        router
      >
        <el-menu-item
          v-for="item in $router.options.routes[4].children"
          :index="item.path"
          :key="item.name"
          class="item"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
      <section class="content">
        <transition>
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
const login = "/api/login";
export default {
  name: "Resident",
  data() {
    return {
      formLabelWidth: "80px",
      dialogFormVisible: false,
      loginForm: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.$router.push("announcement");
    console.log(this.$route.path);
    console.log(this.$router.options.routes[4].children);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { phone, password } = this.loginForm;
          this.$axios
            .post(`${login}/userLogin?phone=${phone}&password=${password}`)
            .then((data) => {
              const { code, data: id } = data.data;
              if (code === 200) {
                this.$store.commit("assign", id);
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
                this.resetForm(formName);
              } else {
                this.$message({
                  showClose: true,
                  message: "密码错误",
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  min-width: 900px;
  margin: 0 auto;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
}
.left {
  display: flex;
  align-items: center;
}
.title {
  white-space: nowrap;
}
.navigation {
  width: 100%;
  height: 50px;
  background-color: #4bb344 !important;
  border-radius: 2px;
}
.menu {
  background-color: rgb(75, 179, 68);
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.item {
  padding: 0 5px !important;
  margin: 0 10px !important;
  height: 100% !important;
  color: white !important;
  font-size: 18px !important;
  line-height: 50px !important;
  min-width: 60px;
  text-align: center;
}
.item:hover {
  color: rgb(75, 179, 68) !important;
}
.el-menu-item.is-active {
  background-color: #eeeaea !important;
  border-bottom: none !important;
  color: rgb(75, 179, 68) !important;
}
</style>
