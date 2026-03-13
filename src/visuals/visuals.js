// ============================================================
// VISUALS.JS — Interactive canvas visuals with labeled axes
//              and manual number inputs for all parameters
// ============================================================

const Visuals = (() => {

  // ── shared: draw labeled Cartesian axes ───────────────────
  function drawAxes(ctx, ox, oy, W, H, scale) {
    // grid
    ctx.strokeStyle = '#1a1d27'; ctx.lineWidth = 1;
    for (let sx = ox % scale; sx <= W; sx += scale) {
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
    }
    for (let sy = oy % scale; sy <= H; sy += scale) {
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
    }
    // axes
    ctx.strokeStyle = '#3a4070'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W - 14, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, H); ctx.lineTo(ox, 14); ctx.stroke();
    // arrowheads
    ctx.fillStyle = '#3a4070';
    ctx.beginPath(); ctx.moveTo(W - 4, oy); ctx.lineTo(W - 14, oy - 5); ctx.lineTo(W - 14, oy + 5); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox, 4); ctx.lineTo(ox - 5, 14); ctx.lineTo(ox + 5, 14); ctx.closePath(); ctx.fill();
    // ticks & labels
    ctx.font = '10px Inter, system-ui'; ctx.fillStyle = '#4a5080';
    const xMin = Math.ceil(-ox / scale), xMax = Math.floor((W - ox) / scale);
    ctx.textAlign = 'center';
    for (let i = xMin; i <= xMax; i++) {
      if (i === 0) continue;
      const sx = ox + i * scale;
      ctx.strokeStyle = '#2e3250'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(sx, oy - 4); ctx.lineTo(sx, oy + 4); ctx.stroke();
      ctx.fillStyle = '#4a5080'; ctx.fillText(i, sx, oy + 15);
    }
    const yMin = Math.ceil(-(H - oy) / scale), yMax = Math.floor(oy / scale);
    ctx.textAlign = 'right';
    for (let i = yMin; i <= yMax; i++) {
      if (i === 0) continue;
      const sy = oy - i * scale;
      ctx.strokeStyle = '#2e3250'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ox - 4, sy); ctx.lineTo(ox + 4, sy); ctx.stroke();
      ctx.fillStyle = '#4a5080'; ctx.fillText(i, ox - 7, sy + 4);
    }
    ctx.fillStyle = '#4a5080'; ctx.textAlign = 'right'; ctx.fillText('0', ox - 6, oy + 15);
    ctx.font = 'bold 13px Inter, system-ui'; ctx.fillStyle = '#5b7cfa';
    ctx.textAlign = 'left'; ctx.fillText('x', W - 8, oy - 8);
    ctx.textAlign = 'center'; ctx.fillText('y', ox + 10, 12);
  }

  // ── shared: canvas factory ─────────────────────────────────
  function makeCanvas(container, w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h; canvas.style.width = '100%';
    container.appendChild(canvas);
    return canvas;
  }

  // ── shared: number input HTML ──────────────────────────────
  function numInput(id, label, value, min, max, step, color) {
    return `<label style="display:flex;align-items:center;gap:3px;font-size:0.78rem;color:${color || '#7c85a8'}">
      ${label}
      <input id="${id}" type="number" value="${value}" min="${min}" max="${max}" step="${step || 1}"
        style="width:54px;height:26px;text-align:center;background:#1a1d27;border:1px solid #2e3250;border-radius:5px;color:#e2e8f0;font-size:13px;font-family:monospace;padding:0 4px">
    </label>`;
  }

  // ── shared: matrix input HTML (n×n grid of number inputs) ──
  function matrixInputs(id, n, values, label, color) {
    const cells = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      cells.push(`<input data-r="${r}" data-c="${c}" type="number" value="${values[r][c]}" step="1"
        style="width:46px;height:38px;text-align:center;background:#1a1d27;border:1px solid #2e3250;border-radius:5px;color:#e2e8f0;font-size:14px;font-family:monospace;padding:0">`);
    }
    return `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">
      <span style="font-size:0.78rem;font-weight:700;color:${color}">${label}</span>
      <div id="${id}" style="display:grid;grid-template-columns:repeat(${n},1fr);gap:3px;background:#22253a;padding:8px;border-radius:8px;border:2px solid ${color}40">
        ${cells.join('')}
      </div>
    </div>`;
  }

  // ── Ch 1-2: Matrix Grid ────────────────────────────────────
  function matrixGrid(container) {
    container.innerHTML = '';
    const W = 680, H = 220;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let mode = 'add';
    let step = 0;
    let A = [[1,2,3],[4,5,6],[7,8,9]];
    let B = [[9,8,7],[6,5,4],[3,2,1]];

    function cellColor(a) { return `rgba(91,124,250,${a})`; }
    function cellColorG(a) { return `rgba(52,211,153,${a})`; }

    function drawMat(mat, ox, oy, label, hlRow, hlCol, ac) {
      const cs = 52, gap = 3, pad = 6;
      const n = mat.length, m = mat[0].length;
      const w = m*(cs+gap)-gap+pad*2, h = n*(cs+gap)-gap+pad*2;
      ctx.strokeStyle = '#4a5080'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ox+6,oy); ctx.lineTo(ox,oy); ctx.lineTo(ox,oy+h); ctx.lineTo(ox+6,oy+h);
      ctx.moveTo(ox+w-6,oy); ctx.lineTo(ox+w,oy); ctx.lineTo(ox+w,oy+h); ctx.lineTo(ox+w-6,oy+h);
      ctx.stroke();
      ctx.fillStyle = '#7c85a8'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, ox+w/2, oy-8);
      for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) {
        const x = ox+pad+c*(cs+gap), y = oy+pad+r*(cs+gap);
        const hl = (r===hlRow || c===hlCol);
        ctx.fillStyle = hl ? ac(0.22) : 'rgba(34,37,58,0.9)';
        ctx.beginPath(); ctx.roundRect(x,y,cs,cs,5); ctx.fill();
        if (hl) { ctx.strokeStyle = ac(0.7); ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.fillStyle = hl ? '#e2e8f0' : '#7c85a8';
        ctx.font = `${hl?'bold ':''}14px monospace`; ctx.textAlign = 'center';
        ctx.fillText(mat[r][c], x+cs/2, y+cs/2+5);
      }
      return w;
    }

    function computeSum(a,b) { return a.map((row,i)=>row.map((v,j)=>v+b[i][j])); }
    function computeProduct(a,b) {
      const n=a.length,m=b[0].length,k=b.length;
      const res=Array.from({length:n},()=>Array(m).fill(0));
      for(let i=0;i<n;i++) for(let j=0;j<m;j++) for(let l=0;l<k;l++) res[i][j]+=a[i][l]*b[l][j];
      return res;
    }

    function draw() {
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = '#0f1117'; ctx.fillRect(0,0,W,H);
      const C = mode==='add' ? computeSum(A,B) : computeProduct(A,B);
      const hr = mode==='multiply' ? Math.floor(step/3) : -1;
      const hc = mode==='multiply' ? step%3 : -1;
      const wA = drawMat(A, 10, 30, 'A', hr, -1, cellColor);
      ctx.fillStyle='#7c85a8'; ctx.font='bold 26px Inter'; ctx.textAlign='center';
      ctx.fillText(mode==='add'?'+':'×', 10+wA+20, 30+85);
      const wB = drawMat(B, 10+wA+48, 30, 'B', -1, hc, cellColorG);
      ctx.fillText('=', 10+wA+48+wB+18, 30+85);
      drawMat(C, 10+wA+48+wB+40, 30, 'C', -1, -1, cellColor);
      if (mode==='multiply') {
        ctx.fillStyle='#7c85a8'; ctx.font='12px Inter'; ctx.textAlign='left';
        ctx.fillText(`Row ${hr+1} × Col ${hc+1} → C[${hr+1}][${hc+1}] = ${C[hr][hc]}`, 10, H-8);
      }
    }

    draw();

    // input grids
    const inputArea = document.createElement('div');
    inputArea.style.cssText = 'display:flex;gap:16px;align-items:center;justify-content:center;padding:12px 0;flex-wrap:wrap;border-top:1px solid #2e3250';
    inputArea.innerHTML = matrixInputs('mat-a', 3, A, 'Matrix A', '#5b7cfa')
      + `<span style="font-size:1.6rem;color:#4a5080;align-self:center" id="op-sym">+</span>`
      + matrixInputs('mat-b', 3, B, 'Matrix B', '#34d399');
    container.appendChild(inputArea);

    function readMatrix(gridId, mat) {
      inputArea.querySelectorAll(`#${gridId} input`).forEach(inp => {
        mat[+inp.dataset.r][+inp.dataset.c] = +inp.value || 0;
      });
    }
    inputArea.querySelectorAll('#mat-a input').forEach(inp => inp.addEventListener('input', () => { readMatrix('mat-a',A); draw(); }));
    inputArea.querySelectorAll('#mat-b input').forEach(inp => inp.addEventListener('input', () => { readMatrix('mat-b',B); draw(); }));

    const ctrl = document.createElement('div');
    ctrl.className = 'visual-controls';
    ctrl.innerHTML = `<button class="btn-vis active" data-m="add">Addition</button>
      <button class="btn-vis" data-m="multiply">Multiplication</button>
      <button class="btn-vis" id="step-btn" style="margin-left:auto">Next Step →</button>`;
    container.appendChild(ctrl);
    ctrl.querySelectorAll('[data-m]').forEach(btn => btn.addEventListener('click', () => {
      mode = btn.dataset.m; step = 0;
      ctrl.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('active',b===btn));
      inputArea.querySelector('#op-sym').textContent = mode==='add'?'+':'×';
      draw();
    }));
    ctrl.querySelector('#step-btn').addEventListener('click', () => { if(mode==='multiply'){step=(step+1)%9;draw();} });
  }

  // ── Ch 3-5: Gaussian Elimination ──────────────────────────
  function gaussianElim(container) {
    container.innerHTML = '';
    const W = 680, H = 260;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    // system: a1x+b1y+c1z=d1, a2x+...
    let sys = [[2,1,-1,8],[-3,-1,2,-11],[-2,1,2,-3]];
    let idx = 0;

    function buildSteps(s) {
      const m = s.map(r=>[...r]);
      const steps = [{ matrix: m.map(r=>[...r]), label:'Original augmented matrix', pivot:[0,0] }];
      // elim col 0
      const f1 = m[1][0]/m[0][0];
      for(let c=0;c<4;c++) m[1][c]-=f1*m[0][c];
      const f2 = m[2][0]/m[0][0];
      for(let c=0;c<4;c++) m[2][c]-=f2*m[0][c];
      steps.push({ matrix: m.map(r=>[...r]), label:`R2 ← R2 − (${f1.toFixed(2)})R1,  R3 ← R3 − (${f2.toFixed(2)})R1`, pivot:[1,1] });
      // elim col 1
      if(Math.abs(m[1][1])<1e-10) { const tmp=m[1]; m[1]=m[2]; m[2]=tmp; }
      const f3 = m[2][1]/m[1][1];
      for(let c=0;c<4;c++) m[2][c]-=f3*m[1][c];
      steps.push({ matrix: m.map(r=>[...r]), label:`R3 ← R3 − (${f3.toFixed(2)})R2`, pivot:[2,2] });
      steps.push({ matrix: m.map(r=>[...r]), label:'Row echelon form ✓', pivot:[-1,-1] });
      return steps;
    }

    let steps = buildSteps(sys);

    function fmt(v) { if(Math.abs(v)<1e-9) return '0'; if(Number.isInteger(v)) return String(v); return v.toFixed(2); }

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      const s = steps[idx], mat = s.matrix;
      const cols = mat[0].length, rows = mat.length;
      const cw = 90, ch = 56, ox = 70, oy = 55;
      ctx.fillStyle='#7c85a8'; ctx.font='13px Inter'; ctx.textAlign='left';
      ctx.fillText(`Step ${idx+1}/${steps.length}: ${s.label}`, 16, 28);
      // row labels
      for(let r=0;r<rows;r++) {
        ctx.fillStyle='#4a5080'; ctx.font='bold 12px Inter'; ctx.textAlign='right';
        ctx.fillText(`R${r+1}`, ox-14, oy+r*ch+ch/2+5);
      }
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) {
        const x=ox+c*cw, y=oy+r*ch;
        const isPivot = (r===s.pivot[0] && c===s.pivot[1]);
        const isAug = c===cols-1;
        ctx.fillStyle = isPivot?'rgba(91,124,250,0.25)':isAug?'rgba(167,139,250,0.06)':'rgba(34,37,58,0.7)';
        ctx.beginPath(); ctx.roundRect(x+2,y+2,cw-4,ch-4,6); ctx.fill();
        if(isPivot){ctx.strokeStyle='rgba(91,124,250,0.6)';ctx.lineWidth=1.5;ctx.stroke();}
        ctx.fillStyle = isPivot?'#5b7cfa':isAug?'#a78bfa':'#e2e8f0';
        ctx.font = isPivot?'bold 15px monospace':'14px monospace'; ctx.textAlign='center';
        ctx.fillText(fmt(mat[r][c]), x+cw/2, y+ch/2+5);
      }
      // augment separator
      ctx.strokeStyle='#4a5080'; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
      ctx.beginPath(); ctx.moveTo(ox+(cols-1)*cw-6, oy-8); ctx.lineTo(ox+(cols-1)*cw-6, oy+rows*ch+4); ctx.stroke();
      ctx.setLineDash([]);
      // brackets
      ctx.strokeStyle='#4a5080'; ctx.lineWidth=2;
      const bx=ox-14,by=oy-4,bw=cols*cw+10,bh=rows*ch+8;
      ctx.beginPath();
      ctx.moveTo(bx+8,by); ctx.lineTo(bx,by); ctx.lineTo(bx,by+bh); ctx.lineTo(bx+8,by+bh);
      ctx.moveTo(bx+bw-8,by); ctx.lineTo(bx+bw,by); ctx.lineTo(bx+bw,by+bh); ctx.lineTo(bx+bw-8,by+bh);
      ctx.stroke();
      // progress dots
      for(let i=0;i<steps.length;i++) {
        ctx.beginPath(); ctx.arc(W-70+i*16, H-18, 5, 0, Math.PI*2);
        ctx.fillStyle = i===idx?'#5b7cfa':'#2e3250'; ctx.fill();
      }
    }

    draw();

    // input for the system
    const inputArea = document.createElement('div');
    inputArea.style.cssText = 'padding:10px 14px;border-top:1px solid #2e3250;background:#16192a';
    inputArea.innerHTML = `<div style="font-size:0.72rem;color:#4a5080;margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em">Edit the system (ax + by + cz = d)</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[0,1,2].map(r=>`<div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:0.75rem;color:#4a5080;min-width:18px">R${r+1}</span>
          ${numInput(`s${r}0`,'a',sys[r][0],-20,20,1,'#5b7cfa')}
          ${numInput(`s${r}1`,'b',sys[r][1],-20,20,1,'#5b7cfa')}
          ${numInput(`s${r}2`,'c',sys[r][2],-20,20,1,'#5b7cfa')}
          <span style="color:#4a5080">=</span>
          ${numInput(`s${r}3`,'d',sys[r][3],-30,30,1,'#a78bfa')}
        </div>`).join('')}
      </div>`;
    container.appendChild(inputArea);

    function resync() {
      for(let r=0;r<3;r++) for(let c=0;c<4;c++) {
        const v = +(inputArea.querySelector(`#s${r}${c}`)?.value||0);
        sys[r][c]=v;
      }
      idx=0; steps=buildSteps(sys); draw();
    }
    inputArea.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',resync));

    const ctrl = document.createElement('div'); ctrl.className='visual-controls';
    ctrl.innerHTML=`<button class="btn-vis" id="ge-prev">← Prev</button>
      <button class="btn-vis" id="ge-next">Next →</button>
      <button class="btn-vis" id="ge-reset" style="margin-left:auto">Reset</button>`;
    container.appendChild(ctrl);
    ctrl.querySelector('#ge-next').addEventListener('click',()=>{if(idx<steps.length-1){idx++;draw();}});
    ctrl.querySelector('#ge-prev').addEventListener('click',()=>{if(idx>0){idx--;draw();}});
    ctrl.querySelector('#ge-reset').addEventListener('click',()=>{idx=0;draw();});
  }

  // ── Ch 6: Determinant ─────────────────────────────────────
  function determinantVis(container) {
    container.innerHTML = '';
    const W = 680, H = 260;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let mat = [[1,2,3],[4,5,6],[7,8,0]];
    let expandCol = 0;

    function minor(m,row,col){ return m.filter((_,r)=>r!==row).map(r=>r.filter((_,c)=>c!==col)); }
    function det2(m){ return m[0][0]*m[1][1]-m[0][1]*m[1][0]; }
    function det3(m){ return m[0][0]*det2(minor(m,0,0))-m[0][1]*det2(minor(m,0,1))+m[0][2]*det2(minor(m,0,2)); }

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      const cs=64,gap=6,ox=30,oy=60;
      const detVal = det3(mat);
      ctx.fillStyle='#7c85a8'; ctx.font='13px Inter'; ctx.textAlign='left';
      ctx.fillText(`Cofactor expansion along column ${expandCol+1}`, 16, 30);
      ctx.fillStyle='#fbbf24'; ctx.font='bold 14px Inter';
      ctx.fillText(`det(A) = ${detVal}`, W-160, 30);
      for(let r=0;r<3;r++) for(let c=0;c<3;c++) {
        const x=ox+c*(cs+gap), y=oy+r*(cs+gap);
        const isExp = c===expandCol;
        const sign = ((r+expandCol)%2===0)?'+':'−';
        ctx.fillStyle = isExp?'rgba(91,124,250,0.25)':'rgba(34,37,58,0.9)';
        ctx.beginPath(); ctx.roundRect(x,y,cs,cs,7); ctx.fill();
        ctx.fillStyle = isExp?'#5b7cfa':'#7c85a8';
        ctx.font = isExp?'bold 17px monospace':'15px monospace'; ctx.textAlign='center';
        ctx.fillText(mat[r][c], x+cs/2, y+cs/2+6);
        if(isExp){ ctx.fillStyle=sign==='+'?'#34d399':'#fb923c'; ctx.font='bold 11px Inter'; ctx.fillText(sign,x+cs-8,y+14); }
      }
      // brackets
      const bx=ox-12,by=oy-4,bw=3*(cs+gap)+2,bh=3*(cs+gap)+2;
      ctx.strokeStyle='#4a5080'; ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(bx+8,by); ctx.lineTo(bx,by); ctx.lineTo(bx,by+bh); ctx.lineTo(bx+8,by+bh);
      ctx.moveTo(bx+bw-8,by); ctx.lineTo(bx+bw,by); ctx.lineTo(bx+bw,by+bh); ctx.lineTo(bx+bw-8,by+bh);
      ctx.stroke();
      // cofactor panel
      const cx2 = ox+3*(cs+gap)+40;
      ctx.fillStyle='#4a5080'; ctx.font='12px Inter'; ctx.textAlign='left';
      ctx.fillText('Cofactors:', cx2, oy+4);
      for(let r=0;r<3;r++) {
        const m=minor(mat,r,expandCol), d=det2(m);
        const sign=((r+expandCol)%2===0)?1:-1;
        const contribution = sign*mat[r][expandCol]*d;
        const y=oy+26+r*66;
        ctx.fillStyle='#7c85a8'; ctx.font='11px monospace';
        ctx.fillText(`M${r+1}${expandCol+1} = |${m[0].join(' ')}; ${m[1].join(' ')}| = ${d}`, cx2, y);
        ctx.fillStyle = sign>0?'#34d399':'#fb923c'; ctx.font='11px monospace';
        ctx.fillText(`${sign>0?'+':'-'}${Math.abs(mat[r][expandCol])} × ${d} = ${contribution}`, cx2, y+18);
        ctx.fillStyle='#2e3250';
        ctx.beginPath(); ctx.moveTo(cx2, y+28); ctx.lineTo(W-16, y+28); ctx.stroke();
      }
    }

    draw();

    const inputArea = document.createElement('div');
    inputArea.style.cssText = 'display:flex;justify-content:center;padding:10px;border-top:1px solid #2e3250;background:#16192a';
    inputArea.innerHTML = matrixInputs('det-mat', 3, mat, 'Matrix A (editable)', '#5b7cfa');
    container.appendChild(inputArea);
    inputArea.querySelectorAll('#det-mat input').forEach(inp => inp.addEventListener('input', () => {
      mat[+inp.dataset.r][+inp.dataset.c] = +inp.value || 0; draw();
    }));

    const ctrl = document.createElement('div'); ctrl.className='visual-controls';
    ctrl.innerHTML=`<span class="vis-label">Expand along column:</span>
      <button class="btn-vis active" data-col="0">Col 1</button>
      <button class="btn-vis" data-col="1">Col 2</button>
      <button class="btn-vis" data-col="2">Col 3</button>`;
    container.appendChild(ctrl);
    ctrl.querySelectorAll('[data-col]').forEach(btn=>btn.addEventListener('click',()=>{
      expandCol=+btn.dataset.col;
      ctrl.querySelectorAll('[data-col]').forEach(b=>b.classList.toggle('active',b===btn)); draw();
    }));
  }

  // ── Ch 7-8: Vector Operations ─────────────────────────────
  function vectorOps(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let mode = 'dot';
    let ax = 3, ay = 1, bx = 1, by = 3;
    const scale = 40, cx = 240, cy = 160;

    function toScreen(vx,vy){ return [cx+vx*scale, cy-vy*scale]; }

    function arrow(x1,y1,x2,y2,color,label) {
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy); if(len<1)return;
      const ux=dx/len,uy=dy/len;
      ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x2,y2);
      ctx.lineTo(x2-9*ux+4.5*uy, y2-9*uy-4.5*ux);
      ctx.lineTo(x2-9*ux-4.5*uy, y2-9*uy+4.5*ux);
      ctx.closePath(); ctx.fill();
      if(label){ ctx.font='bold 13px Inter'; ctx.textAlign='center'; ctx.fillText(label,x2+ux*20,y2-uy*20); }
    }

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      drawAxes(ctx, cx, cy, W, H, scale);

      const [ax2,ay2]=toScreen(ax,ay), [bx2,by2]=toScreen(bx,by);
      arrow(cx,cy,ax2,ay2,'#5b7cfa','a');
      arrow(cx,cy,bx2,by2,'#34d399','b');

      const dot=ax*bx+ay*by, cross=ax*by-ay*bx;
      const magA=Math.sqrt(ax*ax+ay*ay), magB=Math.sqrt(bx*bx+by*by);

      if(mode==='dot') {
        const magB2=bx*bx+by*by;
        if(magB2>0){
          const t=dot/magB2;
          const [px,py]=toScreen(t*bx,t*by);
          ctx.setLineDash([4,3]); ctx.strokeStyle='#4a5080'; ctx.lineWidth=1.5;
          ctx.beginPath(); ctx.moveTo(ax2,ay2); ctx.lineTo(px,py); ctx.stroke(); ctx.setLineDash([]);
          ctx.beginPath(); ctx.arc(px,py,6,0,Math.PI*2); ctx.fillStyle='#fbbf24'; ctx.fill();
          ctx.fillStyle='#fbbf24'; ctx.font='11px Inter'; ctx.textAlign='center';
          ctx.fillText('proj',px,py-12);
        }
      } else {
        const [rx,ry]=toScreen(ax+bx,ay+by);
        arrow(cx,cy,rx,ry,'#fb923c','a+b');
        // parallelogram
        ctx.strokeStyle='rgba(251,146,60,0.25)'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
        ctx.beginPath(); ctx.moveTo(ax2,ay2); ctx.lineTo(rx,ry); ctx.moveTo(bx2,by2); ctx.lineTo(rx,ry); ctx.stroke();
        ctx.setLineDash([]);
      }

      // coordinates near tips
      ctx.font='11px monospace'; ctx.fillStyle='#5b7cfa'; ctx.textAlign='left';
      ctx.fillText(`(${ax},${ay})`,ax2+6,ay2-6);
      ctx.fillStyle='#34d399'; ctx.fillText(`(${bx},${by})`,bx2+6,by2-6);

      // info panel
      const ix=W-188,iy=16;
      ctx.fillStyle='rgba(22,25,42,0.95)'; ctx.beginPath(); ctx.roundRect(ix,iy,172,145,8); ctx.fill();
      ctx.strokeStyle='#2e3250'; ctx.lineWidth=1; ctx.stroke();
      const rows=[['a =',`(${ax}, ${ay})`,'#5b7cfa'],['b =',`(${bx}, ${by})`,'#34d399'],
        ['|a| =',magA.toFixed(3),'#e2e8f0'],['|b| =',magB.toFixed(3),'#e2e8f0'],
        ['a·b =',dot,'#fbbf24'],['a×b =',`${cross}k`,'#fb923c']];
      rows.forEach(([lbl,val,col],i)=>{
        ctx.fillStyle='#7c85a8'; ctx.font='12px Inter'; ctx.textAlign='left'; ctx.fillText(lbl,ix+12,iy+26+i*20);
        ctx.fillStyle=col; ctx.fillText(val,ix+44,iy+26+i*20);
      });
    }

    draw();

    const ctrl = document.createElement('div'); ctrl.className='visual-controls';
    ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<button class="btn-vis active" data-m="dot">Dot Product</button>
      <button class="btn-vis" data-m="cross">Resultant</button>
      <span style="width:100%;height:0;border-top:1px solid #1a1d27;margin:2px 0"></span>
      <span class="vis-label">Vector a:</span>
      ${numInput('ax-n','x',ax,-6,6,1,'#5b7cfa')}
      ${numInput('ay-n','y',ay,-6,6,1,'#5b7cfa')}
      <span class="vis-label" style="margin-left:8px">Vector b:</span>
      ${numInput('bx-n','x',bx,-6,6,1,'#34d399')}
      ${numInput('by-n','y',by,-6,6,1,'#34d399')}`;
    container.appendChild(ctrl);
    ctrl.querySelectorAll('[data-m]').forEach(btn=>btn.addEventListener('click',()=>{
      mode=btn.dataset.m; ctrl.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('active',b===btn)); draw();
    }));
    function syncVec(){
      ax=+(ctrl.querySelector('#ax-n').value)||0; ay=+(ctrl.querySelector('#ay-n').value)||0;
      bx=+(ctrl.querySelector('#bx-n').value)||0; by=+(ctrl.querySelector('#by-n').value)||0;
      draw();
    }
    ['ax-n','ay-n','bx-n','by-n'].forEach(id=>ctrl.querySelector(`#${id}`).addEventListener('input',syncVec));
  }

  // ── Ch 9-10: Parametric Line & Plane ──────────────────────
  function lineAndPlane(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let mode = 'line';
    let t = 0;
    let p0 = [1,1], dir = [2,1];
    const scale = 40, ox = W/2 - 40, oy = H/2;

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      drawAxes(ctx, ox, oy, W, H, scale);

      if(mode==='line') {
        // line
        const t1=-7,t2=7;
        ctx.strokeStyle='#5b7cfa'; ctx.lineWidth=2;
        ctx.beginPath();
        ctx.moveTo(ox+(p0[0]+t1*dir[0])*scale, oy-(p0[1]+t1*dir[1])*scale);
        ctx.lineTo(ox+(p0[0]+t2*dir[0])*scale, oy-(p0[1]+t2*dir[1])*scale);
        ctx.stroke();
        // direction arrow
        const mx=ox+(p0[0]+t*dir[0])*scale, my=oy-(p0[1]+t*dir[1])*scale;
        const ex=ox+(p0[0]+t*dir[0]+dir[0])*scale, ey=oy-(p0[1]+t*dir[1]+dir[1])*scale;
        ctx.strokeStyle='rgba(91,124,250,0.5)'; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(mx,my); ctx.lineTo(ex,ey); ctx.stroke(); ctx.setLineDash([]);
        // current point P(t)
        ctx.beginPath(); ctx.arc(mx,my,7,0,Math.PI*2); ctx.fillStyle='#fbbf24'; ctx.fill();
        ctx.fillStyle='#fbbf24'; ctx.font='bold 11px Inter'; ctx.textAlign='left';
        ctx.fillText(`P(${t.toFixed(1)}) = (${(p0[0]+t*dir[0]).toFixed(1)}, ${(p0[1]+t*dir[1]).toFixed(1)})`,mx+10,my-10);
        // P0
        const p0x=ox+p0[0]*scale, p0y=oy-p0[1]*scale;
        ctx.beginPath(); ctx.arc(p0x,p0y,5,0,Math.PI*2); ctx.fillStyle='#34d399'; ctx.fill();
        ctx.fillStyle='#34d399'; ctx.font='11px Inter'; ctx.fillText(`P₀(${p0[0]},${p0[1]})`,p0x+8,p0y-8);
        // equation
        ctx.fillStyle='#5b7cfa'; ctx.font='13px Inter'; ctx.textAlign='left';
        ctx.fillText(`r(t) = (${p0[0]},${p0[1]}) + t·(${dir[0]},${dir[1]})`, 16, 22);
      } else {
        // plane (oblique projection)
        const cx2=W/2, cy2=H/2+20;
        ctx.fillStyle='rgba(91,124,250,0.12)'; ctx.strokeStyle='#5b7cfa'; ctx.lineWidth=2;
        ctx.beginPath();
        [[-110,-55],[110,-55],[130,45],[-90,45]].forEach(([x,y],i)=>i===0?ctx.moveTo(cx2+x,cy2+y):ctx.lineTo(cx2+x,cy2+y));
        ctx.closePath(); ctx.fill(); ctx.stroke();
        // normal vector
        ctx.strokeStyle='#34d399'; ctx.fillStyle='#34d399'; ctx.lineWidth=2.5;
        ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.lineTo(cx2+36,cy2-75); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx2+36,cy2-75);
        ctx.lineTo(cx2+36-8,cy2-75+8); ctx.lineTo(cx2+36+6,cy2-75+4); ctx.closePath(); ctx.fill();
        ctx.fillStyle='#34d399'; ctx.font='bold 13px Inter'; ctx.textAlign='left';
        ctx.fillText(`n=(${dir[0]},${p0[0]},${p0[1]})`,cx2+42,cy2-70);
        ctx.fillStyle='#5b7cfa'; ctx.textAlign='center'; ctx.font='14px Inter';
        ctx.fillText(`${dir[0]}x + ${p0[0]}y + ${p0[1]}z = 4`, cx2, cy2-5);
        ctx.fillStyle='#4a5080'; ctx.font='12px Inter';
        ctx.fillText('Plane shown as oblique projection in 3D', cx2, H-14);
      }
    }

    draw();

    const ctrl = document.createElement('div'); ctrl.className='visual-controls'; ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<button class="btn-vis active" data-m="line">Parametric Line</button>
      <button class="btn-vis" data-m="plane">Plane</button>
      <span style="width:100%;height:0;border-top:1px solid #1a1d27;margin:2px 0"></span>
      <span class="vis-label">P₀:</span>
      ${numInput('p0x','x',p0[0],-5,5,1,'#34d399')}${numInput('p0y','y',p0[1],-5,5,1,'#34d399')}
      <span class="vis-label" style="margin-left:8px">Direction d:</span>
      ${numInput('dx-n','x',dir[0],-5,5,1,'#5b7cfa')}${numInput('dy-n','y',dir[1],-5,5,1,'#5b7cfa')}
      <span class="vis-label" style="margin-left:8px">t:</span>
      <input id="t-slider" type="range" min="-4" max="4" step="0.1" value="0" style="width:100px">
      <span id="t-val" style="font-size:0.78rem;color:#fbbf24;min-width:40px">t=0.0</span>`;
    container.appendChild(ctrl);
    ctrl.querySelectorAll('[data-m]').forEach(btn=>btn.addEventListener('click',()=>{
      mode=btn.dataset.m; ctrl.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('active',b===btn)); draw();
    }));
    function syncLine(){
      p0[0]=+(ctrl.querySelector('#p0x').value)||0; p0[1]=+(ctrl.querySelector('#p0y').value)||0;
      dir[0]=+(ctrl.querySelector('#dx-n').value)||1; dir[1]=+(ctrl.querySelector('#dy-n').value)||0;
      draw();
    }
    ['p0x','p0y','dx-n','dy-n'].forEach(id=>ctrl.querySelector(`#${id}`).addEventListener('input',syncLine));
    ctrl.querySelector('#t-slider').addEventListener('input',e=>{
      t=+e.target.value; ctrl.querySelector('#t-val').textContent=`t=${t.toFixed(1)}`; draw();
    });
  }

  // ── Ch 11: Distances ──────────────────────────────────────
  function distanceVis(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let px = 3, py = 3;
    // line: ax+by+c=0 → default y=x → x-y=0
    let la=1,lb=-1,lc=0;
    const scale = 45, ox = W/2-60, oy = H/2;

    function projectOnLine(px,py){
      // project onto ax+by+c=0
      const d2=la*la+lb*lb; if(d2<1e-10)return[px,py];
      const t=-(la*px+lb*py+lc)/d2;
      return[px+t*la, py+t*lb];
    }

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      drawAxes(ctx, ox, oy, W, H, scale);

      // draw the line ax+by+c=0
      ctx.strokeStyle='#5b7cfa'; ctx.lineWidth=2;
      ctx.beginPath();
      // find two x-screen-edge points
      const x1=-10, y1=lb!==0?(-la*x1-lc)/lb:0;
      const x2=10,  y2=lb!==0?(-la*x2-lc)/lb:0;
      ctx.moveTo(ox+x1*scale, oy-y1*scale); ctx.lineTo(ox+x2*scale, oy-y2*scale); ctx.stroke();
      ctx.fillStyle='#5b7cfa'; ctx.font='12px Inter'; ctx.textAlign='left';
      ctx.fillText(`${la}x ${lb>=0?'+ '+lb:'− '+Math.abs(lb)}y ${lc>=0?'+ '+lc:'− '+Math.abs(lc)} = 0`, 16, 22);

      // point P
      const sx=ox+px*scale, sy=oy-py*scale;
      ctx.beginPath(); ctx.arc(sx,sy,8,0,Math.PI*2); ctx.fillStyle='#fbbf24'; ctx.fill();
      ctx.fillStyle='#fbbf24'; ctx.font='bold 12px Inter'; ctx.textAlign='center';
      ctx.fillText(`P(${px},${py})`,sx,sy-14);

      // projection
      const [qx,qy]=projectOnLine(px,py);
      const sqx=ox+qx*scale, sqy=oy-qy*scale;
      ctx.beginPath(); ctx.arc(sqx,sqy,6,0,Math.PI*2); ctx.fillStyle='#34d399'; ctx.fill();
      ctx.fillStyle='#34d399'; ctx.font='11px Inter'; ctx.textAlign='center';
      ctx.fillText(`Q(${qx.toFixed(2)},${qy.toFixed(2)})`,sqx,sqy+16);

      // perpendicular dashed line
      ctx.setLineDash([4,3]); ctx.strokeStyle='#fb923c'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sqx,sqy); ctx.stroke(); ctx.setLineDash([]);

      // right-angle marker
      const dx=(sqx-sx), dy=(sqy-sy), len=Math.sqrt(dx*dx+dy*dy);
      if(len>8){
        const ux=dx/len,uy=dy/len; const s=10;
        ctx.strokeStyle='rgba(251,146,60,0.5)'; ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(sqx-ux*s+uy*s, sqy-uy*s-ux*s);
        ctx.lineTo(sqx+uy*s, sqy-ux*s);
        ctx.lineTo(sqx+ux*s+uy*s, sqy+uy*s-ux*s);
        ctx.stroke();
      }

      // distance label
      const dist=Math.abs(la*px+lb*py+lc)/Math.sqrt(la*la+lb*lb);
      const mx=(sx+sqx)/2, my=(sy+sqy)/2;
      ctx.fillStyle='#fb923c'; ctx.font='bold 13px Inter'; ctx.textAlign='left';
      ctx.fillText(`d = ${dist.toFixed(4)}`,mx+10,my);

      // formula bottom
      ctx.fillStyle='#4a5080'; ctx.font='11px Inter'; ctx.textAlign='center';
      ctx.fillText('d = |ax₀+by₀+c| / √(a²+b²)', W/2, H-8);
    }

    draw();

    const ctrl = document.createElement('div'); ctrl.className='visual-controls'; ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<span class="vis-label">Point P:</span>
      ${numInput('dpx','x',px,-5,5,0.5,'#fbbf24')}${numInput('dpy','y',py,-5,5,0.5,'#fbbf24')}
      <span class="vis-label" style="margin-left:8px">Line ax+by+c=0:</span>
      ${numInput('dla','a',la,-5,5,1,'#5b7cfa')}${numInput('dlb','b',lb,-5,5,1,'#5b7cfa')}${numInput('dlc','c',lc,-5,5,1,'#5b7cfa')}`;
    container.appendChild(ctrl);
    function syncDist(){
      px=+(ctrl.querySelector('#dpx').value)||0; py=+(ctrl.querySelector('#dpy').value)||0;
      la=+(ctrl.querySelector('#dla').value)||1; lb=+(ctrl.querySelector('#dlb').value)||0; lc=+(ctrl.querySelector('#dlc').value)||0;
      draw();
    }
    ['dpx','dpy','dla','dlb','dlc'].forEach(id=>ctrl.querySelector(`#${id}`).addEventListener('input',syncDist));
  }

  // ── Ch 12-15: Span & Independence ─────────────────────────
  function spanVis(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let v1=[2,0], v2=[1,2], showSpan=true;
    const scale=55, ox=W/2-60, oy=H/2;
    function toS(x,y){return[ox+x*scale,oy-y*scale];}

    function arrowVec(vx,vy,color,label){
      const [x1,y1]=[ox,oy],[x2,y2]=toS(vx,vy);
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy); if(len<1)return;
      const ux=dx/len,uy=dy/len;
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-9*ux+4.5*uy,y2-9*uy-4.5*ux);ctx.lineTo(x2-9*ux-4.5*uy,y2-9*uy+4.5*ux);ctx.closePath();ctx.fill();
      ctx.font='bold 13px Inter';ctx.textAlign='center';ctx.fillText(label,x2+ux*20,y2-uy*20);
      // coordinate label
      ctx.font='11px monospace';ctx.fillStyle=color;
      ctx.fillText(`(${vx},${vy})`,x2+ux*20,y2-uy*20+14);
    }

    function draw() {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#0f1117'; ctx.fillRect(0,0,W,H);
      const det=v1[0]*v2[1]-v1[1]*v2[0];
      if(showSpan&&det!==0){
        ctx.fillStyle='rgba(91,124,250,0.06)'; ctx.fillRect(0,0,W,H);
      }
      drawAxes(ctx, ox, oy, W, H, scale);

      // parallelogram spanned by v1 and v2
      if(showSpan){
        const [s1x,s1y]=toS(v1[0],v1[1]);
        const [s2x,s2y]=toS(v2[0],v2[1]);
        const [s12x,s12y]=toS(v1[0]+v2[0],v1[1]+v2[1]);
        ctx.fillStyle=det!==0?'rgba(91,124,250,0.12)':'rgba(251,146,60,0.10)';
        ctx.strokeStyle=det!==0?'rgba(91,124,250,0.3)':'rgba(251,146,60,0.3)';
        ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(s1x,s1y);ctx.lineTo(s12x,s12y);ctx.lineTo(s2x,s2y);ctx.closePath();
        ctx.fill();ctx.stroke();
      }

      arrowVec(v1[0],v1[1],'#5b7cfa','v₁');
      arrowVec(v2[0],v2[1],'#34d399','v₂');

      ctx.fillStyle=det!==0?'#34d399':'#fb923c';
      ctx.font='bold 13px Inter'; ctx.textAlign='left';
      ctx.fillText(det!==0?'✓ Linearly independent':'✗ Linearly dependent  (det=0)', 16, H-26);
      ctx.fillStyle='#4a5080'; ctx.font='12px Inter';
      ctx.fillText(`det = v₁×v₂ = ${det}  |  Area of parallelogram = ${Math.abs(det)}`, 16, H-10);
    }

    draw();

    const ctrl=document.createElement('div');ctrl.className='visual-controls';ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<span class="vis-label" style="color:#5b7cfa">v₁:</span>
      ${numInput('v1x','x',v1[0],-4,4,1,'#5b7cfa')}${numInput('v1y','y',v1[1],-4,4,1,'#5b7cfa')}
      <span class="vis-label" style="color:#34d399;margin-left:8px">v₂:</span>
      ${numInput('v2x','x',v2[0],-4,4,1,'#34d399')}${numInput('v2y','y',v2[1],-4,4,1,'#34d399')}
      <button class="btn-vis active" id="toggle-span" style="margin-left:auto">Show Span</button>`;
    container.appendChild(ctrl);
    function syncSpan(){
      v1[0]=+(ctrl.querySelector('#v1x').value)||0;v1[1]=+(ctrl.querySelector('#v1y').value)||0;
      v2[0]=+(ctrl.querySelector('#v2x').value)||0;v2[1]=+(ctrl.querySelector('#v2y').value)||0;
      draw();
    }
    ['v1x','v1y','v2x','v2y'].forEach(id=>ctrl.querySelector(`#${id}`).addEventListener('input',syncSpan));
    ctrl.querySelector('#toggle-span').addEventListener('click',function(){showSpan=!showSpan;this.classList.toggle('active',showSpan);draw();});
  }

  // ── Ch 16-17: Linear Map ──────────────────────────────────
  function linearMapVis(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    const presets = {'Scale 2x':[[2,0],[0,2]],'Rotate 45°':[[Math.cos(Math.PI/4),-Math.sin(Math.PI/4)],[Math.sin(Math.PI/4),Math.cos(Math.PI/4)]],'Shear':[[1,1],[0,1]],'Reflect X':[[1,0],[0,-1]],'Project':[[1,0],[0,0]]};
    let mat=[[2,0],[0,2]], animT=0, animDir=1, animating=false, animId=null;
    const scale=50, ox=W/2-60, oy=H/2;
    const unitSquare=[[0,0],[1,0],[1,1],[0,1]];
    function applyT(m,pt){return[m[0][0]*pt[0]+m[0][1]*pt[1],m[1][0]*pt[0]+m[1][1]*pt[1]];}
    function lerp(a,b,t){return a+(b-a)*t;}
    function toS(x,y){return[ox+x*scale,oy-y*scale];}

    function arrowSm(vx,vy,color,label){
      const [x1,y1]=[ox,oy],[x2,y2]=toS(vx,vy);
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy);if(len<1)return;
      const ux=dx/len,uy=dy/len;
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-7*ux+3.5*uy,y2-7*uy-3.5*ux);ctx.lineTo(x2-7*ux-3.5*uy,y2-7*uy+3.5*ux);ctx.closePath();ctx.fill();
      if(label){ctx.font='bold 12px Inter';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(label,x2+ux*16,y2-uy*16);}
    }

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      drawAxes(ctx,ox,oy,W,H,scale);
      const t=animT;
      // original unit square (faint)
      ctx.strokeStyle='rgba(91,124,250,0.3)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
      ctx.beginPath();unitSquare.forEach(([x,y],i)=>{const[sx,sy]=toS(x,y);i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);});
      ctx.closePath();ctx.stroke();ctx.setLineDash([]);
      // transformed square
      const trans=unitSquare.map(pt=>{const tp=applyT(mat,pt);return[lerp(pt[0],tp[0],t),lerp(pt[1],tp[1],t)];});
      ctx.strokeStyle='#5b7cfa';ctx.lineWidth=2.5;ctx.fillStyle='rgba(91,124,250,0.14)';
      ctx.beginPath();trans.forEach(([x,y],i)=>{const[sx,sy]=toS(x,y);i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);});
      ctx.closePath();ctx.fill();ctx.stroke();
      // basis vectors
      const e1t=[lerp(1,mat[0][0],t),lerp(0,mat[1][0],t)];
      const e2t=[lerp(0,mat[0][1],t),lerp(1,mat[1][1],t)];
      arrowSm(e1t[0],e1t[1],'#34d399','e₁');
      arrowSm(e2t[0],e2t[1],'#fb923c','e₂');
      // label
      ctx.fillStyle='#7c85a8';ctx.font='12px Inter';ctx.textAlign='left';
      ctx.fillText(`T = [[${mat[0].map(v=>v.toFixed(2)).join(', ')}], [${mat[1].map(v=>v.toFixed(2)).join(', ')}]]`,16,22);
      ctx.fillStyle='#fbbf24';ctx.fillText(`Interpolation: ${(t*100).toFixed(0)}%`,16,40);
      ctx.fillStyle='#4a5080';
      ctx.fillText(`det(T) = ${(mat[0][0]*mat[1][1]-mat[0][1]*mat[1][0]).toFixed(3)}  |  Area scale factor`,16,58);
    }

    draw();

    const inputArea=document.createElement('div');
    inputArea.style.cssText='padding:10px 14px;border-top:1px solid #2e3250;background:#16192a';
    inputArea.innerHTML=`<div style="font-size:0.72rem;color:#4a5080;margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em">Custom transformation matrix T (or pick a preset)</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        ${matrixInputs('lm-mat',2,mat,'T','#5b7cfa')}
        <div style="display:flex;flex-direction:column;gap:4px">
          ${Object.keys(presets).map((k,i)=>`<button class="btn-vis${i===0?' active':''}" data-p="${k}" style="font-size:0.75rem;padding:0.3rem 0.7rem">${k}</button>`).join('')}
        </div>
      </div>`;
    container.appendChild(inputArea);
    inputArea.querySelectorAll('#lm-mat input').forEach(inp=>inp.addEventListener('input',()=>{
      mat[+inp.dataset.r][+inp.dataset.c]=parseFloat(inp.value)||0; draw();
    }));
    inputArea.querySelectorAll('[data-p]').forEach(btn=>btn.addEventListener('click',()=>{
      const m=presets[btn.dataset.p]; mat=m.map(r=>[...r]);
      inputArea.querySelectorAll('#lm-mat input').forEach(inp=>{inp.value=mat[+inp.dataset.r][+inp.dataset.c].toFixed(2);});
      inputArea.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('active',b===btn));
      animT=0; draw();
    }));

    const ctrl=document.createElement('div');ctrl.className='visual-controls';
    ctrl.innerHTML=`<button class="btn-vis" id="anim-btn">▶ Animate</button>`;
    container.appendChild(ctrl);
    ctrl.querySelector('#anim-btn').addEventListener('click',function(){
      if(animating){cancelAnimationFrame(animId);animating=false;this.textContent='▶ Animate';return;}
      animating=true;this.textContent='⏹ Stop';
      function step(){animT+=0.015*animDir;if(animT>=1){animT=1;animDir=-1;}if(animT<=0){animT=0;animDir=1;}draw();if(animating)animId=requestAnimationFrame(step);}
      animId=requestAnimationFrame(step);
    });
  }

  // ── Ch 18-19: Eigenvalues ─────────────────────────────────
  function eigenVis(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let mat = [[2,0],[0,3]];
    let angle = 0, spinning = false, animId = null;
    const scale=55, ox=W/2-60, oy=H/2;
    function toS(x,y){return[ox+x*scale,oy-y*scale];}

    function getEigen(m) {
      const tr=m[0][0]+m[1][1], det=m[0][0]*m[1][1]-m[0][1]*m[1][0];
      const disc=tr*tr-4*det;
      if(disc<0) return null;
      const l1=(tr+Math.sqrt(disc))/2, l2=(tr-Math.sqrt(disc))/2;
      // eigenvectors: (A-lI)v=0
      function ev(l){
        const a=m[0][0]-l,b=m[0][1],c=m[1][0],d=m[1][1]-l;
        if(Math.abs(b)>1e-9) return [-b,a];
        if(Math.abs(c)>1e-9) return [d,-c];
        return [1,0];
      }
      return {l1,l2,ev1:ev(l1),ev2:ev(l2)};
    }

    function arrowE(vx,vy,color,label,dashed=false){
      const[x1,y1]=[ox,oy],[x2,y2]=toS(vx,vy);
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy);if(len<1)return;
      const ux=dx/len,uy=dy/len;
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=dashed?1.5:2.5;
      if(dashed)ctx.setLineDash([4,3]);
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);
      ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-8*ux+4*uy,y2-8*uy-4*ux);ctx.lineTo(x2-8*ux-4*uy,y2-8*uy+4*ux);ctx.closePath();ctx.fill();
      if(label){ctx.font='bold 12px Inter';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(label,x2+ux*18,y2-uy*18);}
    }

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      drawAxes(ctx,ox,oy,W,H,scale);
      const eg=getEigen(mat);
      if(eg) {
        const n1=Math.sqrt(eg.ev1[0]**2+eg.ev1[1]**2)||1;
        const n2=Math.sqrt(eg.ev2[0]**2+eg.ev2[1]**2)||1;
        const u1=[eg.ev1[0]/n1,eg.ev1[1]/n1], u2=[eg.ev2[0]/n2,eg.ev2[1]/n2];
        arrowE(u1[0]*1.8,u1[1]*1.8,'rgba(91,124,250,0.35)','',true);
        arrowE(u2[0]*1.8,u2[1]*1.8,'rgba(52,211,153,0.35)','',true);
        arrowE(u1[0]*Math.abs(eg.l1),u1[1]*Math.abs(eg.l1),'#5b7cfa',`λ₁=${eg.l1.toFixed(2)}`);
        arrowE(u2[0]*Math.abs(eg.l2),u2[1]*Math.abs(eg.l2),'#34d399',`λ₂=${eg.l2.toFixed(2)}`);
        // info
        ctx.fillStyle='rgba(22,25,42,0.95)';ctx.beginPath();ctx.roundRect(W-178,14,162,90,8);ctx.fill();
        ctx.strokeStyle='#2e3250';ctx.lineWidth=1;ctx.stroke();
        ctx.fillStyle='#7c85a8';ctx.font='12px Inter';ctx.textAlign='left';
        ctx.fillText(`A = [[${mat[0].join(', ')}], [${mat[1].join(', ')}]]`,W-170,36);
        ctx.fillStyle='#5b7cfa';ctx.fillText(`λ₁ = ${eg.l1.toFixed(3)}`,W-170,56);
        ctx.fillStyle='#34d399';ctx.fillText(`λ₂ = ${eg.l2.toFixed(3)}`,W-170,74);
        ctx.fillStyle='#fbbf24';ctx.fillText(`tr=${(mat[0][0]+mat[1][1]).toFixed(2)}, det=${(mat[0][0]*mat[1][1]-mat[0][1]*mat[1][0]).toFixed(2)}`,W-170,94);
      } else {
        ctx.fillStyle='#fb923c';ctx.font='13px Inter';ctx.textAlign='center';
        ctx.fillText('Complex eigenvalues (no real eigenvectors)',W/2,oy);
      }
      // rotating test vector v and Av
      const rx=Math.cos(angle),ry=Math.sin(angle);
      const Arx=mat[0][0]*rx+mat[0][1]*ry, Ary=mat[1][0]*rx+mat[1][1]*ry;
      arrowE(rx,ry,'#fbbf24','v');
      arrowE(Arx,Ary,'#fb923c','Av');
    }

    draw();

    const inputArea=document.createElement('div');
    inputArea.style.cssText='display:flex;justify-content:center;padding:10px;border-top:1px solid #2e3250;background:#16192a';
    inputArea.innerHTML=matrixInputs('eig-mat',2,mat,'Matrix A (editable)','#5b7cfa');
    container.appendChild(inputArea);
    inputArea.querySelectorAll('#eig-mat input').forEach(inp=>inp.addEventListener('input',()=>{
      mat[+inp.dataset.r][+inp.dataset.c]=parseFloat(inp.value)||0; draw();
    }));

    const ctrl=document.createElement('div');ctrl.className='visual-controls';
    ctrl.innerHTML=`<button class="btn-vis" id="spin-btn">▶ Spin v</button>
      <span class="vis-label" style="margin-left:auto;font-size:0.75rem">Watching Av vs v shows which directions are eigenvectors</span>`;
    container.appendChild(ctrl);
    ctrl.querySelector('#spin-btn').addEventListener('click',function(){
      spinning=!spinning;this.textContent=spinning?'⏹ Stop':'▶ Spin v';
      if(spinning){const f=()=>{angle+=0.02;draw();if(spinning)animId=requestAnimationFrame(f);};requestAnimationFrame(f);}
      else cancelAnimationFrame(animId);
    });
  }

  // ── Ch 20: Gram-Schmidt ───────────────────────────────────
  function gramSchmidt(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let v1=[3,1], v2=[2,2], step=0;
    const scale=55, ox=W/2-60, oy=H/2;
    function toS(x,y){return[ox+x*scale,oy-y*scale];}
    function dot(a,b){return a[0]*b[0]+a[1]*b[1];}
    function scl(v,s){return[v[0]*s,v[1]*s];}
    function sub(a,b){return[a[0]-b[0],a[1]-b[1]];}
    function norm(v){return Math.sqrt(v[0]*v[0]+v[1]*v[1]);}
    function unit(v){const n=norm(v)||1;return[v[0]/n,v[1]/n];}

    function arrowGS(vx,vy,color,label,dashed=false){
      const[x1,y1]=[ox,oy],[x2,y2]=toS(vx,vy);
      const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy);if(len<1)return;
      const ux=dx/len,uy=dy/len;
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=dashed?1.5:2.5;
      if(dashed)ctx.setLineDash([4,3]);
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);
      ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-8*ux+4*uy,y2-8*uy-4*ux);ctx.lineTo(x2-8*ux-4*uy,y2-8*uy+4*ux);ctx.closePath();ctx.fill();
      if(label){ctx.font='bold 13px Inter';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(label,x2+ux*20,y2-uy*20);}
    }

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      drawAxes(ctx,ox,oy,W,H,scale);
      const u1=unit(v1);
      const proj=scl(u1,dot(v2,u1));
      const v2p=sub(v2,proj);
      const u2=unit(v2p);
      const labels=['Original vectors v₁ and v₂','Step 1: Normalize — u₁ = v₁/|v₁|','Step 2: Project v₂ onto u₁, then subtract','Step 3: Normalize — u₂ = (v₂−proj)/|v₂−proj|'];
      ctx.fillStyle='#7c85a8';ctx.font='13px Inter';ctx.textAlign='left';ctx.fillText(labels[step],16,22);
      arrowGS(v1[0],v1[1],'rgba(91,124,250,0.45)','v₁',true);
      arrowGS(v2[0],v2[1],'rgba(52,211,153,0.45)','v₂',true);
      if(step>=1)arrowGS(u1[0],u1[1],'#5b7cfa','u₁');
      if(step>=2){
        arrowGS(proj[0],proj[1],'#fbbf24','proj',true);
        // dashed line from tip of proj to tip of v2
        const[px,py]=toS(proj[0],proj[1]);const[vx,vy]=toS(v2[0],v2[1]);
        ctx.setLineDash([3,3]);ctx.strokeStyle='rgba(167,139,250,0.5)';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(vx,vy);ctx.stroke();ctx.setLineDash([]);
      }
      if(step>=3)arrowGS(u2[0],u2[1],'#34d399','u₂');
      if(step>=3){
        ctx.fillStyle='#34d399';ctx.font='12px Inter';ctx.textAlign='left';
        ctx.fillText(`u₁·u₂ = ${dot(u1,u2).toFixed(6)} ≈ 0  ✓ Orthogonal`,16,H-10);
      }
    }

    draw();

    const ctrl=document.createElement('div');ctrl.className='visual-controls';ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<span class="vis-label" style="color:#5b7cfa">v₁:</span>
      ${numInput('gsv1x','x',v1[0],-4,4,0.5,'#5b7cfa')}${numInput('gsv1y','y',v1[1],-4,4,0.5,'#5b7cfa')}
      <span class="vis-label" style="color:#34d399;margin-left:8px">v₂:</span>
      ${numInput('gsv2x','x',v2[0],-4,4,0.5,'#34d399')}${numInput('gsv2y','y',v2[1],-4,4,0.5,'#34d399')}
      <button class="btn-vis" id="gs-prev" style="margin-left:auto">← Prev</button>
      <button class="btn-vis" id="gs-next">Next →</button>
      <button class="btn-vis" id="gs-reset">Reset</button>`;
    container.appendChild(ctrl);
    function syncGS(){
      v1[0]=+(ctrl.querySelector('#gsv1x').value)||0;v1[1]=+(ctrl.querySelector('#gsv1y').value)||0;
      v2[0]=+(ctrl.querySelector('#gsv2x').value)||0;v2[1]=+(ctrl.querySelector('#gsv2y').value)||0;
      draw();
    }
    ['gsv1x','gsv1y','gsv2x','gsv2y'].forEach(id=>ctrl.querySelector(`#${id}`).addEventListener('input',syncGS));
    ctrl.querySelector('#gs-next').addEventListener('click',()=>{if(step<3){step++;draw();}});
    ctrl.querySelector('#gs-prev').addEventListener('click',()=>{if(step>0){step--;draw();}});
    ctrl.querySelector('#gs-reset').addEventListener('click',()=>{step=0;draw();});
  }

  // ── Ch 21: Quadratic Form ────────────────────────────────
  function quadraticForm(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let a=1, b=0, c=1;
    const scale=40, ox=W/2, oy=H/2;

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      drawAxes(ctx,ox,oy,W,H,scale);
      const levels=[0.5,1,2,4];
      levels.forEach((k,ki)=>{
        const alpha=0.25+ki*0.18;
        ctx.strokeStyle=`rgba(91,124,250,${alpha})`;ctx.lineWidth=1.5;
        ctx.beginPath();let first=true;
        for(let theta=0;theta<=Math.PI*2+0.05;theta+=0.04){
          const cosT=Math.cos(theta),sinT=Math.sin(theta);
          const Q=a*cosT*cosT+b*cosT*sinT+c*sinT*sinT;
          if(Q<=1e-9)continue;
          const r=Math.sqrt(k/Q)*scale;
          const sx=ox+r*cosT,sy=oy-r*sinT;
          first?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);first=false;
        }
        ctx.closePath();ctx.stroke();
        // label
        const rL=Math.sqrt(k/Math.max(a,1e-9))*scale;
        ctx.fillStyle=`rgba(91,124,250,${alpha+0.2})`;ctx.font='10px Inter';ctx.textAlign='left';
        ctx.fillText(`Q=${k}`,ox+rL+4,oy-4);
      });
      const disc=b*b-4*a*c;
      const type=disc<0?'Elliptic (positive definite)':disc>0?'Hyperbolic (indefinite)':'Parabolic (semi-definite)';
      ctx.fillStyle='#7c85a8';ctx.font='13px Inter';ctx.textAlign='left';
      ctx.fillText(`Q(x,y) = ${a}x² ${b>=0?'+ '+b:'− '+Math.abs(b)}xy ${c>=0?'+ '+c:'− '+Math.abs(c)}y²`,16,22);
      ctx.fillStyle=disc<0?'#34d399':disc>0?'#fb923c':'#fbbf24';
      ctx.fillText(type,16,42);
      ctx.fillStyle='#4a5080';ctx.fillText(`disc = b²−4ac = ${disc}`,16,60);
    }

    draw();

    const ctrl=document.createElement('div');ctrl.className='visual-controls';
    ctrl.innerHTML=`<span class="vis-label">a (x²):</span>${numInput('qa-n','',a,-3,3,0.5,'#7c85a8')}
      <span class="vis-label">b (xy):</span>${numInput('qb-n','',b,-3,3,0.5,'#7c85a8')}
      <span class="vis-label">c (y²):</span>${numInput('qc-n','',c,-3,3,0.5,'#7c85a8')}`;
    container.appendChild(ctrl);
    ctrl.querySelector('#qa-n').addEventListener('input',e=>{a=+e.target.value;draw();});
    ctrl.querySelector('#qb-n').addEventListener('input',e=>{b=+e.target.value;draw();});
    ctrl.querySelector('#qc-n').addEventListener('input',e=>{c=+e.target.value;draw();});
  }

  // ── Ch 22-23: Conics ─────────────────────────────────────
  function conicVis(container) {
    container.innerHTML = '';
    const W = 680, H = 320;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let current='Ellipse', ellA=3, ellB=2, hypA=1, hypB=1, parP=1;
    const scale=40, ox=W/2, oy=H/2;

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      drawAxes(ctx,ox,oy,W,H,scale);
      ctx.strokeStyle='#5b7cfa';ctx.lineWidth=2.5;
      if(current==='Ellipse'){
        if(ellA>0&&ellB>0){
          ctx.beginPath();ctx.ellipse(ox,oy,ellA*scale,ellB*scale,0,0,Math.PI*2);ctx.stroke();
          // foci
          const c2=Math.abs(ellA*ellA-ellB*ellB);const fc=Math.sqrt(c2)*scale;
          const fAxis=ellA>ellB?'x':'y';
          ctx.fillStyle='#fbbf24';
          if(fAxis==='x'){ctx.beginPath();ctx.arc(ox+fc,oy,5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(ox-fc,oy,5,0,Math.PI*2);ctx.fill();}
          else{ctx.beginPath();ctx.arc(ox,oy-fc,5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(ox,oy+fc,5,0,Math.PI*2);ctx.fill();}
          ctx.fillStyle='#5b7cfa';ctx.font='13px Inter';ctx.textAlign='left';
          ctx.fillText(`x²/${ellA}² + y²/${ellB}² = 1   (a=${ellA}, b=${ellB}, c=${Math.sqrt(c2).toFixed(2)})`,16,22);
          ctx.fillStyle='#fbbf24';ctx.fillText(`Foci at ±${Math.sqrt(c2).toFixed(2)} along ${fAxis}-axis`,16,40);
        }
      } else if(current==='Hyperbola'){
        for(let s of[-1,1]){
          ctx.beginPath();let first=true;
          for(let t=-3;t<=3;t+=0.04){
            const x=s*hypA*Math.cosh(t),y=hypB*Math.sinh(t);
            const sx=ox+x*scale,sy=oy-y*scale;
            first?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);first=false;
          }ctx.stroke();
        }
        // asymptotes
        ctx.strokeStyle='rgba(91,124,250,0.3)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
        const slope=hypB/hypA;
        ctx.beginPath();ctx.moveTo(ox-200,oy+200*slope);ctx.lineTo(ox+200,oy-200*slope);ctx.stroke();
        ctx.beginPath();ctx.moveTo(ox-200,oy-200*slope);ctx.lineTo(ox+200,oy+200*slope);ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='#5b7cfa';ctx.font='13px Inter';ctx.textAlign='left';
        ctx.fillText(`x²/${hypA}² − y²/${hypB}² = 1   Asymptotes: y = ±(${hypB}/${hypA})x`,16,22);
      } else {
        // Parabola y²=4px
        ctx.beginPath();let first=true;
        for(let t=-8;t<=8;t+=0.1){const x=t*t/(4*parP),y=t;const sx=ox+x*scale,sy=oy-y*scale;first?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);first=false;}
        ctx.stroke();
        const fx=ox+parP*scale;
        ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.arc(fx,oy,5,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#fbbf24';ctx.font='11px Inter';ctx.textAlign='left';ctx.fillText(`F(${parP},0)`,fx+8,oy-6);
        ctx.strokeStyle='rgba(91,124,250,0.3)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
        ctx.beginPath();ctx.moveTo(ox-parP*scale,0);ctx.lineTo(ox-parP*scale,H);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle='#4a5080';ctx.fillText(`directrix x=−${parP}`,ox-parP*scale+4,20);
        ctx.fillStyle='#5b7cfa';ctx.font='13px Inter';
        ctx.fillText(`y² = 4·${parP}·x = ${4*parP}x   Focus (${parP},0)`,16,22);
      }
    }

    draw();

    const ctrl=document.createElement('div');ctrl.className='visual-controls';ctrl.style.flexWrap='wrap';
    ctrl.innerHTML=`<button class="btn-vis active" data-c="Ellipse">Ellipse</button>
      <button class="btn-vis" data-c="Hyperbola">Hyperbola</button>
      <button class="btn-vis" data-c="Parabola">Parabola</button>
      <span style="width:100%;height:0;border-top:1px solid #1a1d27;margin:2px 0"></span>
      <span class="vis-label" id="param-label">a,b:</span>
      ${numInput('c-p1','a',ellA,0.5,6,0.5,'#5b7cfa')}
      ${numInput('c-p2','b',ellB,0.5,6,0.5,'#34d399')}`;
    container.appendChild(ctrl);
    ctrl.querySelectorAll('[data-c]').forEach(btn=>btn.addEventListener('click',()=>{
      current=btn.dataset.c;
      ctrl.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('active',b===btn));
      if(current==='Parabola'){ctrl.querySelector('#param-label').textContent='p:';ctrl.querySelector('#c-p1').value=parP;ctrl.querySelector('#c-p2').style.display='none';}
      else{ctrl.querySelector('#param-label').textContent='a, b:';ctrl.querySelector('#c-p1').value=current==='Ellipse'?ellA:hypA;ctrl.querySelector('#c-p2').value=current==='Ellipse'?ellB:hypB;ctrl.querySelector('#c-p2').style.display='';}
      draw();
    }));
    ctrl.querySelector('#c-p1').addEventListener('input',e=>{
      const v=+e.target.value||0.5;
      if(current==='Ellipse')ellA=v;else if(current==='Hyperbola')hypA=v;else parP=v;
      draw();
    });
    ctrl.querySelector('#c-p2').addEventListener('input',e=>{
      const v=+e.target.value||0.5;
      if(current==='Ellipse')ellB=v;else hypB=v;
      draw();
    });
  }

  // ── Ch 24: Spheres ────────────────────────────────────────
  function sphereVis(container) {
    container.innerHTML = '';
    const W = 680, H = 300;
    const canvas = makeCanvas(container, W, H);
    const ctx = canvas.getContext('2d');

    let r1=2, r2=1.5, dist=3;

    function draw() {
      ctx.clearRect(0,0,W,H);ctx.fillStyle='#0f1117';ctx.fillRect(0,0,W,H);
      const scale=50,ox=W/2,oy=H/2;
      // horizontal axis only
      ctx.strokeStyle='#2e3250';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(40,oy);ctx.lineTo(W-20,oy);ctx.stroke();
      ctx.fillStyle='#3a4070';ctx.beginPath();ctx.moveTo(W-12,oy);ctx.lineTo(W-20,oy-5);ctx.lineTo(W-20,oy+5);ctx.closePath();ctx.fill();
      ctx.fillStyle='#4a5080';ctx.font='bold 12px Inter';ctx.textAlign='left';ctx.fillText('d',W-8,oy+4);
      // tick marks on axis
      ctx.font='10px Inter';ctx.textAlign='center';
      for(let i=-5;i<=5;i++){const sx=ox+i*scale;ctx.strokeStyle='#2e3250';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(sx,oy-4);ctx.lineTo(sx,oy+4);ctx.stroke();if(i!==0)ctx.fillText(i,sx,oy+16);}
      ctx.fillText('0',ox,oy+16);

      const c1x=ox-dist*scale/2, c2x=ox+dist*scale/2;
      // sphere 1
      ctx.strokeStyle='rgba(91,124,250,0.85)';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(c1x,oy,r1*scale,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(91,124,250,0.06)';ctx.fill();
      // sphere 2
      ctx.strokeStyle='rgba(52,211,153,0.85)';ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(c2x,oy,r2*scale,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(52,211,153,0.06)';ctx.fill();
      // centers
      ctx.fillStyle='#5b7cfa';ctx.beginPath();ctx.arc(c1x,oy,5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#34d399';ctx.beginPath();ctx.arc(c2x,oy,5,0,Math.PI*2);ctx.fill();
      // labels
      ctx.fillStyle='#5b7cfa';ctx.font='12px Inter';ctx.textAlign='center';ctx.fillText(`S₁  r₁=${r1}`,c1x,oy-r1*scale-10);
      ctx.fillStyle='#34d399';ctx.fillText(`S₂  r₂=${r2}`,c2x,oy-r2*scale-10);
      // distance marker
      ctx.strokeStyle='#fbbf24';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
      ctx.beginPath();ctx.moveTo(c1x,oy);ctx.lineTo(c2x,oy);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#fbbf24';ctx.font='bold 12px Inter';ctx.textAlign='center';ctx.fillText(`d = ${dist}`,ox,oy+32);
      // intersection circle (if exists)
      const intersects=dist<r1+r2&&dist>Math.abs(r1-r2);
      if(intersects){
        const a2=(r1*r1-r2*r2+dist*dist)/(2*dist);
        const h=Math.sqrt(Math.max(0,r1*r1-a2*a2));
        const ix=c1x+a2*scale;
        ctx.strokeStyle='rgba(251,146,60,0.9)';ctx.lineWidth=2.5;
        ctx.beginPath();ctx.moveTo(ix,oy-h*scale);ctx.lineTo(ix,oy+h*scale);ctx.stroke();
        ctx.fillStyle='#fb923c';ctx.font='11px Inter';ctx.textAlign='left';
        ctx.fillText(`Circle of intersection r=${h.toFixed(3)}`,ix+6,oy);
      }
      const d=dist;
      const status=d===0&&r1===r2?'Identical spheres':d<=Math.abs(r1-r2)?'One sphere inside the other':intersects?'Spheres intersect (circle shown in orange)':'Disjoint spheres';
      ctx.fillStyle=intersects?'#34d399':d<=Math.abs(r1-r2)?'#a78bfa':'#fb923c';
      ctx.font='bold 13px Inter';ctx.textAlign='left';ctx.fillText(status,16,24);
    }

    draw();

    const ctrl=document.createElement('div');ctrl.className='visual-controls';
    ctrl.innerHTML=`<span class="vis-label" style="color:#5b7cfa">r₁:</span>${numInput('sr1','',r1,0.5,5,0.5,'#5b7cfa')}
      <span class="vis-label" style="color:#34d399;margin-left:8px">r₂:</span>${numInput('sr2','',r2,0.5,5,0.5,'#34d399')}
      <span class="vis-label" style="margin-left:8px">distance d:</span>${numInput('sdist','',dist,0,10,0.5,'#fbbf24')}`;
    container.appendChild(ctrl);
    ctrl.querySelector('#sr1').addEventListener('input',e=>{r1=+e.target.value||0.5;draw();});
    ctrl.querySelector('#sr2').addEventListener('input',e=>{r2=+e.target.value||0.5;draw();});
    ctrl.querySelector('#sdist').addEventListener('input',e=>{dist=+e.target.value||0;draw();});
  }

  // ── registry ──────────────────────────────────────────────
  const registry = {
    1:matrixGrid, 2:matrixGrid,
    3:gaussianElim, 4:gaussianElim, 5:gaussianElim,
    6:determinantVis,
    7:vectorOps, 8:vectorOps,
    9:lineAndPlane, 10:lineAndPlane,
    11:distanceVis,
    12:spanVis, 13:spanVis, 14:spanVis, 15:spanVis,
    16:linearMapVis, 17:linearMapVis,
    18:eigenVis, 19:eigenVis,
    20:gramSchmidt,
    21:quadraticForm,
    22:conicVis, 23:conicVis,
    24:sphereVis,
  };

  return {
    render(chapterId, container) {
      const fn = registry[chapterId];
      if (fn) fn(container);
      else container.innerHTML = '<div style="padding:2rem;color:#4a5080;text-align:center">Visual coming soon</div>';
    }
  };
})();
