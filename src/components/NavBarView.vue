<template>
    <div class="navbar">
      <div class="left-navbar">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" class="logo" />
        <input type="text" placeholder="Search here..." class="search-input" />
      </div>
      <div class="right-navbar">
        <span v-if="authenticatedUser">
           <RouterLink to="/blog" class="bg-blue-600 px-3 py-3 rounded-lg text-white">Write your Blog</RouterLink>
        </span>
        <span v-else>
            <button class="create-btn" @click="googleLogin">Create Blog</button>
        </span>
        <nav role="navigation">
        <ul>
            <li>
              <span v-if="authenticatedUser">
                <img :src=" $session.get('avatar') " alt="Logo" class="logo" />
              </span>
              <ul class="dropdown">
                <li><RouterLink to="/profile">Profile</RouterLink></li>
                <li><RouterLink to="/story">Story</RouterLink></li>
                <li><a href="#">Setting</a></li>
              </ul>
            </li>
          </ul>
       </nav>
      </div>
    </div>
</template>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
  }

  .left-navbar {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
  }

  .body {
    padding: 0;
  }

  .search-input {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 300px; /* Made wider */
    transition: border 0.3s;
  }

  .search-input:focus {
    border-color: #0077ff;
    outline: none;
  }

  .right-navbar {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .create-btn {
    padding: 8px 16px;
    border: none;
    background-color: rgb(186, 181, 181); /* Green */
    color: white;
    border-radius: 1px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .create-btn:hover {
    background-color: #218838;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ccc;
  }

  a {
  text-decoration: none;
}

nav {
	font-family: monospace;
}

ul {
	list-style: none;
	margin: 0;
	padding-left: 0;
}

li {
	color: #fff;
	display: block;
	float: left;
	padding: 1rem;
	position: relative;
	text-decoration: none;
  transition-duration: 0.5s;
}

li a {
  color: #fff;
}

li:hover {
	cursor: pointer;
}

ul li ul {
	background: rgb(193, 190, 190);
	visibility: hidden;
  opacity: 0;
  min-width: 5rem;
	position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
	left: 0;
  display: none;
}

ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

ul li ul li {
	clear: both;
  width: 100%;
}
</style>
<script setup>
    import { getCurrentInstance } from 'vue';
    const currentInstance = getCurrentInstance();
    const $session = currentInstance.appContext.config.globalProperties.$session;
    console.log($session.get('name'), $session.get('token'), $session.get('avatar'));
    const token = $session.get('token');
    const authenticatedUser = token ?  true : false;

    const googleLogin = () => {
        window.location.href = 'http://127.0.0.1:9090/api/google/auth/redirect';
    }
</script>

