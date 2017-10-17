[![npm][npm]][npm-url]

# Image Trace Loader
Loads images and exports traced outlines as image/svg+xml URL-encoded data

## Install
```bash
npm install --save-dev image-trace-loader
```

## Inspiration
I saw [Mikael Ainalem's fantastic CodePen](https://twitter.com/mikaelainalem/status/918213244954861569) showcasing this technique, and I wanted a way to automate the process.

## Usage
The `image-trace-loader` loads your image and exports the url of the image as `src` and the image/svg+xml URL-encoded data as `trace`.

```js
import { src, trace } from './image.png';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'image-trace-loader'
          }
        ]
      }
    ]
  }
}
```
It can also be used in conjunction with [url-loader][url-loader] or [file-loader][file-loader].

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'image-trace-loader'
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

## Options
The loader options allows you to specify values for all the parameters of the [Potrace class][potrace-class], with the addition of `skipTraceIfBase64`.

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`turnPolicy`**|`{String}`|`TURNPOLICY_MINORITY`|How to resolve ambiguities in path decomposition. Possible values are `TURNPOLICY_BLACK`, `TURNPOLICY_WHITE`, `TURNPOLICY_LEFT`, `TURNPOLICY_RIGHT`, `TURNPOLICY_MINORITY`, `TURNPOLICY_MAJORITY`. Refer to page 4 of [this document][potrace-algorithm] for more information|
|**`turdSize`**|`{Number}`|`100`|Suppress speckles of up to this size. Larger values significantly reduce the size of the traced outline|
|**`alphaMax`**|`{Number}`|`1`|Corner threshold parameter. Lower values results in rougher edges, but significantly reduces the size of the traced outline|
|**`optCurve`**|`{Boolean}`|`true`|Curve optimization|
|**`optTolerance`**|`{Number}`|`0.2`|Curve optimization tolerance|
|**`threshold`**|`{Number\|String}`|`THRESHOLD_AUTO`|Threshold below which the color is considered `color`. Should be a number in range 0..255 or `THRESHOLD_AUTO` in which case threshold will be selected automatically using [Algorithm For Multilevel Thresholding][multilevel-thresholding] |
|**`flipColors`**|`{Boolean}`|`false`|Specifies whether fill color and background color should be swapped|
|**`color`**|`{String}`|`COLOR_AUTO`|Fill color. `COLOR_AUTO` will extract and use the most prominent color of the source image|
|**`background`**|`{String}`|`COLOR_TRANSPARENT`|Background color|
|**`skipTraceIfBase64`**|`{Boolean}`|`false`|If set to `true`, will not generate a traced outline if the image already is base64 encoded. Useful when the inlined base64 representation is enough, and you don't want to bloat your files with unused traces|

[npm]: https://img.shields.io/npm/v/image-trace-loader.svg
[npm-url]: https://npmjs.com/package/image-trace-loader
[file-loader]: https://github.com/webpack-contrib/file-loader
[url-loader]: https://github.com/webpack-contrib/url-loader
[potrace-class]: https://github.com/tooolbox/node-potrace#parameters
[potrace-algorithm]: http://potrace.sourceforge.net/potrace.pdf
[multilevel-thresholding]: http://www.iis.sinica.edu.tw/page/jise/2001/200109_01.pdf
