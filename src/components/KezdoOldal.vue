<template>
  <div class="hello">
    <br>
    <h1>{{ msg }}</h1>
    <br>
    <h2>Kovács Zsolt - Szakdolgozat - 2018</h2>
    <br>
    <hr>
    <br>
    <h3>Felhasznált technológiák</h3>
    <br>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank">
          Vuejs
        </a>
      </li>
      <li>
        <a
          href="https://vuetifyjs.com"
          target="_blank">
          Vuetify
        </a>
      </li>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank">
          Vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank">
          Vuex
        </a>
      </li>
      <li>
        <a
          href="http://docs.sequelizejs.com/"
          target="_blank">
          Sequelize
        </a>
      </li>
      <li>
        <a
          href="https://www.sqlite.org/index.html"
          target="_blank">
          SQLite
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'KezdoOldal',
  data () {
    return {
      msg: 'Online Szállásfoglalás'
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.foglGomb {
  border-radius: 5px;
  text-shadow: 1px 1px 4px #aaa;
}
</style>
