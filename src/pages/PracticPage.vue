<template>
  <div class="scena scena-practic">
    <div class="practice-block">
      <div class="row">
        <div class="d10">
          <div class="text-block-7" v-html="data[idx].practic.text"></div>
        </div>
        <div class="d11">
          <img :src="require(`@/assets/images/${idx}dop.png`)" alt="">
        </div>
      </div>

      <div class="practic-btns-block">
        <practic-btn class="small-text left-btn"><a :href="data[idx].practic.read" target="_blank">ЧИТАТЬ</a></practic-btn>
        <practic-btn class="small-text no-img"><a :href="data[idx].practic.download">СКАЧАТЬ</a></practic-btn>
        <practic-btn class="small-text no-img"><span @click="$router.replace('/video')">НАЗАД В МОДУЛЬ</span></practic-btn>
        <practic-btn class="small-text right-btn"><span @click="$router.replace('/')">В ГЛАВНОЕ МЕНЮ</span></practic-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
		...mapState({
      data: (state) => state.data,
      idx: (state) => state.idx,
    }),
	},
  mounted(){window.scrollTo(0, 0)}
}
</script>

<style>

</style>