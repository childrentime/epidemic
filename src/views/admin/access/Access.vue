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
            <el-table-column prop="outTime" label="外出时间" width="180">
            </el-table-column>
            <el-table-column prop="inTime" label="返回时间" width="180">
            </el-table-column>

            <el-table-column prop="reason" label="外出原因" width="180">
            </el-table-column>
            <el-table-column prop="address" label="外出地址" width="180">
              <template slot-scope="scope">
                {{
                  ctx[scope.row.address.split(",")[0]] +
                  ctx[scope.row.address.split(",")[1]] +
                  ctx[scope.row.address.split(",")[2]]
                }}
              </template>
            </el-table-column>
            <el-table-column label="准许进入" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px; margin-right: 20px">{{
                  scope.row.approve ? "已审批" : "待审批"
                }}</span>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleAuth(scope.$index, scope.row)"
                  >审批</el-button
                >
              </template>
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
import { regionData, CodeToText } from "element-china-area-data";
const prefix = "/api/access";
export default {
  name: "AdminAccess",
  data() {
    return {
      ctx: CodeToText,
      options: regionData,
      id: "",
      formLabelWidth: "80px",
      dialogFormVisible: false,
      formInline: {
        name: "",
        phone: "",
      },
      tableData: [],
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
  created() {
    this.getAccesss();
  },
  methods: {
    getAccesss(name = "", phone = "") {
      this.$axios
        .get(`${prefix}/getAll?name=${name}&phone=${phone}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    onSubmit() {
      const { name, phone } = this.formInline;
      this.getAccesss(name, phone);
    },
    handleAuth(index, row) {
      this.$axios.post(`${prefix}/auth?id=${row.id}`).then(() => {
        this.$message({
          type: "success",
          message: "审批成功!",
        });
        this.getAccesss();
      });
    },
    handleEdit(index, row) {
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.inTime = row.inTime;
      this.form.outTime = row.outTime;
      this.form.address = row.address.split(",");
      this.form.reason = row.reason;
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
            this.getAccesss();
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
          const { inTime, outTime, reason, address } = this.form;
          const id = this.id;
          this.$axios
            .post(
              `${prefix}/update?id=${id}&inTime=${inTime}&outTime=${outTime}&address=${address}&reason=${reason}`
            )
            .then((data) => {
              const { code } = data.data;
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                this.getAccesss();
                this.resetForm(formName);
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败",
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
