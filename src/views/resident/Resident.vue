<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <img src="../../assets/logo.svg" style="width: 50px" />
        <div class="title">社区疫情管理系统</div>
      </div>
      <div class="right">
        <template v-if="!user">
          <el-button round @click="$router.push('/register')">注册</el-button>
          <el-button round @click="dialogFormVisible = true">登录</el-button>
        </template>
        <template v-else>
          <el-dropdown placement="bottom-start">
            <span class="el-dropdown-link">
              {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updateUser"
                >修改个人信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <el-dialog title="修改个人信息" :visible.sync="userFormVisible">
          <el-form :model="userForm" ref="userForm" :rules="userRules">
            <el-form-item
              label="姓名"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input v-model="userForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="性别"
              :label-width="formLabelWidth"
              prop="gender"
            >
              <el-select v-model="userForm.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="手机号"
              :label-width="formLabelWidth"
              prop="phone"
            >
              <el-input v-model="userForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="身份证"
              :label-width="formLabelWidth"
              prop="card"
            >
              <el-input v-model="userForm.card" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('userForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('userForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
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
const user = "/api/user";
export default {
  name: "Resident",
  data() {
    return {
      user: {},
      formLabelWidth: "80px",
      dialogFormVisible: false,
      userFormVisible: false,
      userForm: {
        name: "",
        gender: "",
        card: "",
        phone: "",
      },
      userRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        card: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
      },
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
    if (this.$store.state.id) {
      this.getUser(this.$store.state.id);
    }
    this.$router.push("announcement");
    console.log(this.$route.path);
    console.log(this.$router.options.routes[4].children);
  },
  methods: {
    getUser(id) {
      this.$axios.get(`${user}/getUser?id=${id}`).then((data) => {
        const { data: user } = data.data;
        this.user = user;
      });
    },
    updateUser() {
      this.userFormVisible = true;
      this.userForm.name = this.user.name;
      this.userForm.gender = this.user.gender;
      this.userForm.card = this.user.card;
      this.userForm.phone = this.user.phone;
    },
    exit: function () {
      sessionStorage.removeItem("userId");
      this.$store.commit("assign", "");
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === "loginForm") {
            const { phone, password } = this.loginForm;
            this.$axios
              .post(`${login}/userLogin?phone=${phone}&password=${password}`)
              .then((data) => {
                const { code, data: id } = data.data;
                if (code === 200) {
                  sessionStorage.setItem("userId", id);
                  this.$store.commit("assign", id);
                  this.$message({
                    showClose: true,
                    message: "登录成功",
                    type: "success",
                  });
                  this.resetForm(formName);
                  this.getUser(id);
                } else {
                  this.$message({
                    showClose: true,
                    message: "密码错误",
                    type: "error",
                  });
                }
              });
          } else {
            const { name, gender, card, phone } = this.userForm;
            this.$axios
              .post(
                `${user}/updateUser?name=${name}&phone=${phone}&gender=${gender}&card=${card}&userId=${this.$store.state.id}`
              )
              .then((data) => {
                const { code } = data.data;
                if (code === 200) {
                  this.$message({
                    showClose: true,
                    message: "更新成功",
                    type: "success",
                  });
                  this.getUser(this.$store.state.id);
                  this.resetForm(formName);
                } else {
                  this.$message({
                    showClose: true,
                    message: "更新失败",
                    type: "error",
                  });
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (formName === "loginForm") {
        this.dialogFormVisible = false;
      } else {
        this.userFormVisible = false;
      }
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
