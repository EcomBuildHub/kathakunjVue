<template>
    <NavBarView />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 bg-gray-100 min-h-screen font-poppins">
      <div class="md:col-span-2 bg-white rounded-2xl p-8 shadow">
        <div class="mb-6 grid grid-cols-3 items-center">
            <div></div>
            <div class="flex justify-center items-center">
                <img :src="$session.get('avatar')" alt="Avatar" class="w-28 h-28 rounded-full border-4 border-gray-300 object-cover" />
            </div>
            <div></div>
        </div>
        <div class="grid gap-6">
          <div class="grid md:grid-cols-2 gap-4">
            <Input type="text" id="name" placeholder="Enter name" v-model="formData.name" readonly />
            <Input type="text" id="email" placeholder="Enter email" v-model="formData.email" readonly />
          </div>
  
          <div class="grid md:grid-cols-2 gap-4">
            <Input type="text" id="phone" placeholder="Enter phone number" v-model="formData.phone" required />
            <Input type="text" id="profession" placeholder="Enter profession" v-model="formData.profession" required />
          </div>
  
          <div class="grid md:grid-cols-2 gap-4">
            <SelectField :options="gender" :id="gender" v-model="formData.gender" placeholder="Select Gender" aria-required="true" />
            <Input type="date" id="dob" placeholder="Enter Date of Birth" v-model="formData.dob" required />
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-slate-100 p-4 rounded-xl">
            <Input type="text" id="facebookSocialLinks" placeholder="Facebook link" v-model="formData.socialLinks.facebook" />
            <Input type="text" id="LinkedInSocialLinks" placeholder="LinkedIn link" v-model="formData.socialLinks.linkedIn" />
            <Input type="text" id="InstagramSocialLinks" placeholder="Instagram link" v-model="formData.socialLinks.instagram" />
            <Input type="text" id="ThreadSocialLinks" placeholder="Thread link" v-model="formData.socialLinks.thread" />
          </div>
  
          <div>
            <textarea v-model="formData.bio"
                      placeholder="Write your bio here..."
                      required
                      rows="10"
                      class="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-base resize-y min-h-[100px] focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"></textarea>
          </div>
        </div>
      </div>
  
        <div class="bg-white rounded-2xl p-8 shadow">
            <!-- Row 1 -->
            <div class="p-4 rounded grid grid-rows-2 gap-4">
                <Input type="text" v-model="formData.country" placeholder="Enter Country" />
                    <Input type="text" v-model="formData.state" placeholder="Enter State" />
                    <Input type="text" v-model="formData.city" placeholder="Enter City" />
                    <Input type="text" v-model="formData.location" placeholder="Enter Address (Street, etc.)" />
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div class="w-1/4"></div>
                <div class="flex justify-center w-auto">
                    <a @click="updateProfile"
                        class="bg-blue-600 text-white px-6 py-3 text-base rounded-xl transition-all cursor-pointer">
                        Update
                    </a>
                </div>
                <div class="w-1/4"></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Global container */
.form-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    padding: 40px;
    background-color: #f3f4f6;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
}

.profile-details, .right-side {
    background: #ffffff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Avatar */
.avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.avatar-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #e2e8f0;
    object-fit: cover;
}

/* Form field layout */
.form-fields, .address-fields {
    display: grid;
    gap: 20px;
}

.flex, .flex-social {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.flex-social {
    background-color: #f1f5f9;
    padding: 16px;
    border-radius: 12px;
}

.bio-section textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    background-color: #f8fafc;
    font-size: 15px;
    resize: vertical;
    min-height: 100px;
    transition: all 0.2s ease-in-out;
}

.bio-section textarea:focus {
    background-color: white;
    border-color: #4f46e5;
    outline: none;
}

/* Address fields */
.address-fields input {
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    background-color: #f9fafb;
    font-size: 15px;
}

.address-fields input:focus {
    background-color: white;
    border-color: #6366f1;
    outline: none;
}

/* Button */
.flex-button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

button {
    background: #4f46e5;
    color: white;
    padding: 12px 28px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}

button:hover {
    background: #4338ca;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 900px) {
    .form-container {
        grid-template-columns: 1fr;
    }

    .flex, .flex-social {
        grid-template-columns: 1fr;
    }

    .avatar {
        justify-content: center;
    }
}

</style>

<script setup>
import { ref, onMounted } from 'vue';
import NavBarView from '@/components/NavBarView.vue';
import { getCurrentInstance } from 'vue';
import axios from 'axios';
import Input from '@/components/InputField.vue'
import SelectField from '@/components/SelectField.vue';
import { gender } from '@/components/constant';
import { useNotification } from "@kyvg/vue3-notification";
    const notification = useNotification()
    const currentInstance = getCurrentInstance();
    const $session = currentInstance.appContext.config.globalProperties.$session;
    const formData = ref({
        name:  $session.get('name'),
        email: $session.get('email'),
        phone: '',
        profession: '',
        gender: '',
        dob: '',
        socialLinks: {
            facebook: '',
            instagram: '',
            linkedIn: '',
            thread: ''
        },
        country: '',
        city: '',
        state: '',
        location: '',
        bio: ''
    })

    const updateProfile = () => {
        console.log(formData.value);
        axios.post('/profile/update', formData.value)
        .then(response => {
            if(response.data.status == "success")
            {
                const member = memberDetails();
                notification.notify({
                    title: "Profile updated",
                    text: response.data.message,
                    type: 'success'
                });
            }
        }).catch(error => {
            notification.notify({
                    title: "Profile updated Fail",
                    text: error.response.data.message,
                    type: 'warn'
            });
        }).finally({
        });
    }

    const memberDetails = () => {
        axios.get(`/profile/list?memberId=${$session.get('id')}`)
        .then(function(response) {
            if(response.data.status == "success") {
                const socialMedias = JSON.parse(response.data.result?.socialLinks);
                const { facebook, instagram, linkedIn, thread } = socialMedias;

                formData.value.phone = response.data.result.phone;
                formData.value.profession = response.data.result.profession;
                formData.value.bio = response.data.result.bio;
                formData.value.dob = response.data.result.dob;
                formData.value.gender = response.data.result.gender;
                formData.value.country = response.data.result.country;
                formData.value.state = response.data.result.state;
                formData.value.city = response.data.result.city;
                formData.value.location = response.data.result.location;
                formData.value.socialLinks.facebook = facebook;
                formData.value.socialLinks.instagram = instagram;
                formData.value.socialLinks.linkedIn = linkedIn;
                formData.value.socialLinks.thread = thread;
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    onMounted(() => {
        memberDetails();
    });
</script>
