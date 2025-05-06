<template>
    <NavBarView></NavBarView>
    <div class="blogPage">
        <div class="right-body">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, fugit? Quaerat optio delectus ab eligendi consequuntur exercitationem maiores repellendus illo deserunt libero reprehenderit, minus rerum itaque! Culpa quia accusamus similique?</p>
        </div>
        <div class="left-body">
            <p>Right side of the body</p>
        </div>
    </div>
</template>
<script setup>
import NavBarView from '../components/NavBarView.vue';
</script>
<style scoped>
.blogPage {
   display: flex;
   gap: 4;
   justify-content: space-between;
   border: 2px;
   border-color: rgb(202, 43, 18);
}

.right-body {
    width: 80%;
    background-color: blanchedalmond;
}

.left-body {
    background-color: rebeccapurple;
    width: 20%;
}
</style>
