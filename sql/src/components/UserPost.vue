<template>
    <div class="total">
        <div v-if="!props.post.edit" class="normal">
            <div class="top">
                <button class="edit" v-if="props.authority && !props.post.edit"
                    @click="props.post.edit = true">Edit</button>
                <p class="user">User: {{ props.post.users.username }}</p>
            </div>
            <h1 class="title">{{ props.post.title }}</h1>
            <p class="content">{{ props.post.content }}</p>
            <img :src="props.post.image" class="image">
        </div>
        <div v-else class="normal">
            <form @submit.prevent="(event) => { emitSave(); props.post.edit = false }" autocomplete="on">
                <input required placeholder="Title" v-model="title" />
                <input required placeholder="content" v-model="content" />
                <input placeholder="Enter Image URL" v-model="image" />
                <p>Your Image</p>
                <img :src="image" class="img">
                <button type="submit" class="post">Save Changes</button>
                <button class="cancel delete" @click="emitDelete()">Delete</button>
                <button @click="props.post.edit = false" class="cancel">Cancel</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['save', 'delete'])

const props = defineProps({
    post: {
        type: Object,
        required: true
    },
    authority: {
        type: Boolean,
        required: true
    }
})

const title = ref('')
const content = ref('')
const image = ref('')

watch(() => props.post, (newVal, oldVal) => {
    if (props.post !== null) {
    }
}, { deep: true })

function emitSave() {
    props.post.edit = false
    emit('save', { title: title.value, content: content.value, image: image.value, id: props.post.id })
}

function emitDelete() {
    emit('delete', props.post)
}

onMounted(() => {
    title.value = props.post.title
    content.value = props.post.content
    image.value = props.post.image
})
</script>
<style scoped>
.total {
    margin-bottom: 2rem;
}

.normal {
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

.user {
    font-size: 1rem;
    text-align: left;
    margin: 0;
    display: inline-block;
}

.title {
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 2rem;
    wrap: wrap;
    white-space: normal;

}

.content {
    font-size: 1.5rem;
    white-space: normal;
    line-height: 25px;

}

.image {
    width: 30rem;
}

.top {
    text-align: left;
}

.edit {
    display: inline-block;
    outline: none;
    cursor: pointer;
    padding: 0 16px;
    background-color: #0070d2;
    border-radius: 0.25rem;
    border: 1px solid #0070d2;
    color: #fff;
    font-size: 13px;
    line-height: 25px;
    font-weight: 400;
    text-align: center;
    margin-right: 1rem;
}

.edit:hover {
    background-color: #005fb2;
    border-color: #005fb2;
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

.delete {
    margin-right: 1rem;
}
</style>