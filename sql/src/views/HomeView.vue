<template>
  <div class="bg"></div>
  <div class="full">
    <header>
      <div class="createPost">
        <div v-if="edit" class="create">
          <form @submit.prevent="post" autocomplete="on">
            <input required placeholder="Title" v-model="title" />
            <input required placeholder="Content" v-model="content" />
            <input placeholder="Enter Image URL" v-model="image" />
            <img :src="image" class="img">
            <button type="submit" class="post">Post</button>
            <button @click="edit = false" class="cancel">Cancel</button>
          </form>
        </div>
        <button v-else @click="edit = true" class="show">Create a New Post</button>
      </div>
      <RouterLink :to="storedSession.session ? '/account/' + storedSession.session.user.id : '/account/123'"
        class="account">
        <img src="/account.png" alt="Account" class="account-image">
      </RouterLink>
    </header>

    <div class="postWall">
      <h1>Post Wall</h1>
      <div v-for="post in posts">
        <UserPost :post="post" :authority="storedSession.session ? post.user_id === storedSession.session.user.id : false"
          @save="updatePost" @delete="remove" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { RouterLink, useRouter } from 'vue-router'
import { storage } from '../store/pinia'
import UserPost from '../components/UserPost.vue'

const router = useRouter()
const edit = ref(false)
const storedSession = storage()
const title = ref('')
const content = ref('')
const image = ref('')
const posts = ref([])

watch(edit, (newVal, oldVal) => {
  if (edit.value === true && !storedSession.session) {
    alert("Please Sign In To Post")
    edit.value = false
  }
}
)

async function getPosts() {
  const { data: postList, error } = await supabase
    .from('posts')
    .select('*, users(username)')
  posts.value = postList.map(value => {
    value.edit = false
    return value
  })
}
onMounted(async () => {
  getPosts()
})

async function post() {
  const { data, error } = await supabase.from('posts').insert([
    {
      user_id: storedSession.session.user.id,
      title: title.value,
      content: content.value,
      image: image.value
    }
  ])
  if (error) {
    console.log(error)
  } else {
    title.value = ''
    content.value = ''
    image.value = ''
    edit.value = false
    getPosts()
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
}

.full {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

header {
  display: flex;
  width: calc(100%-5rem);
  margin-top: 1rem;
  margin-left: 5rem;
}

.postWall {
  text-align: center;
}

.account {
  height: 5rem;
  width: 5rem;
  margin-right: 3rem;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid rgba(0, 0, 0, 0);
  position: fixed;
  right: 0;
}

.account:hover {
  border: 3px solid rgb(0, 0, 0);
}

.account-image {
  height: 4.5rem;
}

.createPost {
  margin: auto;
  padding-right: 4.8rem;
}

.img {
  display: block;
  margin: 2rem auto;
  width: 30rem;
}

.create {
  width: 50rem;
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
  display: inline-block;
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

}

input {
  display: block;
  margin: auto;
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

.show {
  width: 50rem;
  height: 5rem;
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
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
}

.show:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.show:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.show:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.show:focus {
  outline: 1px transparent;
}

.show:before {
  display: none;
}

.show:-webkit-details-marker {
  display: none;
}

@keyframes gradient {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}
</style>