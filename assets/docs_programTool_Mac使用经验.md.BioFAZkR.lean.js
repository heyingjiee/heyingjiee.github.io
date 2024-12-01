import{_ as e,c as s,a2 as i,o as t}from"./chunks/framework.CQii86iU.js";const m=JSON.parse('{"title":"Mac使用经验","description":"","frontmatter":{},"headers":[],"relativePath":"docs/programTool/Mac使用经验.md","filePath":"docs/programTool/Mac使用经验.md","lastUpdated":1714185447000}'),o={name:"docs/programTool/Mac使用经验.md"};function p(c,a,r,n,l,d){return t(),s("div",null,a[0]||(a[0]=[i(`<h1 id="mac使用经验" tabindex="-1">Mac使用经验 <a class="header-anchor" href="#mac使用经验" aria-label="Permalink to &quot;Mac使用经验&quot;">​</a></h1><h2 id="显示隐藏文件" tabindex="-1">显示隐藏文件 <a class="header-anchor" href="#显示隐藏文件" aria-label="Permalink to &quot;显示隐藏文件&quot;">​</a></h2><p>在Mac中一些系统级别的或者以<code>.</code>开头的文件/文件夹会被系统默认隐藏</p><p>可是我们有时需要修改隐藏文件中的一些文件，来修改某些配置</p><p><strong>如何显示被隐藏文件夹</strong></p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">defaults</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> write</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.apple.finder</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AppleShowAllFiles</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TRUE</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">killall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Finder</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>灰色的文件夹就是原本被隐藏的文件夹</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210171649327%20.png" alt="image-20220210171649327"></p><p><strong>如何重新隐藏文件夹</strong></p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">defaults</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> write</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> com.apple.finder</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AppleShowAllFiles</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> FALSE</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">killall</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Finder</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="mac文件系统目录结构" tabindex="-1">Mac文件系统目录结构 <a class="header-anchor" href="#mac文件系统目录结构" aria-label="Permalink to &quot;Mac文件系统目录结构&quot;">​</a></h2><p>参考：<a href="https://zhuanlan.zhihu.com/p/91852414" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/91852414</a></p><p>磁盘下根目录结构如下：</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210171649327%20.png" alt="image-20220210171649327"></p><p><code>/System</code>（系统） ： 包含大多数系统配置和操作系统文</p><p><code>/Applications</code> （应用程序）：大多数用户应用程序</p><p><code>/Users</code> ：所有常规用户主目录的默认位置（包含文档，图片，电影，桌面等的子目录）【文件夹小房子图标是当前登录的用户，路径一般用<code>~</code>代替】</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210174832027%20.png" alt="image-20220210174832027"></p><p><code>/Library </code>（资源库）包含应用程序库，文档和应用程序设置</p><p><code>/bin</code>： 包含任何用户可以执行的二进制命令</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210175450533%20.png" alt="image-20220210175450533"></p><p><code>/cores</code>： 内核转储文件存放目录。当一个进程崩溃时，如果系统允许则会产生转储文件。</p><p><code>/etc</code>： 包含大多数系统配置（这里是快捷方式，真正的地址：<code>/private /etc</code>）, bash和zsh的配置文件也在该目录下</p><p><code>/home</code>：（这里是快捷方式，<code>/System/Volumes/Data/home</code>）</p><p><code>/opt</code></p><p><code>/private</code>：操作系统信息<code>var</code>、<code>etc</code>、<code>tmp</code>都在这个目录下</p><p><code>/sbin</code>： 包含超级用户（root）可执行文件</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210180852613%20.png" alt="image-20220210180852613"></p><p><code>/tmp</code>： 包含应用程序使用的临时文件（这里是快捷方式，真正的地址：<code>/private /tmp</code>）</p><p><code>/usr</code>： 存储大量可执行文件</p><p><code>/var</code>：包含日志文件和假脱机/内容目录（这里是快捷方式，真正的地址：<code>/private /var</code>）</p><p><code>/Volumes</code> ：磁盘的快捷方式</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220210181534029%20.png" alt="image-20220210181534029"></p><h2 id="mac修改环境变量" tabindex="-1">Mac修改环境变量 <a class="header-anchor" href="#mac修改环境变量" aria-label="Permalink to &quot;Mac修改环境变量&quot;">​</a></h2><p>看下Mac上使用的哪个终端软件 ，</p><p><code>bash</code>的配置文件在<code>User/用户名/.bash_profile</code></p><p><code>zsh</code>的配置文件在<code>User/用户名/.zshrc</code></p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">～/Documents/test/flutter/flutter/bin:$PATH</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="mac应用无法打开或文件损坏的处理方法" tabindex="-1">MAC应用无法打开或文件损坏的处理方法 <a class="header-anchor" href="#mac应用无法打开或文件损坏的处理方法" aria-label="Permalink to &quot;MAC应用无法打开或文件损坏的处理方法&quot;">​</a></h2><p><a href="https://xclient.info/a/74559ea2-7870-b992-ed53-52a9d988e382.html" target="_blank" rel="noreferrer">https://xclient.info/a/74559ea2-7870-b992-ed53-52a9d988e382.html</a></p><h2 id="mac推荐软件" tabindex="-1">Mac推荐软件 <a class="header-anchor" href="#mac推荐软件" aria-label="Permalink to &quot;Mac推荐软件&quot;">​</a></h2><h3 id="免费下载网站" tabindex="-1">免费下载网站 <a class="header-anchor" href="#免费下载网站" aria-label="Permalink to &quot;免费下载网站&quot;">​</a></h3><p>appstorrent <a href="https://appstorrent.ru/" target="_blank" rel="noreferrer">https://appstorrent.ru/</a></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240330202449O0NIT4.png" alt="image-20240330202449486"></p><p>Xclient <a href="https://xclient.info/" target="_blank" rel="noreferrer">https://xclient.info/</a></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221102161154%20.png" alt="image-20221102161153728"></p><p>XXMac <a href="https://www.xxmac.com/" target="_blank" rel="noreferrer">https://www.xxmac.com/</a></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221102161248%20.png" alt="image-20221102161248433"></p><h3 id="截图软件xnip" tabindex="-1">截图软件Xnip <a class="header-anchor" href="#截图软件xnip" aria-label="Permalink to &quot;截图软件Xnip&quot;">​</a></h3><p>可直接在App Store 搜索下载，这个软件对软件界面的截图带阴影效，而且支持长截图</p><h3 id="图片上传软件upic" tabindex="-1">图片上传软件uPic <a class="header-anchor" href="#图片上传软件upic" aria-label="Permalink to &quot;图片上传软件uPic&quot;">​</a></h3><p>将这个软件和<code>typora</code>相配合，实现图片自动上传的效果。这里是我配置的自己的<code>Gitee</code>仓库</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220130170808296%20.png" alt="image-20220130170808296"></p><h3 id="host工具switchhosts" tabindex="-1">Host工具SwitchHosts <a class="header-anchor" href="#host工具switchhosts" aria-label="Permalink to &quot;Host工具SwitchHosts&quot;">​</a></h3><p>可以将配置的host分类，根据自己需要通过后面的<code>switch</code>开关，选择是否开启</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Mac/image-20220130171114360%20.png" alt="image-20220130171114360"></p><h3 id="ssh连接客户端termius" tabindex="-1">SSH连接客户端Termius <a class="header-anchor" href="#ssh连接客户端termius" aria-label="Permalink to &quot;SSH连接客户端Termius&quot;">​</a></h3><p>号称Mac上最好用的SSH连接客户端</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Nginx/image-20220501020122614.png" alt="image-20220501020122614"></p><h3 id="防止mac休眠" tabindex="-1">防止Mac休眠 <a class="header-anchor" href="#防止mac休眠" aria-label="Permalink to &quot;防止Mac休眠&quot;">​</a></h3><p><a href="https://xclient.info/s/caffeinated.html#versions" target="_blank" rel="noreferrer">下载地址</a></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20221102161600%20.png" alt="image-20221102161600023"></p><h3 id="magnet-pro" tabindex="-1">Magnet PRO <a class="header-anchor" href="#magnet-pro" aria-label="Permalink to &quot;Magnet PRO&quot;">​</a></h3><p>Mac分屏软件</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/20240422141814ocPz4h.png" alt="image-20240422141813178"></p>`,65)]))}const g=e(o,[["render",p]]);export{m as __pageData,g as default};
