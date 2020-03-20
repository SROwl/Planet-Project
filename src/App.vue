<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background-color: #000;
  color: #e8e8e8;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  font-size: 100%;
  line-height: 1;
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-track {
    background-color: #080808;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00a1ff;
    outline: none;
  }
}
#app {
  font-size: 16px;
}
.col {
  display: flex;
  flex-direction: column;
}
.loader {
  position: fixed;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 3em;
  background: #000;
  animation-name: load;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  text-transform: uppercase;
  @keyframes load {
    0% {
      letter-spacing: 10px;
    }
    100% {
      letter-spacing: -4px;
    }
  }
}
</style>
