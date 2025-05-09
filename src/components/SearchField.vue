<template>
    <div class="search">
        <span>
            <SelectField :id="blogType" :options="blogType" v-model="searchBlog.type" placeholder="Select blog type"></SelectField>
        </span>
        <span>
            <SelectField :id="status" :options="status" v-model="searchBlog.status" placeholder="Select status"></SelectField>
        </span>
        <span>
            <InputField type="date" name="startFrom" id="startFrom" v-model="searchBlog.startFrom"></InputField>
        </span>
        <span>
            <InputField type="date" name="endTo" id="endTo" v-model="searchBlog.endTo"></InputField>
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
import InputField from './InputField.vue';
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
  status : "1",
  type : "1",
  startFrom : new Date(),
  endTo : new Date(),
}

const searchBlogs = () => {
    axios.get('/blogs/list', {
    params: {
      status: searchBlog.status,
      type: searchBlog.type,
      startFrom: searchBlog.startFrom,
      endTo: searchBlog.endTo
    }
  })
  .then(function(response) {
    emit('updateBlogs', response.data.result);
  }).catch(function(response) {
    console.log(response.data);
  });
}
</script>