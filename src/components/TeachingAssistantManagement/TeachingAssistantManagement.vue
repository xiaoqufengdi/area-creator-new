<template>
        <el-row class="hc-main-reader">
        <el-col :xs="3" :md="4" :lg="5"> </el-col>
        <el-col :xs="18" :md="16" :lg="14" class="hc-main-center">
            <el-row class="hc-main-reader-selected">
                <el-col :span="20" class="first">
                    <el-date-picker size="medium"
                            v-model="year"
                            type="year"
                            placeholder="选择年">
                    </el-date-picker>
                    <el-input size="medium"
                              placeholder="请输入教辅名"
                              prefix-icon="el-icon-search"
                              v-model="teachingAssistant">
                        <!--<el-button slot="append" class="myButton" type="primary">搜索</el-button>-->
                    </el-input>
                    <el-button class="hc-main-selected-search" size="small" type="primary" @click="search()">搜索</el-button>
                </el-col>
                <el-col :span="4" class="second">
                    <el-button size="small" type="primary" @click="add()">添加</el-button>


                </el-col>

            </el-row>
            <el-row class="hc-main-reader-table">
                <el-col :span="24">
                    <el-table
                            :header-cell-style="{background:'#ECF1F7'}"
                            :data="tableData"
                            stripe
                            style="width: 100%"
                    >
                        <el-table-column
                                align="center"
                                prop="teachingAssistantName"
                                label="教辅名称"
                                width="180">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="publishingHouse"
                                label="出版社"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="grade"
                                label="学段"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="subjectName"
                                label="学科"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="createTime"
                                label="时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="validFlag"
                                label="状态"
                                :formatter="formatter"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                                <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="3" :md="4" :lg="5"></el-col>

        <template>
            <el-dialog title="添加教辅"  custom-class="hc-main-add-dialog"  width="500px" :visible.sync="dialogFormVisible">
                <el-form class="hc-main-add-form" :model="form">
                    <el-form-item label="教辅名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" size="medium"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社" :label-width="formLabelWidth">
                        <el-select size="medium" v-model="form.region" placeholder="">
                            <el-option label="江西教育出版社" value="江西教育出版社"></el-option>
                            <el-option label="江苏教育出版社" value="江苏教育出版社"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年度" :label-width="formLabelWidth">
                        <el-select size="medium" v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="江西教育出版社" value="江西教育出版社"></el-option>
                            <el-option label="江苏教育出版社" value="江苏教育出版社"></el-option>
                        </el-select>                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormClick = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormClick = false">确 定</el-button>
                </div>
            </el-dialog>
        </template>

    </el-row>
</template>

<script>
    import request from "../../utils/request";

    export default {
        data () {
            return{
                year:'',
                teachingAssistant: null,
                tableData: [],

                //弹窗界面
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
            }
        },
        created(){

            this.getData();

            let tableData = localStorage.getItem("tableData");
            if(tableData)
            {
                tableData = JSON.parse(tableData);
                this.tableData = tableData;

            }else{
                this.tableData = [{
                    teachingAssistantId: "1",
                    teachingAssistantName: "数学作业本",
                    grade: "四年级下",
                    createTime: '2016',
                    subjectName: "语文",
                    publishingHouse: "江西教育出版社",
                    validFlag: 0,
                }, {
                    teachingAssistantId: "2",
                    teachingAssistantName: "数学作业本",
                    grade: "四年级下",
                    createTime: '2018',
                    subjectName: "语文",
                    publishingHouse: "江西教育出版社",
                    validFlag: 1,
                }, {
                    teachingAssistantId: "3",
                    teachingAssistantName: "数学作业本",
                    grade: "四年级下",
                    createTime: '2026',
                    subjectName: "语文",
                    publishingHouse: "江西教育出版社",
                    validFlag: 2,
                }, {
                    teachingAssistantId: "4",
                    teachingAssistantName: "数学作业本",
                    grade: "四年级下",
                    createTime: '2015',
                    subjectName: "语文",
                    publishingHouse: "江西教育出版社",
                    validFlag: 3,
                }];
                localStorage.setItem("tableData", JSON.stringify(this.tableData));
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
            },

            handleClickEdit(row){
                console.log(row);
                this.$router.push({name: "TitleDisplay", params:{teachingAssistantId: row.teachingAssistantId}});

            },
            search(){
                console.log(this.year);
                console.log(this.teachingAssistant);

            },
            formatter(row,column){
                let value = null;
                switch(row.state)
                {
                    case 0:
                        value = "目录";
                        break;
                    case 1:
                        value = "圈码、拆题";
                        break;
                    case 2:
                        value = "圈码";
                        break;
                    case 3:
                        value = "拆题";
                        break;
                }
                return value;
            },
            add(){
                this.dialogFormVisible = true;


            },
            dialogFormClick(){
                this.dialogFormVisible = false;

            },

            async getData(){
                let result = await request.getTeachingAssistantData();
                this.tableData = result.data;
                console.log(this.tableData);
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import "../../style/theme.less";

    .hc-main-reader{
        height: 100%;
        .el-col{
            height: 100%;
        }
        .hc-main-center{
            background: white;
            padding:10px 30px;
        }
        .hc-main-reader-selected{
            margin: 20px 5px;
            .first{
                text-align: left;
                white-space:nowrap;
                .el-select{
                    width: 130px;
                }
                .el-input{
                    width: 180px;
                }
                .myButton{
                    color: #FFF;
                    background-color: #409EFF;
                    border-color: #409EFF;
                }
                .hc-main-selected-search{
                    position: relative;
                    left: -6px;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
            .second{
                text-align: right;
            }
        }
        .hc-main-reader-table{
            .el-table__row--striped{
                background: @color-table-striped;
            }
        }
    }


    .hc-main-add-dialog{

        .hc-main-add-form{
            width: 400px;
            min-width: 300px;
            margin: 0 auto;
            .el-input{
                width: 200px;
            }
            .el-select{
                width: 200px;
            }
        }
    }



</style>
