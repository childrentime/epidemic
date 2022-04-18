<template>
  <div>
    <div class="list">
      <template v-for="item in list">
        <div class="item" :key="item.id">
          <h3 class="title" @click="$router.push(`/announcement/${item.id}`)">
            {{ item.title }}
          </h3>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </template>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
const prefix = "/api/announcement";
export default {
  name: "Announcement",
  data() {
    return {
      list: [],
    };
  },

  created() {
    this.getAnnouncements();
  },

  methods: {
    getAnnouncements() {
      this.$axios.get(`${prefix}/getAll`).then((data) => {
        const { data: list } = data.data;
        this.list = list;
      });
    },
  },
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgb(204, 204, 204);
  padding-top: 10px;
  padding-bottom: 10px;
}
.title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #409eff;
  cursor: pointer;
}
.content {
  height: 40px;
  font-size: 16px;
  line-height: 20px;
  color: #969696;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
