<template>
  <el-tabs v-model="activeName"  type="card" class="tab">
    <el-tab-pane label="热门推荐" name="first"  class="sort"><hot/></el-tab-pane>
    <el-tab-pane label="价格最低" name="second" class="sort"><menuByPrice/></el-tab-pane>
    <el-tab-pane label="月销最多" name="third"  class="sort"><menuByMonthSell/></el-tab-pane>
  </el-tabs>
</template>
<script>
import hot from '@/components/page/hot'
import menuByPrice from '@/components/page/menuListOrderByPrice'
import menuByMonthSell from '@/components/page/menuOrderByMonthSell'
export default {
  name: 'merchantGoodsList',
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    hot, menuByPrice, menuByMonthSell
  },
  created () {
  }
}
</script>
<style>
.tab:first-child{
  margin-left: 20vw;
}
.tab{
  margin-top: 1vw;
}
</style>
