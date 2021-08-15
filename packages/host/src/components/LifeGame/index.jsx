import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as GameOfLife from 'GameOfLifeModule/wasm';
import { Universe as JsUniverse } from './life_game';
import { Input, Row, Button, Col, message } from 'antd';
import './index.less';

let wasm = 0;
let js = 0;

let bgColor = '#97eaa5';
let lifeColor = 'lightcoral';

const LifeGame = () => {
  // 生命游戏面板
  const [cells, setCells] = useState(undefined);
  const [jsCells, setJsCells] = useState(undefined);
  const [size, setSize] = useState(200);
  const universeRef = useRef();
  // canvas绘制
  const jsRef = useRef();
  const wasmRef = useRef();

  const animationId = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    GameOfLife.then(({ Universe }) => {
      if (!cells) {
        setCells(Universe.new(size));
        universeRef.current = Universe;
      }
    });
  }, []);

  useEffect(() => {
    if (size) {
      setJsCells(new JsUniverse(size));
      if (universeRef.current) {
        setCells(universeRef.current.new(size));
      }
    }
  }, [size]);

  /** 循环 */
  const loop = () => {
    let p1 = performance.now();
    jsCells.tick();
    let p2 = performance.now();
    cells.tick();
    let p3 = performance.now();
    js += p2 - p1;
    wasm += p3 - p2;
    render();
    start();
  };

  /** 开始 */
  const start = () => {
    setIsPlaying(true);
    animationId.current = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    window.cancelAnimationFrame(animationId.current);
    animationId.current = undefined;
    console.log('wasm [', wasm, ']ms, js [', js, ']ms');
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
    render2Canvas(wasmRef.current.getContext('2d'), cells.render(), size);
    render2Canvas(jsRef.current.getContext('2d'), jsCells.render(), size);
  };

  return (
    <section>
      <Row gutter={[16, 16]}>
        <Col>
          <Input
            value={size}
            type="number"
            min={100}
            max={600}
            disabled={isPlaying}
            onChange={(e) => {
              let val = e.currentTarget.value;
              if (isNaN(Number(val))) {
                message.warn('请输入数字');
                return;
              }

              setSize(Number(val));
            }}
            placeholder="Enter box size here"
            style={{ width: 200 }}
          />
        </Col>
        <Col>
          <Button onClick={toggle} type="primary">
            {' '}
            {isPlaying ? 'Stop 🛑' : 'Play ▶️'}
          </Button>
        </Col>

        <Col>
          <Button onClick={tick} type="primary" disabled={isPlaying}>
            Tick 🔂
          </Button>
        </Col>
        <Col>
          <Button onClick={reset} type="primary" disabled={isPlaying}>
            Reset ♻️
          </Button>
        </Col>
      </Row>
      <div className="life-game__board">
        <canvas
          ref={wasmRef}
          width="800"
          height="800"
          style={{ background: bgColor }}
        ></canvas>
        <canvas
          ref={jsRef}
          width="800"
          height="800"
          style={{ background: bgColor }}
        ></canvas>
      </div>
    </section>
  );
};

export default LifeGame;

function render2Canvas(ctx, cells, size) {
  let boxSize = 800;
  ctx.clearRect(0, 0, boxSize, boxSize);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, boxSize, boxSize);

  let ratio = boxSize / size;

  ctx.fillStyle = lifeColor;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let idx = i * size + j;
      let isAlive = cells[idx] === 1;

      if (isAlive) {
        let x = ratio * j;
        let y = ratio * i;
        
        ctx.fillRect(x, y, ratio, ratio);
      }
    }
  }
}
