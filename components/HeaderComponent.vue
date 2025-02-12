<template>
    <header class="header">
      <h1>Text Analyzer App</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/Login">Login</NuxtLink>
      </nav>
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #333;
    color: white;
    padding: 15px;
    text-align: center;
  }
  
  nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  