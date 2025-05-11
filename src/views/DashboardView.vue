<template>
    <NavBarView></NavBarView>
    <div class="blogPage">
        <div class="right-body">
            <BlogCard :options="blogs"></BlogCard>
        </div>
        <div class="left-body">
            <p>Right side of the body</p>
        </div>
    </div>
</template>
<script setup>
import NavBarView from '../components/NavBarView.vue';
import BlogCard from '@/components/BlogCard.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios';
const blogs = ref([]);
onMounted(() => {
    axios.get('/blogs/list', {
        params: {
            context: "dashboard"
        }
    })
    .then(function(response) {
        blogs.value = response.data.result;
    }).catch(function(response) {
        console.log(response.data);
    });
})

console.log('dashboard', 'nepal');
// console.log(blogs);
</script>
<style scoped>
.blogPage {
   display: flex;
   gap: 4;
   justify-content: space-between;
   border: 2px;
   /* border-color: rgb(202, 43, 18); */
}

.right-body {
    width: 80%;
    padding: 20PX;
    background-color: blanchedalmond;
}

.left-body {
    background-color: rebeccapurple;
    width: 20%;
}
</style>
