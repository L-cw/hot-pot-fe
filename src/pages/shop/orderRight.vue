<template>
  <div class="wrapper" ref="wrapper">
    <div class="order-right">
      <div class="cate-item" v-for="cate in shopOrderInfo" :key="cate.id">
        <div class="cate-name border-bottom" :ref="cate.name">{{cate.name}}</div>
        <div class="item-con" v-for="item in cate.list" :key="item.id">
          <div class="img-con">
            <img v-lazy="item.img" alt="" class="item-img">
          </div>
          <div class="item-detail">
            <div class="item-name">{{item.title}}</div>
            <div class="item-sold">月售<span>{{item.sold_num}}</span>单 好评率<span>{{item.fav}}</span>%</div>
            <div class="item-discount" v-if="cate.isDiscount"><span class="item-discount-con">5折优惠</span></div>
            <div class="item-price">
              <span class="current-price">￥{{item.price}}</span> <span class="old-price" v-if="cate.isDiscount">￥{{item.price * 2}}</span>
            </div>
            <food-bar :food="item" @food="handleChangeFood"></food-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FoodBar from './foodBar.vue'
  import BScroll from 'better-scroll'
  import bus from './bus.js'
  export default {
    name: 'shopOrderRight',
    props: {
      shopOrderInfo: Array,
      ch: String
    },
    components: {
      FoodBar
    },
    watch: {
      shopOrderInfo: {
        handler () {
          if (this.shopOrderInfo.length > 4) {
            this.$refs.wrapper.style.height = '10.5rem'
            bus.$emit('height', {
              value: '10.5rem'
            })
            this.$nextTick(() => {
              this.scroller.refresh()
            })
          } else {
            this.$nextTick(() => {
              this.scroller.refresh()
            })
          }
        },
        deep: true
      }
    },
    data () {
      return {
        cartList: [],
        addNew: true,
        cateHeight: [{name: 1}, {name: 2}]
      }
    },
    methods: {
      handleChangeFood (e) {
        let obj = JSON.parse(JSON.stringify(e))
        if (this.cartList.length) {
          this.cartList.map((value, index) => {
            if (value.title === obj.title && value.id === obj.id) {
              value.count = obj.count
              if (value.count === 0) {
                this.cartList.splice(index, 1)
              }
              this.addNew = false
            } else {
              this.addNew = true
            }
          })
        } else {
          this.addNew = true
        }
        if (this.addNew) {
          this.cartList.push(obj)
        }
        bus.$emit('cart', this.cartList)
      },
      handleScrollEl (e) {
        if (this.$refs[e.el]) {
          this.scroller.scrollToElement(this.$refs[e.el][0])
        }
      },
      createScroll () {
        this.scroller = new BScroll(this.$refs.wrapper, {
          click: true
        })
      }
    },
    mounted () {
      this.ch && (this.$refs.wrapper.style.height = this.ch)
      this.createScroll()
      bus.$on('cate', this.handleScrollEl)
      this.scroller && this.scroller.refresh()
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    flex: 1
    height: 10.5rem
    overflow: hidden
    .order-right
      width: 100%
      .cate-name
        height: .45rem
        line-height: .45rem
        font-size: .26rem
        color: #323232
      .item-con
        display: flex
        padding: .2rem .2rem .2rem 0
        position: relative
        .img-con
          overflow: hidden
          width: 1.52rem
          height: 1.52rem
          .item-img
            width: 100%
        .item-detail
          padding-left: .2rem
          .item-name
            line-height: .54rem
            font-size: .4rem
            font-weight: bold
          .item-sold
            font-size: .24rem
            line-height: .3rem
          .item-discount
            .item-discount-con
              font-size: .26rem
              line-height: .34rem
              background: #ff3c15
              color: #fff
          .item-price
            font-size: .24rem
            .current-price
              font-size: .34rem
              font-weight: bold
              color: #ff3c15
            .old-price
              font-size: .3rem
              text-decoration: line-through
</style>