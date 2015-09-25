This is a simple plugin that popups cookies disclaimer.
You can configure message, target privacy url, css to be included.

Usage:

[just include .js part into any page]

```
// this will be triggered at dom ready event
$(function () {
    // this function fires the cookie popup
    $.fn.cookiesAlert({
        css: false, // specify css (relative) path or avoid bundled css
        url: '/privacy-policy', // url of the privacy page
        message: 'This website makes use of cookies. By using this website you accept our cookie policy.' // the message to be shown on the popup
    });
});
```
