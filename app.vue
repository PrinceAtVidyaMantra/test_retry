<template>
  <div class="flex flex-col gap-y-8">
    <button @click="first = true"> Accept First </button>
    <button @click="sendFirstRequest"> Send First Request</button>
    <button @click="sendSecondRequest"> Send Second Request</button>
    <span> {{ backend }}</span>
    <span> {{  exam }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRetryWithDelay } from './helpers/utilities';

const first = ref(false);

let exam = "first";

let backend = ref("");

async function setPrimaryExam() {
  if (first.value) { backend.value = exam; return "success to set " + exam};
  throw new Error("Failed to set " + exam);
}

const primaryRetryFn = useRetryWithDelay(setPrimaryExam, 5000);


function sendFirstRequest() {
  exam = "first";
  primaryRetryFn();
}

function sendSecondRequest() {
  exam = "second";
}


</script>
