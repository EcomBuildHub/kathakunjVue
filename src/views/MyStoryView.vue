<template>
    <NavBarView></NavBarView>
    <div class="myStory">
            <div class="left">
              <SearchField @updateBlogs="updateBlogs"></SearchField>
              <div class="blogCard">
                <BlogCard :options="blogs" :displayImage="false" :displayAuthor="false"></BlogCard>
              </div>
            </div>
            <div class="right">
               <div class="col-one" v-if="trendingProducts.length > 0">
                <p class="px-3 py-4 text-center font-bold text-1xl">Trending Product</p>
                <TrendingProduct :trendingProducts="trendingProducts"></TrendingProduct>
               </div>
               <div class="col-two" v-if="archivedPosts && archivedPosts.length > 0">
                <p class="text-center pt-2 pb-3">Archived Post</p>
                  <div class="grid grid-cols-4 gap-4 rounded-sm shadow-md p-4">
                    <div
                      v-for="archived in archivedPosts"
                      :key="archived.year"
                      class="bg-gray-200 p-2 rounded cursor-pointer hover:text-blue-600 text-center hover:box-shadow-lg"
                    >
                      <span>{{ archived.year }}</span> ({{ archived.total_blog }})
                  </div>
                </div>
               </div>
            </div>
  </div>
</template>

<script setup>
import NavBarView from '@/components/NavBarView.vue';
import SearchField from '@/components/SearchField.vue';
import BlogCard from '@/components/BlogCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import TrendingProduct from "@/components/TrendingProducts.vue";
const notification = useNotification();
const blogs = ref([]);
const trendingProducts = ref([]);
const archivedPosts = ref([]);

onMounted(async () => {
 await blogList();
 await topTrendingProduct();
 await archivedPost();
});

const blogList = async () => {
  const listBlog =  await axios.get('/blogs/list');
  if(listBlog.data.status == "success")
  {
    blogs.value = listBlog.data.result;
    notification.notify({
      type: "success",
      title: "Blogs",
      text: 'Blog retrieved successfully.'
    })
  }
}

const archivedPost = async() => {
  const listArchivedPost = await axios.get('/blogs/archivedPost');
  if(listArchivedPost.data.status == "success") {
    archivedPosts.value = listArchivedPost.data.result;
  }
}

const topTrendingProduct = async() => {
 const trendingProduct = await axios.get('/blogs/topTrendingProduct');
 if(trendingProduct.data.status == "success") 
 {
  trendingProducts.value = trendingProduct.data.result;
 }
}

console.log(archivedPosts.value, 'archivedPost');
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
  width: 70%;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 6px;
}

.right {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 12px;
    padding-top: 0px;
    border-radius: 3px;
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