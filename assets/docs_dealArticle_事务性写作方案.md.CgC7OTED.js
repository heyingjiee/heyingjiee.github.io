import{_ as n,c as a,a2 as p,o as e}from"./chunks/framework.CQii86iU.js";const o=JSON.parse('{"title":"事务性写作方案","description":"","frontmatter":{},"headers":[],"relativePath":"docs/dealArticle/事务性写作方案.md","filePath":"docs/dealArticle/事务性写作方案.md","lastUpdated":1710084700000}'),l={name:"docs/dealArticle/事务性写作方案.md"};function i(r,s,c,b,t,d){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="事务性写作方案" tabindex="-1">事务性写作方案 <a class="header-anchor" href="#事务性写作方案" aria-label="Permalink to &quot;事务性写作方案&quot;">​</a></h1><h2 id="提交测试规范" tabindex="-1">提交测试规范 <a class="header-anchor" href="#提交测试规范" aria-label="Permalink to &quot;提交测试规范&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>交付质量：</span></span>
<span class="line"><span>1、提测前需要完成冒烟用例，通过率达到 100%。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>组外人员对接：</span></span>
<span class="line"><span>1、和测试对接：</span></span>
<span class="line"><span>      1.1、在修改非「已解决」的状态时、比如驳回、关闭、无需解决需要事先和测试口头或企微沟通，不能直接在 BUG 里直接备注。</span></span>
<span class="line"><span>      1.2、不要和测试沟通技术细节，试图通过代码实现方案等技术细节来解释 BUG 无法解决的理由。</span></span>
<span class="line"><span>1.2、如果是产品的问题，和产品确认后可转给产品，不能直接驳回给测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2、和产品对接:</span></span>
<span class="line"><span>      2.1、在需求宣讲时，尽量把模糊或产品文档不清晰的问题提前暴露。</span></span>
<span class="line"><span>      2.2、在开发和测试中，如果产品要改动非产品文档里的逻辑，需要先过下「宇航」，如果没问题，需要同步测试</span></span>
<span class="line"><span>      2.3、不私下接产品的需求</span></span>
<span class="line"><span></span></span>
<span class="line"><span>组内任务对接：</span></span>
<span class="line"><span>1、在他人需要帮助时，需要积极帮助他人</span></span>
<span class="line"><span>2、组内沟通不能带有消极、情绪等影响团队氛围的情况</span></span>
<span class="line"><span></span></span>
<span class="line"><span>线上问题：</span></span>
<span class="line"><span>1、收到线上问题时，要及时排查，如需和组外任务协助排查，能当面说就当面说</span></span>
<span class="line"><span>2、「主要负责人」要及时响应并解决，并及时向「负责人」同步问题出现的原因、解决方案、影响面。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代码改动：</span></span>
<span class="line"><span>有代码逻辑的改动需要同步测试和组内人员。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="职责归属类" tabindex="-1">职责归属类 <a class="header-anchor" href="#职责归属类" aria-label="Permalink to &quot;职责归属类&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>负责人职责：包括但不限于项目任务分配、职责分配、业务和自研交付质量、底层能力支持等统筹职责。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>主要负责人职责：包括但不限于交付质量、性能优化、版本上线、问题排查、在「负责人」请假等无法及时响应的情况下需要执行「负责人」的职责。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>backup：负责在「主要负责人」请假等无法及时响应的情况下需要执行「主要负责人」的职责。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="移动端结构图" tabindex="-1">移动端结构图 <a class="header-anchor" href="#移动端结构图" aria-label="Permalink to &quot;移动端结构图&quot;">​</a></h2><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240227094507cu0yzJ.png" alt="image-20240227094506634"></p>`,7)]))}const m=n(l,[["render",i]]);export{o as __pageData,m as default};
