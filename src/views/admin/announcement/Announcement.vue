<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="标题">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="formInline.content"></el-input>
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
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <Editor
              class="byte-editor"
              :locale="zhHans"
              :value="value"
              :plugins="plugins"
              @change="handleChange"
            />
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
          <el-table :data="tableData" border style="width: 100%" height="450">
            <el-table-column
              fixed
              prop="title"
              label="标题"
              width="220"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
              width="480"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="createTime" label="更新时间" width="180">
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
import { Editor } from "@bytemd/vue";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";

const plugins = [
  gfm(),
  // Add more plugins here
];

const prefix = "/api/announcement";
export default {
  name: "Announcement",
  data() {
    return {
      value: "",
      zhHans,
      plugins,
      id: "",
      isAdd: true,
      formLabelWidth: "80px",
      dialogFormVisible: false,
      formInline: {
        title: "",
        content: "",
      },
      tableData: [],
      form: {
        title: "",
      },

      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getAnnouncements();
  },
  methods: {
    getAnnouncements(title = "", content = "") {
      this.$axios
        .get(`${prefix}/getAll?title=${title}&content=${content}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    onSubmit() {
      const { title, content } = this.formInline;
      this.getAnnouncements(title, content);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    handleEdit(index, row) {
      this.isAdd = false;
      this.id = row.id;
      this.dialogFormVisible = true;
      this.form.title = row.title;
      this.form.content = row.content;
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
            this.getAnnouncements();
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
          const { title } = this.form;
          const { value } = this;
          console.log(value);
          if (this.isAdd) {
            console.log(value);
            this.$axios
              .post(
                `${prefix}/add?title=${title}&content=${encodeURIComponent(
                  value
                )}`
              )
              .then((data) => {
                const { code } = data.data;
                if (code === 200) {
                  this.$message({
                    showClose: true,
                    message: "添加成功",
                    type: "success",
                  });
                  this.getAnnouncements();
                  this.resetForm(formName);
                } else {
                  this.$message({
                    showClose: true,
                    message: "添加失败",
                    type: "error",
                  });
                }
              });
          } else {
            const id = this.id;
            this.$axios
              .post(`${prefix}/update?title=${title}&content=${value}&id=${id}`)
              .then((data) => {
                const { code } = data.data;
                if (code === 200) {
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success",
                  });
                  this.getAnnouncements();
                  this.resetForm(formName);
                } else {
                  this.$message({
                    showClose: true,
                    message: "修改失败",
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
      this.value = "";
      this.dialogFormVisible = false;
    },
    handleChange(v) {
      this.value = v;
    },
  },
  components: { Editor },
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
.popper {
  width: 200px !important;
}
</style>
