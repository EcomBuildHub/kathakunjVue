<template>
    <div class="select-group">
      <label v-if="label" :for="id" class="select-label">{{ label }}</label>
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="select-field"
      >
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
</template>

<script setup>
  defineProps({
    id: { type: String, required: true },
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "Select an option" },
    label: { type: String, default: "" },
    multiples: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    }
  });
</script>

<style scoped>
  .select-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    font-family: 'Poppins', sans-serif;
  }

  .select-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .select-field {
    padding: 10px 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .select-field:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
  </style>
