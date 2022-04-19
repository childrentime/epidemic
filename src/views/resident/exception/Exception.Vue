<template>
  <div class="formContainer">
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="是否有发热、咳嗽、咽痛、嗅(味)觉减退、腹泻等症状：">
        <el-radio-group v-model="form.first">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否自行服用过退烧药：">
        <el-radio-group v-model="form.second">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="是否有近期中高风险地区或境外旅游史或途径中高风险地区："
      >
        <el-radio-group v-model="form.third">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有中高风险地区和入境人员接触史：">
        <el-radio-group v-model="form.four">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有冷链或进口商品物流工作经历或人员接触史：">
        <el-radio-group v-model="form.five">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="近期有无参加聚集活动">
        <el-radio-group v-model="form.six">
          <el-radio label="false">无</el-radio>
          <el-radio label="true">有</el-radio>
        </el-radio-group>
      </el-form-item>

      <p class="p">
        上述信息是我本人填写，本人对信息内容的真实性和完整性负责，对新冠传染病史无隐瞒，因信息填报不实导致相关后果的愿承担相应责任。
      </p>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即上报</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const prefix = "/api/unusual";

export default {
  name: "Exception",
  data() {
    return {
      form: {
        first: "false",
        second: "false",
        third: "false",
        four: "false",
        five: "false",
        six: "false",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.$store.state.id) {
        this.$parent.dialogFormVisible = true;
      } else {
        const { first, second, third, four, five, six } = this.form;
        this.axios
          .post(
            `${prefix}/add?userId=${this.id}&first=${first}&second=${second}&third=${third}&four=${four}&five=${five}&six=${six}`
          )
          .then(() => {
            this.$message({
              showClose: true,
              message: "上报成功",
              type: "success",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.formContainer {
  padding: 20px;
}
.el-form-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.p {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
