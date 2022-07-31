<template>
  <footer>
      <div class="max960">
        <div class="row">
          <div class="footer-item left">
            <span>Бесплатный звонок по России <a href="tel:8 800 350 79 63">8 800 350 79 63</a> </span>
            <span>MARTA-NG © Все права защищены</span>
          </div>
          <div class="footer-item right">
            <a class="footer__item-img z" href="https://zen.yandex.ru/marta_ng/"></a>
            <a class="footer__item-img youtube1" href="https://www.youtube.com/channel/UCcAXS8DjSnp1k1l_Q2f4JEQ"></a>
            <a class="footer__item-img telegram" href="https://t.me/marta_ng/"></a>
            <a class="footer__item-img logo5" href="http://marta-ng.com/zhenskii_journal/"></a>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style scoped>
  footer{
    background-image: url(../assets/images/left.png), url(../assets/images/right.png), url(../assets/images/fon.jpg);
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: 0 0, 100% 0, 50% 50%;
    background-size: contain, contain, 100% 100%;
  }
  .footer-item span, .footer-item span a{color: #eee;}

  @media (max-width: 900px) {
    footer .max960{max-width: 80%;}
    .footer__item-img {
      width: 35px;
      height: 35px;}
  }
  @media (max-width: 700px) {
    footer .max960{max-width: 90%;}
    .footer-item span, .footer-item span a{font-size: 13px;}
    .footer__item-img {
      width: 30px;
      height: 30px;}
  }
  @media (max-width: 600px) {
    .footer-item span, .footer-item span a{font-size: 12px;}}
  @media (max-width: 500px) {
    footer{
      background-position: 0 100%, 100% 100%, 50% 50%;
      background-size: 65px, 65px, 100% 100%;}
    .footer-item span, .footer-item span a{font-size: 11px;}
  }
</style>