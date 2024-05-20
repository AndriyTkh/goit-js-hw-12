import{a as f,S as h,i as c}from"./assets/vendor-3ed6ecd1.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function y(o,i){return f.get("https://pixabay.com/api/",{params:{key:"43812244-bec36bb850e93fe60ae9591d0",q:`${o}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:`${i}`,per_page:"15"}})}function F(o){const i=document.querySelector(".gallery");let s="";o.map(t=>{s+=`<li>
        <div class = "img-container">
            <a class="gallery-link" href="${t.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${t.webformatURL}"
                    alt="${t.tags}"
                />
            </a>
        </div>
        
        <ul class="description-list">
          <li>
            <span class="list-title">Likes</span>
            <p class="list-text">${t.likes}</p>
          </li>
          <li>
            <span class="list-title">Views</span>
            <p class="list-text">${t.views}</p>
          </li>
          <li>
            <span class="list-title">Comments</span>
            <p class="list-text">${t.comments}</p>
          </li>
          <li>
            <span class="list-title">Downloads</span>
            <p class="list-text">${t.downloads}</p>
          </li>
        </ul>
      </li>`}),i.innerHTML+=s}const m=document.querySelector(".search-form"),a=document.querySelector('button[type="button"]'),p=document.querySelector(".loader");let d,l,u=new h(".gallery-link");u.options.captionDelay=250;u.options.captionsData="alt";m.addEventListener("submit",o=>{o.preventDefault(),document.querySelector(".gallery").innerHTML="",l=1,g(l)});a.addEventListener("click",()=>{l+=1,g(l)});async function g(o){if(d=m.elements.userSearch.value.trim(),!d){c.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"No input provided",title:"Error",timeout:2e3});return}y(d,o).then(s=>{const t=s.data.hits;if(t.length==0){c.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"Sorry, there are no images matching your search query. Please try again!",title:"Error",timeout:2e3});return}p.hidden=!1,a.hidden=!0,setTimeout(()=>{p.hidden=!0,F(t),u.refresh(),s.data.totalHits<=o*15?(a.hidden=!0,c.info({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"#0099FF",progressBarColor:"#0071BD",message:"We're sorry, but you've reached the end of search results.",timeout:2e3})):a.hidden=!1,o!==1&&window.scrollBy({top:document.querySelector(".img-container").getBoundingClientRect().height*2,behavior:"smooth"})},500)}).catch(s=>{console.error(s)})}
//# sourceMappingURL=commonHelpers.js.map
