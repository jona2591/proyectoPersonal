<template>
  <div class="hello">
    <h1>Mi Proyecto</h1>
    <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="foto">Agregar archivo</label>
        <input type="file" class="form-control-file" id="foto" @change="obtenerImg"/>
      </div>
      <figure>
        <div>
          <img class="perfil" :src="foto" alt="">
        </div>
      </figure>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style scoped>
.perfil{
  width: 100px;
  height: 90px;
  border-radius: 50%;
}
</style>
