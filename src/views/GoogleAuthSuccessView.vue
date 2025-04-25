<template>
    <P>Success Page</P>
</template>
<style scoped></style>
<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentInstance = getCurrentInstance();
const $session = currentInstance.appContext.config.globalProperties.$session;


onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const avatar = urlParams.get('avatar');

    if(token)
    {
        $session.set('token', token);
        $session.set('name', name);
        $session.set('email', email);
        $session.set('avatar', avatar);

        router.push('/dashboard')
        console.log($session.get('token'), $session.get('email'), $session.get('name'), $session.get('avatar'));
    }else {
        router.push('/');
    }
});
</script>