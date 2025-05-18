<template>
    <div class="search">
        <span>
            <SelectField :id="blogType" :options="blogType" v-model="searchBlog.type" placeholder="Select blog type"></SelectField>
        </span>
        <span>
            <SelectField :id="status" :options="status" v-model="searchBlog.status" placeholder="Select status"></SelectField>
        </span>
        <span>
           <button type="submit" @click="searchBlogs">Filter</button>
        </span>
    </div>
</template>
<style scoped>
.search {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>
<script setup>
import SelectField from './SelectField.vue';
import { status, blogType } from "./constant";
import axios from 'axios';
const emit = defineEmits('updateBlogs');
const props = defineProps({
    displayImage: {
        type: Boolean,
        default: true,
    },
});

const searchBlog = {
  status : "2",
  type : "1",
}

const searchBlogs = () => {
    axios.get('/blogs/list', {
    params: {
      status: searchBlog.status,
      type: searchBlog.type,
    }
  })
  .then(function(response) {
    emit('updateBlogs', response.data.result);
  }).catch(function(response) {
    console.log(response.data);
  });
}
</script>