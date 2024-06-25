import{a as g,i as f,s as E}from"./assets/vendor-da73009b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const L="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgBrZXtEcIgDIZTzp5/3URHcSPpJLpBXcVd+FPwiqQt1y+SUNv3DuUkvA+0SQQg5Jx7WOt8zsBYyudEmXsPuijg3bbtB1ipa/jQYQ+UZVmBpHjyprEvyBTGSjf52zwbssdchBxhTkI4c2vtTTJMxcwgw6RObZReXDycMSYBcTWuQX/6RqcMQpCmIOPNHbG30SKAgkjmU8AJBJ3PpQ5GOO2KCYVFGEaFa9J+EbCEDIAsc5SCTCkFPjWXlHWD2Jvw5MNP2b1HBEzN42OZvhMRwmURly1cCvfrszSlC41PxR6SKjQs3g4Qg6z9PpdBxsitIhWDXrPDcZCtWplHHQEhzY+AiOZ7IJz5qg5iWygK/wjfFwD+T18pdfXe37e0j07jTeTBPZYfWztI8097RKsAAAAASUVORK5CYII=";g.defaults.baseURL="https://pixabay.com";async function h(r,e){try{const o=await g.get("/api/",{params:{q:r,image_type:"photo",orientation:"horizontal",page:e,per_page:15,safesearch:"true",key:"44388717-c7f861c042cec84afe94caebd"}});return o.data.hits.length===0&&i("Sorry, there are no images matching your search query. Please try again!"),o.data}catch{i("Sorry, there was an error fetching images. Please try again later!")}throw Error}function i(r){f.error({message:r,maxWidth:"322px",iconUrl:L,backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff",theme:"dark"})}const a={formElem:document.querySelector("form"),galleryElem:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".js-btn-load")};a.loader.className="loader";function y(){a.loader.classList.remove("hidden")}function u(){a.loader.classList.add("hidden")}function S(){a.btnLoadMore.classList.remove("hidden-btn")}function p(){a.btnLoadMore.classList.add("hidden-btn")}function B({largeImageURL:r,webformatURL:e,tags:o,likes:l,views:t,comments:s,downloads:n}){return`<li class="gallery-item">
          <a
            class="gallery-link"
            href="${r}"
          >
            <img
              class="gallery-image"
              src="${e}"
              data-source="${r}"
              alt="${o}"
            />
          </a>
          <div class="desc">
          <p class="desc-item"><span class="desc-item-style">Likes</span><br> ${l}</p>
          <p class="desc-item"><span class="desc-item-style">Views</span><br> ${t}</p>
          <p class="desc-item"><span class="desc-item-style">Comments</span><br> ${s}</p>
          <p class="desc-item"><span class="desc-item-style">Downloads</span><br> ${n}</p>
          </div>
          
        </li>
  `}function A(r){return r.hits.map(e=>B(e)).join(`
`)}function P(){const e=a.galleryElem.children[0].getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}let d,c=1,m=1;const v=15;u();const b=new E(".gallery a",{captionsData:"alt",captionDelay:250});a.formElem.addEventListener("submit",async r=>{if(r.preventDefault(),d=r.target.elements.query.value.trim(),!d){i("The input field must not be empty");return}c=1,y(),p(),a.galleryElem.innerHTML="";try{const e=await h(d,c);m=Math.ceil(e.totalHits/v);const o=A(e);a.galleryElem.innerHTML=o,w(),b.refresh()}catch{i("Sorry, there was an error fetching images.Please try again later!")}u()});a.btnLoadMore.addEventListener("click",async()=>{c++,y(),p();try{const r=await h(d,c),e=A(r);a.galleryElem.insertAdjacentHTML("beforeend",e),P(),b.refresh()}catch{i("Something goes wrong!")}u(),w()});function w(){c>=m?(p(),m&&f.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):S()}
//# sourceMappingURL=commonHelpers.js.map
