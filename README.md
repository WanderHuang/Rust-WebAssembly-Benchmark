# wasm和原生js对比

基于此[仓库](https://github.com/module-federation/module-federation-examples)

## 最新比较

`Rust`优化后速度奇快，我愿吹爆！！！

<img width="472" alt="截屏2021-08-11 下午11 27 41" src="https://user-images.githubusercontent.com/18475942/129058708-9b4696c7-100c-4ff6-88d3-1eb6c0e5d5f5.png">


文章地址: [这里](https://rustwasm.github.io/book/game-of-life/time-profiling.html)

## <del>计算下一个tick的耗时</del>

<img width="1675" alt="截屏2021-07-31 下午4 38 33" src="https://user-images.githubusercontent.com/18475942/127734312-988c9a50-7ef9-446f-970c-89d6c7156f78.png">

## <del>结果</del>

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

- 20210811 发现了一册宝藏[开源书](https://rustwasm.github.io/book/introduction.html)。基于这篇文章优化后`Rust`非常快！！！！

- 20210803测试了引入`js-sys`后，使用`Date.now`来计算时间，这个也不理想。还不如不计算。另外就是`std::time::SystemTime`这个库好像不被支持，一使用就`unreachable`。然后在一个群里问了大家，也没有什么好的性能优化结果。暂时又搁浅吧。继续看有没有库能够超过`js`性能的
