import{c as K,t as D,n as L,m as E,o as A,w as U}from"./index.d8a3e501.js";import{h as m,g as q,z as F,k as w,s as P,E as J,O as ce,P as fe,R as de,i as x,G as he}from"./vendor.f7f2557a.js";import{i as R,u as H,a as Q,o as me,d as O,b as we,p as ge}from"./index.2db16e7d.js";import{u as be,a as ye}from"./useChildren.91c7542d.js";function Se(){var e=m(R?window.innerWidth:0),l=m(R?window.innerHeight:0),n=()=>{e.value=window.innerWidth,l.value=window.innerHeight};return H("resize",n),H("orientationchange",n),{width:e,height:l}}function ze(){var e=m("visible"),l=()=>{R&&(e.value=document.hidden?"hidden":"visible")};return l(),H("visibilitychange",l),e}var Z=10;function Te(e,l){return e>l&&e>Z?"horizontal":l>e&&l>Z?"vertical":""}function pe(){var e=m(0),l=m(0),n=m(0),o=m(0),a=m(0),v=m(0),h=m(""),g=()=>h.value==="vertical",T=()=>h.value==="horizontal",i=()=>{n.value=0,o.value=0,a.value=0,v.value=0,h.value=""},s=f=>{i(),e.value=f.touches[0].clientX,l.value=f.touches[0].clientY},c=f=>{var S=f.touches[0];n.value=S.clientX<0?0:S.clientX-e.value,o.value=S.clientY-l.value,a.value=Math.abs(n.value),v.value=Math.abs(o.value),h.value||(h.value=Te(a.value,v.value))};return{move:c,start:s,reset:i,startX:e,startY:l,deltaX:n,deltaY:o,offsetX:a,offsetY:v,direction:h,isVertical:g,isHorizontal:T}}var[$,k]=K("swipe"),Ce={loop:D,width:L,height:L,vertical:Boolean,autoplay:E(0),duration:E(500),touchable:D,lazyRender:Boolean,initialSwipe:E(0),indicatorColor:String,showIndicators:D,stopPropagation:D},ee=Symbol($),Ie=q({name:$,props:Ce,emits:["change"],setup(e,{emit:l,slots:n}){var o=m(),a=F({rect:null,width:0,height:0,offset:0,active:0,swiping:!1}),v=pe(),h=Se(),{children:g,linkChildren:T}=be(ee),i=w(()=>g.length),s=w(()=>a[e.vertical?"height":"width"]),c=w(()=>e.vertical?v.deltaY.value:v.deltaX.value),f=w(()=>{if(a.rect){var t=e.vertical?a.rect.height:a.rect.width;return t-s.value*i.value}return 0}),S=w(()=>Math.ceil(Math.abs(f.value)/s.value)),p=w(()=>i.value*s.value),X=w(()=>(a.active+i.value)%i.value),N=w(()=>{var t=e.vertical?"vertical":"horizontal";return v.direction.value===t}),ae=w(()=>{var t={transitionDuration:(a.swiping?0:e.duration)+"ms",transform:"translate"+(e.vertical?"Y":"X")+"("+a.offset+"px)"};if(s.value){var u=e.vertical?"height":"width",r=e.vertical?"width":"height";t[u]=p.value+"px",t[r]=e[r]?e[r]+"px":""}return t}),te=t=>{var{active:u}=a;return t?e.loop?A(u+t,-1,i.value):A(u+t,0,S.value):u},W=(t,u=0)=>{var r=t*s.value;e.loop||(r=Math.min(r,-f.value));var d=u-r;return e.loop||(d=A(d,f.value,0)),d},y=({pace:t=0,offset:u=0,emitChange:r})=>{if(!(i.value<=1)){var{active:d}=a,b=te(t),M=W(b,u);if(e.loop){if(g[0]&&M!==f.value){var oe=M<f.value;g[0].setOffset(oe?p.value:0)}if(g[i.value-1]&&M!==0){var se=M>0;g[i.value-1].setOffset(se?-p.value:0)}}a.active=b,a.offset=M,r&&b!==d&&l("change",X.value)}},Y=()=>{a.swiping=!0,a.active<=-1?y({pace:i.value}):a.active>=i.value&&y({pace:-i.value})},ie=()=>{Y(),v.reset(),O(()=>{a.swiping=!1,y({pace:-1,emitChange:!0})})},j=()=>{Y(),v.reset(),O(()=>{a.swiping=!1,y({pace:1,emitChange:!0})})},B,C=()=>clearTimeout(B),I=()=>{C(),e.autoplay>0&&i.value>1&&(B=setTimeout(()=>{j(),I()},+e.autoplay))},z=(t=+e.initialSwipe)=>{if(!!o.value){if(!we(o)){var u,r,d={width:o.value.offsetWidth,height:o.value.offsetHeight};a.rect=d,a.width=+((u=e.width)!=null?u:d.width),a.height=+((r=e.height)!=null?r:d.height)}i.value&&(t=Math.min(i.value-1,t)),a.active=t,a.swiping=!0,a.offset=W(t),g.forEach(b=>{b.setOffset(0)}),I()}},V=()=>z(a.active),_,re=t=>{!e.touchable||(v.start(t),_=Date.now(),C(),Y())},ve=t=>{e.touchable&&a.swiping&&(v.move(t),N.value&&(ge(t,e.stopPropagation),y({offset:c.value})))},G=()=>{if(!(!e.touchable||!a.swiping)){var t=Date.now()-_,u=c.value/t,r=Math.abs(u)>.25||Math.abs(c.value)>s.value/2;if(r&&N.value){var d=e.vertical?v.offsetY.value:v.offsetX.value,b=0;e.loop?b=d>0?c.value>0?-1:1:0:b=-Math[c.value>0?"ceil":"floor"](c.value/s.value),y({pace:b,emitChange:!0})}else c.value&&y({pace:0});a.swiping=!1,I()}},le=(t,u={})=>{Y(),v.reset(),O(()=>{var r;e.loop&&t===i.value?r=a.active===0?0:t:r=t%i.value,u.immediate?O(()=>{a.swiping=!1}):a.swiping=!1,y({pace:r-a.active,emitChange:!0})})},ue=(t,u)=>{var r=u===X.value,d=r?{backgroundColor:e.indicatorColor}:void 0;return x("i",{style:d,class:k("indicator",{active:r})},null)},ne=()=>{if(n.indicator)return n.indicator({active:X.value});if(e.showIndicators&&i.value>1)return x("div",{class:k("indicators",{vertical:e.vertical})},[Array(i.value).fill("").map(ue)])};return Q({prev:ie,next:j,state:a,resize:V,swipeTo:le}),T({size:s,props:e,count:i,activeIndicator:X}),P(()=>e.initialSwipe,t=>z(+t)),P(i,()=>z(a.active)),P(()=>e.autoplay,I),P([h.width,h.height],V),P(ze(),t=>{t==="visible"?I():C()}),J(z),ce(()=>z(a.active)),me(()=>z(a.active)),fe(C),de(C),()=>x("div",{ref:o,class:k()},[x("div",{style:ae.value,class:k("track",{vertical:e.vertical}),onTouchstart:re,onTouchmove:ve,onTouchend:G,onTouchcancel:G},[n.default==null?void 0:n.default()]),ne()])}}),ke=U(Ie),[Me,Pe]=K("swipe-item"),xe=q({name:Me,setup(e,{slots:l}){var n,o=F({offset:0,inited:!1,mounted:!1}),{parent:a,index:v}=ye(ee);if(!!a){var h=w(()=>{var i={},{vertical:s}=a.props;return a.size.value&&(i[s?"height":"width"]=a.size.value+"px"),o.offset&&(i.transform="translate"+(s?"Y":"X")+"("+o.offset+"px)"),i}),g=w(()=>{var{loop:i,lazyRender:s}=a.props;if(!s||n)return!0;if(!o.mounted)return!1;var c=a.activeIndicator.value,f=a.count.value-1,S=c===0&&i?f:c-1,p=c===f&&i?0:c+1;return n=v.value===c||v.value===S||v.value===p,n}),T=i=>{o.offset=i};return J(()=>{he(()=>{o.mounted=!0})}),Q({setOffset:T}),()=>x("div",{class:Pe(),style:h.value},[g.value?l.default==null?void 0:l.default():null])}}}),Ee=U(xe);export{ke as S,Ee as a,pe as b,Se as u};