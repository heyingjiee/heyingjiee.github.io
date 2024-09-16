import{_ as s,c as i,o as a,U as n}from"./chunks/framework.vlRQM0sk.js";const c=JSON.parse('{"title":"Mysql","description":"","frontmatter":{},"headers":[],"relativePath":"docs/otherLanguage/Mysql学习笔记.md","filePath":"docs/otherLanguage/Mysql学习笔记.md","lastUpdated":1718292798000}'),l={name:"docs/otherLanguage/Mysql学习笔记.md"},h=n(`<h1 id="mysql" tabindex="-1">Mysql <a class="header-anchor" href="#mysql" aria-label="Permalink to &quot;Mysql&quot;">​</a></h1><h2 id="修改表结构" tabindex="-1">修改表结构 <a class="header-anchor" href="#修改表结构" aria-label="Permalink to &quot;修改表结构&quot;">​</a></h2><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> chihiro_gitlab_detail </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DROP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COLUMN gitlab_id,</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="建表" tabindex="-1">建表 <a class="header-anchor" href="#建表" aria-label="Permalink to &quot;建表&quot;">​</a></h2><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 表名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AUTO_INCREMENT comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;记录id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  create_time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">datetime</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;行插入时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> update_time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">datetime</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;行修改时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  add_num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;增加行数&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  remove_num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;删除行数&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  total_num </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;总变化行数&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  repo_rid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;仓库信息id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  PRIMARY KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`id\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;代码统计数据表&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>注意：</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`create_time\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> datetime</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;行插入时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,  </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`update_time\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> datetime</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ON</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CURRENT_TIMESTAMP comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;行修改时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="增加索引" tabindex="-1">增加索引 <a class="header-anchor" href="#增加索引" aria-label="Permalink to &quot;增加索引&quot;">​</a></h2><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ALTER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TABLE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chihiro_gitlab_detail</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ADD</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> INDEX</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> idx_group_id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (group_id);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># alter table 表名 add index 索引名(列名)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="聚集函数" tabindex="-1">聚集函数 <a class="header-anchor" href="#聚集函数" aria-label="Permalink to &quot;聚集函数&quot;">​</a></h2><p>当有分组时，Select只能是聚集函数、分组字段</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> total,字段A </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 表名</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GROUP BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 字段A</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>还有一种用法，SUM(字段B)用来一个组内的字段B求和，但是B字段是性别，即man、woman</p><p>我们也可以通过WHEN只统计组内的部分信息</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SUM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CASE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHEN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 字段B</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;man&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> THEN</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ELSE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> END</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 字段B</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 表名</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GROUP BY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 字段A</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,15),p=[h];function t(e,k,r,E,d,g){return a(),i("div",null,p)}const F=s(l,[["render",t]]);export{c as __pageData,F as default};
