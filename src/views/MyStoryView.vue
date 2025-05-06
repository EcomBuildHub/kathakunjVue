<template>
    <NavBarView></NavBarView>
    <div class="myStory">
        <!-- First Row -->
            <div class="left">
              <SearchField></SearchField>
              <div class="blogCard">
                <BlogCard :options="blogs" :displayImage="true"></BlogCard>
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
import { blogs } from '@/components/constant';

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