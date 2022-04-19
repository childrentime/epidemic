<template>
  <div class="formContainer">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item
        label="外出时间"
        :label-width="formLabelWidth"
        prop="outTime"
      >
        <el-date-picker
          v-model="form.outTime"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择外出时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="返回时间"
        :label-width="formLabelWidth"
        prop="inTime"
      >
        <el-date-picker
          v-model="form.inTime"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择返回时间"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item
        label="外出原因"
        :label-width="formLabelWidth"
        prop="reason"
      >
        <el-input v-model="form.reason" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        label="外出地址"
        :label-width="formLabelWidth"
        prop="address"
      >
        <el-cascader size="large" :options="options" v-model="form.address">
        </el-cascader>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
const prefix = "/api/access";
export default {
  name: "Access",
  data() {
    return {
      options: regionData,
      formLabelWidth: "100px",
      form: {
        inTime: "",
        outTime: "",
        address: [],
        reason: "",
      },
      rules: {
        inTime: [
          { required: true, message: "请选择返回时间", trigger: "blur" },
        ],
        outTime: [
          { required: true, message: "请选择外出时间", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输外出入地址", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请输入外出原因", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit: function (formName) {
      if (!this.$store.state.id) {
        this.$parent.dialogFormVisible = true;
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { inTime, outTime, address, reason } = this.form;
            this.$axios
              .post(
                `${prefix}/add?userId=${this.$store.state.id}&inTime=${inTime}&outTime=${outTime}&address=${address}&reason=${reason}`
              )
              .then(() => {
                this.$message({
                  showClose: true,
                  message: "申请成功",
                  type: "success",
                });
              });
          } else {
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.formContainer {
  padding: 20px;
}
</style>
