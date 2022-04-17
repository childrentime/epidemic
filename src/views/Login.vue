<template>
  <div class="container">
    <div class="login">
      <div class="logo">
        <img src="../assets/logo.svg" />
      </div>
      <h1 class="h1">社区疫情管理系统</h1>
      <div class="form">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              autocomplete="off"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-radio-group v-model="form.role">
              <el-radio label="0">居民</el-radio>
              <el-radio label="1">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm('form')"
          >
            登录
          </el-button>
        </div>
        <div style="padding: 10px">
          还没有账号？
          <el-link type="primary" href="/register">去注册</el-link>
        </div>
        <div style="padding: 10px">
          来访者？
          <el-link type="primary" href="/visitor">跳转到访客页面</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prefix = "/api/login";
export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        role: "0",
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { phone, password, role } = this.form;
          if (role === "1") {
            this.$axios
              .post(`${prefix}/adminLogin?id=${phone}&password=${password}`)
              .then((data) => {
                const { code, data: id } = data.data;
                if (code === 200) {
                  sessionStorage.setItem("adminId", id);
                  this.$router.push("/admin/user");
                } else {
                  this.$message({
                    showClose: true,
                    message: "密码错误",
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
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.login {
  width: 350px;
  padding-top: 3%;
  margin: 0 auto;
}
.logo {
  width: 100%;
  text-align: center;
}
.logo img {
  width: 32px;
  height: 32px;
}
.form {
  border: 1px solid #d0d7de;
  border-radius: 2px;
  box-shadow: 0 12px 30px 0 rgb(59 59 97 / 18%);
  padding: 16px;
  font-size: 14px;
  margin-top: 16px !important;
  background-color: #f6f8fa;
  width: 350px;
}
.button {
  margin-top: 16px;
  margin-bottom: 4px;
}
.h1 {
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
