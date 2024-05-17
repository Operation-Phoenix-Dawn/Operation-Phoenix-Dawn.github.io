﻿AudioWorkletProcessor.prototype._L=function(){this._M=true;this.port.onmessage=(_N)=>{if(_N.data==="kill")this._M=false;};};class _O extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._L();}process(_P,_Q,parameters){const input=_P[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _R=input[c];for(let _S=0;_S<_R.length;++_S){const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];
_Q[_T][c][_S]=_R[_S];}}return this._M;}}class _U extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._L();}process(_P,_Q,parameters){const _V=_P[0];const _W=_P[1];const output=_Q[0];const gain=parameters.gain;for(let c=0;c<_W.length;++c){const _R=_W[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S)_X[_S]=_R[_S];}for(let c=0;c<_V.length;++c){const _R=_V[c];const _X=output[c];for(let _S=0;_S<_R.length;
++_S){const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];_X[_S]+=_R[_S]*_Y;}}return this._M;}}registerProcessor("audio-bus-input",_O);registerProcessor("audio-bus-output",_U);class _Z extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100},{name:"resolution",automationRate:"a-rate",
defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static __=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._21=new Float32Array(_11);this._31=new Uint32Array(_11);}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const gain=parameters.gain;const factor=parameters.factor;const resolution=parameters.resolution;
const mix=parameters.mix;for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){_X[_S]=_R[_S];if(this._31[c]===0)this._21[c]=_R[_S];const _41=(factor[_S]!==undefined)?factor[_S]:factor[0];++this._31[c];this._31[c]%=_41;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0.0){continue;}let _51=this._21[c];const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];_51*=_Y;_51=Math.max(Math.min(_51,1.0),-1.0);const _61=(resolution[_S]!==undefined)?resolution[_S]:resolution[0];
const max=(_51>0.0)?_Z.__[_61]-1:_Z.__[_61];_51=Math.round(_51*max)/max;const _71=(mix[_S]!==undefined)?mix[_S]:mix[0];_X[_S]*=(1.0-_71);_X[_S]+=(_51*_71);}}return this._M;}}registerProcessor("bitcrusher-processor",_Z);class _81{constructor(_91=1e-3){this.setTime(_91);}setTime(_91){this._a1=Math.exp(-1/(_91*sampleRate));}process(_b1,_c1){return _b1+this._a1*(_c1-_b1);}}class _d1{constructor(_e1,_f1){this._g1=new _81(_e1);this._h1=new _81(_f1);this._i1=_e1;this._j1=_f1;}_k1(_91){if(_91===this._i1)return;
this._g1.setTime(_91);this._i1=_91;}_l1(_91){if(_91===this._j1)return;this._h1.setTime(_91);this._j1=_91;}process(_b1,_c1){if(_b1>_c1)return this._g1.process(_b1,_c1);else return this._h1.process(_b1,_c1);}}class _m1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0},{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1}
,{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_n1){super();this._L();const _g1=_m1.parameterDescriptors.find(_o1=>_o1.name==="attack");const _h1=_m1.parameterDescriptors.find(_o1=>_o1.name==="release");this._p1=new _d1(_g1.defaultValue,
_h1.defaultValue);this._q1=0;}process(_r1,_s1,_t1){const input=_r1[0];const output=_s1[0];const bypass=_t1.bypass;const ingain=_t1.ingain;const outgain=_t1.outgain;const threshold=_t1.threshold;const ratio=_t1.ratio;const attack=_t1.attack;const release=_t1.release;if(input.length===0)return this._M;for(let _S=0;_S<input[0].length;++_S){let frame=input.map(_u1=>_u1[_S]);output.forEach((_u1,_v1)=>{_u1[_S]=frame[_v1];});const _w1=(ingain[_S]!==undefined)?ingain[_S]:ingain[0];frame=frame.map(_x1=>_x1*=_w1);const rect=frame.map(_x1=>Math.abs(_x1));
const max=Math.max(...rect);const _y1=_z1(max);const _A1=(threshold[_S]!==undefined)?threshold[_S]:threshold[0];const _B1=_z1(_A1);const _C1=Math.max(0,_y1-_B1);const _g1=(attack[_S]!==undefined)?attack[_S]:attack[0];const _h1=(release[_S]!==undefined)?release[_S]:release[0];this._p1._k1(_g1);this._p1._l1(_h1);this._q1=this._p1.process(_C1,this._q1);const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0)continue;const _61=(ratio[_S]!==undefined)?ratio[_S]:ratio[0];const _D1=(this._q1/_61)-this._q1;
const _Y=_E1(_D1);frame=frame.map(_x1=>_x1*=_Y);const _F1=(outgain[_S]!==undefined)?outgain[_S]:outgain[0];frame=frame.map(_x1=>_x1*=_F1);output.forEach((_u1,_v1)=>{_u1[_S]=frame[_v1];});}return this._M;}}function _z1(_G1){return 20*Math.log10(_G1);}function _E1(_G1){return Math.pow(10,_G1/20);}registerProcessor("compressor-processor",_m1);class _H1 extends AudioWorkletProcessor{static _I1=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}
,{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_H1._I1},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];const _J1=(_H1._I1*sampleRate)+1;this.buffer=new Array(_11);this._K1=new Uint32Array(_11);for(let c=0;c<_11;++c)this.buffer[c]=new Float32Array(_J1);}process(_P,_Q,parameters){const input=_P[0];
const output=_Q[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){_X[_S]=_R[_S];const _A1=(time[_S]!==undefined)?time[_S]:time[0];const _L1=this._M1(c,_A1);const _41=(feedback[_S]!==undefined)?feedback[_S]:feedback[0];const _N1=_R[_S]+(_L1*_41);this.write(c,_N1);const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0.0){continue;}const _71=(mix[_S]!==undefined)?mix[_S]:mix[0];
_X[_S]*=(1-_71);_X[_S]+=(_L1*_71);}}return this._M;}_M1(_O1,_91){const _P1=_91*sampleRate;let _Q1=(this._K1[_O1]-~~_P1);let _R1=(_Q1-1);while(_Q1<0)_Q1+=this.buffer[_O1].length;while(_R1<0)_R1+=this.buffer[_O1].length;const frac=_P1-~~_P1;const _S1=this.buffer[_O1][_Q1];const _T1=this.buffer[_O1][_R1];return _S1+(_T1-_S1)*frac;}write(_O1,_U1){++this._K1[_O1];this._K1[_O1]%=this.buffer[_O1].length;this.buffer[_O1][this._K1[_O1]]=_U1;}}registerProcessor("delay-processor",_H1);class _V1 extends AudioWorkletProcessor{
static get parameterDescriptors(){return [];}constructor(){super();this._L();}process(_W1,_X1,_Y1){const input=_W1[0];const _Z1=_X1[0];const __1=_X1[1];for(let c=0;c<input.length;++c){const _R=input[c];const _02=_Z1[c];const _12=__1[c];for(let _S=0;_S<_R.length;++_S){_02[_S]=_R[_S];_12[_S]=_R[_S];}}return this._M;}}class _22 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._L();}process(_W1,
_X1,_Y1){const _V=_W1[0];const _W=_W1[1];const output=_X1[0];const bypass=_Y1.bypass;for(let c=0;c<_W.length;++c){const _32=_V[c];const _42=_W[c];const _X=output[c];for(let _S=0;_S<_32.length;++_S){const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0){_X[_S]=_42[_S];}else {_X[_S]=_32[_S];}}}return this._M;}}registerProcessor("eq-input",_V1);registerProcessor("eq-output",_22);class _52 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,
minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._L();}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){_X[_S]=_R[_S];const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0.0){continue;}const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];_X[_S]*=_Y;}}return this._M;
}}registerProcessor("gain-processor",_52);class _62 extends AudioWorkletProcessor{static get parameterDescriptors(){const _72=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_72),minValue:10.0,maxValue:_72},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_01){
super();this._L();const _11=_01.outputChannelCount[0];this._82=0;this._92=0;this._a2=0;this._b2=0;this._c2=0;this._d2=new Float32Array(_11);this._e2=new Float32Array(_11);this._f2=new Float32Array(_11);this._g2=new Float32Array(_11);this._h2=-1;this._i2=-1;this._j2=-1;}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _k2=(freq.length===1&&q.length===1&&gain.length===1);if(_k2)this._l2(freq[0],
q[0],gain[0]);for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){if(_k2===false){const _41=(freq[_S]!==undefined)?freq[_S]:freq[0];const _m2=(q[_S]!==undefined)?q[_S]:q[0];const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];this._l2(_41,_m2,_Y);}const _n2=this._a2*_R[_S]+this._b2*this._d2[c]+this._c2*this._e2[c]-this._82*this._f2[c]-this._92*this._g2[c];this._e2[c]=this._d2[c];this._d2[c]=_R[_S];this._g2[c]=this._f2[c];this._f2[c]=_n2;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];
_X[_S]=(_T>0)?_R[_S]:_n2;}}return this._M;}_l2(_o2,_p2,_q2){if(_o2===this._h2&&_p2===this._i2&&_q2===this._j2)return;const _r2=2*Math.PI*_o2/sampleRate;const _s2=Math.cos(_r2);const _t2=Math.sqrt(_q2);const _u2=_t2+1;const _v2=_t2-1;const _w2=_u2*_s2;const _x2=_v2*_s2;const _y2=_u2-_x2;const _z2=_u2+_x2;const alpha=Math.sin(_r2)/(2*_p2);const _A2=(2*Math.sqrt(_t2)*alpha);const _B2=_y2+_A2;const _82=2*(_v2-_w2);const _92=_y2-_A2;const _a2=_t2*(_z2+_A2);const _b2=-2*_t2*(_v2+_w2);const _c2=_t2*(_z2-_A2);this._82=_82/_B2;
this._92=_92/_B2;this._a2=_a2/_B2;this._b2=_b2/_B2;this._c2=_c2/_B2;this._h2=_o2;this._i2=_p2;this._j2=_q2;}}registerProcessor("hi-shelf-processor",_62);class _C2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _D2=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(1500.0,_D2),minValue:10.0,maxValue:_D2},{name:"q",automationRate:"a-rate",defaultValue:1.5,
minValue:1.0,maxValue:100.0}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._82=0;this._92=0;this._a2=0;this._b2=0;this._c2=0;this._d2=new Float32Array(_11);this._e2=new Float32Array(_11);this._f2=new Float32Array(_11);this._g2=new Float32Array(_11);this._E2=-1;this._i2=-1;}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _k2=(cutoff.length===1&&q.length===1);if(_k2)this._l2(cutoff[0],
q[0]);for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){if(_k2===false){const c=(cutoff[_S]!==undefined)?cutoff[_S]:cutoff[0];const _m2=(q[_S]!==undefined)?q[_S]:q[0];this._l2(c,_m2);}const _n2=this._a2*_R[_S]+this._b2*this._d2[c]+this._c2*this._e2[c]-this._82*this._f2[c]-this._92*this._g2[c];this._e2[c]=this._d2[c];this._d2[c]=_R[_S];this._g2[c]=this._f2[c];this._f2[c]=_n2;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];_X[_S]=(_T>0)?_R[_S]:_n2;
}}return this._M;}_l2(_F2,_p2){if(_F2===this._E2&&_p2===this._i2)return;const _r2=2*Math.PI*_F2/sampleRate;const alpha=Math.sin(_r2)/(2*_p2);const _s2=Math.cos(_r2);const _B2=1+alpha;const _82=-2*_s2;const _92=1-alpha;const _a2=(1+_s2)/2;const _b2=-1-_s2;const _c2=(1+_s2)/2;this._82=_82/_B2;this._92=_92/_B2;this._a2=_a2/_B2;this._b2=_b2/_B2;this._c2=_c2/_B2;this._E2=_F2;this._i2=_p2;}}registerProcessor("hpf2-processor",_C2);class _G2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _72=Math.min(sampleRate/2.0,
20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_72),minValue:10.0,maxValue:_72},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._82=0;this._92=0;this._a2=0;this._b2=0;this._c2=0;this._d2=new Float32Array(_11);this._e2=new Float32Array(_11);
this._f2=new Float32Array(_11);this._g2=new Float32Array(_11);this._h2=-1;this._i2=-1;this._j2=-1;}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _k2=(freq.length===1&&q.length===1&&gain.length===1);if(_k2)this._l2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){if(_k2===false){const _41=(freq[_S]!==undefined)?freq[_S]:freq[0];
const _m2=(q[_S]!==undefined)?q[_S]:q[0];const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];this._l2(_41,_m2,_Y);}const _n2=this._a2*_R[_S]+this._b2*this._d2[c]+this._c2*this._e2[c]-this._82*this._f2[c]-this._92*this._g2[c];this._e2[c]=this._d2[c];this._d2[c]=_R[_S];this._g2[c]=this._f2[c];this._f2[c]=_n2;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];_X[_S]=(_T>0)?_R[_S]:_n2;}}return this._M;}_l2(_o2,_p2,_q2){if(_o2===this._h2&&_p2===this._i2&&_q2===this._j2)return;const _r2=2*Math.PI*_o2/sampleRate;
const _s2=Math.cos(_r2);const _t2=Math.sqrt(_q2);const _u2=_t2+1;const _v2=_t2-1;const _w2=_u2*_s2;const _x2=_v2*_s2;const _y2=_u2-_x2;const _z2=_u2+_x2;const alpha=Math.sin(_r2)/(2*_p2);const _A2=(2*Math.sqrt(_t2)*alpha);const _B2=_z2+_A2;const _82=-2*(_v2+_w2);const _92=_z2-_A2;const _a2=_t2*(_y2+_A2);const _b2=2*_t2*(_v2-_w2);const _c2=_t2*(_y2-_A2);this._82=_82/_B2;this._92=_92/_B2;this._a2=_a2/_B2;this._b2=_b2/_B2;this._c2=_c2/_B2;this._h2=_o2;this._i2=_p2;this._j2=_q2;}}registerProcessor("lo-shelf-processor",
_G2);class _H2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _D2=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_D2),minValue:10.0,maxValue:_D2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._82=0;this._92=0;this._a2=0;this._b2=0;this._c2=0;
this._d2=new Float32Array(_11);this._e2=new Float32Array(_11);this._f2=new Float32Array(_11);this._g2=new Float32Array(_11);this._E2=-1;this._i2=-1;}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _k2=(cutoff.length===1&&q.length===1);if(_k2)this._l2(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){if(_k2===false){const c=(cutoff[_S]!==undefined)?cutoff[_S]:cutoff[0];
const _m2=(q[_S]!==undefined)?q[_S]:q[0];this._l2(c,_m2);}const _n2=this._a2*_R[_S]+this._b2*this._d2[c]+this._c2*this._e2[c]-this._82*this._f2[c]-this._92*this._g2[c];this._e2[c]=this._d2[c];this._d2[c]=_R[_S];this._g2[c]=this._f2[c];this._f2[c]=_n2;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];_X[_S]=(_T>0)?_R[_S]:_n2;}}return this._M;}_l2(_F2,_p2){if(_F2===this._E2&&_p2===this._i2)return;const _r2=2*Math.PI*_F2/sampleRate;const alpha=Math.sin(_r2)/(2*_p2);const _s2=Math.cos(_r2);const _B2=1+alpha;
const _82=-2*_s2;const _92=1-alpha;const _a2=(1-_s2)/2;const _b2=1-_s2;const _c2=(1-_s2)/2;this._82=_82/_B2;this._92=_92/_B2;this._a2=_a2/_B2;this._b2=_b2/_B2;this._c2=_c2/_B2;this._E2=_F2;this._i2=_p2;}}registerProcessor("lpf2-processor",_H2);class _I2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _72=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,
_72),minValue:10.0,maxValue:_72},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._82=0;this._92=0;this._a2=0;this._b2=0;this._c2=0;this._d2=new Float32Array(_11);this._e2=new Float32Array(_11);this._f2=new Float32Array(_11);this._g2=new Float32Array(_11);this._h2=-1;this._i2=-1;this._j2=-1;}process(_P,_Q,parameters){const input=_P[0];
const output=_Q[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _k2=(freq.length===1&&q.length===1&&gain.length===1);if(_k2)this._l2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){if(_k2===false){const _41=(freq[_S]!==undefined)?freq[_S]:freq[0];const _m2=(q[_S]!==undefined)?q[_S]:q[0];const _Y=(gain[_S]!==undefined)?gain[_S]:gain[0];this._l2(_41,_m2,_Y);}const _n2=this._a2*_R[_S]+this._b2*this._d2[c]+this._c2*this._e2[c]-this._82*this._f2[c]-this._92*this._g2[c];
this._e2[c]=this._d2[c];this._d2[c]=_R[_S];this._g2[c]=this._f2[c];this._f2[c]=_n2;const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];_X[_S]=(_T>0)?_R[_S]:_n2;}}return this._M;}_l2(_o2,_p2,_q2){if(_o2===this._h2&&_p2===this._i2&&_q2===this._j2)return;const _r2=2*Math.PI*_o2/sampleRate;const _s2=Math.cos(_r2);const _t2=Math.sqrt(_q2);const alpha=Math.sin(_r2)/(2*_p2);const _J2=alpha/_t2;const _K2=alpha*_t2;const _B2=1+_J2;const _82=-2*_s2;const _92=1-_J2;const _a2=1+_K2;const _b2=_82;const _c2=1-_K2;this._82=_82/_B2;
this._92=_92/_B2;this._a2=_a2/_B2;this._b2=_b2/_B2;this._c2=_c2/_B2;this._h2=_o2;this._i2=_p2;this._j2=_q2;}}registerProcessor("peak-eq-processor",_I2);class _L2{constructor(_M2){this._N2=0;this._O2=0;this.feedback=0;this._P2=0;this.buffer=new Float32Array(_M2);this._Q2=0;}process(_U1){const out=this.buffer[this._Q2];this._P2=(this._P2*this._N2)+(out*this._O2);this.buffer[this._Q2]=_U1+(this._P2*this.feedback);++this._Q2;this._Q2%=this.buffer.length;return out;}_R2(_S2){this.feedback=Math.min(Math.max(0,
_S2),1);}_T2(_U2){this._N2=Math.min(Math.max(0,_U2),1);this._O2=1-this._N2;}}class _V2{constructor(_M2){this.feedback=0;this.buffer=new Float32Array(_M2);this._Q2=0;}process(_U1){const out=this.buffer[this._Q2];this.buffer[this._Q2]=_U1+(out*this.feedback);++this._Q2;this._Q2%=this.buffer.length;return(out-_U1);}_R2(_S2){this.feedback=Math.min(Math.max(0,_S2),1);}}class _W2 extends AudioWorkletProcessor{static _X2=8;static _Y2=4;static _Z2=0.015;static __2=0.4;static _03=0.28;static _13=0.7;static _23=[1116,
1188,1277,1356,1422,1491,1557,1617];static _33=[1139,1211,1300,1379,1445,1514,1580,1640];static _43=[556,441,341,225];static _53=[579,464,364,248];static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}
];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._63=-1;this._73=-1;this._83=new Array(_11);this._93=new Array(_11);const _a3=[_W2._23,_W2._33];const _b3=[_W2._43,_W2._53];for(let c=0;c<_11;++c){this._83[c]=new Array(_W2._X2);this._93[c]=new Array(_W2._Y2);for(let i=0;i<_W2._X2;++i)this._83[c][i]=new _L2(_a3[c%_a3.length][i]);for(let i=0;i<_W2._Y2;++i)this._93[c][i]=new _V2(_b3[c%_b3.length][i]);}this._c3(0.5);this._T2(0.5);for(let c=0;c<_11;++c)for(let i=0;i<_W2._Y2;++i)this._93[c][i]._R2(0.5);
}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _d3=0;_d3<_R.length;++_d3){const _S=(size[_d3]!==undefined)?size[_d3]:size[0];const _e3=(damp[_d3]!==undefined)?damp[_d3]:damp[0];this._c3(_S);this._T2(_e3);_X[_d3]=_R[_d3];let out=0;const _51=_R[_d3]*_W2._Z2;for(let i=0;i<_W2._X2;++i)out+=this._83[c][i].process(_51);
for(let i=0;i<_W2._Y2;++i)out=this._93[c][i].process(out);const _T=(bypass[_d3]!==undefined)?bypass[_d3]:bypass[0];if(_T>0.0){continue;}const _71=(mix[_d3]!==undefined)?mix[_d3]:mix[0];_X[_d3]*=(1-_71);_X[_d3]+=(out*_71);}}return this._M;}_c3(_M2){if(_M2===this._63)return;const size=(_M2*_W2._03)+_W2._13;for(let c=0;c<this._83.length;++c)for(let i=0;i<_W2._X2;++i)this._83[c][i]._R2(size);this._63=_M2;}_T2(_U2){if(_U2===this._73)return;const damp=_U2*_W2.__2;for(let c=0;c<this._83.length;++c)for(let i=0;i<_W2._X2;
++i)this._83[c][i]._T2(damp);this._73=_U2;}}registerProcessor("reverb1-processor",_W2);class _f3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",
automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_01){super();this._L();const _11=_01.outputChannelCount[0];this._g3=new Array(_11).fill(1.0);this._h3=new Array(_11).fill(0.0);this._i3=new Array(_11).fill(_j3._k3._l3);this._m3=new Array(_11);for(let c=0;c<_11;++c){this._m3[c]=new _n3();this._m3[c]._o3(sampleRate);this._m3[c]._p3(this._g3[c]);this._m3[c]._q3(this._i3[c]);if(c%2===1){this._m3[c]._r3(this._h3[c]);}}}process(_P,_Q,parameters){const input=_P[0];const output=_Q[0];const bypass=parameters.bypass;
const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _R=input[c];const _X=output[c];for(let _S=0;_S<_R.length;++_S){_X[_S]=_R[_S];const _61=(rate[_S]!==undefined)?rate[_S]:rate[0];const _s3=(offset[_S]!==undefined)?offset[_S]:offset[0];const _t3=(shape[_S]!==undefined)?shape[_S]:shape[0];this._u3(c,_61,_s3,_t3);const _v3=this._m3[c]._M1();const _T=(bypass[_S]!==undefined)?bypass[_S]:bypass[0];if(_T>0.0){
continue;}const i=(intensity[_S]!==undefined)?intensity[_S]:intensity[0];const out=_R[_S]*_v3*i;_X[_S]*=(1.0-i);_X[_S]+=out;}}return this._M;}_u3(_O1,_w3,_x3,_y3){if(_w3!==this._g3[_O1]){this._m3[_O1]._p3(_w3);this._g3[_O1]=_w3;}if(_x3!==this._h3[_O1]){if(_O1%2===1){this._m3[_O1]._r3(_x3);}this._h3[_O1]=_x3;}if(_y3!==this._i3[_O1]){this._m3[_O1]._q3(_y3);this._i3[_O1]=_y3;}}}registerProcessor("tremolo-processor",_f3);function _j3(){}_j3._k3={_l3:0,_z3:1,_A3:2,_B3:3,_C3:4,_D3:5};_j3._E3=function(_F3){
return 1.0-_F3;};_j3._G3=function(_F3){return _F3;};_j3._H3=function(_F3){return 0.5*(Math.sin((_F3*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_j3._I3=function(_F3){if(_F3<0.5){return 0.0;}return 1.0;};_j3._J3=function(_F3){if(_F3<0.5){return 2.0*_F3;}return 2.0-(2.0*_F3);};_j3._K3=[_j3._E3,_j3._G3,_j3._H3,_j3._I3,_j3._J3];_L3._M3=512;_L3._N3=1.0/_L3._M3;function _L3(_O3){this.data=new Float32Array(_L3._M3);for(let i=0;i<_L3._M3;++i){this.data[i]=_O3(i*_L3._N3);}}_L3.prototype._M1=function(_F3){_F3=Math.max(0.0,_F3);
_F3=Math.min(_F3,1.0);const _P3=_F3*_L3._M3;const _Q3=~~_P3;const _R3=_P3-_Q3;let _Q1=_Q3;let _R1=_Q1+1;if(_Q1>=_L3._M3){_Q1-=_L3._M3;}if(_R1>=_L3._M3){_R1-=_L3._M3;}const _S1=this.data[_Q1];const _T1=this.data[_R1];return _S1+(_T1-_S1)*_R3;};_n3._S3=[];_n3._T3=false;_n3._U3=0.0;_n3._72=20.0;function _n3(){this._V3=48000;this.shape=_j3._k3._A3;this.freq=1.0;this._W3=0.0;this._N3=0.0;this._X3=0.0;if(_n3._T3==true){return;}for(let i=0;i<_j3._k3._D3;++i){_n3._S3[i]=new _L3(_j3._K3[i]);}_n3._T3=true;}_n3._Y3=function(){
return(_n3._T3==true);};_n3.prototype._o3=function(_Z3){this._V3=_Z3;this.__3();};_n3.prototype._p3=function(_o2){_o2=Math.max(_n3._U3,_o2);_o2=Math.min(_o2,_n3._72);this.freq=_o2;this.__3();};_n3.prototype._r3=function(_x3){_x3=Math.max(0.0,_x3);_x3=Math.min(_x3,1.0);const _04=_x3-this._X3;this._X3=_x3;this._W3+=_04;while(this._W3>=1.0){this._W3-=1.0;}while(this._W3<0.0){this._W3+=1.0;}};_n3.prototype._q3=function(_y3){_y3=Math.max(0,_y3);_y3=Math.min(_y3,_j3._k3._D3-1);this.shape=_y3;};_n3.prototype._M1=function(){
const result=_n3._S3[this.shape]._M1(this._W3);this._W3+=this._N3;while(this._W3>=1.0){this._W3-=1.0;}return result;};_n3.prototype.__3=function(){this._N3=this.freq/this._V3;};