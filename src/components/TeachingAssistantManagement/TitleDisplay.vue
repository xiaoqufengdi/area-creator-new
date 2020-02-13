<template>
    <el-row class="hc-main-reader" v-loading="loading">
        <el-col :xs="2" :md="3" :lg="4">
            <el-button type="primary" size="small" @click="goBack">返回</el-button>
        </el-col>
        <el-col :xs="20" :md="18" :lg="16" class="hc-main-center">
            <el-row class="hc-main-header">
                <el-col :span="10">
                  <el-button size="small" type="primary"  @click="handleStartDraw">获取坐标</el-button>
                    <el-button size="small" type="primary"  @click="handleSwitchPic">生成图片</el-button>
                    <el-button size="small" type="primary"  @click="handleSwitchPDF">生成PDF</el-button>

                  <!--       提示： <span style="color:red;">检测到word原稿不存在，请重新上传</span>
                           <el-upload
                                   class="hc-main-header-upload"
                                   ref="upload"
                                   action="fakeaction"
                                   :http-request="handSend"
                                   :on-success="handleSuccess"
                                   :before-upload="beforeUpload"
                                   :file-list="fileList"
                                   :show-file-list="false"
                                   :auto-upload="true">
                               <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                               &lt;!&ndash;         "https://jsonplaceholder.typicode.com/posts/"                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;
                           </el-upload>-->
                 </el-col>
                <el-col :span="8">
<!--                    <el-input-number size="small" :max='maxPage' :min='minPage'  v-model.number="num"   @change="handleChangePage"></el-input-number> <span>共{{pageCount}}页</span>-->
<!--                   <el-button size="small" type="success"  @click="handleGetPage">测试请求页码 </el-button>-->
                </el-col>
                <el-col :span="6">
                  <el-checkbox fill="#0CC689" text-color="#0CC689" v-model="checked">是否双栏</el-checkbox>
                  <el-checkbox fill="#0CC689" text-color="#0CC689" v-model="isShowBorder">题目和答案框</el-checkbox>
                </el-col>
            </el-row>
            <el-row class="hc-main-content">
<!--                <el-col class="hc-main-content-pic"  :span="8"  >
                    <h2>原始教辅</h2>
                    <img :src="picSrc" alt="picture" >

                </el-col>-->

                <el-col :span="24" class="hc-main-content-html">
<!--                    <h2>展示HTML页</h2>-->
                    <div id="myPage"     ref="myPage"  :style="{height: height + 'px', width: width + 'px'}">
                        <section :style="{width: checked ?'50%' : '100%' }">
                            <article :key="question.questionId" :style="{border: isShowBorder ? '0.5px solid  #2992FF' : '0.5px solid  rgba(0,0,0,0)'}" :id="question.questionId" v-html="question.content" v-for="(question, index) in questions.slice(0, 4)">
                                {{question.content }}
                            </article>
                        </section>
                        <section v-if="checked" style="width:1.5px;background:black;margin:0 5px;"> </section>
                        <section v-if="checked" :style="{width:'50%' }">
                            <article :key="question.questionId" :style="{border: isShowBorder ? '0.5px solid  #2992FF' : '0.5px solid  rgba(0,0,0,0)'}" :id="question.questionId" v-html="question.content" v-for="(question, index) in questions.slice(4, 9)">
                                {{question.content }}
                            </article>
                        </section>
                    </div>
                </el-col>
                <!--<el-col :span="8" class="hc-main-content-edit">
                    <h2 style="border-bottom: 1px solid #0CC689;">题目校对</h2>
                    <div  style="height:85%;overflow:auto;padding: 5px;">
                        <h5 style="text-align:left;margin:10px 5px 5px;"> <el-tag type="success">内容部分：</el-tag></h5>
                        <div  :id="selectedQuestion.questionId" v-show="selectedQuestion.content.length">
                            <template v-for="(content, index) in selectedQuestion.content">
                                <el-input v-if="content.type==='SPAN'" class="hc-main-content-edit-input"
                                          :key="index"
                                          type="textarea"
                                          :autosize="{ minRows: 10}"
                                          placeholder="请从展示HTML页内选择题目"
                                          :value="content.str"
                                          @input="(value)=>{ handleInput(value, content)}"
                                >
                                </el-input>
                            </template>
                        </div>
                        &lt;!&ndash;没有数据时占个位置&ndash;&gt;
                        <div v-show="Boolean(!selectedQuestion.content.length)">
                            <el-input
                                    :key="1"
                                    class="hc-main-content-edit-input"
                                    type="textarea"
                                    :autosize="{ minRows: 10}"
                                    placeholder="请从展示HTML页内选择题目"
                                    value="">
                            </el-input>
                        </div>

                        <h5 style="text-align:left;margin:10px 5px;"> <el-tag type="success">图片部分：</el-tag>
&lt;!&ndash;                            <a href="https://question-test.oss-cn-beijing.aliyuncs.com/数学/数学.html" target="_blank">jump</a>&ndash;&gt;
                        </h5>
                        <div style="border:1px solid #0CC689">
                            <el-card style="width:49%; float:left"
                                    :key="index"  v-for="(imgObj, index) in currentPageImgs"
                                    :body-style="{ padding: '5px', height: '260px' }"
                                    shadow="hover"
                            >
                                <img :src="imgObj.src" style="width:100%;height:210px; background-size: contain;">
                                <div style="padding: 10px;">
                                    <div style="margin-top: 5px;">
                                        <el-checkbox :value="imgObj.selected" :label="imgObj.src" @change="(value, event)=>{ handleChange(value, imgObj )}">picture</el-checkbox>
                                    </div>
                                </div>
                            </el-card>
                        </div>




                    </div>

                    <el-button type="success" style="margin: 10px 10px;" @click="getSelectedQuestion">获取</el-button>
                    <el-button type="success" style="margin: 10px 10px;" @click="handleSave">保存</el-button>
                </el-col>-->
            </el-row>
        </el-col>
        <el-col :xs="2" :md="3" :lg="4"></el-col>
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
                               {questionId: "1" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                                ,{questionId: "2" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "3" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt">在△ABC中，角A，B，C的对边分别为<i>a</i>，<i>b</i>，<i>c</i>，若＜0，则△ABC <span class="answer_area">（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ）</span>. <br/>  <br/>A.一定是锐角三角形&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;B.一定是直角三角形<br/>  <br/>C.一定是钝角三角形&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D.是锐角或直角三角形</p>'}
/*
                    ,{questionId: "4" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "5" , title:"第3道题",pageNum: 1, content: ['<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span',
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
                                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img  crossOrigin="anonymous" src="http://127.0.0.1:8081/test.jpg" width="106"    height="178" alt=""   style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
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
                    ,{questionId: "6" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                    ,{questionId: "7" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "8" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                    ,{questionId: "9" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "10" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                    ,{questionId: "11" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "12" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                    ,{questionId: "13" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "14" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                    ,{questionId: "15" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{questionId: "16" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
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
                ,picSrc: null,//"./static/math_47.png",
                selectedQuestion: {questionId:null, content: [/*{type: "SPAN", str: "" }, {type: "IMG", src: "", width}*/] }
                , currentPageImgs: [
                    // {src: null, width: null, selected: false}
                    ]
                , fileList: []
                , loading: false
                , pageCount: 46
                , minPage: 1
                , num: 1
                , teachingAssistantId: null
                // , isShowTip: false
                , checked: false
                , isShowBorder: false
                , width: 571
                , height: 864
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
            }
            
        },
        computed:{
            maxPage() {
                return this.minPage + this.pageCount - 1
            },
            times(){
                return (210/this.width).toFixed(3);
            }

        },
        created(){
            //获取屏幕分辨率
            //A4纸的大小 210mm*297mm
            // 1 inch = 25.4mm
            //window.screen.width
            console.log(this.times);


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

            getSelectedQuestion(){
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
            },

            /**
             * @method getSelectedContents
             * 获取鼠标选中内容的HTML片段
             * @returns {string}
             */
            getSelectedContents()
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
            },

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
            handleStartDraw(event){
                let myPage = document.querySelector("#myPage");
                let questionAnswerArea = {"exBoxes": [], "exAnswerBoxes": []};
                let articles = myPage.querySelectorAll("article");
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
            findTagNameDOM (currentDOM, tagName, stopDOM) {
                if (currentDOM.tagName === tagName) {
                    return currentDOM;
                }
                else if(currentDOM === stopDOM){
                    return null;
                }
                else{
                    return this.findTagNameDOM(currentDOM.parentNode,tagName , stopDOM);
                }
            },
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

            //获取像素比
            /*getPixelRatio(context){
                let backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;

                return (window.devicePixelRatio || 1) / backingStore;
            },*/

            //输入框事件响应
            handleInput(value, obj){
                console.log(value);
                obj.str = value;

                setTimeout(()=>{
                    console.log(this.selectedQuestion);
                }, 2000)
            },
            //checkbox 事件响应
            handleChange(isSelected, img){
                img.selected = isSelected;
                console.log(isSelected, img);
            },
            //保存修改
            handleSave(){
                if (!this.selectedQuestion.questionId) {
                    this.$message('请先选择题目');

                }
                let question = this.questions.find(question=>{
                    return question.questionId === this.selectedQuestion.questionId;
                });
                let str = this.selectedQuestion.content[0].str;
                //大于号和小于号替换
                str = str.replace(/\</g, "&lt;");
                str = str.replace(/\>/g, "&gt;");



                let selectedImgs = this.currentPageImgs.filter(img=>img.selected);
                if(selectedImgs && selectedImgs.length)
                {
                    question.imgInfo = selectedImgs;
                }
                console.log("str: "+ str);
                // todo 调接口更新这道题目信息

                str = str.replace(/\n/g, "<br/>");
                this.selectedQuestion.content[0].str = str;
                //  <span style="font-family:NEU-BZ; font-style:italic">.</span>  <span style="font-family:方正书宋_GBK">
                question.content = "<p style='margin-top:0pt; margin-bottom:0pt; font-size:10.5pt; font-family:方正书宋_GBK'>" + this.selectedQuestion.content[0].str  + "</p>";
                question.isRevise = true;
                console.log(question);

                this.selectedQuestion = {questionId:null, content: [/*{type: "SPAN", str: "" }, {type: "IMG", src: "", width}*/] }
            },
            beforeUpload(file){

                return true;
            },
            handleSuccess(response, file, fileList){
                console.log(response);
                console.log(file);
                console.log(fileList);

            },
            handSend(content){

                //取第一页内容展示
                console.log("send");
                this.loading = true;
                console.log(content);
                let formData = new FormData();
                formData.append(content.filename, content.file);
                this.$message('正在上传，请稍后...');

                request.upload( formData).then((response)=>{
                    console.log(response);
                    this.$message('上传成功，正在转换成HTML...');
                    this.loading = false;

                    /*
                        request.getPageNumber({teachingAssistantId: "07ddf5690e40c07e3057bd4dafd68d5d"}).then(res2=>{
                            console.log(res2);

                        }).catch(err=>{
                            console.log(err);
                        });
                    */

                    let options = {fileName: response.html, teachingAssistantId: this.teachingAssistantId};//"07ddf5690e40c07e3057bd4dafd68d5d"
                    // options.fileName = options.replace(/\\/g,'\\\\');
                    request.switchContent(options).then((res1)=>{
                        console.log("switchContent");
                        console.log(res1);
                        request.getPageNumber({teachingAssistantId: this.teachingAssistantId}).then(res2=>{
                            console.log(res2);
                            this.minPage = res2.data[0].pageNum;
                            this.num = res2.data[0].pageNum;
                            //this.pageCount = res2.data.length;
                            let teachingAssistantInfo = localStorage.getItem("teachingAssistantInfo");
                            if(teachingAssistantInfo)
                            {
                                teachingAssistantInfo = JSON.parse(teachingAssistantInfo);
                                let obj = teachingAssistantInfo.find((item)=>item.teachingAssistantId === this.teachingAssistantId);
                                if(obj)
                                {
                                    obj.num = this.num;
                                }
                                else{
                                    teachingAssistantInfo.push({teachingAssistantId: this.teachingAssistantId, num: this.num});
                                }

                                localStorage.setItem("teachingAssistantInfo", JSON.stringify(teachingAssistantInfo));
                            }
                            else{

                                localStorage.setItem("teachingAssistantInfo", JSON.stringify([{teachingAssistantId: this.teachingAssistantId, num: this.num}]));
                            }



                            //取第一页内容展示
                            let params = {
                                teachingAssistantId: this.teachingAssistantId,//"07ddf5690e40c07e3057bd4dafd68d5d",
                                pageNum: this.num
                            };


                            request.getHTMLByPageNumber(params).then(res3=>{
                                console.log("第一页内容");
                                console.log(res3);
                                this.questions = res3.data.html;
                                this.picSrc = res3.data.pdf;
                                this.updateImg()
                            }).catch((err)=>{
                                console.log(err);
                            });
                        }).catch(err=>{
                            console.log(err);
                        });
                    });
                }).catch((error)=>{
                    console.log(error);
                });
            },

            handleChangePage(value) {
                console.log(value);
                let params = {
                    teachingAssistantId: this.teachingAssistantId, // "07ddf5690e40c07e3057bd4dafd68d5d",
                    pageNum: value
                };
                request.getHTMLByPageNumber(params).then(res=>{
                    console.log(res);
                    this.questions = res.data.html;
                    this.picSrc = res.data.pdf;
                    this.updateImg();
                }).catch((err)=>{
                    console.log(err);
                })

            },

            updateImg(){
                this.$nextTick(()=>{

                    let imgs = this.$refs.myPage.querySelectorAll("p>img");
                    this.currentPageImgs = [];
                    imgs.forEach((img)=>{
                        this.currentPageImgs.push({
                            src: img.src,
                            width: img.width,
                            height: img.height,
                            selected: false
                        });
                    });
                });
            },

            handleGetPage(){

                let params = {
                    teachingAssistantId: "07ddf5690e40c07e3057bd4dafd68d5d",
                    pageNum: 47
                };
                request.getHTMLByPageNumber(params).then(res3=>{
                    console.log("第一页内容");
                    console.log(res3);
                }).catch((err)=>{
                    console.log(err);
                });
            }
        },
        components: {}
    }



</script>
<style scoped>
    article>>> span.answer_area{
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
                text-align:left;
                height: 35px;
                line-height: 35px;
                margin: 0 auto 5px;
                .hc-main-header-upload{
                    display:inline-block;
                }
                .el-col{
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
                    border: 1px solid @color;
                    img{
                        width: 100%;
                        background-size: contain;
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
                    border: 1px solid @color;
                    padding: 5px;
                    #myPage{
                        text-align: left;
                   /*     width: 571px;
                        height: 864px;*/
                        margin: 0 auto;
                        border: 1px solid black;
                        position: relative;
                        box-sizing: border-box;
                        padding: 20px 10px;
                        display: flex;
                        flex-direction: row;
        /*                article{
                            box-sizing: border-box;
                        }*/

                    }
                }
            }
        }
    }

   /* .hc-title-display{
        height: 100%;
        border: 1px solid blue;
    }
    .hc-title-display-aside{
        height: 100%;
        border: 1px solid green;

    }
    .hc-title-display-main{
        height: 100%;
        border: 1px solid green;
    }

*/

</style>
