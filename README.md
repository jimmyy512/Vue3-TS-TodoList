# Todo List(代辦清單) with Vue 3 + Typescript + Vite

## 線上Demo

[http://todolist.jimmyy512.com/#/todolist](http://todolist.jimmyy512.com/#/todolist)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

## 簡介

參考vue-vben-admin的架構  
嘗試自己也試著做出Todo List的功能  
未來會持續更新此專案做練習

## 主要套件

- Vue 3.5.22
- NodeJS 22.21.0
- SCSS
- UnoCSS
- TypeScript
- Vite
- Pinia
- Element-plus
- Axios
- Json-Server
- AutoImport
- VueUse

## 已實作功能

- Vue3 Setup 寫法
- Vue3 組件父子溝通寫法
- Vue3 v-model 寫法
- Proxy API ( 開發時, API 跨域問題)
- env 環境檔案變數 ( 並且能讓 TS 正確讀到型別 )
- 使用 Pinia 來代替 Vuex 的功能
- 打 API 能正確吃到 TS 型別
- 全局 loading 效果 ( 透過 Pinia 控制 )
- AutoImport 可以專注商業邏輯開發, 不用手動 import 常見的 Vue 函數

## Docker 開發 (推薦)

## 運行開發環境

```sh=
docker-compose up --build
```

### 開發利用 VsCode 打開 docker 容器

使用 Visual Studio Code 的 Remote - Containers 擴充這個擴充功能允許 VS Code 直接在 Docker 容器內運行，並存取容器內的檔案系統，包括 node_modules。所有的開發工具和外掛程式都將在容器環境中執行，可以避免因環境不同而導致的問題。

## 運行生產環境

```sh=
docker-compose -f docker-compose.prod.yml up -d --build
```

## 本機開發

## 第一次安裝

```sh=
npm i
```

## 運行開發

```sh=
npm run dev
```

## 運行打包

```sh=
npm run build
```
