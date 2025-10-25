// const sum = require("./module/sum.js");
import AOS from "aos";
import * as bootstrap from "bootstrap";

window.bootstrap = bootstrap;
document.addEventListener('DOMContentLoaded', () => {
    console.log("using wow1");
    new AOS.init({
        duration: 2000,
        once: true
    });
    console.log("using wow2");


    const wrap = document.querySelector('.section-header-bg');
    if (!wrap) return;

    const shapes = Array.from(wrap.querySelectorAll('.section-bg__shape'))
        .map(el => ({ el, d: parseFloat(el.dataset.depth || '0.1'), x: 0, y: 0, tx: 0, ty: 0 }));

    // центральная нормализация координат
    const state = { mx: 0, my: 0, t: 0, auto: false };

    const onMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        state.mx = (e.clientX - cx) / rect.width;   // ~[-0.5..0.5]
        state.my = (e.clientY - cy) / rect.height;
        state.auto = false;
        // console.log("state:", state.auto);
        // console.log("shapes: ", shapes)

    };

    // если нет мыши (мобилки) — лёгкое автоколыхание
    const autoTick = (t) => {
        const k = 0.5;
        state.mx = Math.sin(t * 0.0006) * 0.18 * k;
        state.my = Math.cos(t * 0.0004) * 0.18 * k;
        console.log("auto:", state);
    };

    const lerp = (a, b, s) => a + (b - a) * s;

    const render = (t) => {
        state.t = t;
        if (state.auto) autoTick(t);

        const baseShift = Math.min(wrap.clientWidth, 1600) * 0.7; // масштаб смещения от ширины
        shapes.forEach(obj => {
            const targetX = state.mx * baseShift * obj.d;
            const targetY = state.my * baseShift * obj.d;
            obj.tx = lerp(obj.tx, targetX, 0.08);
            obj.ty = lerp(obj.ty, targetY, 0.08);
            obj.el.style.transform = `translate3d(${obj.tx}px, ${obj.ty}px, 0)`;
        });

        requestAnimationFrame(render);
    };

    // расстановка «авто» режима на старте (например, на мобильных)
    state.auto = true;

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });

    requestAnimationFrame(render);
});


