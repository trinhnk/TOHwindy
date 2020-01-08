/*! */
W.define("hpArticles", ["store", "http", "rootScope", "storage"], function (e, n, t, i) {
    var a = !1,
        r = i.get("articles") || {},
        o = function (e, n) {
            var o = n.data;
            if (!a && o && o.length) {
                if (o.forEach(function (e) {
                        var n = e.id + "-" + e.updated,
                            t = r[n];
                        t ? (e.count = t.count, e.checked = t.checked) : e.count = e.checked = 0, e.key = n
                    }), (o = o.filter(function (e) {
                        return e.count < 3
                    })).length >= 2 && o[0].ranking - o[1].ranking >= 3) {
                    var s = o.shift();
                    (o = o.sort(function (e, n) {
                        return e.checked - n.checked
                    })).unshift(s)
                } else o = o.sort(function (e, n) {
                    return e.checked - n.checked
                });
                var c, p = window.innerHeight;
                if (e.style.display = null, o.length) {
                    t.isMobile || p < 707 ? c = l(o[0]) : (o.length > 2 && (o.length = 2), c = o.map(l).join("")), e.innerHTML = c;
                    var d = Date.now();
                    Object.keys(r).forEach(function (e) {
                        d - r[e].seen > 2592e6 && delete r[e]
                    }), i.put("articles", r)
                }
            }
        },
        l = function (e) {
            var n = e.coverPhoto,
                i = e.slug,
                a = e.type,
                o = e.title,
                l = e.id,
                s = e.subtitle,
                c = e.key,
                p = e.importance,
                d = r[c],
                g = Date.now();
            d ? (d.checked = g, g - d.seen > 432e5 && (d.seen = g, d.count++)) : r[c] = {
                seen: g,
                checked: g,
                count: 1
            };
            var h = /extreme|severe|moderate/.test(p) && '<div class="article-warning warning-' + p + '">' + p + " warning</div>";
            return '<div class="article-announce-small bg-transparent clickable type-' + a + '" data-do="rqstOpen,articles,' + l + '">\n\t\t<span style="background-image: url(\'' + n.src + "?w=" + (t.isRetina ? 200 : 100) + "');\"></span>\n\t\t" + (h || "") + "\n\t\t" + (s && !h ? '<div class="article-subtitle size-s">' + s + "</div>" : "") + '\n\t\t<a href="https://www.windy.com/articles/' + i + "-" + l + '" class="nomouse">' + o + "</a>\n\t</div>"
        };
    return {
        load: function (i) {
            var r = {
                homepage: 1,
                language: e.get("usedLang"),
                country: e.get("country"),
                target: t.target,
                device: t.device,
                version: t.version,
                platform: t.platform
            };
            a = !1, n.get("/articles/related", {
                qs: r
            }).then(o.bind(null, i)).catch(console.error)
        },
        cancel: function () {
            return a = !0
        }
    }
}),
/*! */
W.define("hpCapAlerts", ["broadcast", "hp", "trans", "format"], function (e, n, t, i) {
    var a = {
        R: "/",
        T: "î€—",
        N: "î€—",
        F: "î€Š",
        I: "î€³",
        H: "î€…",
        L: "î€…",
        W: "|",
        G: "î€¦",
        C: "î€Š",
        S: "î€€",
        Q: "î€©",
        A: "P"
    };
    return function (r, o, l) {
        var s = r.lat,
            c = r.lon,
            p = r.name,
            d = l.data;
        if (d && !n.cancelShow()) {
            var g = i.getHoursFunction();
            o.style.display = null, o.innerHTML = d.map(function (e) {
                e.weekday, e.hour;
                var n = e.severity,
                    i = e.type,
                    r = e.event,
                    o = e.startLocal,
                    l = e.endLocal,
                    s = !1;
                r.length > 24 && (r = r.substr(0, 24) + "...", s = !0);
                var c = o.weekday !== l.weekday,
                    p = c && s ? "2" : "",
                    h = t[o.weekday + p],
                    u = c && t[l.weekday + p],
                    w = h + " " + g(+o.hour) + " -" + (c ? " " + u : "") + " " + g(+l.hour);
                return '<div class="cap-line clickable-size ' + (d.length > 1 ? "multiline" : "") + '"\n\t\t\t\t\tdata-icon="' + a[i] + '"\n\t\t\t\t\tdata-severity="' + n + '">' + r + "\n\t\t\t\t\t<small>" + w + "</small></div>"
            }).join(""), o.classList.add("show"), o.onclick = function () {
                return e.emit("rqstOpen", "cap-alert", {
                    lat: s,
                    lon: c,
                    name: p,
                    source: "hp"
                })
            }
        }
    }
}),
/*! */
W.tag("hp-weather", '<div class="w-now"></div><div class="slider-wrapper"><canvas></canvas><table></table><div class="slider"></div><div class="slider-rain" style="display: none;"></div></div>', '.weather-box{width:392px;position:relative;margin-top:5px}#device-mobile .weather-box{width:100%}#warnings{width:100%;z-index:10;margin-top:2px;flex-direction:row;-webkit-flex-direction:row;-ms-flex-direction:row}#warnings .cap-line{font-size:14px;background-color:rgba(68,65,65,0.84);white-space:nowrap;line-height:1.6;margin-right:.3em;padding-right:1em;overflow:hidden;flex-grow:4;flex-basis:0;position:relative}#warnings .cap-line:last-child{margin-right:0}#warnings .cap-line::before{font-size:16px;display:block;float:left;font-weight:normal;text-align:center;position:relative;padding:.2em .3em;margin-right:.3em;line-height:normal;height:100%}#warnings .cap-line small{display:block;opacity:.6}#warnings .cap-line:not(.multiline) small{position:absolute;top:2px;right:6px}#warnings .cap-line.multiline{font-size:12px;line-height:1.4}#warnings .cap-line.multiline small{font-size:8px;padding-bottom:.3em}#warnings .cap-line.multiline::before{padding-top:.4em}#warnings .cap-line[data-severity="M"]::before{background-color:#b3b300}#warnings .cap-line[data-severity="S"]::before{background-color:#c17d00}#warnings .cap-line[data-severity="E"]::before{background-color:#a50000}#plugin-hp-weather{cursor:pointer;transition:all .5s;opacity:0;margin-top:10px;width:372px;white-space:nowrap}#plugin-hp-weather.open{opacity:1}.onsearch #plugin-hp-weather{display:none !important}#device-mobile #plugin-hp-weather{width:calc(100vw - 20px)}#plugin-hp-weather .slider-wrapper{width:calc( 100% - 100px )}#plugin-hp-weather .w-now,#plugin-hp-weather .slider-wrapper{display:inline-block;vertical-align:top}#plugin-hp-weather .w-now{width:100px;text-align:center;line-height:1;margin-top:-5px}#plugin-hp-weather .w-now big{font-size:67px;font-family:bariolnumbers,Arial,Helvetica,sans-serif;font-weight:normal}#plugin-hp-weather .w-now big sup{font-size:30px}#plugin-hp-weather .w-now .ws-wind{font-size:.8em;margin-left:.2em;color:#c1c1c1;margin-top:4px;display:block;font-size:12px;margin-left:-1em}#plugin-hp-weather .w-now .ws-wind div{display:inline-block;position:relative;top:1px}#plugin-hp-weather .w-now .ws-wind img{width:13.5px;display:inline-block;position:relative;margin-right:.3em;top:.2em}#articles .article-announce-small{padding:5px 10px 5px 110px;font-size:18px;line-height:1.4;letter-spacing:.02em;margin-bottom:5px;position:relative}#articles .article-announce-small span{width:100px;height:100%;display:block;position:absolute;left:0;top:0;background-size:cover;background-repeat:no-repeat;background-position-x:center;background-position-y:center}#articles .article-announce-small a{display:block}#articles .article-announce-small .article-warning{font-size:11px;border-radius:3px;padding:.1em .7em;position:relative;display:inline-block;top:-3px;letter-spacing:.05em;text-transform:uppercase}#articles .article-announce-small .article-warning.warning-extreme{background:#a50000}#articles .article-announce-small .article-warning.warning-severe{background:#c17d00}#articles .article-announce-small .article-warning.warning-moderate{background:#b3b300}', "", function (e) {
    var n = this,
        t = W.require,
        i = t("overlays"),
        a = t("utils"),
        r = t("store"),
        o = t("query"),
        l = t("rootScope"),
        s = t("$"),
        c = t("broadcast"),
        p = t("weatherRender"),
        d = t("hp"),
        g = t("reverseName"),
        h = t("hpCapAlerts"),
        u = t("hpArticles"),
        w = s("#articles"),
        m = s("#warnings");
    this.onopen = function (e) {
        var n = e.coords,
            t = e.promises;
        ! function (e) {
            e.name && o.set(e.name);
            if ("location" !== r.get("startUp") || "gps" === e.source) {
                var n = r.get("startupReverseName");
                if (n && a.isNear(e, n) && n.lang === r.get("usedLang")) o.set(n.name), e.name = n.name;
                else {
                    var t = "gps" === e.source ? 14 : 6;
                    g.get(e, t).then(function (n) {
                        e.name = n.name, o.set(n.name), n.nameValid && r.set("startupReverseName", n)
                    })
                }
            }
        }(n), document.body.classList.add("onweather"), t.wx.then(function (e) {
            var i = e.data;
            !d.cancelShow() && i && (o.hideLoader(), v(i, n), r.set("hpShown", !0), w.classList.add("show"), w.style.display = "block", setTimeout(function () {
                d.cancelShow() || (t.capAlerts.then(h.bind(null, n, m)), u.load(w))
            }, 500))
        }).catch(function (e) {
            console.error(e), d.hide()
        })
    }, this.onclose = function (e) {
        o.hideLoader(), o.set(""), w.classList.remove("show"), m.classList.remove("show"), r.set("hpShown", !1), c.emit("hpHidden"), e && e.target && "q" === e.target.id ? (f(), o.element.focus()) : setTimeout(f, 500)
    };
    var f = function () {
            d.cancelShow() && document.body.classList.remove("onweather"), u.cancel(), m.style.display = w.style.display = "none"
        },
        v = function (e, t) {
            var r = t.lat,
                o = t.lon,
                d = t.name,
                g = e.now;
            p.renderFragment(s(".slider-wrapper", n.node), e, {
                iconSize: 27,
                addRain: !0,
                days: n.node.offsetWidth < 350 ? 3 : 4,
                bgHeight: 60
            }), g && (g.dir = g.windDir, s(".w-now", n.node).innerHTML = "\n\t\t\t\t\t<big>" + i.temp.convertNumber(g.temp) + '<sup>Â°</sup></big>\n\t\t\t\t\t<span class="ws-wind"><img src="' + l.iconsDir + "/png_27px/" + g.icon + '.png">\n\t\t\t\t\t' + a.windDir2html(g) + " " + (g.wind ? i.wind.convertValue(g.wind, " ") : "") + "</span>"), n.node.onclick = function () {
                return c.emit("rqstOpen", "detail", {
                    lat: r,
                    lon: o,
                    name: d,
                    source: "hp"
                })
            }
        }
});