# wasm和原生js对比

基于此[仓库](https://github.com/module-federation/module-federation-examples)

## 计算下一个tick的耗时

<img width="1675" alt="截屏2021-07-31 下午4 38 33" src="https://user-images.githubusercontent.com/18475942/127734312-988c9a50-7ef9-446f-970c-89d6c7156f78.png">

## 结果

`JavaScript` > `Wasm-Pack`

原生`js`运行速度大概是`wasm`模块的1.3倍(时间约少`30%`)

**深层次原因**: V8会对循环做优化(`ignition -> turbo fan`)，所以要比较一些不能被`turbo fan`优化的代码结构，可能更准。

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

## 测试进程

- 20210803测试了引入`js-sys`后，使用`Date.now`来计算时间，这个也不理想。还不如不计算。另外就是`std::time::SystemTime`这个库好像不被支持，一使用就`unreachable`。然后在一个群里问了大家，也没有什么好的性能优化结果。暂时又搁浅吧。继续看有没有库能够超过`js`性能的