<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <img src="../../../assets/logo.svg" style="width: 50px" />
        <div class="title">社区疫情管理系统</div>
      </div>
      <div class="right">
        <el-button round>注册</el-button>
        <el-button round>登录</el-button>
      </div>
    </div>
    <div class="navigation">
      <el-menu
        :default-active="$route.path.substring(1)"
        class="menu"
        mode="horizontal"
        light
      >
        <el-menu-item
          v-for="item in $router.options.routes[4].children"
          @click="$router.push(`/${item.path}`)"
          :index="item.path"
          :key="item.name"
          class="item"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
      <section class="content">
        <h1>{{ announcement.title }}</h1>
        <div class="date">{{ announcement.createTime }}</div>
        <Viewer
          class="byte-editor"
          :locale="zhHans"
          :value="announcement.content"
          :plugins="plugins"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { Viewer } from "@bytemd/vue";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
const plugins = [
  gfm(),
  // Add more plugins here
];

const prefix = "/api/announcement";
export default {
  name: "Id",
  data() {
    return {
      zhHans,
      plugins,
      id: "",
      announcement: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getOne();
    console.log(this.$route.params.id);
  },

  methods: {
    getOne() {
      this.$axios.get(`${prefix}/getOne?id=${this.id}`).then((data) => {
        const { data: announcement } = data.data;
        this.announcement = announcement;
      });
    },
  },
  components: { Viewer },
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
h1 {
  padding: 12px;
  text-align: center;
}
.content >>> h1 {
  padding: 12px;
}
.byte-editor {
  padding: 12px;
}
.date {
  text-align: center;
  font-size: 12px;
  color: #6e6e6e;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
</style>
