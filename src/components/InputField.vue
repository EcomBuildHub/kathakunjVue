<template>
    <div class="input-group">
      <label v-if="label" :for="id" class="input-label">{{ label }}</label>
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        :checked="modelValue"
        :readonly="readonly"
        :disabled="disabled"
        :class="['input-field', inputClass]"
        autocomplete="off"
        @input="$emit('update:modelValue', type=='checkbox' ? $event.target.checked : $event.target.value)"
      />
    </div>
</template>

<script setup>
  defineProps({
    type: { type: String, default: "text" },
    id: { type: String, required: true },
    placeholder: { type: String, required: true },
    modelValue: { type: [String, Number], default: "" },
    label: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inputClass: { type: String, default: "" }
  });
</script>

<style scoped>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    font-family: 'Poppins', sans-serif;
  }

  .input-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .input-field {
    padding: 10px 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #f9f9f9;
  }
  
  .input-field:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    background-color: #fff;
  }
  
  .input-field[readonly],
  .input-field[disabled] {
    background-color: #eee;
    cursor: not-allowed;
  }
  </style>
  