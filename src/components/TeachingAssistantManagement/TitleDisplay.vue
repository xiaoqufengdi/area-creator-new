<template>
    <el-row class="hc-main-reader" v-loading="loading">
        <el-col :xs="1" :md="2" :lg="3">
            <el-button type="primary" size="small" @click="goBack">返回</el-button>
        </el-col>
        <el-col :xs="22" :md="20" :lg="18" class="hc-main-center">
            <el-row class="hc-main-content">
                <el-col   :span="4"  >
                    <h5>章节目录</h5>
                    <el-tree show-checkbox :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

                </el-col>
                <el-col class="hc-main-content-pic"  :span="10"  :style="{position: 'relative'}">
                    <h5>展示内容区域</h5>
                    <el-row>
                        <el-col :span="4" class="my_key">题型：</el-col>
                        <el-col :span="20" class="my_value">
                            <el-radio-group v-model="questionType" size="mini">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="选择题"></el-radio-button>
                                <el-radio-button label="填空题"></el-radio-button>
                                <el-radio-button label="计算题"></el-radio-button>
                                <el-radio-button label="解答题"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="my_key">考察能力：</el-col>
                        <el-col :span="20" class="my_value">
                            <el-radio-group v-model="ability" size="mini">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="了解"></el-radio-button>
                                <el-radio-button label="理解"></el-radio-button>
                                <el-radio-button label="掌握"></el-radio-button>
                                <el-radio-button label="运用"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="my_key">难度：</el-col>
                        <el-col :span="20" class="my_value">
                            <el-radio-group v-model="difficulty" size="mini">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="易"></el-radio-button>
                                <el-radio-button label="较易"></el-radio-button>
                                <el-radio-button label="较难"></el-radio-button>
                                <el-radio-button label="难"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <section :style="{width: '100%' }">
                        <article :key="question.questionId+ 'min'" :style="{border:  '0.5px solid  #2992FF'}" :id="question.questionId"  v-for="(question, index) in questions.slice((pageNum - 1)*pageSize, pageNum*pageSize)">
                            <article v-html="question.content">
                                {{question.content }}
                            </article>
                            <footer style="text-align:right;padding:5px" >
                                <el-checkbox fill="#0CC689" text-color="#0CC689"  v-model="question.selected" :checked="Boolean(question.selected)"  @change="(value)=>{
                                    handleChange(value, question)
                                }">参与组题</el-checkbox>

                            </footer>
                        </article>

                    </section>
                    <footer style="width:100%;margin: 10px auto; bottom:10px;position:absolute;">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size = "pageSize"
                                :total="questions.length"
                                @current-change="handleChangeCurrentPage"
                        >
                        </el-pagination>
                    </footer>

                </el-col>

                <el-col :span="10" class="hc-main-content-html">
                    <el-row class="hc-main-header">

                        <el-col :span="24" >
                            <el-checkbox fill="#0CC689" text-color="#0CC689" v-model="checked">双栏</el-checkbox>
                            <el-checkbox fill="#0CC689" text-color="#0CC689" v-model="isShowBorder">题目和答案框</el-checkbox>
                        </el-col>
                    </el-row>

                    <!--                    <h2>展示HTML页</h2>-->
                    <div id="myPage"     ref="myPage"  :style="{height: height + 'px', width: width + 'px'}">
                        <section :style="{width: checked ?'50%' : '100%' }">
                            <article :key="question.questionId" :style="{border: isShowBorder ? '0.5px solid  #2992FF' : '0.5px solid  rgba(0,0,0,0)'}" :id="question.questionId" v-html="question.content" v-for="(question, index) in showQuestions.slice(0, pageSize)">
                                {{question.content }}
                            </article>
                        </section>
                        <section v-if="checked" style="width:1.5px;background:black;margin:0 5px;"> </section>
                        <section v-if="checked" :style="{width:'50%' }">
                            <article :key="question.questionId" :style="{border: isShowBorder ? '0.5px solid  #2992FF' : '0.5px solid  rgba(0,0,0,0)'}" :id="question.questionId" v-html="question.content" v-for="(question, index) in showQuestions.slice(pageSize)">
                                {{question.content }}
                            </article>
                        </section>
                    </div>

                    <el-row class="hc-main-footer">
                        <el-col :span="24" >
                            <el-button size="small" type="primary"  @click="handleGetPosition">获取坐标</el-button>
                            <el-button size="small" type="primary"  @click="handleSwitchPic">生成图片</el-button>
                            <el-button size="small" type="primary"  @click="handleSwitchPDF">生成PDF</el-button>

                        </el-col>
                    </el-row>

                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="1" :md="2" :lg="3"></el-col>
    </el-row>
</template>
<script>
    import axios from "axios";
    import request from "../../utils/request";
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";


    export default {
        data() {
            return {
                questions: [
                               {questionId: "1a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                                '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                                '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                                '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                                '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                                '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                                '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                                '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                                '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                                '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                                '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                                '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                                '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                                '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                                '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                                '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                                '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                                '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                              '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                                '                                style="font-family:NEU-BZ">17</span></p>'}
                                ,{questionId: "2a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                                '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                                '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                                '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                                '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                                '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                                '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                                '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                                '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK"  class="answer_area">('+
                                '        　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span></p>'+
                                '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                                '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                                '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                                '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                                '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                                '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                                '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                                '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                                '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                                '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                                '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "3a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt">在△ABC中，角A，B，C的对边分别为<i>a</i>，<i>b</i>，<i>c</i>，若＜0，则△ABC <span class="answer_area">（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ）</span>. <br/>  <br/>A.一定是锐角三角形&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;B.一定是直角三角形<br/>  <br/>C.一定是钝角三角形&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D.是锐角或直角三角形</p>'}
/*
                    ,{questionId: "4a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
*/
                    ,{questionId: "5a" , title:"第3道题",pageNum: 1, content: ['<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span',
                                    '        style="font-family:NEU-BZ">3</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span',
                                    '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">如图</span><span',
                                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">已知</span><span',
                                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">AOB</span><span',
                                    '        style="font-family:NEU-BZ">=60°</span><span style="font-family:方正书宋_GBK">,</span><span',
                                    '        style="font-family:方正书宋_GBK">点</span><span style="font-family:NEU-BZ; font-style:italic">P</span><span',
                                    '        style="font-family:方正书宋_GBK">在边</span><span style="font-family:NEU-BZ; font-style:italic">OA</span><span',
                                    '        style="font-family:方正书宋_GBK">上</span><span style="font-family:方正书宋_GBK">,</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">OP</span><span style="font-family:NEU-BZ">=12</span><span',
                                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">点</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">M</span><span style="font-family:方正书宋_GBK">、</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">N</span><span style="font-family:方正书宋_GBK">在边</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">OB</span><span style="font-family:方正书宋_GBK">上</span><span',
                                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ; font-style:italic">PM</span><span',
                                    '        style="font-family:NEU-BZ">=</span><span style="font-family:NEU-BZ; font-style:italic">PN</span><span',
                                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">若</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">MN</span><span style="font-family:NEU-BZ">=2</span><span',
                                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">OM</span><span style="font-family:NEU-BZ">=</span><span',
                                    '        style="width:1.47pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 3</span><span',
                                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span',
                                    '        style="width:8pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">B</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4</span><span',
                                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span',
                                    '        style="width:8.59pt; display:inline-block">&#xa0;</span><span',
                                    '        style="font-family:NEU-BZ">C</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span',
                                    '        style="font-family:NEU-BZ"> 5</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span',
                                    '        style="width:8.59pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">D</span><span',
                                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 6</span></p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.002.png" width="171"   height="152" alt=""     style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                                    '</p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span  style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span style="font-family:NEU-HZ">3</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img  crossOrigin="anonymous" src="./mock/test.jpg" width="106"    height="178" alt=""   style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                                    '</p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span style="font-family:NEU-HZ">4</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                             /*       '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.004.png" width="152"                           height="133" alt=""                   style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                                    '</p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span  style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span  style="font-family:NEU-HZ">5</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.005.png" width="201"                        height="137" alt=""      style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                                    '</p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span  style="font-family:NEU-HZ">6</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                                    '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:ignore">&#xa0;</span>',
                                    '</p>*/].join("")}
                    ,{questionId: "6a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                    ,{questionId: "7a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "8a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                    ,{questionId: "9a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "10a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                    ,{questionId: "11a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "12a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                    ,{questionId: "13a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "14a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                    ,{questionId: "15a" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">2</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">在等腰</span><span'+
                            '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                            '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                            '        style="font-family:方正书宋_GBK">其周长为</span><span style="font-family:NEU-BZ">20 cm</span><span'+
                            '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                            '        style="font-family:方正书宋_GBK">边的取值范围是</span><span'+
                            '        style="width:2.08pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;4 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.23pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 5 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'+
                            '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">C</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;8 cm</span><span'+
                            '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '        style="width:21.82pt; display:inline-block">&#xa0;</span><span'+
                            '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '        style="font-family:NEU-BZ"> 4 cm&lt;</span><span'+
                            '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">&lt;10 cm</span></p>'}
                    ,{questionId: "16a" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                            '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                            '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                            '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                            '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                            '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK" class="answer_area">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　)</span></p>'+
                            '                        <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:2.75pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                            '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span'+
                            '                                style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                            '                                style="width:3.34pt; display:inline-block">&#xa0;</span><span'+
                            '                                style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                            '                                style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span'+
                            '                                style="font-family:NEU-BZ">17</span></p>'}
                ]
                , showQuestions: []
                , loading: false
                , teachingAssistantId: null
                , checked: false
                , isShowBorder: false
                , width: 571
                , height: 864

                , data: [{
                    label: '人民教育出版社',
                    children: [
                    {
                        label: '七年级上',
                        children: [{
                            label: '第一章有理数',
                            children: [{
                                label: '正数和负数'
                            },{
                                label: '有理数'
                            },{
                                label: '有理数的加减法'
                            },{
                                label: '有理数的乘除法'
                            },{
                                label: '有理数的乘方'
                            }
                            ]
                        },{
                            label: '第二章整数的加减'
                        },{
                            label: '第三章一元一次方程'
                        },{
                            label: '几何图形初步'
                        }]
                    },{
                        label: '七年级下'
                        },{
                        label: '八年级上'
                     }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
                , questionType: '全部'
                , ability:'全部'
                ,difficulty: '全部'
                , pageNum : 1
                , pageSize: 5
            };
        },
        watch:{
            checked: function (val) {
                console.log("checked:" + val);
                this.$nextTick(()=>{
                    this.showOrHide(this.isShowBorder);
                });
            },
            isShowBorder: function (val) {
                console.log("isShowBorder:"+ val);
                this.showOrHide(val);
            },
            questions: {
                handler(val, oldVal){
                    console.log(val, oldVal);
                },
                deep: true
            }
/*            showQuestions: {
                handler(val, oldVal){
                    console.log(val, oldVal);
                },
                deep: true
            }*/
        },
        computed:{
/*            maxPage() {
                return this.minPage + this.pageCount - 1
            },*/
            times(){
                return (210/this.width).toFixed(3);
            },
  /*          showQuestions(){
                return this.questions.filter(question=>question.selected) || [];
            }*/

        },
        created(){
            //获取屏幕分辨率
            //A4纸的大小 210mm*297mm
            // 1 inch = 25.4mm
            console.log(this.times);
            this.questions.forEach((question)=>{
                question.selected = false;
            })
        },
        mounted(){
            //取所有页码
            this.teachingAssistantId = this.$route.params.teachingAssistantId || "1";

            console.log(this.teachingAssistantId);
            this.showOrHide(this.isShowBorder)
 /*           let teachingAssistantInfo = localStorage.getItem("teachingAssistantInfo");
            if(!teachingAssistantInfo)
                return;

            teachingAssistantInfo = JSON.parse(teachingAssistantInfo);
            //localStorage.setItem("teachingAssistantInfo", JSON.stringify({teachingAssistantId: this.teachingAssistantId, num: this.num}));
            let obj = teachingAssistantInfo.find((item)=>item.teachingAssistantId === this.teachingAssistantId);
            if(obj)
            {
                this.num = obj.num;
                this.minPage = obj.num;
                this.handleChangePage(obj.num) ;

                this.$nextTick(()=>{
                    console.log(this.$refs.myPage);
                    if(this.$refs.myPage)
                    {
                        let imgs = this.$refs.myPage.querySelectorAll("p>img");
                        imgs.forEach((img)=>{
                            this.currentPageImgs.push({
                                src: img.src,
                                width: img.width,
                                height: img.height,
                                selected: false
                            });
                        });
                    }
                });
            }*/
        },
        methods: {
            goBack(){
                this.$router.go(-1);

            },
            handleNodeClick(data){
                console.log(data);
            },


            //checkbox 事件响应
            handleChange(isChecked, question){
                //let isExist = this.questions.some(q=>q === question);
                question.isSelected = isChecked;
                if (isChecked) {
                    this.showQuestions.push(question);

                }else{
                    this.showQuestions = this.showQuestions.filter(q=>q!==question);
                }

                this.$nextTick(()=>{
                    this.showOrHide(this.isShowBorder);
                })
            },

            handleChangeCurrentPage(pageNum){
                console.log(pageNum);
                this.pageNum = pageNum;
            },

            /*getSelectedQuestion(){
                let articleDOM = this.getSelectedContents();
                if (articleDOM) {
                    console.log(articleDOM);
                    console.log(articleDOM.offsetTop, articleDOM.offsetLeft);

                    let arrP = Array.from(articleDOM.children);
                    this.selectedQuestion.questionId = articleDOM.id;
                    this.selectedQuestion.content = [];
                    let question = this.questions.find((question)=>question.questionId === this.selectedQuestion.questionId)

                    let type = null;
                    let str = null;
                    arrP.forEach((p, index, arr)=>{
                        type = p.firstChild.tagName;
                        if(type)
                        {
                            if(index)
                            {
                                str = str + "\n" + p.textContent;
                            }
                            else
                                str = p.textContent;
                        }else if(question.isRevise){
                            //str = p.textContent;
                            str = p.innerHTML;

                            str = str.replace(/[<br/>]/g, "\n");
                            console.log(str);
                        }else{
                            this.$message('结构异常');


                        }
                    });
                    // str = str + '<img src="http://img2.imgtn.bdimg.com/it/u=2587022830,2092476314&fm=26&gp=0.jpg" width="100px;">'
                    this.selectedQuestion.content.push({type: "SPAN", str: str});
                    console.log(this.selectedQuestion);
                }
            },*/

            /**
             * @method getSelectedContents
             * 获取鼠标选中内容的HTML片段
             * @returns {string}
             */
   /*         getSelectedContents()
            {
                let range;
                if (window.getSelection)
                { //chrome,firefox,opera
                    if (window.getSelection().rangeCount) {
                        range=window.getSelection().getRangeAt(0);
                    }
                    else{
                        this.$message('请先在HTML页面内选择题目');
                        return null;
                    }
                }
                else if (document.getSelection) { //其他
                    range=window.getSelection().getRangeAt(0);
                }
                else if (document.selection) { //IE特有的

                    range.commonAncestorContainer = document.selection.createRange()//.htmlText;
                    //return document.selection.createRange().text; //只复制文本
                }
                else
                    return null;
                //window.getSelection().toString();
                let stopDOM = document.querySelector("#myPage");
                let articleDOM = this.findTagNameDOM(range.commonAncestorContainer, "ARTICLE", stopDOM);
                return articleDOM;
            },*/

            //显示隐藏答案框
            showOrHide(isShow){
                let span_array =  this.$refs.myPage.querySelectorAll(".answer_area");
                if (isShow) {
                    span_array.forEach((span)=>{
                        span.style.border = null;
                    })
                }
                else{
                    span_array.forEach((span)=>{
                        span.style.border =  '0.5px solid  rgba(0,0,0,0)';
                    })
                }
            },

            //开始圈码
            handleGetPosition(event){
                this.$alert("坐标数据见控制台");
                let myPage = document.querySelector("#myPage");
                let questionAnswerArea = {"exBoxes": [], "exAnswerBoxes": []};
                let articles = this.$refs.myPage.querySelectorAll("article");
                console.log(articles);
                articles.forEach((article,index)=>{

                    questionAnswerArea.exBoxes.push({width: article.clientWidth + 1, height: article.clientHeight + 1, x: article.offsetLeft, y: article.offsetTop})

                    let answer = article.querySelector(".answer_area");
                    if(answer){
                        questionAnswerArea.exAnswerBoxes.push({width: answer.clientWidth + 1, height: answer.clientHeight + 1, x: answer.offsetLeft, y: answer.offsetTop});
                        console.log(questionAnswerArea);
                    }

                    let question = this.questions.find((question)=>question.questionId === article.id);
                    question.questionAnswerArea = JSON.parse(JSON.stringify(questionAnswerArea));
                    console.log(question);
                    questionAnswerArea = {"exBoxes": [], "exAnswerBoxes": []};
                });
                // TODO 保存到后台时全部换算成纸张上的mm坐标数据
                //console.log(this.questions);

                console.log("times:" + this.times);
            },
            /**
             * @method findArticleDOM
             * 找到目标tag的dom
             * @param currentDOM
             * @param tagName
             */
/*            findTagNameDOM (currentDOM, tagName, stopDOM) {
                if (currentDOM.tagName === tagName) {
                    return currentDOM;
                }
                else if(currentDOM === stopDOM){
                    return null;
                }
                else{
                    return this.findTagNameDOM(currentDOM.parentNode,tagName , stopDOM);
                }
            },*/
            //html转成图片
            handleSwitchPic(event){
                let self = this;
                let canvas = document.createElement("canvas");
                let scale = 3;//this.getPixelRatio(context);
                console.log(scale);
                canvas.width = this.width*scale;
                canvas.height = this.height*scale;
                canvas.style.width = this.width + "px";
                canvas.style.height = this.height + "px";
                let context = canvas.getContext("2d");
                context.scale(scale, scale);

                //解决缩放后偏移
                let rect = this.$refs.myPage.getBoundingClientRect();
                context.translate(-10, 0);

                html2canvas(this.$refs.myPage, {
                    /*allowTaint: true, */
                    useCORS: true
                    , width: this.width * scale
                    , height: this.height * scale
                    , canvas: canvas
                    , scale: 1//scale
                }).then(function (canvas) {
                    console.log(canvas);
                    /*canvas.style.width = self.width + "px";
                    canvas.style.height = self.height + "px";*/
                    /*canvas.width = self.width;
                    canvas.height = self.height;*/
                    /*let test= document.querySelector(".test");
                    test.appendChild(canvas);*/
                    const Img = new Image();
                    Img.src = canvas.toDataURL('image/png', 1.0);
                    Img.width = self.width + "px";
                    Img.height = self.height + "px";
                    const alink = document.createElement("a");
                    alink.href = Img.src;
                    alink.download = "testImg.jpg";
                    alink.click();
                });
            },

            //html 转成 pdf
            handleSwitchPDF(event){
                let self = this;
                let canvas = document.createElement("canvas");
                let scale = 3;
                console.log(scale);
                canvas.width = this.width*scale;
                canvas.height = this.height*scale;
                canvas.style.width = this.width + "px";
                canvas.style.height = this.height + "px";
                let context = canvas.getContext("2d");
                context.scale(scale, scale);

                //解决缩放后偏移
                /*let rect = this.$refs.myPage.getBoundingClientRect();
                context.translate(-10.5, 0);*/

                html2canvas(this.$refs.myPage, {
                    useCORS: true
                    , width: this.width * scale
                    , height: this.height * scale
                    , canvas: canvas
                    , scale: 1//scale
                }).then(function (canvas) {
                    console.log(canvas);
                    /*let test= document.querySelector(".test");
                    test.appendChild(canvas);*/

                    //返回图片dataURL，参数：图片格式和清晰度(0-1)
                    var pageData = canvas.toDataURL('image/jpeg', 1.0);

                    //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
                    var pdf = new jsPDF('', 'pt', 'a4');

                    //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                    //分辨率为72px/inch 时  A4纸张大小595px*842px

                    pdf.addImage(pageData, 'JPEG', 0, 0, 595, 842);

                    pdf.save('stone.pdf');
                });

            },


        },
        components: {}
    }



</script>
<style scoped>
    #myPage article>>> span.answer_area{
            display: inline-block;
            border: 0.5px solid red;
    }
</style>
<style scoped lang="less">
    @import "../../style/theme.less";
    .hc-main-reader{
        height: 100%;
        .el-col{
            height: 100%;
        }
        .hc-main-center{
            background: white;
            padding:5px 20px;
            .hc-main-header{
                height: 35px;
                line-height: 35px;
                margin: 0 auto 5px;
                .hc-main-header-upload{
                    display:inline-block;
                }
                .el-col{
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                }
            }
            .hc-main-content{
                height: calc(100% - 61px);
                .el-col{
                    height: 100%;
                    overflow: auto;
                }
                .hc-main-content-pic{
                    border-left: 1px solid @color;
                    border-right: 1px solid @color;
                    img{
                        width: 100%;
                        background-size: contain;
                    }
                    >.el-row{
                        height: 35px;
                        line-height: 35px;
                    }
                    .my_key{
                        text-align:right;
                    }
                    .my_value{
                        text-align: left;
                    }
                }
                .hc-main-content-edit{
                    border: 1px solid @color;
                    padding: 5px;
                    .hc-main-content-edit-input{
                        margin: 5px auto;
                    }
                }
                .hc-main-content-html{
                    //border: 1px solid @color;
                    padding: 5px;
                    #myPage{
                        text-align: left;

                        margin: 0 auto;
                        border: 1px solid black;
                        position: relative;
                        box-sizing: border-box;
                        padding: 20px 10px;
                        display: flex;
                        flex-direction: row;


                    }
                }
            }
            .hc-main-footer{
                margin: 10px auto;
                height: 40px;
                line-height: 40px;
                .el-col{
                    text-align: center;
              /*      height: 30px;
                    line-height: 30px;*/
                }
            }
        }
    }

</style>
