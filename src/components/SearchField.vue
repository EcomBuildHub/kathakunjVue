<template>
    <div class="search">
        <span>
            <SelectField :id="blogType" :options="blogType" v-model="searchData.blogType" placeholder="Select blog type"></SelectField>
        </span>
        <span>
            <SelectField :id="status" :options="status" v-model="searchData.status" placeholder="Select status"></SelectField>
        </span>
        <span>
            <InputField type="date" name="endTo" id="endTo"></InputField>
        </span>
        <span>
            <InputField type="date" name="endTo" id="endTo"></InputField>
        </span>
        <span>
           <button type="submit">Filter</button>
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
import {ref} from "vue";
import InputField from './InputField.vue';
import SelectField from './SelectField.vue';
import { status, blogType } from "./constant";

const searchData = ref({
    status: '',
    blogType: '',
});
</script>