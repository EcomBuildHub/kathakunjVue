<template>
  <NavBarView />
  <div class="container">
    <div class="main-content">
      <div class="input-row">
        <InputField
          id="title"
          placeholder="Title Name"
          v-model="formData.title"
          label="Title"
        />
        <SelectField
          id="type"
          :options="blogType"
          placeholder="Select type"
          v-model="formData.type"
          label="Type"
        />
      </div>

      <div class="input-row">
        <template v-if="formData.type == '0'">
          <InputField
            id="subTitle"
            placeholder="Sub Title"
            v-model="formData.subTitle"
            label="Sub Title"
          />
        </template>
        <template v-if="formData.isPublished == false">
          <InputField
            id="scheduleDate"
            type="date"
            v-model="formData.scheduleDate"
            label="Schedule Date"
          />
        </template>
      </div>

      <div class="input-row">
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
      <div class="display-image">
        <img src="" alt="logo Image" id="logoImageBlog">
        <img src="" alt="logo Image" id="coverImageBlog">
      </div>

      <div class="textarea-container">
        <label for="description" class="text-label">Description</label>
        <textarea
          name="description"
          id="description"
          rows="6"
          class="description-area"
          placeholder="Write about your blog..."
          v-model="formData.description"
        ></textarea>
      </div>

      <div class="action-row">
        <button type="submit" class="submit-btn" @click="createBlog">
          Save Blog
        </button>
      </div>
    </div>

    <div class="sidebar">
      <div class="checkbox-group">
        <label class="custom-checkbox">
          <input type="checkbox" v-model="formData.isPublished" />
          <span class="checkmark"></span>
          Published
        </label>
        <label class="custom-checkbox">
          <input type="checkbox" v-model="formData.status" />
          <span class="checkmark"></span>
          Active
        </label>
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
import { blogType } from '@/components/constant';
import { ref } from 'vue';

const formData = ref({
  title: '',
  isPublished: true,
  status: true,
  type: 1,
  subTitle: '',
  scheduleDate: '',
  logo: '',
  coverImage: '',
  description: '',
  parentId: 0,
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
  console.log(event.target.files[0], handleCoverImage);
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


const createBlog = () => {
  console.log(formData.value);
};
</script>
