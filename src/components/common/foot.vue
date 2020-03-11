<template>
    <div style=" position:fixed; bottom:0; width:100% ">
     <el-footer>
       <div class="footInfo">
        <ul>
          <li>关于我们</li>
          <li>用户帮助</li>
          <li>商务合作</li>
          <li>投诉举报</li>
          <li>规则中心</li>
          <li>客服热线:  10105757</li>
        </ul>
       </div>
    </el-footer>
     <div class="webInfo">
       <div>
        <span>
           © 2019-2019  power by ZHBIT 软件工程实训小组
        </span>
       </div>
     </div>
    </div>
</template>
<script>
export default {
  nmae: 'foot'
}
</script>
<style>
.el-footer{
    background-color: #409Ef8;
    text-align: center;
    line-height: 30px;
    width: 100%;
}
.footInfo ul  {
  list-style:none;
}
.footInfo li  {
  float: left;
  padding-left: 3vw;
  color: #ffff;
  font-size: 12px;
  margin-top:1vw;
}
.footInfo li:first-child{
    margin-left: 10vw;
}
.webInfo{
  background-color: #ffff;
  font-size: 12px;
  display: flex;
  justify-content: center;
}
</style>
