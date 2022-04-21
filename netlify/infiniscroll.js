let infiscroll = {
  /* STATE VARIABLES */
  currentPage: 1,
  noMore: false,
  container: '',
  spinner: '',
  /* INITIALIZATION */
  init: function (startingPage, container, spinner) {
    this.currentPage = startingPage || 1;
    this.container = container || 'scroll-content';
    this.spinner = spinner || 'loading-spinner';
    /* ATTACH TO SCROLL-TO-END EVENT */
    window.addEventListener('scroll', function () {
      var scrollTop = document.documentElement.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight;
      var clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !infiscroll.noMore) {
        infiscroll.getPage();
      }
    }, { passive:true });
  },
  /* GET THE NEXT PAGE */
  getPage: function () {
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
  },
  /* HELPER */
  startsWith: function (findThis, here) {
    return here.substr(0, findThis.length) === findThis;
  },
  /* HELPER - 
     Templatize an object into plahecolder tokens */
  templatize: function (obj, tpl, pathPrefix) {
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
};