# Skills CLI：来源、安装、版本、更新与安全评估

整理日期：2026-10-17。

本文区分 Agent Skills 格式规范与 Vercel Labs 的 `skills` CLI 实现。实验功能以查阅时上游 `main` 源码为准，使用前应确认本机版本的 `--help` 是否包含对应命令。

## 1. `npx skills add owner/repo` 从哪里下载

命令包含两层来源：`npx` 从配置的 npm registry 获取并运行 `skills` CLI；CLI 再从 GitHub 的 `owner/repo` 仓库获取技能内容。仓库简写指向 GitHub，也可以使用完整 Git URL、指定子目录 URL 或本地路径。

```bash
npx skills add vercel-labs/agent-skills --list
npx skills add owner/repo --skill code-review -a claude-code
npx skills add ./my-skills --skill code-review -a claude-code
```

## 2. 多个 skill 如何组织

规范要求一个 skill 是包含 `SKILL.md` 的目录，但没有要求整个仓库只能采用一种布局。推荐：

```text
my-skills/
├── README.md
└── skills/
    ├── code-review/
    │   ├── SKILL.md
    │   ├── scripts/
    │   ├── references/
    │   └── assets/
    └── release-notes/
        └── SKILL.md
```

`scripts/`、`references/` 和 `assets/` 均可选。最小的 `SKILL.md`：

```markdown
---
name: code-review
description: 检查代码缺陷，在用户要求代码审查时使用。
---

这里写具体执行步骤、约束和示例。
```

按规范，`name` 应与所在目录名一致。附属文件用相对 skill 根目录的路径引用；发布时应把必要脚本和模板放在该 skill 内，避免依赖仓库外层文件。

## 3. 安装后是否保留仓库层级

常规安装按 skill 名称平铺目录，保留单个 skill 的内部结构：

```text
来源：repo/skills/frontend/react-review/SKILL.md
安装：项目/.agents/skills/react-review/SKILL.md
```

`.agents` 是复数。默认符号链接模式将实体文件放在当前安装范围的 `.agents/skills/<name>/`，再按目标 agent 创建链接；`--copy` 则向 agent 目录复制。

手动安装也可以，但应复制完整 skill 目录，而不是只复制 `SKILL.md`。

## 4. Agent 怎么发现技能

Agent 宿主实现目录扫描与加载，CLI 按各工具的规则放置文件。不是把仓库下载到任意目录就能自动发现。

下表是查阅时 CLI 使用的部分目标路径，不代表这些工具只支持这些路径：

| Agent | 项目级 | 用户级 |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `.agents/skills/` | `~/.cursor/skills/` |
| Gemini CLI | `.agents/skills/` | `~/.gemini/skills/` |
| OpenCode | `.agents/skills/` | `~/.config/opencode/skills/` |

```bash
# 默认：当前项目
npx skills add owner/repo --skill code-review -a claude-code

# -g：用户级，供跨项目使用
npx skills add owner/repo --skill code-review -a claude-code -g
```

规范采用渐进加载：先让宿主获取名称和描述，匹配任务后读取完整指令，需要时再加载附属资源。具体触发、刷新和目录优先级取决于宿主实现。

## 5. 两个仓库的同名 skill 会不会覆盖

同一安装范围内可能覆盖。常规路径使用 skill 名称，没有自动加上仓库命名空间：

```text
仓库 A/code-review → .agents/skills/code-review/
仓库 B/code-review → .agents/skills/code-review/
```

当前交互安装摘要会提示 `overwrites`，确认后替换原目录；`-y` 跳过确认。锁文件同样以 skill 名称为键，不能将其理解为支持任意同名来源并存。

自建管理工具应把“仓库来源 + skill 路径”作为身份，并单独处理安装别名和名称冲突。

## 6. 版本与 GitHub 发布流程

需要区分：

| 概念 | 含义 |
| --- | --- |
| `metadata.version` | 作者自定义元数据，不自动赋予统一的版本解析能力 |
| Git ref | 分支或 tag 等来源定位方式 |
| 内容哈希 | 判断 skill 文件是否发生变化 |

Agent Skills 规范不强制独立版本字段，也没有定义 npm 式的语义化版本范围解析。

GitHub 分发的常见做法：维护 `skills/<name>/`，验证后提交推送；需要稳定版本时创建 tag，并可创建 Release 写变更说明。安装本身不要求存在 Release。

```bash
# 使用仓库默认来源
npx skills add owner/repo --skill code-review

# 指向已经存在的 v1.2.0 tag 中的具体目录
npx skills add https://github.com/owner/repo/tree/v1.2.0/skills/code-review
```

## 7. `update` 如何判断更新

对于 GitHub 来源，主要依据锁文件记录的来源、ref、skill 路径与内容哈希，比较远端对应目录是否变化，而不是比较 GitHub Release 版本号。

```bash
npx skills update -p             # 当前项目
npx skills update -g             # 用户级
npx skills update code-review    # 指定技能
```

- 默认分支中的 skill 改变，即使未发 Release，也可能检测到更新。
- 固定 tag 时检查该 ref，不会自动寻找更大的 tag 版本号。
- 仓库其他目录变化，不一定触发这个 skill 的更新。
- 项目锁文件为 `skills-lock.json`，记录来源、路径、可选 ref 和哈希等。
- 有哈希记录不等于已经具备 npm 完整的不可变版本恢复能力。
- 当前源码跳过 `node_modules` 来源的常规更新；应先用包管理器更新，再同步。

## 8. 空间、全局副本和链接

常规技能内容保存在本地。Markdown 和脚本通常较轻，图片、模板、数据等附属资源可能成为主要体积来源。

常规 `skills add` 并不提供“所有项目自动链接到一个全局内容仓库”的机制：

```text
项目 A/.agents/skills/oil-ui/   # A 的实体文件
项目 A/.claude/skills/oil-ui    # 符号链接到 A 的实体文件
项目 B/.agents/skills/oil-ui/   # B 的另一份实体文件
~/.agents/skills/oil-ui/        # -g 安装的用户级实体文件
```

同一项目内多个 agent 可以共用一份；多个项目分别安装通常各存一份。这里用的是符号链接，不是硬链接。网络缓存是否命中与最终文件是否共享是两回事。

若要设计节省空间的管理工具，可采用“按来源和哈希区分的不可变共享缓存 + 项目锁文件 + agent 目录链接”，并避免直接修改共享内容。硬链接也需要考虑修改会影响同一 inode 下所有使用者的问题。

## 9. Skill CLI 安装skill时，提示的 Security Risk Assessments 是什么？

CLI 展示多个服务各自的扫描结果，不是统一评分：

| 服务 | 示例结果 | 解读 |
| --- | --- | --- |
| Gen Agent Trust Hub | High Risk | 该服务认为存在高风险行为 |
| Socket | 0 alerts | 该服务没有报告告警 |
| Snyk | Low Risk | 该服务判定低风险 |

以 oil-ui 为例，2026-10-15 的 Gen 报告指出自动更新检查、外部网络连接、远程更新命令和截图工具执行系统命令等行为。它是风险评估，不等于确认恶意软件或数据窃取。Socket 和 Snyk 的 2026-10-11 页面显示通过。扫描方法、时间及对象版本可能不同，不能互相抵消，也不能保证与当前安装内容完全一致。

这些结果是建议性信息，不会代替对具体命令和脚本的判断。检查时应定位报告对应的 commit、具体脚本和实际执行条件。

## 参考资料

- [Agent Skills 规范](https://agentskills.io/specification)
- [Skills CLI 官方仓库与使用说明](https://github.com/vercel-labs/skills)
- [安装与符号链接实现](https://github.com/vercel-labs/skills/blob/main/src/installer.ts)
- [安装确认、覆盖提示和安全结果展示](https://github.com/vercel-labs/skills/blob/main/src/add.ts)
- [项目锁文件实现](https://github.com/vercel-labs/skills/blob/main/src/local-lock.ts)
- [更新实现](https://github.com/vercel-labs/skills/blob/main/src/update.ts)
- [npm 依赖同步实现（实验）](https://github.com/vercel-labs/skills/blob/main/src/sync.ts)
- [package.json skills 字段解析](https://github.com/vercel-labs/skills/blob/main/src/skills-field.ts)
- [oil-ui Gen 报告](https://www.skills.sh/oil-oil/oil-ui/oil-ui/security/agent-trust-hub)
- [oil-ui Socket 报告](https://www.skills.sh/oil-oil/oil-ui/oil-ui/security/socket)
- [oil-ui Snyk 报告](https://www.skills.sh/oil-oil/oil-ui/oil-ui/security/snyk)
