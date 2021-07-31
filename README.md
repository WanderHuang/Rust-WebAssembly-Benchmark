# wasm和原生js对比

基于此[仓库](https://github.com/module-federation/module-federation-examples)

## 计算下一个tick的耗时

<img width="1675" alt="截屏2021-07-31 下午4 38 33" src="https://user-images.githubusercontent.com/18475942/127734312-988c9a50-7ef9-446f-970c-89d6c7156f78.png">

## 结果

`JavaScript` > `Wasm-Pack`

原生`js`运行速度大概是`wasm`模块的1.3倍(时间约少`30%`)

## 运行方式

`yarn & yarn start`

## 结构

```
===========App==================
========/======\================
===wasm========life_game.js=====
====|================|==========
=remote============local========
==\==================\==========
=module federation====pure js===
======/=========================
==rust==========================
=====\==========================
====wasm-pack===================
```
