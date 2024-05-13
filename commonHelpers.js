import{S as p,i as c}from"./assets/vendor-3fe00192.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function m(i){const s="https://pixabay.com/api/?"+new URLSearchParams({key:"43812244-bec36bb850e93fe60ae9591d0",q:`${i}`,image_type:"photo",orientation:"horizontal",safesearch:"true"}).toString();return fetch(s).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}function f(i){const o=document.querySelector(".gallery");let s="";i.map(e=>{s+=`<li>
        <div class = "img-container">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${e.webformatURL}"
                    alt="${e.tags}"
                />
            </a>
        </div>
        
        <ul class="description-list">
          <li>
            <span class="list-title">Likes</span>
            <p class="list-text">${e.likes}</p>
          </li>
          <li>
            <span class="list-title">Views</span>
            <p class="list-text">${e.views}</p>
          </li>
          <li>
            <span class="list-title">Comments</span>
            <p class="list-text">${e.comments}</p>
          </li>
          <li>
            <span class="list-title">Downloads</span>
            <p class="list-text">${e.downloads}</p>
          </li>
        </ul>
      </li>`}),o.innerHTML=s}const u=document.querySelector(".search-form"),d=document.querySelector(".loader");let l,n=new p(".gallery-link");n.options.captionDelay=250;n.options.captionsData="alt";u.addEventListener("submit",i=>{if(i.preventDefault(),l=u.elements.userSearch.value.trim(),!l){c.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"No input provided",title:"Error",timeout:2e3});return}m(l).then(s=>{const e=s.hits;if(e.length==0){document.querySelector(".gallery").innerHTML="",c.error({theme:"dark",position:"topRight",messageColor:"#FFFFFF",backgroundColor:"red",progressBarColor:"#ff91a4",message:"Sorry, there are no images matching your search query. Please try again!",title:"Error",timeout:2e3});return}d.hidden=!1,setTimeout(()=>{d.hidden=!0,f(e),n.refresh()},500)}).catch(s=>{console.error(s)})});
//# sourceMappingURL=commonHelpers.js.map
