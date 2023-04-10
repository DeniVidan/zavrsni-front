<template>
  <nav>
<!--     <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> -->
  </nav>
  <router-view />
</template>

<style>
#app {
font-family: 'Barlow', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1A1A1A;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
