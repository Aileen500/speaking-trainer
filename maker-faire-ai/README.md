# Maker Faire 口语特训营 · AI 版 部署说明（2026-11 更新）

## 文件结构
maker-faire-ai/
├── index.html      ← 学生端网页（手机/平板/电脑浏览器）
└── api/
    └── chat.js     ← 服务器代理（调用 Kimi API，Key 不暴露给学生）

## 第一步：拿 Kimi API Key（约 5 分钟）

1. 打开 Kimi 开放平台（新地址）：https://platform.kimi.com
   （旧地址 platform.moonshot.cn 会自动跳转过来）
2. 用手机号注册并登录
3. 完成实名认证（个人即可）——新用户认证后有 15 元代金券
4. 左侧菜单找到「API Keys」（或直接访问 platform.kimi.com/console/api-keys）
5. 点「新建 API Key」，起个名字（如 speaking-trainer），创建后**立刻复制保存**
   （Key 只完整显示这一次，格式是 sk- 开头的一串）

## 第二步：充值（可不充先用代金券）

- 「充值」页面微信/支付宝扫码即可，最低 10 元
- 本场景用量极小：一次对话约消耗几千 token，折算下来一毛钱都不到
  15 元代金券够几百个学生把 Boss 关玩很多遍，可以先不充值

## 第三步：部署到 Vercel（约 5 分钟）

1. 注册 GitHub：https://github.com （有账号可跳过）
2. 新建仓库 → 把 maker-faire-ai 文件夹里的 index.html 和 api/chat.js
   按同样目录结构上传（New repository → Add file → Create new file，
   文件名填 index.html，api/chat.js 需要先输入 api/ 让它建文件夹）
3. 注册 Vercel：https://vercel.com → 用 GitHub 登录
4. Vercel 首页 → Add New → Project → 找到刚才的仓库 → Import → Deploy
5. 部署完成后：Project → Settings → Environment Variables → 添加：
   - Name: MOONSHOT_API_KEY
   - Value: 第一步复制的 sk- 开头的 Key
6. 点 Redeploy（Deployments → 最新一条 → ⋯ → Redeploy）
7. 完成后会得到 https://你的项目名.vercel.app，手机/平板 Chrome 打开即可
   （Deployments → 项目旁边的二维码图标可以直接生成二维码）

## 注意事项
- 语音功能必须 HTTPS（Vercel 默认就是）+ Chrome/Edge 浏览器 + 允许麦克风
- iPhone/iPad 请用 Chrome 打开（Safari 语音识别不稳定）
- 代码用的是现行模型 kimi-k2.6（K2 旧型号已陆续下线，不要用网上旧教程的模型名）
- Boss 关若 API 没配好，会自动降级为规则式对话，不影响使用
