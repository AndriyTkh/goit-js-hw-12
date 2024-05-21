import{a as m,S as h,i as d}from"./assets/vendor-3ed6ecd1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();function y(t,r){return m.get("https://pixabay.com/api/",{params:{key:"43812244-bec36bb850e93fe60ae9591d0",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:`${r}`,per_page:"15"}})}function F(t){const r=document.querySelector(".gallery");let i="";t.map(o=>{i+=`<li>
        <div class = "img-container">
            <a class="gallery-link" href="${o.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${o.webformatURL}"
                    alt="${o.tags}"
                />
            </a>
        </div>
        
        <ul class="description-list">
          <li>
            <span class="list-title">Likes</span>
            <p class="list-text">${o.likes}</p>
          </li>
          <li>
            <span class="list-title">Views</span>
            <p class="list-text">${o.views}</p>
          </li>
          <li>
            <span class="list-title">Comments</span>
            <p class="list-text">${o.comments}</p>
          </li>
          <li>
            <span class="list-title">Downloads</span>
            <p class="list-text">${o.downloads}</p>
          </li>
        </ul>
      </li>`}),r.innerHTML+=i}const p=document.querySelector(".search-form"),a=document.querySelector('button[type="button"]'),g=document.querySelector(".loader");let u,l,n=new h(".gallery-link");n.options.captionDelay=250;n.options.captionsData="alt";p.addEventListener("submit",t=>{t.preventDefault(),document.querySelector(".gallery").innerHTML="",n.refresh(),l=1,f()});a.addEventListener("click",()=>{l+=1,f()});async function f(){if(u=p.elements.userSearch.value.trim(),!u){d.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"No input provided",title:"Error",timeout:2e3});return}let t;try{t=await y(u,l)}catch(o){console.error(o)}const r=t.data.hits,i=t.data.totalHits;if(r.length==0){a.hidden=!0,d.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"Sorry, there are no images matching your search query. Please try again!",title:"Error",timeout:2e3});return}g.hidden=!1,a.hidden=!0,setTimeout(()=>{b(r,i)},500)}function b(t,r){g.hidden=!0,F(t),n.refresh(),r<=l*15?(a.hidden=!0,d.info({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"#0099FF",progressBarColor:"#0071BD",message:"We're sorry, but you've reached the end of search results.",timeout:2e3})):a.hidden=!1,l!==1&&window.scrollBy({top:document.querySelector(".img-container").getBoundingClientRect().height*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
