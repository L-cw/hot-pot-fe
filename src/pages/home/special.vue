<template>
  <div class="special">
    <div class="item" v-for="item in special" :key="item.id">
      <div class="img-con">
        <img :src="item.imgUrl || defaultImg" class="img">
      </div>
      <p class="title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'special',
    props: {
      special: Array
    },
    data () {
      return {
        defaultImg: '/static/banner/default.jpg'
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/mixin.styl'
  @import '../../assets/styles/common/varibles.styl' 
  .special
    display: flex
    flex-wrap: wrap
    background: #fff
    padding-top: .3rem
    .item
      margin-bottom: .15rem
      width: 50%
      display: flex
      flex-direction: column
      align-items: center
      padding: 0 0.2rem
      box-sizing: border-box
      .img-con
        height: 0
        width: 100%
        padding-bottom: 52.44%
        overflow: hidden
        background-color: $defaultBg
        .img
          width: 100%
      .title
        font-size: .28rem
        color: #666
        line-height: .5rem
        text-align: center
        ellipsis()
</style>