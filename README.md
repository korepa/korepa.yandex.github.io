# Github Flavored Markdown Server (GFMS)

### News

You can now use the option `-a` to tell GFMS to render your documents via the [Github Markdown Rendering API](http://developer.github.com/v3/markdown/). For simplicity, the public access is used, which is limited to 60 requests per hour per an IP address.

If the mode `-a` is not specified, GFMS will render your doc via Github API only when you manually reload it in the browser (and on the first load). This way you are less likely ot hit the hourly API limit, because you will only use the API to check for correctness occasionally. Use `-n` to disable this feature.

### (based on Node.js, Express.js, Jade, Stylus, ws-rpc and GFM for JavaScript)

---
I could not find a tool that would allow me to preview Github Flavored Markdown files offline, so I wrote one. (Well it's not completely offline - it loads the Github CSS from Akamai and JQuery from Google's CDN, but you know how to cache them if you need to.)

Basically the only way how to preview GFM somewhat properly, was to commit the file to the Github repo and reload the browser page. However committing just for preview unecessarily pollutes GIT history of the file, and it's a tedious process.

Sure, there are various good Markdown editors for all platforms, but only a few support GFM, and to my knowledge, none properly supports the syntax-colored code blocks denoted by three apostrophes, e.g.

```js
function(arg) {
    // some code here
    for(var i = 0; i < 10; i++)
        console.log('hello ' + i);
}
```

And none would show the result looking (almost) exactly like at Github.