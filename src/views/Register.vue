<template>
  <div class="container">
    <div class="login">
      <div class="logo">
        <img src="../assets/logo.svg" />
      </div>
      <h1 class="h1">社区疫情管理系统</h1>
      <div class="form" label-position="top">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="name" label="姓名">
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机">
            <el-input
              v-model="form.phone"
              autocomplete="off"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="card" label="身份证号">
            <el-input
              v-model="form.card"
              autocomplete="off"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
              class="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="button">
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm('form')"
          >
            注册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const prefix = "/api/login";
export default {
  name: "Register",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        card: "",
        gender: "",
        name: "",
      },

      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        card: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
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
          const { phone, password, card, gender, name } = this.form;
          this.$axios
            .post(
              `${prefix}/userRegister?phone=${phone}&password=${password}&card=${card}&gender=${gender}&name=${name}`
            )
            .then((data) => {
              const { code } = data.data;
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: "注册成功",
                  type: "success",
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "注册失败，手机号重复",
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.input >>> .el-input__inner {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: black;
  border-bottom: 1px solid !important;
}
.el-input .el-input__inner {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: white;
  border-bottom: 1px solid !important;
}
.container {
  width: 100%;
  height: 100%;
}
.login {
  width: 600px;
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
  width: 600px;
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
