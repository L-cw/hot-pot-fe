<template>
  <div class="create-order">
    <header class="head">
      <span v-if="!isSubmit" class="back iconfont" @click="handleBack">&#xe624;</span>
      {{isSubmit ? '提交成功' : '提交订单'}}
    </header>
    <!-- <transition enter-active-class="animated bounceInDown">
      <div class="tip" v-if="show">
        工程师在快马加鞭哦^_^
      </div>
    </transition> -->
    <div v-if="!isSubmit" class="submit-box">
      <div class="order-list">
        <div class="order-list-detail">订单概览：</div>
        <div class="order-list-item" v-for="item in this.orderList" :key="item.id">
          <div>{{item.title}}</div><div>{{item.price}}x{{item.count}}</div>
        </div>
        <div class="total-amount">总计{{totalAmount}}元</div>
      </div>
      <div class="pay-type">
        <div class="pay-type-title">请选择付款方式</div>
        <div class="type-box">
          <div class="type-item">
            <label for="outline" class="outline-label">货到付款<span>（推荐）</span></label>
            <input type="radio" name="payType" checked>
          </div>
          <div class="type-item">
            <label for="online" class="online-label">在线支付</label>
            <input type="radio" disabled name="payType"> <span class="online-notice">技术维护中，暂不可用</span>
          </div>
        </div>
      </div>
      <div class="submit-order" @click="handleOrderSubmit">提交</div>
    </div>
    <div v-else class="submit-result">
      <div class="result-notice">订单已提交，稍后配送员会跟您电话核实收货地址，请保持电话畅通</div>
      <div class="back-home" @click="handleBackHome">返回首页</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'createOrder',
    data () {
      return {
        show: false,
        isSubmit: false,
        orderList: [],
        totalAmount: 0
      }
    },
    methods: {
      handleBack () {
        this.$router.go(-1)
      },
      handleOrderSubmit () {
        this.$store.commit('SAVE_ORDER_INFO', [])
        this.isSubmit = true
      },
      handleBackHome () {
        this.$router.push('/')
      }
    },
    created () {
      setTimeout(() => {
        this.show = true
      }, 0)
      this.$store.state.order && (this.orderList = this.$store.state.order)
      for (var i = 0; i < this.orderList.length; i++) {
        this.totalAmount += parseInt(this.orderList[i].price)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/common/varibles.styl'
  .create-order
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: #fff
    .head
      position: relative
      text-align: center
      padding: .44rem
      color: #fff
      font-size: .35rem
      background: $bgColor
      .back
        position: absolute
        left: 5px
        top: 15px
        font-size: .4rem
        color: #fff
        font-weight: bold
        margin-right: .2rem
    .tip
      margin: 5rem auto 0
      width: 5rem
      height: .8rem
      background: $bgColor
      border-radius: .1rem
      text-align: center
      line-height: .8rem
    .submit-box
      .order-list
        box-sizing: border-box
        padding: .3rem .2rem
        margin: .2rem
        border: 1px solid #666
        .order-list-detail
          font-size: .35rem
          color: #333
          line-height: 1.5
          margin-bottom: .2rem
        .order-list-item
          display: flex
          justify-content: space-between
          border-bottom: 1px solid #999
          margin-bottom: .1rem
        .total-amount
          float: right
      .pay-type
        width: 100%;
        box-sizing: border-box
        padding: .2rem
        .pay-type-title
          font-size: .4rem
          line-height 1.5
          color: #333
          margin-bottom .2rem
        .type-box
          .type-item
            width: 100%
            margin-bottom: .3rem
            .online-label
              color: #999
            .outline-label
              color: #00d080
            .online-notice
              color: #f00
      .submit-order
        width: 100%
        position: fixed
        left: 0
        bottom: 0
        height: 1rem
        line-height: 1rem
        font-size: .35rem
        color: #fff
        text-align: center
        background: $bgColor
    .submit-result
      width: 100%;
      box-sizing: border-box
      padding: .2rem
      margin-top: 1.2rem
      .result-notice
        background: $bgColor
        border-radius: 4px
        box-sizing: border-box
        padding: .2rem
        color: #fff
        line-height 1.5
        margin-bottom: .2rem
      .back-home
        text-decoration: underline
        color: #00f
        padding-left: .2rem
</style>