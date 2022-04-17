<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <p>社区疫情管理系统</p>
      </div>
    </div>
    <div class="main">
      <div class="slider">
        <el-menu class="list" light router>
          <el-menu-item class="item">出入管理</el-menu-item>
        </el-menu>
      </div>

      <section class="content">
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                v-model="formInline.phone"
                placeholder="电话"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button type="primary" @click="dialogFormVisible = true"
            >新增</el-button
          >
          <el-dialog title="申请出入" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item
                label="姓名"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="电话"
                :label-width="formLabelWidth"
                prop="phone"
              >
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item
                label="地址"
                :label-width="formLabelWidth"
                prop="address"
              >
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="form.address"
                >
                </el-cascader>
              </el-form-item>

              <el-form-item
                label="访问地址"
                :label-width="formLabelWidth"
                prop="visitAddress"
              >
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="form.visitAddress"
                >
                </el-cascader>
              </el-form-item>

              <el-form-item
                label="来访时间"
                :label-width="formLabelWidth"
                prop="startTime"
              >
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  placeholder="选择来访时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="结束时间"
                :label-width="formLabelWidth"
                prop="endTime"
              >
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  placeholder="选择结束时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('form')">取 消</el-button>
              <el-button type="primary" @click="handleSubmit('form')"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="180">
          </el-table-column>
          <el-table-column label="地址" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                ctx[scope.row.address.split(",")[0]] +
                ctx[scope.row.address.split(",")[1]] +
                ctx[scope.row.address.split(",")[2]]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="访问地址" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                ctx[scope.row.visitAddress.split(",")[0]] +
                ctx[scope.row.visitAddress.split(",")[1]] +
                ctx[scope.row.visitAddress.split(",")[2]]
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="200">
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="准许进入" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.approve ? "已审批" : "待审批"
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
const prefix = "/api/visitor";
export default {
  name: "Visitor",
  data() {
    return {
      ctx: CodeToText,
      options: regionData,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      formInline: {
        name: "",
        phone: "",
      },
      form: {
        name: "",
        phone: "",
        address: [],
        visitAddress: [],
        startTime: "",
        endTime: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请选择类别", trigger: "change" }],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入容量", trigger: "blur" }],
        visitAddress: [
          { required: true, message: "请输入容量", trigger: "blur" },
        ],
      },

      tableData: [],
    };
  },
  created() {
    this.getVisitor();
  },
  methods: {
    getVisitor() {
      this.$axios.get(`${prefix}/getAll`).then((data) => {
        const { data: tableData } = data.data;
        this.tableData = tableData;
      });
    },
    handleSearch() {
      const { name, phone } = this.formInline;
      this.$axios
        .get(`${prefix}/getAll?name=${name}&phone=${phone}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    handleSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name, phone, address, visitAddress, startTime, endTime } =
            this.form;
          this.$axios
            .post(
              `${prefix}/add?name=${name}&phone=${phone}&address=${address}&startTime=${startTime}&endTime=${endTime}&visitAddress=${visitAddress}`
            )
            .then(() => {
              this.getVisitor();
              this.resetForm(formName);
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
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
  width: 100vw;
  height: 100vh;
}

.header {
  height: 60px;
  background-color: #20a0ff;
}

.logo {
  float: left;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  padding-left: 20px;
}

.main {
  display: flex;
  background: #f0f2f5;
}

.slider {
  width: 160px;
  height: calc(100vh - 60px);
  flex: 0 0 160px;
  max-width: 160px;
  min-width: 160px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
}

.list {
  background-color: #f4f4f4;
  width: 100%;
}

.content {
  padding: 20px;
  flex: auto;
  max-width: 1200px;
}

.el-menu {
  border: none;
}
.el-menu-item.is-active {
  color: #303133;
  background-color: rgba(82, 186, 181, 0.38);
}

.item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: #e6e6e6 !important;
}
.item:hover {
  background-color: #e6e6e6 !important;
}
</style>
