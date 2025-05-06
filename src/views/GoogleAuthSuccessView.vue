<template>
    <P>Success Page</P>
</template>
<style scoped></style>
<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";

const router = useRouter();
const currentInstance = getCurrentInstance();
const $session = currentInstance.appContext.config.globalProperties.$session;

// const { notify }  = useNotification();

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const avatar = urlParams.get('avatar');
    const userId = urlParams.get('id');


    if(token)
    {
        $session.set('token', token);
        $session.set('name', name);
        $session.set('email', email);
        $session.set('avatar', avatar);
        $session.set('id', userId);

        // notify({
        //     title: "Login",
        //     text: "User logged in successfully.",
        //     type: "success",
        // });

        router.push('/dashboard');

    }else {
        router.push('/');
    }
});
</script>