<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item
            label="是否有发热、咳嗽、咽痛、嗅(味)觉减退、腹泻等症状："
          >
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="180">
            </el-table-column>
            <el-table-column
              prop="first"
              label="是否有发热、咳嗽、咽痛、嗅(味)觉减退、腹泻等症状："
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.first ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="second"
              label="是否自行服用过退烧药："
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.second ? "有" : "无" }}
              </template>
            </el-table-column>

            <el-table-column
              prop="third"
              label="是否有近期中高风险地区或境外旅游史或途径中高风险地区："
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.third ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="four"
              label="是否有中高风险地区和入境人员接触史："
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.four ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="five"
              label="是否有冷链或进口商品物流工作经历或人员接触史："
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.five ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="six"
              label="近期有无参加聚集活动"
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.row.six ? "有" : "无" }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="上报时间" width="180">
            </el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column></el-table
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
const prefix = "/api/unusual";
export default {
  name: "AdminException",
  data() {
    return {
      id: "",
      formLabelWidth: "80px",
      dialogFormVisible: false,
      formInline: {
        name: "",
        phone: "",
      },
      tableData: [],
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
  created() {
    this.getExceptions();
  },
  methods: {
    getExceptions(name = "", phone = "") {
      this.$axios
        .get(`${prefix}/getAll?name=${name}&phone=${phone}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    onSubmit() {
      const { name, phone } = this.formInline;
      this.getExceptions(name, phone);
    },
    handleEdit(index, row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.first = String(row.first);
      this.form.second = String(row.second);
      this.form.third = String(row.third);
      this.form.four = String(row.four);
      this.form.five = String(row.five);
      this.form.six = String(row.six);
    },
    handleDelete(index, row) {
      const id = row.id;
      this.$confirm("确认要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post(`${prefix}/delete?id=${id}`).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getExceptions();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { first, second, third, four, five, six } = this.form;
          const id = this.id;
          this.$axios
            .post(
              `${prefix}/update?id=${id}&first=${first}&second=${second}&third=${third}&four=${four}&five=${five}&six=${six}`
            )
            .then((data) => {
              const { code } = data.data;
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                this.getExceptions();
                this.resetForm(formName);
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败，手机号重复",
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
section {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}
</style>
