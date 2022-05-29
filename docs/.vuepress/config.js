module.exports = {
  //页面相关配置
  title: "何叨叨的个人博客",
  description: "我的个人网站",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/logo.png" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],

  //相对路径配置（比如部署到https://xxx.github.io/bar/，那么base设置为/bar/）
  base: "/",

  //markdown的相关配置
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  serviceWorker: true, // 是否开启 PWA

  //默认主题的配置在这里
  themeConfig: {
    //
    logo: "/logo.png", //这个logo是顶部导航栏的logo
    nav: [
      // 导航栏配置
      {
        text: "前端基础",
        items: [
          { text: "CSS", link: "/frontBasic/CSS技术精炼.md" },
          { text: "JS重刷笔记（持续更新）", link: "/frontBasic/JS重刷笔记.md" },
          //{ text: "JS笔记（旧）", link: "/dealArticle/js学习笔记.md" },
          // { text: "Node", link: "/frontBasic/Nodejs学习笔记.md" },
          { text: "Vue", link: "/frontBasic/Vue学习笔记.md" },
        ],
      },
      // {text: '前端进阶', link: '/algorithm/'},
      {
        text: "编程基础",
        items: [
          { text: "Git", link: "/programBasic/Git相关笔记.md" },
          { text: "HTTPS", link: "/programBasic/HTTPS的原理.md" },
          { text: "常用服务端口", link: "/programBasic/常用服务端口.md" },
        ],
      },
      {
        text: "其他语言",
        items: [
          { text: "Go语言（持续更新）", link: "/dealArticle/Go学习笔记.md" },
          { text: "Flutter（持续更新）", link: "/otherLanguage/Flutter.md" },
          { text: "Docker", link: "/otherLanguage/Docker.md" },
          { text: "Nginx", link: "/otherLanguage/Nginx学习.md" },
          { text: "Linux基础", link: "/otherLanguage/Linux学习笔记.md" },
          {
            text: "Python爬虫",
            link: "/otherLanguage/python爬虫进阶学习笔记.md",
          },
          {
            text: "C/C++基础",
            link: "/otherLanguage/c++使用学习笔记.md",
          },
          // { text: "Kubenetes", link: "/otherLanguage/Kubenetes.md" },
        ],
      },
      {
        text: "其他文章",
        items: [
          { text: "前端工程化", link: "/other/前端工程化.md" },
          { text: "WebStorm", link: "/other/WebStorm.md" },
          { text: "Charles", link: "/other/charles的学习笔记.md" },
          {
            text: "Mac使用经验",
            link: "/other/Mac使用经验.md",
          },
          // { text: "VSCode", link: "/other/VSCode使用指南.md" },
          // {
          //   text: "chrome extension",
          //   link: "/other/chrome extension开发.md",
          // },
        ],
      },
    ],
    sidebar: "auto", // 侧边栏配置
    sidebarDepth: 3, // 侧边栏显示3级
    lastUpdated: "最后更新时间", //最后一次更新时间 string | boolean
    smoothScroll: true, //页面滚动效果
  },
};
