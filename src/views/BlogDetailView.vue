<template>
    <NavBarView></NavBarView>
    <img :src="`http://127.0.0.1:9090/storage/Blog/${blogDetail.coverImage}`" alt="blog cover image" class="blog-cover-image">
    <h1 class="header">{{ blogDetail.title }}</h1>
    <p>{{ blogDetail.description }}</p>
</template>
<style scoped>
.blog-cover-image {
    width: 100%;
    height: 300px;
}
.header {
  text-align: center;
  text-transform: uppercase;
}
</style>
<script setup>
import NavBarView from '@/components/NavBarView.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const blogDetail = ref({
    id: '',
    title: '',
    subTitle: '',
    description: '',
    status: '',
    createdBy: '',
    updatedBy: '',
    isPublished: '',
    scheduledAt: '',
    viewsCount: '',
    bookmarkCount: '',
    coverImage: '',
    logo: '',
    type: '',
    createdAt: ''
});
onMounted(() => {
  const blogId = route.params.blogId;
  axios.get(`/blogs/details/${blogId}`)
    .then(function(response) {
      blogDetail.value.id = response.data.result.id;
      blogDetail.value.title = response.data.result.title;
      blogDetail.value.subTitle = response.data.result.subTitle;
      blogDetail.value.description = response.data.result.description;
      blogDetail.value.status = response.data.result.status;
      blogDetail.value.createdBy = response.data.result.updatedBy;
      blogDetail.value.updatedBy = response.data.result.updatedBy;
      blogDetail.value.isPublished = response.data.result.isPublished;
      blogDetail.value.scheduledAt = response.data.result.scheduledAt;
      blogDetail.value.viewsCount = response.data.result.viewsCount;
      blogDetail.value.bookmarkCount = response.data.result.bookmarkCount;
      blogDetail.value.coverImage = response.data.result.coverImage;
      blogDetail.value.logo = response.data.result.logo;
      blogDetail.value.type = response.data.result.type;
      console.log(blogDetail.value, 'value');
    })
    .catch(function(error) {
      console.error(error);
    });
});
</script>