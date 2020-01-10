<template>
    <el-row class="hc-main-student">
        <el-col :xs="3" :md="4" :lg="5">blank </el-col>
        <el-col :xs="18" :md="16" :lg="14" class="hc-main-center">
            <el-row class="hc-main-student-selected">
                <el-col :span="14" class="first">
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
                              placeholder="输入学生姓名、编号"
                              prefix-icon="el-icon-search"
                              v-model="student">
                        <!--<el-button slot="append" class="myButton" type="primary">搜索</el-button>-->
                    </el-input>
                    <el-button class="hc-main-selected-search" size="medium" type="primary">搜索</el-button>
                </el-col>
                <el-col :span="10" class="second">
                    <el-button size="medium">刷新</el-button>
                    <el-button size="medium" type="primary" plain>导入</el-button>
                    <el-button size="medium" type="primary" plain>导出</el-button>
                    <el-button size="medium" type="primary">添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">

                    学生管理
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="3" :md="4" :lg="5">blank</el-col>
    </el-row>
</template>

<script>
    export default {
//  name: 'TeachersManagement',
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
                student: null
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .hc-main-student{
        height: 100%;
        .el-col{
            height: 100%;
        }
        .hc-main-center{
            background: white;
            padding:10px 30px;
        }
        .hc-main-student-selected{
            margin: 15px 5px;
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
            .second{
                text-align: right;
            }

        }
    }
</style>
