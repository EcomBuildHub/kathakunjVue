<template>
    <NavBarView></NavBarView>
    <div class="myStory">
        <!-- First Row -->
            <div class="left">
              <SearchField @updateBlogs="updateBlogs"></SearchField>
              <div class="blogCard">
                <BlogCard :options="blogs" :displayImage="false" :displayAuthor="false"></BlogCard>
              </div>
            </div>
            <div class="right">
               <div class="col-one">keshab</div>
               <div class="col-two">rushil</div>
            </div>
  </div>
</template>

<script setup>
import NavBarView from '@/components/NavBarView.vue';
import SearchField from '@/components/SearchField.vue';
import BlogCard from '@/components/BlogCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const blogs = ref([]);

onMounted(() => {
  axios.get('/blogs/list')
  .then(function(response) {
    blogs.value = response.data.result;
  }).catch(function(response) {
    console.log(response.data);
  });
});

const updateBlogs = (newBlogs) => {
  blogs.value = newBlogs;
}
</script>

<style scoped>
.myStory {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 20px;
}

.left {
  width: 80%;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 6px;
}

.right {
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 12px;
    border-radius: 6px;
}

.col-one {
    background-color: whitesmoke;
}

.col-two {
    background-color: whitesmoke;
}

.blogCard {
    border-radius: 10px;
    padding: 5px 10px;
    margin-top: 10px;
}
</style>