# 何叨叨的个人博客

使用 VitePress，源码与 GitHub Pages 发布统一在本仓库。

## 本地开发

使用 Node.js 22 和 pnpm 10.15.1：

```bash
pnpm install --frozen-lockfile
pnpm docs:dev
```

## 构建与预览

```bash
pnpm docs:build
pnpm docs:preview
```

构建产物为 `.vitepress/dist`，不提交到 Git。

## 自动发布

向 `main` 分支推送后，GitHub Actions 自动安装锁定依赖、构建并发布到
<https://heyingjiee.github.io/>。也可在 Actions 页选择
“Deploy VitePress to GitHub Pages”并手动运行。

Pages 的发布来源为 GitHub Actions。工作流使用仓库自带的 `GITHUB_TOKEN`，
不需要个人访问令牌或 Deploy Key。原来的 `deploy.sh` 已由工作流替代。

`master` 和 `legacy-site-backup-20261017` 保留旧网站发布历史；
`main` 保留从原博客源码仓库迁入的完整提交历史。
