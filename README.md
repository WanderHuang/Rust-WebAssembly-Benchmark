# wasm和原生js对比

新技术的出现是有一些道理的，`wasm`解决了预编译为字节码的问题。我们来看一下究竟它是快多少？

---

> `wasm`技术不仅可以使用在浏览器中作为`js`的模块引入，相反，`wasm`的设计是跨平台和跨应用的，它既可以作为任意语言的中间表示(`IR`)，也可以作为任意语言的安全沙盒或者容器。
> 这方便了在任意需要容器的场景，整合不同语言的功能，实现动态加载和卸载。

---

## 最新比较【所有图都可点击查看大图】

![性能BAR](https://user-images.githubusercontent.com/18475942/129734234-50fb9a60-fa6a-489c-b452-3960f2356d76.png)


### 生命游戏

`Rust`优化后速度奇快，我愿吹爆！！！

#### > 快得不是一点点🤏 <
![生命游戏性能对比](https://user-images.githubusercontent.com/18475942/129570314-8a36f09e-9976-49ee-9dfa-7e493e2809c7.png)

<img width="472" alt="截屏2021-08-11 下午11 27 41" src="https://user-images.githubusercontent.com/18475942/129058708-9b4696c7-100c-4ff6-88d3-1eb6c0e5d5f5.png">

文章地址: [这里](https://rustwasm.github.io/docs/book/game-of-life/time-profiling.html)

### dijkstra算法

目前还看不出有太大差别，继续优化相信有奇效

#### > 快了一丢丢🤏  (200节点)<
![最短路径算法](https://user-images.githubusercontent.com/18475942/129570688-bca8ffd0-5f49-46d1-a28a-54729d942ca0.png)

## 结果

`wasm` > `js`。在一些特定的计算场景，`wasm`可以把速度提升好几倍。

## 运行方式

需要安装`wasm-pack`环境。

`yarn & yarn build:wasm & yarn start`

```bash
yarn
yarn build:wasm
yarn start:wasm
yarn start
```

## 结构

```
===========host=================
========/======\================
===dijkstra========life-game====
====|================|==========
======== js & wasm =============
= module federation ==== rust ==
=====\=====================/====
===== webpack 5 =====wasm-pack==
```

## 测试进程

- 20211125 增加Rust后台服务使用wasm的示例，后续可以对比作为容器和沙盒环境使用的`wasm`模块

- 20210818 之前的测试有些对rust做了优化但没有对js做优化，今天对js也做了优化，现在的结果算是比较公平

- 20210816 自己会一些优化手段后，写出来的代码果然`wasm`更快，所以还是自己需要花时间去钻研啊！😊

- 20210811 发现了一册宝藏[开源书](https://rustwasm.github.io/docs/book/)。基于这篇文章优化后`Rust`非常快！！！！

- 20210803测试了引入`js-sys`后，使用`Date.now`来计算时间，这个也不理想。还不如不计算。另外就是`std::time::SystemTime`这个库好像不被支持，一使用就`unreachable`。然后在一个群里问了大家，也没有什么好的性能优化结果。暂时又搁浅吧。继续看有没有库能够超过`js`性能的
