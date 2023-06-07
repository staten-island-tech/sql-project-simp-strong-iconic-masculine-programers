<template>
  <div class="bg"></div>

  <div class="full">
    <div style="display:inline-block">
      <RouterLink to="/" class="home">Home</RouterLink>
    </div>
    <div class="account">

      <h1 class="account-text">Your Account</h1>
      <div class="edit" v-if="edit">
        <div class="username">
          <p class="enter">Enter A Username:</p>
          <input class="inputField" required type="text" placeholder="Username" v-model="editUsername" />
        </div>
        <button class="post" @click="saveUsername">Save Changes</button>
        <button class="cancel" @click="edit = false">Cancel</button>
      </div>
      <div class="username" v-else>
        <p>Username: {{ username }}</p>
        <button @click="edit = true" class="edit-username">Edit Username</button>
      </div>
      <button @click="logout" class="cancel" v-show="!edit">Log Out</button>
    </div>
    <div class="postWall">
      <h1>Your Posts</h1>
      <div v-for="post in posts">
        <UserPost :post="post" :authority="storedSession.session ? post.user_id === storedSession.session.user.id : false"
          @save="updatePost" @delete="remove" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { RouterLink, useRouter } from 'vue-router'
import { storage } from '../store/pinia'
import UserPost from '../components/UserPost.vue'

const router = useRouter()
const edit = ref(false)
const storedSession = storage()
const username = ref('')
const editUsername = ref('')
const email = ref('')
const posts = ref([])

async function getPosts() {
  const { data: postList, error } = await supabase
    .from('posts')
    .select('*, users(username)')
    .eq('user_id', storedSession.session.user.id)
  posts.value = postList.map(value => {
    value.edit = false
    return value
  })
}

onMounted(async () => {
  getData()
  if (storedSession.session) {
    getPosts()
  }
})

async function getData() {
  if (!storedSession.session) {
    router.push('/login')
    return
  }

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', storedSession.session.user.id)
  if (error) {
    console.log(error)
  } else {
    if (users.length === 0) {
      edit.value = true
    } else {
      username.value = users[0].username
      email.value = users[0].email
    }
  }

}

async function saveUsername() {
  if (editUsername.value.length < 6) {
    alert('Usernames must be atleast 6 characters.')
    return
  }
  const { data: users, error1 } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', storedSession.session.user.id)
  if (error1) {
    console.log(error)
    return
  } else if (users.length === 0) {
    const { data, error2 } = await supabase.from('users').insert([
      {
        email: storedSession.session.user.email,
        username: editUsername.value,
        user_id: storedSession.session.user.id
      }
    ])
    if (error2) {
      console.log(error)
      return
    }
  } else {
    const { data, error } = await supabase
      .from('users')
      .update({ username: editUsername.value })
      .eq('user_id', storedSession.session.user.id)

  }
  username.value = editUsername.value
  editUsername.value = ""
  edit.value = false
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    alert('You have been logged out')
    router.push('/')
  }
}

async function remove(obj) {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', obj.id)
  if (error) {
    console.log(error)
  } else {
    getPosts()
  }
}

async function updatePost(obj) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      title: obj.title,
      content: obj.content,
      image: obj.image
    })
    .eq('id', obj.id)
  if (error) {
    console.log(error)
  } else {
    getPosts()
  }
}
</script>
<style scoped>
.bg {
  background: linear-gradient(90deg, #a4baf5, #c8e74d, #f5a2a1);
  background-size: 300% 300%;
  animation: gradient 4s alternate infinite;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}


.home {
  align-items: center;
  background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
  border: 0;
  border-radius: 10px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: "Codec cold", sans-serif;
  font-size: 16px;
  font-weight: 700;
  height: 54px;
  justify-content: center;
  letter-spacing: .4px;
  line-height: 1;
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 0;
}

.home:active {
  outline: 0;
}

.home:hover {
  outline: 0;
}

.home span {
  transition: all 200ms;
}

.home:hover span {
  transform: scale(.9);
  opacity: .75;
}

@media screen and (max-width: 991px) {
  .home {
    font-size: 15px;
    height: 50px;
  }

  .home span {
    line-height: 50px;
  }
}

.account-text {
  display: inline-block;
}

.postWall {
  text-align: center;
}

.full {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

}

.enter {
  height: 2.2rem;
}

.username {
  display: flex;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
}

.username p {
  display: inline-block;
}

.account {
  top: -3rem;
  width: 70rem;
  text-align: center;
  background-color: #FAFBFC;
  padding: 1rem 4rem;
  border-radius: 6px;
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 2rem;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: auto;
}

h1 {
  font-size: 3rem;
}

input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
}

input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}

.edit-username {
  align-items: center;
  appearance: none;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: .375em;
  box-shadow: none;
  box-sizing: border-box;
  color: #363636;
  cursor: pointer;
  display: inline-block;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1rem;
  height: 2.5em;
  justify-content: center;
  line-height: 1.5;
  padding: calc(.5em - 1px) 1em;
  position: relative;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}

.edit-username:active {
  border-color: #4a4a4a;
  outline: 0;
}

.edit-username:focus {
  border-color: #485fc7;
  outline: 0;
}

.edit-username:hover {
  border-color: #b5b5b5;
}

.edit-username:focus:not(:active) {
  box-shadow: rgba(72, 95, 199, .25) 0 0 0 .125em;
}

.edit {
  margin-bottom: 1.5rem;
}

.cancel,
.post {
  background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.cancel:hover,
.post:hover,
.cancel:active,
.post:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.cancel:active,
.post:active {
  opacity: .5;
}

.post {
  background: #209c20;
  border: 1px solid #209c20;
  margin-right: 1rem;
}
</style>
