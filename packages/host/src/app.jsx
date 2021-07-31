import React, { useLayoutEffect, useRef, useState } from "react";
import * as GameOfLife from "GameOfLifeModule/GameOfLifeModule";
import { Universe as JsUniverse } from "./life_game";
import display from "./display";

const size = 200;
const jsCells = new JsUniverse(size);

let wasm = 0;
let js = 0;

const App = () => {
  const [cells, setCells] = useState(undefined);
  const board = useRef();
  const life = useRef();

  const animationId = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    GameOfLife.then(({ Universe }) => {
      if (!cells) {
        setCells(Universe.new(size));
      }
    });
  }, []);

  const loop = () => {
    let p1 = performance.now();
    jsCells.tick();
    let p2 = performance.now();
    cells.tick();
    let p3 = performance.now();
    js   += p2 - p1;
    wasm += p3 - p2;
    render();
    start();
  };

  const start = () => {
    setIsPlaying(true);
    animationId.current = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    window.cancelAnimationFrame(animationId.current);
    animationId.current = undefined;
    console.log("wasm [", wasm, "]ms, js [", js, "]ms");
    wasm = 0;
    js = 0;
  };

  const tick = () => {
    cells.tick();
    jsCells.tick();
    render();
  };

  const reset = () => {
    cells.reset();
    jsCells.reset();
    render();
  };

  const toggle = () => {
    animationId.current ? stop() : start();
  };

  const render = () => {
    board.current.textContent = display(cells.render(), size);
    life.current.textContent = display(jsCells.render(), size);
  };

  return (
    <main>
      <h1>Host App</h1>
      <button onClick={toggle}>{isPlaying ? "Stop 🛑" : "Play ▶️"}</button>
      <button onClick={tick}>Tick 🔂</button>
      <button onClick={reset}>Reset ♻️</button>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: 10 }}>
          <h2>wasm</h2>
          <div ref={board} />
        </div>
        <div style={{ flex: 1}}>
          <h2>js</h2>
          <div ref={life} />
        </div>
      </div>
    </main>
  );
};

export default App;
