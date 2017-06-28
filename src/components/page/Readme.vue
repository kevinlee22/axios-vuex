<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>测试表格</h3>
            <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="t_realname"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="t_mobile"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="t_add_time"
      label="时间"
        width="250"
      >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色名称"
        width="180"
      >
    </el-table-column>
<el-table-column
      label="操作"
      >
      <template scope="scope">
        <el-button @click="handleDelete(scope.$index, scope.row)" type="primary" size="small">删除</el-button>
        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>
        </div>

    </div>
</template>

<script>
import {getTabelData} from "../../api/tabel.js";
import {mapState} from "vuex";
    export default {
        created(){
            this.init();
        },
        data: function(){
            return {
                tableData:[]
            }
        },
        methods:{
            init(){
                console.log(this.token)
                getTabelData(this.token).then( res=>{
                    console.log(res);
                    this.tableData = res.data.items;
                    
                });
            },
           handleDelete(index,data){
                console.log(index);
                console.log(data);
                this.tableData.splice(index,1); 
           },
           handleEdit(index,data){
                console.log(index);
                console.log(data);
                this.$message("编辑第"+(index+1)+"行"); 
           }
        },
        computed: {
            ...mapState([
              'token'
        ])
      },

    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>