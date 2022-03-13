# vscode
## 1. 配置用户代码片段

**配置一个自动生成.vue单文件模版的代码片段**

第一步

![image-20210803222018962](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20210803222018962%20.png)

第二步

![image-20220114121113288](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20220114121113288%20.png)

第三步，起个名字

![image-20220114121204545](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20220114121204545%20.png)

第四步，在打开的文件中把以下模版代码粘贴进去

```json
{
	"Print to console": {
	  "prefix": "vue",
	  "body": [
		  "<template>",
		  "  <div>\n",
		  "  </div>",
		  "</template>\n",
		  "<script>",
		  "import OtherComponent from '@/components/OtherComponent'\n",
		  "export default {",
		  "  name: 'MyName',",
		  "  components: {",
		  "    OtherComponent",
		  "  },",
		  "  directives: {},",
		  "  filters: {},",
		  "  extends: {},",
		  "  mixins: {},",
		  "  props: {},",
		  "  data () {",
		  "    return {\n",
		  "    }",
		  "  },",
		  "  computed: {},",
		  "  watch: {},",
		  "  beforeCreate () {",
		  "    // 生命周期钩子：组件实例刚被创建，组件属性计算之前，如 data 属性等",
		  "  },",
		  "  created () {",
		  "    // 生命周期钩子：组件实例创建完成，属性已绑定，但 DOM 还未生成，$el 属性还不存在",  
		  "    // 初始化渲染页面",
		  "  },",
		  "  beforeMount () {",
		  "    // 生命周期钩子：模板编译/挂载之前",
		  "  },",
		  "  mounted () {",
		  "    // 生命周期钩子：模板编译、挂载之后（此时不保证已在 document 中）",
		  "  },",
		  "  beforeUpdate () {",
		  "    // 生命周期钩子：组件更新之前",
		  "  },",
		  "  updated () {",
		  "    // 生命周期钩子：组件更新之后",
		  "  },",
		  "  activated () {",
		  "    // 生命周期钩子：keep-alive 组件激活时调用",
		  "  },",
		  "  deactivated () {",
		  "    // 生命周期钩子：keep-alive 组件停用时调用",
		  "  },",  
		  "  beforeDestroy () {",
		  "    // 生命周期钩子：实例销毁前调用",
		  "  },",
		  "  destroyed () {",
		  "    // 生命周期钩子：实例销毁后调用",
		  "  },",  
		  "  errorCaptured (err, vm, info) {",
		  "    // 生命周期钩子：当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。",  
		  "    console.log(err, vm, info)",
		  "  },",
		  "  methods: {}",
		  "}",
		  "</script>\n",
		  "<style lang=\"scss\" scoped></style>",
		  "$2"
	  ],
	  "description": "Log output to console"
	}
  }
```

之后新建任意格式的文件，在其中输入vue时，选择提示中的选项，回车就会生成vue的模版

![image-20220114122545735](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20220114122545735%20.png)

:::tip

其实可以使用这种方法在vscode中定义任意用户片段，输入`prefix`字段的值会触发提示的，提示的内容是`body`字段的值

:::

## 2. 插件
1. **ESlint**：javascript代码检测工具，可以配置每次保存时格式化js，但每次保存只格式化一点点，你得连续按住Ctrl+S好几次,才格式化好。在setting.json中添加以下，就会根据开发的项目中的eslintrc.js来格式化代码中的js部分

   ```json
   	"eslint.options": {
       "extensions": [
         ".js",
         ".vue"
       ]
     },
     "eslint.validate": [
       "javascript",
       "javascriptreact",
       "html",
       "vue"
     ],
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "eslint.codeAction.disableRuleComment": {},
     "eslint.alwaysShowStatus": true,
   ```

2. **vetur**：可以格式化html、标准css（有分号 、大括号的那种）、标准js（有分号 、双引号的那种）、vue文件。但是，格式化的标准js文件不符合ESlint规范，会给你加上双引号、分号等，像这样

   ![image-20210803213907961](/Users/yc/Library/Application Support/typora-user-images/image-20210803213907961.png)能把html格式化分行显示![image-20210803214100321](https://gitee.com/hyj1270433876/blog-img/raw/master/%E8%B8%A9%E5%9D%91/image-20210803214100321%20.png)

3. **Prettier - Code formatter**：只关注格式化，并不具有eslint检查语法等能力，只关心格式化文件(最大长度、混合标签和空格、引用样式等)，包括JavaScript · Flow · TypeScript · CSS · SCSS · Less · JSX · Vue · GraphQL · JSON · Markdown





