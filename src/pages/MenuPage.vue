<template>
  <div class="main-menu">
    <img src="@/assets/images/header-top.png" alt="" class="header-top-img">
    <div class="inner-menu">
      <div class="logo-text">Проект Ма<span class="r">R</span>та-NG</div>
      <img src="@/assets/images/magya1.png" alt="" class="magia-text-img">
      <div class="menu-text-1">ТЕХНОЛОГИЯ</div>
      <div class="menu-text-2">Сам Себе Демиург</div>
      <div class="btns-container">
        <div class="btn-item asb" @click="changePage(0)">Программная матрица <br class="show_500">сильного мага</div>
        <div class="btn-item asb" @click="changePage(1)">Магическая техника <br class="show_500">исполнения желаний</div>
        <div class="btn-item asb" @click="changePage(2)">Магическая техника <br class="show_500">для денежного изобилия</div>
        <div class="btn-item asb" @click="changePage(3)">Магическая техника <br class="show_500">избавления от недугов</div>
        <div class="btn-item asb" @click="changePage(4)">Магическая техникa <br class="show_500">апгрейда отношений</div>
      </div>
      <div class="bottom-btns-container">
        <div class="bottom-btn">
          <a href="https://marta-ng.ru/help/?video">ТЕХПОДДЕРЖКА</a>
        </div>
        <div class="bottom-btn">
          <a href="http://marta-ng.com/audio-katalog/">МАГАЗИН</a>
        </div>
      </div>
      <img src="@/assets/images/footer-bottom.png" alt="" class="footer-bottom-img">
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'main-menu',
  methods: {
    ...mapMutations(['stIdx']),
    changePage(idx){
      this.stIdx(idx)
      this.$router.push(`/video`)
    }
  },
  mounted(){window.scrollTo(0, 0)}
}
</script>

<style>

</style>