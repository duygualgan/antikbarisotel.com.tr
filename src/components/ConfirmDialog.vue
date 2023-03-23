<template>
    <div class="confirm-dialog-container" v-show="visible">
      <div class="confirm-dialog">
        <p class="confirm-dialog-message">{{ message }}</p>
        <div class="confirm-dialog-buttons">
          <button class="confirm-dialog-button" @click="onCancelled">Cancel</button>
          <button class="confirm-dialog-button" @click="onConfirmed">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="js">
  export default {
    name: 'ConfirmDialog',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    emits: ['confirmed', 'cancelled'],
    methods: {
      onConfirmed() {
        this.$emit('confirmed');
      },
      onCancelled() {
        this.$emit('cancelled');
      }
    }
  }
  </script>
  