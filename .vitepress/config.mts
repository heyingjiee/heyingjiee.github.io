import { defineConfig } from 'vitepress'
// import mk from '@iktakahiro/markdown-it-katex'

import mk from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //页面相关配置
  title: "何叨叨的个人博客",
  description: "我的个人网站",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "https://heyingjiee.github.io/logo.png" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
    config: (md) => {
      md.use(mk)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://heyingjiee.github.io/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/heyingjiee' }
    ],
    outline: {
      level: [2, 6],
      label: '文章大纲'
    },
    nav: [
      // 导航栏配置
      {
        text: "前端",
        items: [
          { text: "JS笔记(持续更新)", link: "/docs/frontBasic/JS重刷笔记.md" },
          { text: "TS笔记(持续更新)", link: "/docs/frontBasic/TS学习笔记.md" },
          { text: "CSS笔记", link: "/docs/frontBasic/CSS技术精炼.md" },
          { text: "Vue2笔记(过时)", link: "/docs/frontBasic/Vue2重刷笔记.md" },
          { text: "Vue3案例", link: "/docs/frontBasic/Vue3案例.md" },
          { text: "Nest笔记(持续更新)", link: "/docs/frontBasic/Nest.md" },
          { text: "Canvas", link: "/docs/frontBasic/Canvas.md" },
          { text: "Rxjs", link: "/docs/frontBasic/Rxjs.md" },
        ],
      },
      {
        text: "移动端",
        items: [
          { text: "鸿蒙Next(暂停更新)", link: "/docs/mobileBasic/鸿蒙.md" },
          { text: "Flutter(暂停更新)", link: "/docs/mobileBasic/Flutter.md" },
        ],
      },
      {
        text: "Rust",
        items: [
          { text: "Rust笔记(持续更新)", link: "/docs/frontBasic/Rust.md" },
        ]
      },
      {
        text: "Go",
        items: [
          { text: "Go 基础（持续更新）", link: "/docs/golang/Go学习笔记.md" },
          { text: "Go Web", link: "/docs/golang/GoWeb学习.md" },
          { text: "Go 微服务", link: "/docs/golang/Go微服务.md" },
        ],
      },
      {
        text: "编程基础",
        items: [
          { text: "Git", link: "/docs/programBasic/Git相关笔记.md" },
          { text: "HTTPS原理", link: "/docs/programBasic/HTTPS原理.md" },
          { text: "Leetcode学习", link: "/docs/programBasic/leetcode刷题记录.md" },
          { text: "常用服务端口", link: "/docs/programBasic/常用服务端口.md" },
        ],
      },

      {
        text: "其他技术",
        items: [
          { text: "Redis7", link: "/docs/otherLanguage/Redis.md" },
          { text: "Docker", link: "/docs/otherLanguage/Docker.md" },
          { text: "Nginx（待补充）", link: "/docs/otherLanguage/Nginx学习.md" },
          { text: "Linux基础", link: "/docs/otherLanguage/Linux学习笔记.md" },
        ]
      },
      {
        text: "前端工程化",
        items: [
          { text: "前端项目配置", link: "/docs/frontEngineering/项目配置.md" },
          { text: "NPM应知应会", link: "/docs/frontEngineering/NPM应知应会.md" },
          { text: "Gulp自动化神器", link: "/docs/frontEngineering/Gulp自动化神器.md" },
          { text: "Vite", link: "/docs/frontEngineering/Vite.md" },
        ],
      },
      {
        text: "工具",
        items: [
          { text: "WebStorm", link: "/docs/programTool/WebStorm.md" },
          { text: "Charles", link: "/docs/programTool/Charles的学习笔记.md" },
          {
            text: "Mac使用经验",
            link: "/docs/programTool/Mac使用经验.md",
          },
        ],
      },
      {
        text: "归档",
        items: [
          {
            text: "Python爬虫",
            link: "/docs/otherLanguage/python爬虫进阶学习笔记.md",
          },
          {
            text: "C/C++基础",
            link: "/docs/otherLanguage/c++使用学习笔记.md",
          },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Hedaodao'
    },
    lastUpdated: {
      text: '最后更新时间',
    },
    search: {
      provider: 'local'
    },

  },
  ignoreDeadLinks: true,
})
