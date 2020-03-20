<template>
  <div class="home">
    <ExoPlanetData />
  </div>
</template>

<script>
// @ is an alias to /src
import ExoPlanetData from "@/components/ExoPlanetData.vue";

export default {
  name: "Home",
  components: {
    ExoPlanetData
  }
};
</script>
