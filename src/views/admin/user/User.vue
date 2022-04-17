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
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-dialog
        :title="isAdd ? '新增' : '修改'"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="phone"
          >
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="性别"
            :label-width="formLabelWidth"
            prop="gender"
          >
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="身份证"
            :label-width="formLabelWidth"
            prop="card"
          >
            <el-input v-model="form.card" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
              class="input"
            ></el-input>
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
            <el-table-column prop="gender" label="性别" width="180">
            </el-table-column
            ><el-table-column prop="card" label="身份证号" width="180">
            </el-table-column>

            <el-table-column label="操作">
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
const prefix = "/api/login";
const user = "/api/user";
export default {
  name: "User",
  data() {
    return {
      id: "",
      isAdd: true,
      formLabelWidth: "80px",
      dialogFormVisible: false,
      formInline: {
        name: "",
        phone: "",
      },
      tableData: [],
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
  created() {
    this.getUsers();
  },
  methods: {
    getUsers(name = "", phone = "") {
      this.$axios
        .get(`${user}/getUsers?name=${name}&phone=${phone}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    onSubmit() {
      const { name, phone } = this.formInline;
      this.getUsers(name, phone);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    handleEdit(index, row) {
      this.isAdd = false;
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.phone = row.phone;
      this.form.card = row.card;
      this.form.gender = row.gender;
      this.form.name = row.name;
    },
    handleDelete(index, row) {
      const id = row.id;
      this.$confirm("确认要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post(`${user}/deleteUser?userId=${id}`).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUsers();
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
          const { phone, password, card, gender, name } = this.form;
          if (this.isAdd) {
            this.$axios
              .post(
                `${prefix}/userRegister?phone=${phone}&password=${password}&card=${card}&gender=${gender}&name=${name}`
              )
              .then((data) => {
                const { code } = data.data;
                if (code === 200) {
                  this.$message({
                    showClose: true,
                    message: "添加成功",
                    type: "success",
                  });
                  this.getUsers();
                  this.resetForm(formName);
                } else {
                  this.$message({
                    showClose: true,
                    message: "注册失败，手机号重复",
                    type: "error",
                  });
                }
              });
          } else {
            const id = this.id;
            this.$axios
              .post(
                `${user}/updateUser?phone=${phone}&password=${password}&card=${card}&gender=${gender}&name=${name}&userId=${id}`
              )
              .then((data) => {
                const { code } = data.data;
                if (code === 200) {
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success",
                  });
                  this.getUsers();
                  this.resetForm(formName);
                } else {
                  this.$message({
                    showClose: true,
                    message: "修改失败，手机号重复",
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
