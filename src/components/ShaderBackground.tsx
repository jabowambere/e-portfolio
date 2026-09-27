"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p += (u_mouse - 0.5) * 0.16;

  float t = u_time * 0.042;

  vec2 q = vec2(
    fbm(p * 1.55 + vec2(t, t * 0.35)),
    fbm(p * 1.55 + vec2(-t * 0.7, 4.13))
  );
  vec2 r = vec2(
    fbm(p * 2.35 + q * 1.85 + t * 0.33),
    fbm(p * 2.05 - q * 1.45 - t * 0.22)
  );
  float n = fbm(p * 1.9 + r * 2.15);
  float ribbon = smoothstep(0.28, 0.78, n);
  float glow = pow(max(n, 0.0), 2.4);

  vec3 deep = vec3(0.008, 0.01, 0.02);
  vec3 ink = vec3(0.035, 0.045, 0.09);
  vec3 indigo = vec3(0.18, 0.26, 0.72);
  vec3 violet = vec3(0.46, 0.16, 0.62);
  vec3 teal = vec3(0.08, 0.38, 0.46);
  vec3 mist = vec3(0.62, 0.7, 0.95);

  vec3 col = mix(deep, ink, fbm(p * 0.75 + t * 0.18));
  col = mix(col, indigo * 0.38, ribbon * 0.62);
  col = mix(col, violet * 0.42, pow(q.x, 2.15) * 0.5);
  col = mix(col, teal * 0.34, pow(q.y, 2.4) * 0.42);
  col += mist * glow * 0.09;

  float filaments = smoothstep(0.62, 0.92, fbm(p * 3.4 + r * 3.0 + t));
  col += indigo * filaments * 0.12;

  float stars = pow(hash(floor(gl_FragCoord.xy * 0.48)), 46.0);
  col += vec3(0.55, 0.68, 1.0) * stars * 0.42;

  float vig = smoothstep(1.28, 0.18, length((uv - 0.5) * vec2(1.18, 1.05)));
  col *= vig * 0.94;
  col += (hash(gl_FragCoord.xy + fract(u_time) * 37.0) - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vert || !frag || !program) return;

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMove = (event: PointerEvent) => {
      mouse.tx = event.clientX / window.innerWidth;
      mouse.ty = 1 - event.clientY / window.innerHeight;
    };

    let frame = 0;
    let start = performance.now();
    let paused = document.hidden;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (paused) return;
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      const time = reducedMotion ? 8.4 : (now - start) * 0.001;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (reducedMotion) {
        cancelAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    const onVis = () => {
      paused = document.hidden;
      if (!paused && !reducedMotion) start = performance.now() - (performance.now() - start);
    };
    document.addEventListener("visibilitychange", onVis);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <div className="shader-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
