<template>
    <div class="blog-card" v-for="blog in blogs" :key="blog.id">
      <div class="card-content">
        <div class="text-content">
          <h3 class="title">{{ blog.title }}</h3>
          <p class="description">{{ trimData(blog.description, 350) }}</p>
        </div>
        <div class="avatar-wrapper" v-if="displayImage">
          <img :src="$session.get('avatar')" alt="Avatar" class="avatar"/>
        </div>
      </div>
      <div class="blog-info">
        <div class="blog-info-left">
            <p><span class="label">Author:</span> {{ blog.authorName }}</p>
            <p v-if="blog.publishedAt"><span class="label">Published At:</span> {{ blog.publishedAt }}</p>
            <p v-if="blog.scheduleAt"><span class="label">Schedule:</span> {{ blog.scheduleAt }}</p>
        </div>
        <div class="blog-info-right">
            <p><span class="label">Views:</span> {{ blog.totalView }}</p>
            <p><span class="label">Bookmarks:</span> {{ blog.totalBookMark }}</p>
        </div>
      </div>
    </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue';
import { blogs } from './constant';
const currentInstance = getCurrentInstance();
const $session = currentInstance.appContext.config.globalProperties.$session;
defineProps({
    blogs: {
        type: Array,
        default: []
    },
    displayImage: {
        type: Boolean,
    }
})

 const trimData = (data, trimLength) => {
    if(data) {
       return data.length > trimLength ? data.substring(0, trimLength) + '...' : data;
    }
};

</script>
<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-content {
  flex: 1;
  padding-right: 16px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.description {
  color: #555;
  margin-top: 4px;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
}
.blog-info {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  font-size: 0.95rem;
  color: #333;
  flex-wrap: wrap;
}

.blog-info-left {
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex: 1;
}
.blog-info-right {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.label {
  font-weight: 600;
  color: #111;
  margin-right: 4px;
}


</style>
