---

import XElement from 'astro-xelement';
const {div:ScrollContent, div:LoadingSpinner, div:ItemTemplate} = XElement;

const { stories } = Astro.props;




const getPage = () => {
  /*
  assumes:
  div#item-template
  */
  if (this.noMore) return;
  var self = this;
  document.getElementById(self.spinner).style.display = '';
  var offset = (self.currentPage-1) * 10;
  setTimeout(function () {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?apikey=5c30b609f2fa2d5a7ea9a0d66892983a&limit=10&offset='+offset)
    .then(function (response) {
      self.currentPage += 1;
      var characters = response.data.data.results;
      var itemTpl = document.getElementById('item-template').innerHTML;
      var markup = '';
      var nwcontent = document.createElement('div');
      for (var i = 0; i < characters.length; i++) {
        markup += self.templatize(characters[i], itemTpl);
        console.log(characters[i]);
      }
      if (characters.length === 0) {
        markup = '<p>No More Results.</p>';
        self.noMore = true;
      }
      nwcontent.innerHTML = markup;
      document.getElementById(self.container).appendChild(nwcontent);
      document.getElementById(self.spinner).style.display = 'none';
    });
  }, 3200);
}

function startsWith (findThis, here) {
  return here.substr(0, findThis.length) === findThis;
}

function templatize (obj, tpl, pathPrefix) {
  var t = tpl;
  pathPrefix = pathPrefix || '';
  if (this.startsWith('.', pathPrefix)) {
      pathPrefix = pathPrefix.substring(1);
  }
  for (var p in obj) {
      var val = obj[p];
      if (val !== null && typeof val === 'object') {
          t = this.templatize(val, t, pathPrefix + '.' + p);
      } else {
          var re = new RegExp('#' + (pathPrefix.length === 0 ? '' : pathPrefix + '.') + p + '#', 'gi');
          t = t.replace(re, val);
      }
  }
  return t;
}
---


<ScrollContent
  @define:vars={ () => {"answer": answer}}
  
  @do={(element:HTMLElement, store:any) => {
      console.log(element,store);
      store.noMore = false;
      store.currentPage = 1;
      store.container = 'scroll-content';
      store.spinner = 'loading-spinner';
      
      window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !store.noMore) {
          infiscroll.getPage();
        }
      }, { passive:true });    
      getPage();
    }
  }
  ></ScrollContent>

<LoadingSpinner class="alert alert-info mt-4 mb-4" style="display:none;text-align:center;">
  <i class="fas fa-spinner fa-4x fa-spin"></i><br/>
  Loading results...
</LoadingSpinner>

<ItemTemplate style="display:none;">
  <div class="scroll-item">
    <h1>#name#</h1>
  </div>
</ItemTemplate>