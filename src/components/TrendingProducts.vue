<template>
        <div
                v-for="trending in trendingProducts"
                :key="trending.id"
                class="grid grid-cols-[auto_1fr] items-start mb-4 bg-gray-200 shadow-sm h-[140px]"
                >
        <!-- Left Column (Image) -->
        <div class="w-40 h-full overflow-hidden">
            <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Unsplash"
            class="w-full h-full object-cover"
            />
        </div>

        <RouterLink :to="`/blog-details/${trending.id}`">
        <!-- Right Column -->
            <div class="p-4 text-white trending-right h-full bg-green-500 hover:cursor-pointer">
                <p class="mb-2 font-semibold text-lg">{{ trending.title }}</p>
                <div class="flex justify-between">
                <!-- Left Info -->
                <div class="flex gap-2">
                    <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    alt="Unsplash"
                    class="w-10 h-10 object-cover rounded-full"
                    />
                    <div class="flex flex-col">
                    <span>keshab</span>
                    <span>{{ trending.createdAt }}</span>
                    </div>
                </div>
                <!-- Right Info (SVG Icon) -->
                <p class="text-sm text-right">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-white"
                    >
                    <path
                        d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"
                    />
                    </svg>
                </p>
                </div>
            </div>
        </RouterLink>
        </div>
</template>

<script setup>
const props = defineProps({
    trendingProducts: {
        type: Array,
        default: [],
        required: true
    }
});
</script>
<style scoped>
.trending-right {
    background-color: #808b96;
}
</style>
