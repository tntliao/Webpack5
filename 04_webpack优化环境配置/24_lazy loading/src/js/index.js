console.log('index.js文件被加载');

document.getElementById('btn').onclick = function () {
  /* 
      懒加载：当文件需要使用时才会加载
      预加载 prefetch:会在使用之前，提前加载js文件
      正常加载可以认为是并行加载(同一时间加载多个文件)
      预加载 prefetch：等其他资源加载完毕，浏览器空虚了，再偷偷加载资源
   */
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./test').then(({ mul }) => {
    console.log(mul(2, 3));
  })
}