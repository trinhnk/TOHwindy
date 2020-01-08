/*! */
W.define("levelsBar", ["store", "trans", "rootScope", "$", "utils", "Drag", "Resizable", "GhostBox"], function (e, t, i, o, n, a, r, s) {
    return a.instance(r, s, {
        allowed: [],
        resizableEl: o("#level"),
        UIident: "rhLevel",
        _init: function () {
            var t = this.progressLine = this.resizableEl;
            this.el = o(".main-timecode", t), this.ghost = o(".ghost-timecode", t), this.elTimecode = o(".main-timecode .box", t), this.elGhost = o(".ghost-timecode .box", t), this.updateTimecode = this.update.bind(this, "latestCode", this.el, this.elTimecode), this.emitOut = n.debounce.call(this, this.emit, 600), t.addEventListener("mouseup", this.click.bind(this)), a._init.call(this), r._init.call(this), s._init.call(this), e.on("availLevels", this.init, this), e.on("usedLang", this.init, this), e.on("level", this.set, this), this.init()
        },
        updateGhost: function (e) {
            this.update("latestGhost", this.ghost, this.elGhost, e.clientY - this.elTop)
        },
        init: function () {
            this.allowed = e.get("availLevels").slice(), this.allowed = this.allowed.reverse(), this.latestCode = null, this.latestGhost = null, this.set(e.get("level"))
        },
        click: function (e) {
            this.dragging || (this.addAnimation(), this.updateTimecode(e.pageY - this.elTop), this.removeAnimation())
        },
        ondragend: function (e) {
            this.mouseInside && (this.updateGhost(e.clientY - this.elTop), this.ghost.style.opacity = 1)
        },
        addAnimation: function () {
            this.el.classList.add("anim-allowed")
        },
        removeAnimation: function () {
            var e = this;
            window.setTimeout(function () {
                return e.el.classList.remove("anim-allowed")
            }, 300)
        },
        px2pct: function (e) {
            return 100 * e / this.height
        },
        pct2px: function (e) {
            return e * this.height / 100
        },
        ident2pct: function (e) {
            return 100 * (this.allowed.indexOf(e) + .5) / this.allowed.length
        },
        pct2ident: function (e) {
            var t = this.allowed.length * e / 100 - .5;
            return t = n.bound(Math.round(t), 0, this.allowed.length - 1), this.allowed[t]
        },
        set: function (e, t) {
            if (t !== this.UIident) {
                var i = this.ident2pct(e);
                this.addAnimation(), this.updateTimecode(this.pct2px(i)), this.removeAnimation()
            }
        },
        ondrag: function (e, t) {
            this.updateTimecode(t + 10)
        },
        renderItem: function (e) {
            var o = i.levelsData[e];
            return ("surface" === e ? t.SFC : o[0]) + (o[1] ? "<br/>" + o[1] : "")
        },
        emit: function () {
            e.set("level", this.latestCode, {
                UIident: this.UIident
            })
        },
        renderBox: function (e, t) {
            t.innerHTML = this.renderItem(e)
        },
        update: function (e, t, i, o) {
            var a = this.px2pct(n.bound(o, 0, this.height)),
                r = this.pct2ident(a);
            t.style.top = a + "%", t.style.bottom = "inherit", this[e] !== r && (this.renderBox(r, i), this[e] = r, "latestCode" === e && this.emitOut(r))
        }
    })
}),
/*! */
W.tag("rhpane", '<section id="rhpane" class="shy flex-container"><div data-do="zoomIn" class="clickable iconfont fg-yellow noselect zoom-ctrl zoom-plus" title="Zoom in">+</div><div data-do="zoomOut" class="clickable iconfont fg-yellow noselect zoom-ctrl zoom-minus" title="Zoom out">-</div><nav id="overlay" data-ref="overlay" class="menu"></nav><div id="level" class="noselect"><div class="timecode ghost-timecode noselect" style="opacity:0;"><div class="box"></div></div><div class="timecode main-timecode noselect"><div class="box"></div><div class="loading ld-lgray size-l loader-level"></div></div></div></section><section id="rh-bottom" class="shy"><div id="rh-bottom-messages"></div><div id="particles" data-ref="particles" class="checkbox rh-text clickable-size uiyellow" data-t="PART_ANIMATION"></div><div id="isolines" data-ref="isolines" class="checkbox rh-text clickable-size uiyellow" data-t="PRESS"></div><div id="radar-blitz" class="checkbox rh-text clickable-size uiyellow" data-t="BLITZ_ON"></div><div id="radar-blitz-sound" class="checkbox rh-text clickable-size uiyellow" data-t="SOUND_ON"></div><div id="info-icon" class="rh-text" data-do="rqstOpen,info" data-tooltipsrc="ABOUT_DATA"><div class="clickable-size uiyellow noselect" data-icon="&#xe007;"></div></div><div id="fullscreen" data-ref="fullscreen" class="rh-text clickable-size iconfont uiyellow noselect" data-do="fullscreen" data-tooltipsrc="MENU_FULLSCREEN">&#xe03f;</div><div id="pois-switch" data-ref="poisSwitch" class="ui-switch size-m noselect notap"></div><div id="product-switch" data-ref="productSwitch" class="ui-switch size-s noselect notap" data-tooltipsrc="MODEL"></div><div id="legend" data-ref="legend" class="metric-legend noselect" data-tooltipsrc="CLICK_ON_LEGEND"></div></section><span data-plugin="detail"></span><div data-plugin="rplanner"></div>', ".loading-overlay #rhpane #overlay a.selected .menu-text::before{animation:rotate .75s infinite linear;border:.1em solid #946051;border-radius:50%;border-right-color:transparent;border-top-color:transparent;content:'';height:.8em;width:.8em}#rh-bottom{width:300px;margin:0 8px 8px auto;position:relative;white-space:nowrap;pointer-events:auto}#rh-bottom .rh-text{font-size:11px;text-transform:lowercase;display:inline-block;white-space:nowrap;margin:0 15px 10px 0}#rh-bottom .rh-text:first-child{margin-left:.5em}#rh-bottom .rh-inlined{display:inline-block;vertical-align:middle}#rh-bottom .rh-absoluted{position:absolute;bottom:100%;padding:15px 0}#rh-bottom .rh-transparent{opacity:.7}#rh-bottom #radar-blitz-sound,#rh-bottom #radar-blitz{display:none;margin-left:.5em}.overlay-snowAccu #rh-bottom #particles,.overlay-rainAccu #rh-bottom #particles,.overlay-ozone #rh-bottom #particles,.overlay-satellite #rh-bottom #particles,.overlay-radar #rh-bottom #particles{opacity:.6;pointer-events:none}#rh-bottom #fullscreen{font-size:16px;position:absolute;right:0;top:3px}#rh-bottom #info-icon{position:absolute;right:30px;font-size:19px;top:2px}#rh-bottom #legend{cursor:pointer;-webkit-transition:.3s opacity;transition:.3s opacity;margin-bottom:5px;border-radius:20px}#rh-bottom #legend.one-metric{pointer-events:none}#rh-bottom #legend.animate{opacity:0}#rh-bottom #legend span:first-child{border-top-left-radius:20px;border-bottom-left-radius:20px}#rh-bottom #legend span:last-child{border-top-right-radius:20px;border-bottom-right-radius:20px}#rh-bottom #legend[data-overlay=\"ptype\"] span:first-child{padding-left:8px}#rh-bottom #legend[data-overlay=\"ptype\"] span:last-child{padding-right:8px}#rh-bottom .ui-switch{width:100%;position:relative;margin-bottom:10px}#rh-bottom #pois-switch div{padding:.25em 0}#rh-bottom #pois-switch div[data-tooltip]:hover::after{bottom:100%;top:inherit;margin-bottom:5px;left:inherit;right:-10px;display:inline-table;padding:3px 15px}#rh-bottom #pois-switch div[data-tooltip]:hover::before{bottom:100%;top:inherit;left:50%;margin-left:-5px;margin-bottom:-5px;border-top-color:#4d4d4d;border-left-color:transparent}#rh-bottom #pois-switch span{font-size:12px;display:table-cell;text-align:right;vertical-align:middle;padding-right:.8em;width:33%;overflow:hidden}#rh-bottom #product-switch div{padding:.2em 0}#rh-bottom #product-switch div small{font-size:8px}#device-mobile #rh-bottom,#device-tablet #rh-bottom{display:none}#detail-rhpane-wrapper{position:fixed;bottom:0;left:0;pointer-events:none;justify-content:flex-end}#rhpane{justify-content:flex-start;align-self:flex-end;position:relative;pointer-events:none;flex-grow:1;margin-left:auto;margin-top:10px;margin-bottom:20px;margin-right:8px}#device-mobile #rhpane,#device-tablet #rhpane{display:none}#rhpane .zoom-ctrl{width:25px;height:25px;border-radius:25px;background-color:rgba(68,65,65,0.84);margin-bottom:4px;text-align:center;align-self:flex-end;pointer-events:auto;font-size:16px;line-height:1.65}#rhpane .zoom-ctrl:hover{background-color:rgba(183,183,183,0.39)}#rhpane #overlay{width:25px;margin-bottom:25px;margin-top:8px;font-size:16px;align-self:flex-end;pointer-events:auto}#rhpane #overlay a{padding:0;margin:.15em 0;color:#fff3e1}#rhpane #overlay a .iconfont,#rhpane #overlay a .menu-text{display:table-cell;vertical-align:middle}#rhpane #overlay a .iconfont{height:25px;width:25px;border-radius:25px;text-align:center}#rhpane #overlay a .menu-text{height:22px;transition:background-color .3s;position:absolute;text-shadow:0 0 4px black;right:25px;line-height:1.4;padding-left:11px;padding-right:11px;margin-top:1.5px;right:22px;top:0;border-radius:1.2em}#rhpane #overlay a .menu-text span{display:none}#rhpane #overlay a.selected{background:none}#rhpane #overlay a.selected .menu-text{text-decoration:underline}#rhpane #overlay a.selected .menu-text span{display:inline}#rhpane #overlay a.selected .iconfont{background-color:#d49500;box-shadow:0 0 4px 0 black;color:white}.loading-overlay #rhpane #overlay a.selected .menu-text::before{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;border-left-color:#f8f8f8;border-bottom-color:#f8f8f8;display:block;position:absolute;left:-15px;top:5px;font-size:14px}#rhpane #overlay a.sub-menu{transition-property:visibility,height,max-height,padding,margin;transition-duration:150ms,150ms,150ms,150ms,150ms;transition-delay:150ms,0ms,0ms,0ms,0ms;visibility:visible;max-height:25px}#rhpane #overlay a.sub-menu .iconfont{font-size:.875em;max-height:22px}#rhpane #overlay a.sub-menu .menu-text{font-size:.7em;line-height:1.8;max-height:25px}#rhpane #overlay a.sub-menu:not(.menu-unfold){max-height:0;margin:0;pointer-events:none;visibility:hidden;transition-delay:0ms,0ms,0ms,0ms,0ms}#rhpane #overlay a.sub-menu:not(.menu-unfold) .iconfont{max-height:0}#rhpane #overlay a.sub-menu:not(.menu-unfold) .menu-text{max-height:0}#rhpane #overlay a:hover .menu-text{background-color:rgba(68,65,65,0.84)}#rhpane #overlay #ovr-menu .iconfont{transition:all .3s}#rhpane #overlay::after,#rhpane #overlay::before{position:absolute;top:-3px;bottom:-3px;right:0;content:' '}#rhpane #overlay::before{left:0;width:25px;background-color:rgba(68,65,65,0.84);border-radius:25px}#rhpane #overlay::after{width:100px;z-index:-10}#rhpane #overlay.iconsize-6 a{margin:0}#rhpane #overlay.iconsize-5 a{margin:0;font-size:14px}#rhpane #overlay.iconsize-5 a .iconfont{height:21px}#rhpane #overlay.iconsize-5 a .menu-text{height:19px}#rhpane #overlay.iconsize-5 a.menu-unfold{max-height:21px}#rhpane #overlay.iconsize-5 a.menu-unfold .menu-text{height:19px}#rhpane #overlay.iconsize-5 a.menu-unfold .iconfont{max-height:21px}#rhpane #overlay.iconsize-4 a{margin:0;font-size:12px}#rhpane #overlay.iconsize-4 a .iconfont,#rhpane #overlay.iconsize-4 a .menu-text{height:17px}#rhpane #overlay.iconsize-4 a.menu-unfold{max-height:17px}#rhpane #overlay.iconsize-4 a.menu-unfold .iconfont{max-height:17px}#rhpane #overlay.iconsize-4 a.menu-unfold .menu-text{max-height:17px}#rhpane #overlay.iconsize-3,#rhpane #overlay.iconsize-2,#rhpane #overlay.iconsize-1,#rhpane #overlay.iconsize-0{width:inherit;margin-bottom:35px}#rhpane #overlay.iconsize-3::before,#rhpane #overlay.iconsize-2::before,#rhpane #overlay.iconsize-1::before,#rhpane #overlay.iconsize-0::before{top:0;bottom:0;right:-3px;left:-3px;height:100%;width:inherit}#rhpane #overlay.iconsize-3 a,#rhpane #overlay.iconsize-2 a,#rhpane #overlay.iconsize-1 a,#rhpane #overlay.iconsize-0 a{float:left}#rhpane #overlay.iconsize-3 a .iconfont,#rhpane #overlay.iconsize-2 a .iconfont,#rhpane #overlay.iconsize-1 a .iconfont,#rhpane #overlay.iconsize-0 a .iconfont{font-size:14px;width:20px;height:20px}#rhpane #overlay.iconsize-3 a.sub-menu,#rhpane #overlay.iconsize-2 a.sub-menu,#rhpane #overlay.iconsize-1 a.sub-menu,#rhpane #overlay.iconsize-0 a.sub-menu{margin:.15em 0}#rhpane #overlay.iconsize-3 a.sub-menu:not(.menu-unfold),#rhpane #overlay.iconsize-2 a.sub-menu:not(.menu-unfold),#rhpane #overlay.iconsize-1 a.sub-menu:not(.menu-unfold),#rhpane #overlay.iconsize-0 a.sub-menu:not(.menu-unfold),#rhpane #overlay.iconsize-3 a .menu-text,#rhpane #overlay.iconsize-2 a .menu-text,#rhpane #overlay.iconsize-1 a .menu-text,#rhpane #overlay.iconsize-0 a .menu-text{display:none}#rhpane #overlay.iconsize-3 a:hover .menu-text,#rhpane #overlay.iconsize-2 a:hover .menu-text,#rhpane #overlay.iconsize-1 a:hover .menu-text,#rhpane #overlay.iconsize-0 a:hover .menu-text{display:block;font-size:12px;text-decoration:none;padding:3px 11px;right:0;top:25px}#rhpane #level{flex-grow:4;margin-bottom:20px;width:25px;max-height:200px;position:relative;cursor:pointer;transition:opacity .3s;align-self:flex-end;opacity:0;pointer-events:none}.has-more-levels #rhpane #level{opacity:1;pointer-events:auto}#rhpane #level::before{position:absolute;top:-5px;bottom:-10px;right:0;width:9px;background-color:rgba(68,65,65,0.84);border-radius:9px;content:' '}#rhpane #level .timecode{margin-left:0;top:0;margin-top:-10px;display:table;right:15px;height:2em}#rhpane #level .timecode .box{min-height:2em;padding:.3em .8em;height:inherit}#rhpane #level .timecode .box::before{left:inherit;top:.45em;right:-1.2em;margin:0;border-left-color:#d49500;border-top-color:transparent;border-width:.6em}#rhpane #level .timecode.ghost-timecode{pointer-events:none}#rhpane #level .timecode.ghost-timecode .box::before{border-left-color:rgba(68,65,65,0.84)}#rhpane #level .timecode.anim-allowed{-webkit-transition:all ease-in-out .25s;transition:all ease-in-out .25s}", "", function (e) {
    var t = W.require,
        i = t("broadcast"),
        o = t("utils"),
        n = t("store"),
        a = t("overlays"),
        r = t("rootScope"),
        s = t("trans"),
        l = t("BindedSwitch"),
        h = t("ProductSwitch"),
        d = t("BindedCheckbox"),
        c = t("OverlaysMenu"),
        p = t("Resizable"),
        m = t("Class");
    t("levelsBar");
    var u = r.pois;
    l.instance({
        bindStore: "pois",
        el: this.refs.poisSwitch,
        _init: function () {
            l._init.call(this), n.on("favPois", this.render, this), this.render()
        },
        render: function () {
            var e = this,
                t = n.get("favPois");
            this.selected = n.get("pois"), this.el.innerHTML = Object.keys(u).map(function (i) {
                return t.includes(i) ? '<div data-do="set,' + i + '" \tdata-tooltip="' + s[u[i][0]] + '"\n\t\t\t\t\t class="iconfont ' + (e.selected === i ? " selected" : "") + '">' + u[i][1] + "</div>" : ""
            }).join("") + '<span data-do="rqstOpen,pois" class="clickable-size">' + s.MORE_LAYERS + "</span>"
        }
    }), h.instance({
        showResolution: !1,
        el: this.refs.productSwitch
    }), d.instance({
        el: this.refs.isolines,
        onValue: "pressure",
        offValue: "off",
        bindStore: "isolines"
    }), d.instance({
        el: this.refs.particles,
        onValue: "on",
        offValue: "off",
        bindStore: "particlesAnim"
    }), c.instance(p, {
        el: this.refs.overlay,
        resizableEl: this.node,
        iconNum: 9,
        _init: function () {
            c._init.call(this), p._init.call(this), this.render()
        },
        onresize: function () {
            var e = (this.height - 200) / this.iconNum;
            o.replaceClass(/iconsize-\S+/, "iconsize-" + Math.floor(Math.max(0, e / 5)), this.el)
        }
    }), m.instance({
        el: this.refs.legend,
        _init: function () {
            n.on("overlay", this.render, this), n.on("usedLang", this.render, this), i.on("metricChanged", this.render, this), this.el.onclick = this.onclick.bind(this), this.render()
        },
        onclick: function () {
            a[n.get("overlay")].cycleMetric()
        },
        render: function () {
            var e = this,
                t = n.get("overlay"),
                o = a[t];
            this.el.classList.add("animate"), setTimeout(function () {
                o.paintLegend(e.el), e.el.classList.remove("animate"), i.emit("uiChanged")
            }, 400)
        }
    });
    var v = document,
        b = this.refs.fullscreen,
        f = function () {
            return v.fullscreen || v.webkitIsFullScreen || v.mozFullScreen
        },
        x = function () {
            return b.innerHTML = f() ? "&#xe035;" : "&#xe03f;"
        },
        g = !1;
    i.on("fullscreen", function () {
        var e = document.body;
        g || (v.addEventListener("fullscreenchange", x), v.addEventListener("webkitfullscreenchange", x), g = !0), f() ? v.exitFullscreen ? v.exitFullscreen() : v.webkitExitFullscreen && v.webkitExitFullscreen() : e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen()
    })
});