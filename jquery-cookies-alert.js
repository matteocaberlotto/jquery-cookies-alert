/**
 * Example use

$(function () {
    $.fn.cookiesAlert({
        css: false, // specify css (relative) path or avoid bundled css
        url: '/privacy-policy', // url of the privacy page
        message: 'This website makes use of cookies' // the message to be shown on the popup
    });
});

 */

(function ($) {
    $.fn.cookiesAlert = function(options) {

        var getCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name)===0) return c.substring(name.length,c.length);
            }
            return "";
        }

        // fire alert if no cookie is present
        var alertDismissed = getCookie('jquery-cookies-alert-dismissed');

        if (alertDismissed === 'true') {
            return;
        }

        // default values
        var defaults = {
            message : 'Questo sito fa uso di cookie tecnici per le normali operazioni di navigazione e uso di cookie di profilazione di terze parti mediante il tracciamento di statistiche con google analytics. Proseguendo con la navigazione si accetta implicitamente l\'uso dei cookie. Per ulteriori informazioni, consultare la pagina di privacy e condizioni.',
            url : '/privacy-policy',
            css: '../css/jquery-cookies-alert.css',
            label: 'Privacy policy'
        };

        // actual options
        var opts = $.extend(defaults, options);

        // append css
        if (!$('body').hasClass('jquery-cookies-alert-css')) {
            $('body').addClass('jquery-cookies-alert-css');

            if (options.css) {
                $('head')
                    .append($('<link/>', {
                        rel: 'stylesheet',
                        type: 'text/css',
                        href: opts.css
                    }));
            }
        }

        // append html
        if (!$('#jquery-cookies-container').length) {
            $('body')
                .append($('<div/>', {
                    id: 'jquery-cookies-container'
                }));
        }

        // add user message
        $('#jquery-cookies-container')
            .html("")
            .append('<div>' + opts.message + '</div>')

        $('#jquery-cookies-container div')
            .append($('<a/>', {
                href: opts.url,
                html: opts.label,
                id: 'jquery-cookies-privacy-url'
            }));

        // add 'OK' button
        $('#jquery-cookies-container div')
            .append($('<a/>', {
                href: 'javascript:;',
                html: 'OK',
                id: 'ok-button'
            }));

        $('#ok-button')
            .click(function () {
                var d = new Date();
                d.setTime(d.getTime() + (365 * 24*60*60*1000));
                document.cookie = 'jquery-cookies-alert-dismissed=true;' + "expires=" + d.toUTCString() + ';path=/';

                $('#jquery-cookies-container')
                    .remove();
            });


        return this;
    };
}(jQuery));