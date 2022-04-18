<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <img src="../../assets/logo.svg" style="width: 50px" />
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
        router
      >
        <el-menu-item
          v-for="item in $router.options.routes[4].children"
          :index="item.path"
          :key="item.name"
          class="item"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
      <section class="content">
        <transition>
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resident",
  created() {
    this.$router.push("announcement");
    console.log(this.$route.path);
    console.log(this.$router.options.routes[4].children);
  },
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
</style>
