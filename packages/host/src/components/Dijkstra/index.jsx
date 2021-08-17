import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Row, Input, message, Select } from 'antd';
import * as wasm from 'Dijkstra/wasm';
import {
  generatGraph,
  JsDijkstra
} from './dijkstra';
import './index.less';

let bgColor = 'lightblue';

function Dijkstra() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(200);
  const [type, setType] = useState(1);
  const wasmRef = useRef();
  const jsRef = useRef(JsDijkstra);
  const wasmCanvasRef = useRef();
  const jsCanvasRef = useRef();

  // record
  const perfRef = useRef({});
  const [perf, setPerf] = useState({});

  useLayoutEffect(() => {
    wasm.then((algo) => {
      // find_shortest_path_simple
      wasmRef.current = algo;
    });
  }, []);

  const start = () => {
    setLoading(true);
    let graph = generatGraph(size);
    if (type === 1) {
      runStep(graph);
    } else {
      runCombine(graph);
    }
  };

  const reset = () => {
    setPerf({});
    renderGraph(wasmCanvasRef.current.getContext('2d'), {}, size); 
    renderGraph(jsCanvasRef.current.getContext('2d'), {}, size); 
  };

  function runStep(graph) {
    // let wasmSolutions = {
    //   0: [[], 0],
    // };
    // let jsSolutions = {
    //   0: [[], 0],
    // };

    perfRef.current = {
      wasm: 0,
      js: 0,
    };
    let wasmDesk = wasmRef.current.Desk.new(graph, 0);
    let jsDesk = jsRef.current.create(graph, 0);

    function runWasm() {
      return new Promise((resolve) => {
        exec();
        function exec() {
          setTimeout(() => {
            let start = performance.now();
            let finish = wasmDesk.tick();
            perfRef.current.wasm += performance.now() - start;
            renderGraph(
              wasmCanvasRef.current.getContext('2d'),
              wasmDesk.get_result(),
              size
            );
            if (!finish) {
              exec();
            } else {
              resolve(wasmDesk.get_result());
            }
          }, 0);
        }
      });
    }

    function runJs() {
      return new Promise((resolve) => {
        exec();
        function exec() {
          setTimeout(() => {
            let start = performance.now();
            let finish = jsDesk.tick()
            perfRef.current.js += performance.now() - start;
            renderGraph(
              jsCanvasRef.current.getContext('2d'),
              jsDesk.getResult(),
              size
            );
            if (!finish) {
              exec();
            } else {
              resolve(jsDesk.getResult());
            }
          }, 0);
        }
      });
    }

    Promise.all([runWasm(), runJs()])
      .then((res) => {
        setLoading(false);
        console.log('wasm', res[0]);
        console.log('js', res[1]);
      })
      .catch((err) => {
        message.error('计算出错');
        console.error(err);
      });
  }
  function runCombine(graph) {
    setLoading(true);
    perfRef.current = {
      wasm: 0,
      js: 0,
    };

    function runWasm() {
      let start = performance.now();
      let wasmDesk = wasmRef.current.Desk.new(graph, 0);
      let res = wasmDesk.get_all();
      perfRef.current.wasm += performance.now() - start;
      renderGraph(wasmCanvasRef.current.getContext('2d'), res, size);
      console.log('wasm', res);
    }

    function runJs() {
      let start = performance.now();
      let jsDesk = jsRef.current.create(graph, 0);
      let res = jsDesk.getAll();
      perfRef.current.js += performance.now() - start;
      renderGraph(jsCanvasRef.current.getContext('2d'), res, size);
      console.log('js', res);
    }

    setTimeout(() => {
      runWasm();
      runJs();
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setPerf(perfRef.current);
  }, [loading]);

  return (
    <section>
      <Row>
        <Input
          type="number"
          value={size}
          min={100}
          max={4000}
          placeholder="Enter node counts here.."
          style={{ width: 200 }}
          disabled={loading}
          onChange={(e) => {
            let val = Number(e.currentTarget.value);
            if (isNaN(val)) {
              message.warn('请输入数字');
              return;
            }

            setSize(val);
          }}
        />
        <Select value={type} onChange={(e) => setType(e)} disabled={loading}>
          <Select.Option value={1}>单步执行</Select.Option>
          <Select.Option value={2}>合并执行</Select.Option>
        </Select>
        <Button type="primary" disabled={loading} onClick={start}>
          {loading ? 'Stop 🛑' : 'Play ▶️'}
        </Button>
        <Button type="primary" disabled={loading} onClick={reset}>
          Reset ♻️
        </Button>
        <Button disabled={true}>wasm {perf?.wasm || 0} ms</Button>
        <Button disabled={true}>js {perf?.js || 0} ms</Button>
      </Row>
      <div className="dijkstra-board">
        <canvas
          ref={wasmCanvasRef}
          width="800"
          height="800"
          style={{ background: bgColor }}
        ></canvas>
        <canvas
          ref={jsCanvasRef}
          width="800"
          height="800"
          style={{ background: bgColor }}
        ></canvas>
      </div>
    </section>
  );
}

export default Dijkstra;

function renderGraph(ctx, solutions, size) {
  // {node: [[node], dist]}

  let boxSize = 800;
  let ratio = boxSize / size;
  ctx.clearRect(0, 0, boxSize, boxSize);

  ctx.fillStyle = 'lightcoral';
  const base = '#ff0000';
  const arr = ['2f', '4f', '6f', '8f', 'af', 'cf', 'ff', 'ff', 'ff', 'ff'];
  Object.entries(solutions).forEach(([x, [yList, dist]]) => {
    let len = yList.length;
    let cIndex = 7 - len < 0 ? 0 : 7 - len;
    yList.forEach((y, index) => {
      ctx.fillStyle = index === len - 1 ? 'green' : base + arr[cIndex];
      cIndex++;
      ctx.fillRect(Number(x) * ratio, Number(y) * ratio, ratio, ratio);
    });
  });
}
