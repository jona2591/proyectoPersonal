<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Mi Proyecto</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <form @submit.prevent="addUsuario">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                placeholder="Ingrese su Nombre"
                v-model="newUsuario.nombre"
              />
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Apellido</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Ingrese su Apellido"
                v-model="newUsuario.apellido"
              />
            </div>
            <form enctype="multipart/form-data">
              <div class="form-group">
                <progress :value="UploadValue" max="100"></progress>
                <label for="foto">Agregar archivo</label>
                <input type="file" class="form-control-file" id="foto" @change="obtenerImg" />
                <button @click.prevent="subirImagen">Subir imagen</button>
              </div>
              <figure>
                <img class="perfil2" :src="newUsuario.imagenperfil" alt />
              </figure>
            </form>
            <button class="btn btn-primary">Agregar</button>
          </form>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Imagen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(usuario, id) in Usuarios" :key="id">
                <th scope="row">{{ id }}</th>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.apellido }}</td>
                <td><img class="perfil" :src="usuario.imagenperfil" alt=""></td>
                <td>
                  <button class="btn btn-danger" @click="Borrar(id)">Borrar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from "firebase";
import config from "./config";
let app = Firebase.initializeApp(config);
let db = app.database();
let usuariosRef = db.ref("Usuarios");

export default {
  name: "App",
  data() {
    return {
      Usuarios: [],
      imagen: "",
      foto: null,
      UploadValue: 0,
      newUsuario: {
        nombre: "",
        apellido: "",
        imagenperfil: ""
      }
    };
  },
  methods: {
    addUsuario() {
      usuariosRef.push(this.newUsuario);
      this.newUsuario.nombre = "";
      this.newUsuario.apellido = "";
      this.newUsuario.imagenperfil = null;
    },
    Borrar(id) {
      console.log();

      usuariosRef.child(id).remove();
    },
    obtenerImg(e) {
      this.imagen = e.target.files[0];
    },
    subirImagen() {
      const storageRef = app.storage().ref(`/imagenes/${this.imagen.name}`);
      var task = storageRef.put(this.imagen);
      task.on(
        "state_changed",
        snapshot => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.UploadValue = percentage;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.UploadValue = 100;
          task.snapshot.ref.getDownloadURL().then(url => {
            // this.foto = url;
            this.newUsuario.imagenperfil = url;
          });
        }
      );
    }
  },
  created() {
    usuariosRef.on("value", listar => {
      this.Usuarios = listar.val();
    });
  }
};
</script>

<style>
.perfil {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.perfil2 {
  width: 150px;
  height: 150px;
  border-radius: 10%;
}
</style>
