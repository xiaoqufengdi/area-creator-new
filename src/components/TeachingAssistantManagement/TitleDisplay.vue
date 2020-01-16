<template>
    <el-row class="hc-main-reader" v-loading="loading">
        <el-col :xs="1" :md="1" :lg="2">
            <el-button type="success" @click="goBack">返回</el-button>
        </el-col>
        <el-col :xs="22" :md="22" :lg="20" class="hc-main-center">
            <el-row class="hc-main-header">
                <el-col :span="24">提示： <span style="color:red;">检测到word原稿不存在，请重新上传</span>
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
                        <el-button slot="trigger" size="small" type="success">选取文件</el-button>
                        <!--         "https://jsonplaceholder.typicode.com/posts/"                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
<!--                    <el-tag size="small"  effect="dark" type="success"> 上传 </el-tag>-->
                    <!--               数学必修1.doc             :on-preview="handlePreview"-->
                    </el-col>
            </el-row>
            <el-row class="hc-main-content">
                <el-col class="hc-main-content-pic"  :span="8"  >
                    <h2>原始教辅</h2>
                    <img :src="picSrc" alt="picture" >

                </el-col>
                <el-col :span="8" class="hc-main-content-html">
                    <h2>展示HTML页</h2>
                    <section id="myPage" ref="myPage">
                        <article :style="{border: selectedQuestion.id === question.id ? '1.5px solid red' : '0.5px solid  #0CC689'}" :id="question.id" v-html="question.content" v-for="question in questions">
                            {{question.content }}
                        </article>
                        <!--        　　　　　　　　　　　　　　　　　　　　　　　　　　　　　</span></p>
                                <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span
                                        style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span
                                        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span
                                        style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span
                                        style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span
                                        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span
                                        style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span
                                        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>

                                <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span
                                        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 17</span><span
                                        style="font-family:方正书宋_GBK; font-style:italic">　</span><span
                                        style="width:2.75pt; display:inline-block">&#xa0;</span><span
                                        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span
                                        style="font-family:NEU-BZ"> 15</span><span style="font-family:方正书宋_GBK; font-style:italic">　</span><span
                                        style="width:3.34pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span
                                        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 13</span><span
                                        style="font-family:方正书宋_GBK; font-style:italic">　</span><span
                                        style="width:3.34pt; display:inline-block">&#xa0;</span><span
                                        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span
                                        style="font-family:NEU-BZ"> 13</span><span style="font-family:方正书宋_GBK">或</span><span
                                        style="font-family:NEU-BZ">17</span></p>-->

                    </section>
                </el-col>
                <el-col :span="8" class="hc-main-content-edit">
                    <h2 style="border-bottom: 1px solid #0CC689;">题目校对</h2>
                    <div  style="height:85%;overflow:auto;padding: 5px;">
                        <h5 style="text-align:left;margin:10px 5px 5px;"> <el-tag type="success">内容部分：</el-tag></h5>
                        <div  :id="selectedQuestion.id" v-show="selectedQuestion.content.length">
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
                        <!--没有数据时占个位置-->
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
<!--                            <a href="https://question-test.oss-cn-beijing.aliyuncs.com/数学/数学.html" target="_blank">jump</a>-->
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



                   <!--         <el-checkbox label="复选框 A"> 复选框 A</el-checkbox>
                            <el-checkbox label="复选框 B">复选框 B</el-checkbox>
                            <el-checkbox label="复选框 C">复选框 C</el-checkbox>
                        </el-checkbox-group>-->
                    </div>

                    <el-button type="success" style="margin: 10px 10px;" @click="getSelectedQuestion">获取</el-button>
                    <el-button type="success" style="margin: 10px 10px;" @click="handleSave">保存</el-button>
                </el-col>

            </el-row>
        </el-col>
        <el-col :xs="1" :md="1" :lg="2"></el-col>
    </el-row>
</template>
<script>
    import axios from "axios";
    import request from "../../utils/request";
    export default {
        data() {
            return {
                questions: [
                    {id: "1" , title:"第1道题",pageNum: 1, content: '     <p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                    '                                style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">1</span><span'+
                    '                                style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                    '                                style="font-family:方正书宋_GBK">一个等腰三角形的两边长分别是</span><span style="font-family:NEU-BZ">3</span><span'+
                    '                                style="font-family:方正书宋_GBK">和</span><span style="font-family:NEU-BZ">7</span><span'+
                    '                                style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则它的周长为</span><span'+
                    '                                style="width:5.29pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span'+
                    '                                style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>'+
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
                    ,{id: "2" , title:"第2道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
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
                    ,{id: "3" , title:"第3道题",pageNum: 1, content: ['<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span',
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
                        '        style="width:1.47pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span',
                        '        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>',
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
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.003.png" width="106"    height="178" alt=""   style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                        '</p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span style="font-family:NEU-HZ">4</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.004.png" width="152"                           height="133" alt=""                   style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                        '</p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span  style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span  style="font-family:NEU-HZ">5</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.005.png" width="201"                        height="137" alt=""      style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>',
                        '</p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span  style="font-family:NEU-HZ">6</span><span style="font-family:方正黑体_GBK">题</span><span style="font-family:方正黑体_GBK">)</span></p>',
                        '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:ignore">&#xa0;</span>',
                        '</p>'].join("")}
                    ,{id: "4" , title:"第4道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">4</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">如图</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">在</span><span'+
                    '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                    '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">点</span><span style="font-family:NEU-BZ; font-style:italic">D</span><span'+
                    '        style="font-family:方正书宋_GBK">在</span><span style="font-family:NEU-BZ; font-style:italic">AC</span><span'+
                    '        style="font-family:方正书宋_GBK">上</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">且</span><span style="font-family:NEU-BZ; font-style:italic">BD</span><span'+
                    '        style="font-family:NEU-BZ">=</span><span style="font-family:NEU-BZ; font-style:italic">BC</span><span'+
                    '        style="font-family:NEU-BZ">=</span><span style="font-family:NEU-BZ; font-style:italic">AD</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">A</span><span'+
                    '        style="font-family:方正书宋_GBK">等于</span><span style="width:3.65pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:方正书宋_GBK">(</span><span style="font-family:方正书宋_GBK; font-style:italic">　　</span><span'+
                    '        style="font-family:方正书宋_GBK">)</span></p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 30°</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　　</span><span style="width:13.55pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 40°</span><span style="font-family:方正书宋_GBK; font-style:italic">　　　</span><span'+
                    '        style="width:14.14pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 45°</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　　</span><span style="width:14.14pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 36°</span></p>'}
                    ,{id: "5" , title:"第5道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">5</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">如图</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">在等腰梯形</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ABCD</span><span style="font-family:方正书宋_GBK">中</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ">∠</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ABC</span><span style="font-family:NEU-BZ">=2∠</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ACB</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">BD</span><span style="font-family:方正书宋_GBK">平分</span><span'+
                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ; font-style:italic">AD</span><span'+
                    '        style="font-family:NEU-BZ">∥</span><span style="font-family:NEU-BZ; font-style:italic">BC</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则图中的等腰三角形有</span><span'+
                    '        style="width:32.09pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 1</span><span'+
                    '        style="font-family:方正书宋_GBK">个</span><span style="font-family:方正书宋_GBK"> </span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                    '        style="width:30.87pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 2</span><span style="font-family:方正书宋_GBK">个</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span style="font-family:方正书宋_GBK"> </span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                    '        style="width:20.96pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">C</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 3</span><span style="font-family:方正书宋_GBK">个</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span style="font-family:方正书宋_GBK"> </span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                    '        style="width:20.96pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 4</span><span style="font-family:方正书宋_GBK">个</span></p>'}
                    ,{id: "6" , title:"第6道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                    '        style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">6</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                    '        style="font-family:方正书宋_GBK">如图</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">在</span><span style="font-family:NEU-BZ">▱</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ABCD</span><span style="font-family:方正书宋_GBK">中</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">已知</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">AD</span><span style="font-family:NEU-BZ">=8 cm</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                    '        style="font-family:NEU-BZ">=6 cm</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">DE</span><span style="font-family:方正书宋_GBK">平分</span><span'+
                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">ADC</span><span'+
                    '        style="font-family:方正书宋_GBK">交</span><span style="font-family:NEU-BZ; font-style:italic">BC</span><span'+
                    '        style="font-family:方正书宋_GBK">边于点</span><span style="font-family:NEU-BZ; font-style:italic">E</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">BE</span><span style="font-family:方正书宋_GBK">等于</span><span'+
                    '        style="width:27.03pt; display:inline-block">&#xa0;</span><span style="font-family:方正书宋_GBK">(</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　</span><span style="font-family:方正书宋_GBK">)</span></p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ">A</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 2 cm</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span style="font-family:方正书宋_GBK"> </span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　</span><span'+
                    '        style="width:16.01pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">B</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 4 cm</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　　　</span><span'+
                    '        style="width:34.22pt; display:inline-block">&#xa0;</span><span style="font-family:NEU-BZ">C</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> 6 cm</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic">　　　</span><span style="width:8.72pt; display:inline-block">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">D</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> 8 cm</span></p>'}
                    ,{id: "7" , title:"第7道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span'+
                    '        style="font-family:方正书宋_GBK; -aw-import:spaces">&#xa0;</span><span style="font-family:NEU-BZ">7</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span style="font-family:NEU-BZ"> </span><span'+
                    '        style="font-family:方正书宋_GBK">如图</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">在</span><span style="font-family:NEU-BZ">Rt△</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ABC</span><span style="font-family:方正书宋_GBK">中</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ">∠</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">B</span><span style="font-family:NEU-BZ">=90°</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ; font-style:italic">AC</span><span'+
                    '        style="font-family:方正书宋_GBK">的垂直平分线</span><span style="font-family:NEU-BZ; font-style:italic">MN</span><span'+
                    '        style="font-family:方正书宋_GBK">与</span><span style="font-family:NEU-BZ; font-style:italic">AB</span><span'+
                    '        style="font-family:方正书宋_GBK">交于点</span><span style="font-family:NEU-BZ; font-style:italic">D</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:NEU-BZ">∠</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">BCD</span><span style="font-family:NEU-BZ">=10°</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">则</span><span'+
                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">A</span><span'+
                    '        style="font-family:方正书宋_GBK">的度数是</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic; text-decoration:underline">　　　　</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">&#xa0;</span>'+
                    '</p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.006.png" width="201"'+
                    '                                                                                       height="220" alt=""'+
                    '                                                                                       style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>'+
                    '</p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:9pt"><span'+
                    '        style="font-family:方正黑体_GBK">(</span><span style="font-family:方正黑体_GBK">第</span><span'+
                    '        style="font-family:NEU-HZ">7</span><span style="font-family:方正黑体_GBK">题</span><span'+
                    '        style="font-family:方正黑体_GBK">)</span></p>'+
                    '<p style="margin-top:0pt; margin-bottom:0pt; text-align:center; font-size:10.5pt"><img src="./static/math/数学.007.png" width="182"'+
                    '                                                                                       height="227" alt=""'+
                    '                                                                                       style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline"/>'+
                    '</p>'}
                    ,{id: "8" , title:"第8道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">8</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">如图</span><span'+
                    '        style="font-family:方正书宋_GBK">,</span><span style="font-family:方正书宋_GBK">在</span><span'+
                    '        style="font-family:NEU-BZ">△</span><span style="font-family:NEU-BZ; font-style:italic">ABC</span><span'+
                    '        style="font-family:方正书宋_GBK">中</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">AB</span><span style="font-family:NEU-BZ">=</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">AC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ">∠</span><span style="font-family:NEU-BZ; font-style:italic">A</span><span'+
                    '        style="font-family:NEU-BZ">=40°</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">点</span><span style="font-family:NEU-BZ; font-style:italic">D</span><span'+
                    '        style="font-family:方正书宋_GBK">在</span><span style="font-family:NEU-BZ; font-style:italic">AC</span><span'+
                    '        style="font-family:方正书宋_GBK">上</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">BD</span><span style="font-family:NEU-BZ">=</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">BC</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">则</span><span style="font-family:NEU-BZ">∠</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">ABD</span><span style="font-family:方正书宋_GBK">的度数是</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic; text-decoration:underline">　　　　</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">&#xa0;</span>'+
                    '</p>'}
                    ,{id: "9" , title:"第9道题",pageNum: 1, content: '<p style="margin-top:0pt; margin-bottom:0pt; font-size:10.5pt"><span style="font-family:NEU-BZ; -aw-import:spaces">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ">9</span><span style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ"> </span><span style="font-family:方正书宋_GBK">用反证法证明命题</span><span'+
                    '        style="font-family:NEU-BZ">“</span><span style="font-family:方正书宋_GBK">三角形中至少有一个角大于或等于</span><span'+
                    '        style="font-family:NEU-BZ">60°</span><span style="font-family:NEU-BZ">”</span><span'+
                    '        style="font-family:方正书宋_GBK">时</span><span style="font-family:方正书宋_GBK">,</span><span'+
                    '        style="font-family:方正书宋_GBK">第一步应假设</span><span'+
                    '        style="font-family:方正书宋_GBK; font-style:italic; text-decoration:underline">　　　　　</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic; text-decoration:underline">&#xa0;</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">.</span><span'+
                    '        style="font-family:NEU-BZ; font-style:italic">&#xa0;</span>'+
                    '</p>'}

                ]
                ,picSrc: "./static/math_47.png",
                selectedQuestion: {id:null, content: [/*{type: "SPAN", str: "" }, {type: "IMG", src: "", width}*/] }
                , currentPageImgs: [
                    // {src: null, width: null, selected: false}
                    ]

                , fileList: []
                , loading: false
            };
        },
        created(){


        },
        mounted(){
            console.log(this.$refs.myPage);
            let imgs = this.$refs.myPage.querySelectorAll("p>img");
            imgs.forEach((img)=>{
                this.currentPageImgs.push({
                    src: img.src,
                    width: img.width,
                    height: img.height,
                    selected: false
                });
            });


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
                    let arrP = Array.from(articleDOM.children);
                    this.selectedQuestion.id = articleDOM.id;
                    this.selectedQuestion.content = [];
                    let question = this.questions.find((question)=>question.id === this.selectedQuestion.id)

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
                            this.$alert("结构异常")
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
                        this.$alert("请先在HTML页面内选择题目");
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

                /**
                 * @method findArticleDOM
                 * 找到目标tag的dom
                 * @param currentDOM
                 * @param tagName
                 */
                let findTagNameDOM = function(currentDOM, tagName, stopDOM) {
                    if (currentDOM.tagName === tagName) {
                        return currentDOM;
                    }
                    else if(currentDOM === stopDOM){
                        return null;
                    }
                    else{
                        return findTagNameDOM(currentDOM.parentNode,tagName , stopDOM);
                    }
                };

                let stopDOM = document.querySelector("#myPage");
                let articleDOM = findTagNameDOM(range.commonAncestorContainer, "ARTICLE", stopDOM);
                return articleDOM;
            },
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
                if (!this.selectedQuestion.id) {
                    this.$alert("请先选择题目");
                }
                let question = this.questions.find(question=>{
                    return question.id === this.selectedQuestion.id;
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
            },
            beforeUpload(file){

                return true;
            },
            handleSuccess(response, file, fileList){
                this.$alert("上传成功后端处理中......");
                console.log(response);
                console.log(file);
                console.log(fileList);

                setTimeout(()=>{
                    this.loading = false;
                }, 2000)
            },
            handSend(content){
                console.log("send");
                console.log(content);
                let formData = new FormData();
                formData.append(content.filename, content.file);

                request.upload("./docToHtml/test/", {file: formData}).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                });
            }
        },
        computed: {},
        components: {}
    }

</script>
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
                margin: 5px auto;
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
