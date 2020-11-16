<template>
  <h1>{{title}}</h1>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: {required: true, type: String}
    }
  }
</script>
