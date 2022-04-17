<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <p>社区疫情管理系统</p>
      </div>
    </div>
    <div class="main">
      <div class="slider">
        <el-menu
          :default-active="$route.path.substring(8)"
          class="list"
          light
          router
        >
          <el-menu-item
            v-for="item in $router.options.routes[3].children"
            :index="item.path"
            :key="item.name"
            class="item"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </div>

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
  name: "Admin",
  data() {
    return {};
  },

  methods: {},
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
