<template>
  <NavBarView />
  <div class="bg-gray-200 px-8 py-3">
    <div class="grid grid-cols-[70%_30%] gap-4">
      <div class="grid grid-row">
        <div class="flex mb-5">
            <InputField
            id="title"
            placeholder="Title Name"
            v-model="formData.title"
            label="Title"
            class="w-full"
          />
        </div>
        <div class="grid grid-cols-3 gap-4 mb-5">
            <SelectField
              id="type"
              :options="blogType"
              placeholder="Select type"
              v-model="formData.type"
              label="Type"
            />
            <SelectField
              id="type"
              :options="status"
              placeholder="Select Status"
              v-model="formData.status"
              label="Status"
            />
            <SelectField
              id="categories"
              :options="categories"
              placeholder="Select Categories"
              v-model="formData.categories"
              label="Categories"
            />
        </div>
        <div class="grid grid-cols-2 gap-4 mb-5">
          <template v-if="formData.type == '0' &&  formData.parentId != 0">
            <InputField
              id="subTitle"
              placeholder="Sub Title"
              v-model="formData.subTitle"
              label="Sub Title"
            />
          </template>
          <template v-if="formData.status == '0'">
            <InputField
              id="scheduleDate"
              type="date"
              v-model="formData.scheduleDate"
              label="Schedule Date"
            />
          </template>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-5">
          <InputField
            id="logo"
            type="file"
            @change="handleLogoUpload"
            label="Logo"
          />
          <InputField
            id="coverImage"
            type="file"
            @change="handleCoverImage"
            label="Cover Image"
          />
        </div>
        <div class="flex justify-center items-center space-x-4"  v-if="formData.type == '1'">
          <textarea
            name="description"
            id="description"
            rows="6"
            class="description-area"
            placeholder="Write about your blog..."
            v-model="formData.description"
          ></textarea>
        </div>
        <div class="flex justify-center gap-4 mt-5">
          <button type="submit" class="bg-blue-600 px-3 py-3 text-white rounded-lg cursor-pointer" @click="createBlog">
            Save Blog
          </button>
        </div>
      </div>
      <div class="flex justify-center items-center p-4 space-x-4">
          <div class="w-32 h-32 overflow-hidden rounded-md">
              <img src="" alt="logo Image" id="logoImageBlog" class="object-fit w-full h-full">
          </div>
          <div class="w-32 h-32 overflow-hidden rounded-md">
              <img src="" alt="logo Image" id="coverImageBlog" class="object-fit w-full h-full">
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
}

.main-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.input-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.textarea-container {
  display: flex;
  flex-direction: column;
}

.text-label {
  margin-bottom: 5px;
  font-weight: 500;
}

.description-area {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
}

.action-row {
  display: flex;
  justify-content: flex-end;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  left: 0;
  height: 18px;
  width: 18px;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  left: 0;
  top: 2px;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.display-image {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#logoImageBlog{
  border-radius: 40%;
  width: 300px;
  height: 100px;
}

#CoverImageBlog{
  border-radius: 50%;
  border-radius: 40%;
  width: 300px;
  height: 100px;
}
</style>

<script setup>
import NavBarView from '@/components/NavBarView.vue';
import InputField from '@/components/InputField.vue';
import SelectField from '@/components/SelectField.vue';
import { blogType, status } from '@/components/constant';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";
const notification = useNotification();
const router = useRouter();
const formData = ref({
  title: '',
  status: '2',
  type: 1,
  subTitle: '',
  scheduleDate: '',
  logo: '',
  categories: [],
  coverImage: '',
  description: '',
  parentId: 0
});



const handleLogoUpload = (event) => {
  const selectedBlogLogo = event.target.files[0];

  if(selectedBlogLogo)
  {
    formData.value.logo = selectedBlogLogo;
    const previewUrl = URL.createObjectURL(selectedBlogLogo);
    const logoImage = document.getElementById('logoImageBlog');
    if(logoImage) {
      logoImage.src = previewUrl;
    }
  }
}

const handleCoverImage = (event) => {

  const handleCoverImage = event.target.files[0];
  if(handleCoverImage)
  {
    formData.value.coverImage = handleCoverImage;
    const previewUrl = URL.createObjectURL(handleCoverImage);
    const displayImage = document.getElementById('coverImageBlog');
    if(displayImage) {
      displayImage.src = previewUrl;
    }
  }
}

// console.log(formData.value);
const createBlog = () => {
  const data = {
    title: formData.value.title,
    subTitle: formData.value.subTitle,
    description: formData.value.description,
    scheduleDate: formData.value.scheduleDate,
    type:formData.value.type,
    coverImage: formData.value.coverImage,
    logo: formData.value.logo,
    status: formData.value.status,
    categories: formData.value.categories
  }
  console.log(data, 'data');
  axios.post('/blogs', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  .then(function(response) {
    if(response.status =="200") {
      notification.notify({
        type: 'success',
        title: 'New Blog',
        text: response.data.message
      });
      router.push(`/blog-details/${response.data.result.id}`);
    }
    console.log(response.data);
  }).catch(function(error) {
    notification.notify({
        type: 'success',
        title: 'New Blog',
        text: error.response.data.message
      });
    console.log(error);
  });
}
const categories = ref([]);

onMounted(() => {
  axios.get('/app/category')
  .then(function(response) {
    if(response.status == "200")  {
      categories.value = response.data.result.map(cat => ({
        label : cat.name,
        value: cat.id
      }))
      console.log(categories.value, 'categories values');
    }
  }).catch(function(error) {
    console.log(error);
  })
})
</script>
