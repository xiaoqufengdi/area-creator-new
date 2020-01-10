<template>
    <el-row class="hc-main-reader">
        <el-col :xs="3" :md="4" :lg="5">blank </el-col>
        <el-col :xs="18" :md="16" :lg="14" class="hc-main-center">
            <el-row class="hc-main-reader-selected">
                <el-col :span="24" class="first">
                    <el-select size="medium" v-model="selectedSubject" placeholder="学科">
                        <el-option
                                v-for="item in subjects"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="medium" v-model="selectedClass" placeholder="班级">
                        <el-option
                                v-for="item in classes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input size="medium"
                              placeholder="请输入考试名称"
                              prefix-icon="el-icon-search"
                              v-model="exam">
                        <!--<el-button slot="append" class="myButton" type="primary">搜索</el-button>-->
                    </el-input>
                    <el-button class="hc-main-selected-search" size="medium" type="primary">搜索</el-button>
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
                            prop="_class"
                            label="年级"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="subject"
                                label="学科"
                                width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="exam"
                            label="考试名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="date"
                            label="批阅时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="state"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="3" :md="4" :lg="5">blank</el-col>
    </el-row>
</template>

<script>
    export default {
        data () {
            return{ subjects: [{
                value: '语文',
                label: '语文'
            }, {
                value: '数学',
                label: '数学'
            }],
                selectedSubject: '',
                classes: [{
                    value: '高一（1）班',
                    label: '高一（1）班'
                },{
                    value: '高二（1）班',
                    label: '高二（1）班'
                },{
                    value: '高三（1）班',
                    label: '高三（1）班'
                }],
                selectedClass: "",
                exam: null,
                tableData: [{
                    date: '2016-05-02',
                    subject: "语文",
                    _class: "高一（1）班",
                    exam: "第一次月考",
                    state: 0,
                }, {
                    date: '2016-05-02',
                    subject: "语文",
                    _class: "高一（1）班",
                    exam: "第二次月考",
                    state: 0,
                }, {
                    date: '2016-05-02',
                    subject: "数学",
                    _class: "高一（1）班",
                    exam: "第一次月考",
                    state: 0,
                }, {
                    date: '2016-05-02',
                    subject: "语文",
                    _class: "高一（2）班",
                    exam: "第一次月考",
                    state: 0,
                }]
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
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
                    /* input.el-input__inner{
                       border-top-right-radius: 0px;
                       border-bottom-right-radius: 0px;
                   }*/
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
        }
        .hc-main-reader-table{
            .el-table__row--striped{
                background: @color-table-striped;
            }
        }

    }

</style>
