<template>
  <div class="search-result-con">
    <router-link :to="'/shop/' + item.shopId" 
                 tag="div" class="item" 
                 v-for="item in searchRes" :key="item.id">
      <div class="logo-con">
        <img :src="item.logo" class="logo">
      </div>
      <div class="title border-bottom">{{item.name}}</div>
    </router-link>
    <div class="loading border-bottom" v-show="showLoding">正在搜索哦*_*</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'search-result',
    props: {
      inpValue: String,
      showNotice: Function
    },
    data () {
      return {
        showLoding: false,
        searchRes: []
      }
    },
    watch: {
      inpValue () {
        this.showLoding = true
        if (this.inpValue !== '') {
          this.newBounce()
        }
        this.searchRes = []
      }
    },
    methods: {
      debouce () {
        let _this = this
        return (function () {
          let timer = null
          return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
              axios.get('/api/search/search/?search=' + _this.inpValue)
                   .then(_this.getSearchResultSucc.bind(_this))
                   .catch(_this.getSearchResultError.bind(_this))
            }, 1000)
          }
        })()
      },
      getSearchResultSucc (res) {
        if (res && res.data) {
          if (res.data.ret) {
            if (res.data.data) {
              this.searchRes = res.data.data.shopList
              this.showLoding = false
            } else {
              this.showNotice('呀，数据迷路了')
            }
          } else {
            this.showLoding = false
            this.showNotice('没搜到哦，换个试试~')
          }
        } else {
          this.showLoding = false
          this.showNotice('服务器忍痛拒绝您~')
        }
      },
      getSearchResultError () {
        this.showLoding = false
        this.showNotice('搜索失败啦 T_T')
      }
    },
    created () {
      this.newBounce = this.debouce()
      if (this.inpValue !== '') {
        this.newBounce()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/mixin.styl'
  .search-result-con
    position: absolute
    top: 1.38rem
    left: 0
    right: 0
    bottom: 0
    background: #fff
    padding: 0 .2rem
    .loading
      line-height: .6rem
      font-size: .28rem
      color: #666
      border-color: #eee
    .item
      margin: .1rem 0
      display: flex
      padding: .2rem 0
      .title
        flex: 1
        line-height: .6rem
        font-size: .28rem
        color: $666
        border-color: #eee
        ellipsis()
      .logo-con
        width: .6rem
        height: .6rem
        margin-right: .3rem
        .logo
          width: 100%
</style>