<script setup lang="ts">
// taken from https://github.com/slidevjs/slidev/blob/ad57d3d616ad27aac5ecc8a033a76f11dd56831d/packages/client/layouts/image-left.vue
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
  },
  position: {
    type: String,
    default: 'right',
  },
  class: {
    type: String,
  },
  who: {
    type: String,
  },
})

const style = computed(() => ({
  backgroundImage: `url(${props.image})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
}))
</script>

<template>
  <div class="grid grid-cols-2 w-full h-full auto-rows-fr">

    <div 
      v-if="props.position === 'left'"
      class="w-full h-full" :style="style" 
    />

  <div class="slidev-layout quizz" :class="props.class">
  
<h1>Quizz</h1>

<h2>Qui connait ?</h2>

<br />
<br />

<h3>{{ props.who }}</h3>

<br />

<slot />


  </div>
  
    <div 
      v-if="props.position === 'right'"
      class="w-full h-full" :style="style" 
    />
  </div>
</template>