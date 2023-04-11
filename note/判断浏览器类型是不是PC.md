```
  <script>
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edg\/([\d.]+)/)) ?
    (Sys.edg = s[1]) :
    (s = ua.match(/firefox\/([\d.]+)/)) ?
    (Sys.firefox = s[1]) :
    (s = ua.match(/chrome\/([\d.]+)/)) ?
    (Sys.chrome = s[1]) :
    (s = ua.match(/opera.([\d.]+)/)) ?
    (Sys.opera = s[1]) :
    (s = ua.match(/version\/([\d.]+).*safari/)) ?
    (Sys.safari = s[1]) :
    0;
    // 浏览器类型及版本
    if (Sys.edg) console.log("Edge: " + Sys.edg);
    if (Sys.firefox) console.log("Firefox: " + Sys.firefox);
    if (Sys.chrome) console.log("Chrome: " + Sys.chrome);
    if (Sys.opera) console.log("Opera: " + Sys.opera);

    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(ua)) {
      console.log('移动端');
    } else {
      console.log('PC端');
    }

    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (ua.indexOf("win32") >= 0 || ua.indexOf("wow32") >= 0) {
      console.log("这是windows32位系统");
    }
    if (ua.indexOf("win64") >= 0 || ua.indexOf("wow64") >= 0) {
      console.log("这是windows64位系统");
    }
    if (isMac) {
      console.log("这是mac系统");
    }
  </script>
```



