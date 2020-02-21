# D2Admin CMS GO

基于 [D2Admin v1.7.2](https://github.com/d2-projects/d2-admin) 开发的 golang cms 管理后台，您可以将此看做目前基于 D2Admin 实现 **动态菜单**、**动态路由**、**权限控制**、**多环境切换**、**数据表格和表单设计** 的最佳实践。

请配合服务端 [xiya-team/go-cms](https://github.com/xiya-team/go-cms) 使用。

> 只包含系统设置功能，未实现 cms 常见的内容管理，因对应的服务端仓库为 `xiya-team/go-cms` 遂本仓库取名 `d2-admin-xiya-go-cms`

> 已经追加升级了一些 [D2Admin v1.8.0](https://github.com/d2-projects/d2-admin/releases/tag/1.8.0) 的新特性，例如优化生产环境的构建，可以达到 2s 以内的首屏加载速度；多标签页拖拽排序等功能。

## 账号

您可以使用下面的账号登录：

用户名 `admin` 密码 `admin@xiya.vip`

## 预览

| 位置 | 链接 | 部署位置 | 状态 |
| --- | --- | --- | --- |
| d2.pub | [d2.pub/d2-admin-xiya-go-cms/preview](https://d2.pub/d2-admin-xiya-go-cms/preview) | 中国服务器 | [![](https://github.com/d2-projects/d2-admin-xiya-go-cms/workflows/Deploy%20https%3A%2F%2Fd2.pub/badge.svg)](https://github.com/d2-projects/d2-admin-xiya-go-cms/actions?query=workflow%3A%22Deploy+https%3A%2F%2Fd2.pub%22) |
| cdn.d2.pub | [cdn.d2.pub/d2-admin-xiya-go-cms/preview](https://cdn.d2.pub/d2-admin-xiya-go-cms/preview) | 七牛云 CDN | [![](https://github.com/d2-projects/d2-admin-xiya-go-cms/workflows/Deploy%20https%3A%2F%2Fcdn.d2.pub/badge.svg)](https://github.com/d2-projects/d2-admin-xiya-go-cms/actions?query=workflow%3A%22Deploy+https%3A%2F%2Fcdn.d2.pub%22) |
| github | [d2-projects.github.io/d2-admin-xiya-go-cms](https://d2-projects.github.io/d2-admin-xiya-go-cms) | GitHub pages | [![](https://github.com/d2-projects/d2-admin-xiya-go-cms/workflows/Deploy%20Github/badge.svg)](https://github.com/d2-projects/d2-admin-xiya-go-cms/actions?query=workflow%3A%22Deploy+Github%22) |
| netlify | [d2-admin-xiya-go-cms.netlify.com](https://d2-admin-xiya-go-cms.netlify.com) | Netlify CDN | [![Netlify Status](https://api.netlify.com/api/v1/badges/8fea8718-2196-45de-bbb8-436c3f4da408/deploy-status)](https://app.netlify.com/sites/d2-admin-xiya-go-cms/deploys) |

## 其它同步仓库

| 位置 | 链接 |
| --- | --- |
| 码云 | [https://gitee.com/fairyever/d2-admin-xiya-go-cms](https://gitee.com/fairyever/d2-admin-xiya-go-cms) |

## 屏幕截图

> 如果 GitHub 仓库中图片加载缓慢，可移步 [码云同步仓库](https://gitee.com/fairyever/d2-admin-xiya-go-cms) 查看

登录

![](https://cdn.d2.pub/files/image-hosting/20200213103203.png)

图片验证码

![](https://cdn.d2.pub/files/image-hosting/20200213103225.png)

首页 - 权限指令使用示例

![](https://cdn.d2.pub/files/image-hosting/20200213103241.png)

用户管理

![](https://cdn.d2.pub/files/image-hosting/20200213103304.png)

用户管理编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103315.png)

表格列自定义

![](https://cdn.d2.pub/files/image-hosting/20200213103325.png)

角色管理

![](https://cdn.d2.pub/files/image-hosting/20200213103338.png)

角色管理编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103346.png)

角色管理编辑数据权限

![](https://cdn.d2.pub/files/image-hosting/20200213103436.png)

菜单管理

![](https://cdn.d2.pub/files/image-hosting/20200213103509.png)

菜单管理编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103525.png)

部门管理

![](https://cdn.d2.pub/files/image-hosting/20200213103542.png)

部门管理编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103556.png)

岗位管理

![](https://cdn.d2.pub/files/image-hosting/20200213103607.png)

岗位新建

![](https://cdn.d2.pub/files/image-hosting/20200213103616.png)

字典管理

![](https://cdn.d2.pub/files/image-hosting/20200213103626.png)

字典编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103635.png)

字典项目编辑

![](https://cdn.d2.pub/files/image-hosting/20200213103710.png)

参数管理

![](https://cdn.d2.pub/files/image-hosting/20200213103723.png)

参数设置

![](https://cdn.d2.pub/files/image-hosting/20200213103732.png)
