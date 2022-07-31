import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faPause, faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay, faPause, faCompress, faExpand);

import AppFooter from './components/AppFooter'
import VideoPlayBtn from './components/VideoPlayBtn'
import VideoPauseBtn from './components/VideoPauseBtn'
import AppVideo from './components/AppVideo'
import PracticBtn from './components/PracticBtn'

const app = createApp(App)
app.component('app-footer', AppFooter)
app.component('video-play-btn', VideoPlayBtn)
app.component('video-pause-btn', VideoPauseBtn)
app.component('app-video', AppVideo)
app.component('practic-btn', PracticBtn)
app.component("font-awesome-icon", FontAwesomeIcon)

app
  .use(store)
  .use(router)
  .mount('#app')
