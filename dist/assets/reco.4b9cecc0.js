import{_ as v,a as w}from"./index.0117ab02.js";import{h as b,o as t,k as l,t as m,B as E,y as i,C as M,i as u,v as V,D as z,E as j,m as s,w as n,G as D,H as P,p as e,I as C,F as f,l as y,c as I,J as k,z as R,L as x,M as B,N as T,n as U}from"./vendor.97637db4.js";const W={key:0,class:"m-panel-name"},q={class:"m-panel-content"},G=b({props:{name:String},setup(o){return(_,h)=>(t(),l("div",{class:"m-panel",ref:(r,c)=>{c.panel=r}},[o.name?(t(),l("h4",W,m(o.name),1)):E("",!0),i("div",q,[M(_.$slots,"default",{ref:(r,c)=>{c.panelRef=r}},void 0,!0)])],512))}});var S=v(G,[["__scopeId","data-v-2ac7173a"]]);const H=o=>(D("data-v-ba16b73a"),o=o(),P(),o),J={id:"reco"},A=H(()=>i("div",null,null,-1)),K={class:"song-content"},O=["onClick"],Q={class:"playCount"},X={class:"name"},Y=b({setup(o){let _=u([]),h=u({}),r=u(!0),c=u(!0);const L=V();let $=u(document.body.clientWidth-40);const F=p=>{L.push({path:`/playlist/detail/${p.id}`})};return z(async()=>{const p=async()=>{const{banners:a}=await w.get({url:"/banner",data:{type:"2"}});r.value=!1,_.value=a},g=async()=>{const{playlists:a}=await w.get({url:"/top/playlist/highquality",data:{limit:"12",order:"hot"}});c.value=!1,h.value={[1]:a.slice(0,6),[2]:a.slice(6,12)}};p(),g()}),j(()=>{}),(p,g)=>(t(),l("div",J,[s(S,null,{default:n(()=>[s(e(C),{row:5,loading:e(r)},{default:n(()=>[s(e(B),{autoplay:5e3,"lazy-render":"",class:"my-swipe"},{default:n(()=>[(t(!0),l(f,null,y(e(_),a=>(t(),I(e(x),{key:a.bannerId},{default:n(()=>[s(e(k),{width:"100%",height:"100%",src:a.pic},null,8,["src"]),i("span",{class:R(["tis-label",a.titleColor])},m(a.typeTitle),3)]),_:2},1024))),128))]),_:1})]),_:1},8,["loading"])]),_:1}),A,s(S,{class:"panel",name:"\u7F51\u53CB\u7CBE\u9009\u6B4C\u5355"},{default:n(()=>[s(e(C),{row:5,loading:e(c)},{default:n(()=>[s(e(B),{loop:!1,width:e($),"show-indicators":!1,class:"song-sheet-swipe"},{default:n(()=>[(t(!0),l(f,null,y(e(h),(a,N)=>(t(),I(e(x),{key:N},{default:n(()=>[i("div",K,[(t(!0),l(f,null,y(a,d=>(t(),l("div",{class:"song-box",onClick:Z=>F(d),key:d.userId},[s(e(k),{class:"coverImgUrl",fit:"cover",src:d.coverImgUrl},null,8,["src"]),i("span",Q,[s(e(T),{name:"play",color:"white"}),U(" "+m(Math.floor(d.playCount/1e4))+"\u4E07 ",1)]),i("div",X,m(d.name),1)],8,O))),128))])]),_:2},1024))),128))]),_:1},8,["width"])]),_:1},8,["loading"])]),_:1})]))}});var te=v(Y,[["__scopeId","data-v-ba16b73a"]]);export{te as default};
