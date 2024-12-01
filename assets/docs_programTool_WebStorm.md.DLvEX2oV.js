import{_ as e,c as o,a2 as i,o as t}from"./chunks/framework.CQii86iU.js";const g=JSON.parse('{"title":"WebStorm","description":"","frontmatter":{},"headers":[],"relativePath":"docs/programTool/WebStorm.md","filePath":"docs/programTool/WebStorm.md","lastUpdated":1664176337000}'),p={name:"docs/programTool/WebStorm.md"};function s(l,a,r,m,c,d){return t(),o("div",null,a[0]||(a[0]=[i('<h1 id="webstorm" tabindex="-1">WebStorm <a class="header-anchor" href="#webstorm" aria-label="Permalink to &quot;WebStorm&quot;">​</a></h1><h2 id="eslint" tabindex="-1">Eslint <a class="header-anchor" href="#eslint" aria-label="Permalink to &quot;Eslint&quot;">​</a></h2><p><a href="https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_linters_eslint_import_code_style_from_eslint" target="_blank" rel="noreferrer">ESlint相关文档</a></p><ul><li><p>前提：插件依赖于Eslint的npm包，首先得确保安装了Eslint包</p></li><li><p>ESlint配置的读取规则</p><ul><li><p>如果项目中不存在ESlint的相关配置，那么ESlint就不会生效</p></li><li><p>WebStorm会在项目启动时，自动查找eslint的项目配置文件，并应用</p></li><li><p>右键ESlint配置文件，应用ESlint代码样式规则</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173214288%20.png" alt="image-20220315173214288"></p></li></ul></li><li><p>应用ESlint修复</p><ul><li><p>在文件中右键</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173829847%20.png" alt="image-20220315173829847"></p></li><li><p>如果觉得麻烦，可以设置，保存时（快捷键 command+s），自动执行ESlint修复</p><p>注意：如果文件中存在ESLint报错，但是代码也没有变动需要保存时，使用command+s是无法触发ESLint修复的</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173915201%20.png" alt="image-20220315173915201"></p></li></ul></li><li><p>webstorm对于文件的检查提示和ESlint无关，但是其设置内默认对于JS和TS的代码质量检查，使用ESLint的配置文件的规则，所以如果代码出现违背ESlint配置文件的地方，就会划出红色/黄色波浪线提示</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315173031464%20.png" alt="image-20220315173031464"></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315172858191%20.png" alt="image-20220315172858191"></p></li></ul><h2 id="prettier" tabindex="-1">Prettier <a class="header-anchor" href="#prettier" aria-label="Permalink to &quot;Prettier&quot;">​</a></h2><p><a href="https://www.jetbrains.com/help/webstorm/prettier.html" target="_blank" rel="noreferrer">Prettier相关</a></p><ul><li><p>前提：插件依赖于Prettier的npm包</p></li><li><p>Prettier配置的读取规则</p><ul><li>如果没有Prettier的相关配置文件，Prettier会遵循默认的Prettier规则</li><li><strong>是否会自动查找项目下的Prettier配置文件</strong>官方文档未提及</li><li>可以右键配置文件，选择应用&quot;Prettier代码样式规则&quot;</li></ul></li><li><p>应用Prettier修复</p><ul><li><p>在文件中右键</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315175144496%20.png" alt="image-20220315175144496"></p></li><li><p>如果觉得麻烦，可以设置保存时，触发</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174658304%20.png" alt="image-20220315174658304"></p></li></ul></li><li><p>WebStorm的规则检查中，没有对与Prettier规则的检查，即使代码风格违背Prettier也不会有任何提示</p></li><li><p>格式化（⌥ ⌘ L）可以指定为使用Prettier格式化</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png" alt="image-20220315174720761"></p></li></ul><h2 id="格式化" tabindex="-1">格式化 <a class="header-anchor" href="#格式化" aria-label="Permalink to &quot;格式化&quot;">​</a></h2><p>格式化（⌥ ⌘ L）只是将代码按照某种格式整理代码的一种方式</p><p>格式化默认使用设置中的<strong>代码样式</strong>的规则</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315180811961%20.png" alt="image-20220315180811961"></p><ul><li><p>可以在设置中，对每种语言进行自定义设置</p></li><li><p>也可以，启用EditorConfig支持，在项目下添加 <code>.editorconfig</code>配置文件，WebStorm会参照配置文件来格式化（启用EditorConfig，会覆盖默认配置）</p></li><li><p>也可以将Prettier设置为格式化程序（经过测试，如果设置了Prettier为格式化程序，editorconfig和prettier冲突的字段，prettier的优先级更高）</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220315174720761%20.png" alt="image-20220315174720761"></p></li></ul><h2 id="实时模版-live-templates" tabindex="-1">实时模版（live templates） <a class="header-anchor" href="#实时模版-live-templates" aria-label="Permalink to &quot;实时模版（live templates）&quot;">​</a></h2><p>实时模版就是在代码中输入指定缩写，按下tab，会自动生成设置好的代码</p><p>偏好设置——&gt;编辑器——&gt;实时模版，也可以使用快捷键 <code>command</code>+<code>,</code>，就可以进入实时模版的设置界面</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay20220920014159%20.png" alt="image-20220409111617658"></p><p>可以看出WebStorm根据语言区分了不同组，这里称作<strong>实时模版组</strong></p><p>从中选一个我们比较熟悉的语言，点击<strong>JavaScript组</strong>找到<strong>log</strong>这个实时模版</p><p>这个<strong>实时模版</strong>就是当我们在代码中输入<code>log</code>后，按下<code>tab</code>键，会自动按照预设的模版生成代码</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409112102533.png" alt="image-20220409112102533"></p><p>在代码中输入log时，弹出提示框，我们在定义实时模版时，填写的内容会在这里显示</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409133108768.png" alt="image-20220409133108768"></p><p><strong>实时模版文本</strong>中可以定义变量，形式是<code>$变量名$</code>，可以让自动生成的代码是动态的</p><ul><li><p>WebStorm中预定义的变量</p><table tabindex="0"><thead><tr><th>预定义变量</th><th>描述</th></tr></thead><tbody><tr><td><code>$VAR$</code></td><td>可以定义一个变量</td></tr><tr><td><code>$ARRAY$</code></td><td>可输入一个数组</td></tr><tr><td><code>$PARAM$</code></td><td>可变长度参数</td></tr><tr><td><code>$END$</code></td><td>光标结束符号。生成代码后，输入光标放置的位置。比如默认的log模版中的<code>console.log($END$)</code>的含义就是，生成代码后，输入光标在括号中</td></tr></tbody></table></li><li><p>自定义变量，形式也是<code>$变量名$</code>，WebStorm提供了一些预定义函数，这些函数可以返回值并赋值给自定义的变量【<a href="https://www.jetbrains.com/help/webstorm/template-variables.html#ws_example_live_template_variables" target="_blank" rel="noreferrer">函数列表</a>】</p></li></ul><p><strong>如何使用？举个例子</strong></p><p>我们改造下log这个实时模版</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409121821829.png" alt="image-20220409121821829"></p><p>在模版文本中，定一个了一个变量<code>$METHODNAME$</code>，这个变量不是预定义的变量，这时候右侧的<strong>编辑变量</strong>的弹窗中可以编辑这个变量的初始值</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220409160825253.png" alt="image-20220409160825253"></p><p><strong>简单记就是</strong>，有定义，看勾选；无定义，光标一定留在变量位置。定义多个变量时，如果有多个变量都会使光标停留在变量位置，实际上，光标会停留在第一个满足条件的变量的位置，可以使用<code>tab</code>键，切换到下一个满足条件的变量所在的位置</p><p>所以，一般自定义变量，从两个角度考虑</p><ul><li>需要用户输入的变量，不设置表达式和默认值，光标位置一定在变量位置</li><li>返回值的变量 <ul><li>设置处理的表达式+无默认值 +不勾选&quot;如果定义则跳过&quot; ，这种如果表达式返回失败，会让用户手动输入</li><li>设置处理的表达式+默认值+勾选，这种变量值要么是表达式，要么是默认值，且光标不会停在变量位置</li></ul></li></ul><p><strong>使用模版</strong></p><p>jsMethodName()函数成功返回函数名func1</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-09%2014.53.46.gif" alt="2022-04-09 14.53.46"></p><p>jsMethodName()函数返回失败，无法获取函数名（因为我这里用的是匿名函数），且无默认值，所以属于无定义，输入光标一定会停留在变量位置，输入完成后，按<code>tab</code>键，跳转到下一个光标停留位置，即<code>$END$</code></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/2022-04-09%2015.45.58.gif" alt="2022-04-09 15.45.58"></p><h2 id="终端启动" tabindex="-1">终端启动 <a class="header-anchor" href="#终端启动" aria-label="Permalink to &quot;终端启动&quot;">​</a></h2><ul><li><p>创建命令行启动器</p><p>完成下面的步骤，进入<code>/usr/local/bin</code>目录，就可以看到在<code>bin</code>文件夹创建了一个<code>webstorm</code>文件</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/WebStorm/image-20220321150206974%20.png" alt="image-20220321150206974"></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/WebStorm/image-20220321150230479%20.png" alt="image-20220321150230479"></p></li><li><p>启动项目</p><p>在终端中进入要启动的项目的目录，输入下面的内容，就会启动项目</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">webstorm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><h2 id="外部库" tabindex="-1">外部库 <a class="header-anchor" href="#外部库" aria-label="Permalink to &quot;外部库&quot;">​</a></h2><p>WebStorm的项目窗口一直有一个<strong>外部库</strong>的功能，这个功能是干啥的呢？</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410011712876.png" alt="image-20220410011712876"></p><p>在WebStorm中内置了一部分<code>*.d.ts</code>文件，这些文件是用来提示语法的，比如你输入<code>math.floor()</code>，当你输入<code>.</code>时，就会有函数提示，其中还包括了提示文档</p><p>但是，对于一些WebStorm中没有预制的库，怎么办呢？</p><ul><li><p>Webstorm会读取项目下的node_modules文件夹，如果你使用了其中的依赖中某些函数，仍然能做到提示</p><p>比如，下面这个项目，通过npm安装了axios的包，WebStrom能找到axios的函数。这时可以注意到，WebStorm会自动在node_modules目录旁，标记上<code>library root</code></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410012802634.png" alt="image-20220410012802634"></p></li><li><p>对于不在node_module中的</p><ul><li><p>比如，在页面使用CDN的方式引入Jquery，但是使用Jquery的方法没有提示。点击下载库，就能看到项目窗口的外部库中，有了下载的Jquery，编写代码中就有了Jquery相关方法提示了</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013300776.png" alt="image-20220410013300776"></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013505041.png" alt="image-20220410013505041"></p></li><li><p>想要WebStorm支持Node的Api，可以按照下面的方式配置</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013822129.png" alt="image-20220410013822129"></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220410013843397.png" alt="image-20220410013843397"></p></li></ul></li></ul><h2 id="快捷键" tabindex="-1">快捷键 <a class="header-anchor" href="#快捷键" aria-label="Permalink to &quot;快捷键&quot;">​</a></h2><h3 id="重构-待补充" tabindex="-1">重构（待补充） <a class="header-anchor" href="#重构-待补充" aria-label="Permalink to &quot;重构（待补充）&quot;">​</a></h3><p>在需要重构的位置，使用快捷键 control+t</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412004714907.png" alt="image-20220412004714907"></p><h3 id="代码导航" tabindex="-1">代码导航 <a class="header-anchor" href="#代码导航" aria-label="Permalink to &quot;代码导航&quot;">​</a></h3><ul><li><p>查找声明/用法（⌘+B）</p><p>【声明与用法，不仅仅是变量，方法，设置引入的Vue组件也可以跳转到定义组件的文件】</p><p>在定义处使用，弹出所有用法的弹窗</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412003245784.png" alt="image-20220412003245784"></p><p>在用法处使用，直接跳转到声明处</p></li><li><p>后退上一次光标位置/前进到下一个光标的位置</p><p>⌘+⌥+←</p><p>⌘+⌥+→</p><p>在查看代码时，经常会通过点击函数F1的函数体中调用的另一个函数F2，从而跳转到F2定义的位置，查看F2的代码。这时候就需要用<code>⌘+⌥+← </code>熟练地返回上一个函数F1</p></li></ul><h3 id="搜索与替换" tabindex="-1">搜索与替换 <a class="header-anchor" href="#搜索与替换" aria-label="Permalink to &quot;搜索与替换&quot;">​</a></h3><ul><li><p>全局搜索（⌘+⇧+F）</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412002614621.png" alt="image-20220412002614621"></p></li><li><p>全局替换（⌘+⇧+R）</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412002732374.png" alt="image-20220412002732374"></p></li><li><p>当前文件内查找（⌘+F）/替换（⌘+R）</p></li></ul><h3 id="最近文件" tabindex="-1">最近文件 <a class="header-anchor" href="#最近文件" aria-label="Permalink to &quot;最近文件&quot;">​</a></h3><p>最近文件弹窗 ⌘+E</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412003928827.png" alt="image-20220412003928827"></p><h2 id="插件推荐" tabindex="-1">插件推荐 <a class="header-anchor" href="#插件推荐" aria-label="Permalink to &quot;插件推荐&quot;">​</a></h2><h3 id="chinese-language-pack" tabindex="-1">Chinese Language Pack <a class="header-anchor" href="#chinese-language-pack" aria-label="Permalink to &quot;Chinese Language Pack&quot;">​</a></h3><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409104239506.png" alt="image-20220409104239506"></p><p>给WebStorm提供汉化的插件</p><h3 id="gittoolbox" tabindex="-1">GitToolBox <a class="header-anchor" href="#gittoolbox" aria-label="Permalink to &quot;GitToolBox&quot;">​</a></h3><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409095349796.png" alt="image-20220409095349796"></p><p>WebStorm内置的Git工具已经非常强大了，但是这款Git插件提供一个比较有意思的功能是，可以在代码中用灰色问题提示当前行代码的提交记录，代码出现问题方便定位提交者</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409100427467.png" alt="image-20220409100427467"></p><p>安置插件后，可以在设置里找到插件的配置菜单，因为我只需要在编辑器中显示，所以只勾选了一个</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409101525136.png" alt="image-20220409101525136"></p><h3 id="indent-rainbow" tabindex="-1">Indent Rainbow <a class="header-anchor" href="#indent-rainbow" aria-label="Permalink to &quot;Indent Rainbow&quot;">​</a></h3><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409101836441.png" alt="image-20220409101836441"></p><p>以不同的颜色显示锁进，就像彩虹一样</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102109682.png" alt="image-20220409102109682"></p><p>安装插件后，在这里配置相关功能</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102341061.png" alt="image-20220409102341061"></p><h3 id="translation" tabindex="-1">Translation <a class="header-anchor" href="#translation" aria-label="Permalink to &quot;Translation&quot;">​</a></h3><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102431316.png" alt="image-20220409102431316"></p><p>一款翻译插件，最nice的一个功能是给变量起英文名字</p><p>安装后，在代码中输入文字，右键，菜单出现了两个选项</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102613457.png" alt="image-20220409102613457"></p><p><strong>翻译</strong></p><p>根据选中的文字自动翻译，用的做多的就是查一下代码中英语单词的含义（当然也可查别的语言，默认中文会翻译成英语）</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102819900.png" alt="image-20220409102819900"></p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409102923159.png" alt="image-20220409102923159"></p><p><strong>翻译并替换</strong></p><p>这个才是杀手级功能啊，插件会根据翻译，给你起一个驼峰形式的变量名，选中后，会自动把中文替换为选中的英语变量名</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103245652.png" alt="image-20220409103245652"></p><p><strong>最后，也是最重要的</strong></p><p>日常使用时，请使用快捷键</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103554137.png" alt="image-20220409103554137"></p><p>使用快捷键时，输入光标不用选中文字，只光标在单词后，就可以自动识别前面的一个单词</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409103827091.png" alt="image-20220409103827091"></p><p>安装插件后，在这里配置相关功能</p><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Css%E7%9B%B8%E5%85%B3/image-20220409104147262.png" alt="image-20220409104147262"></p><h2 id="问题与解决方案" tabindex="-1">问题与解决方案 <a class="header-anchor" href="#问题与解决方案" aria-label="Permalink to &quot;问题与解决方案&quot;">​</a></h2><h3 id="无法识别vue中的-路径" tabindex="-1">无法识别vue中的@路径 <a class="header-anchor" href="#无法识别vue中的-路径" aria-label="Permalink to &quot;无法识别vue中的@路径&quot;">​</a></h3><p><img src="https://hedaodao-1256075778.cos.ap-beijing.myqcloud.com/Essay/image-20220412001403190.png" alt="image-20220412001403190"></p>',94)]))}const h=e(p,[["render",s]]);export{g as __pageData,h as default};
