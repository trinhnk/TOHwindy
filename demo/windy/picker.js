/*! */
W.define("Picker", ["metrics", "store", "format", "picker", "$", "utils", "broadcast", "trans", "overlays", "rootScope", "map", "interpolator", "ClickHandler"], function (e, t, i, o, n, r, a, s, c, p, l, d, h) {
    return o.extend({
        interpolate: null,
        popup: null,
        padding: {
            left: 60,
            right: 60,
            top: 60,
            bottom: 100
        },
        lastRender: 0,
        el: n("#plugin-picker"),
        onMetricChanged: function () {
            this.formatDir = i.getDirFunction(), this.update()
        },
        close: function () {
            p.picker = null, this.popup && (document.body.classList.remove("moooving"), this.hasHooks && (a.off("redrawFinished", this.updateInterFun, this), a.off("metricChanged", this.onMetricChanged, this), a.off("dataChanged", this.updateInterFun, this), this.hasHooks = !1), this.removePicker(), this.popup = null, this.emit("pickerClosed"))
        },
        clickOnMap: function (e) {
            var t = e.x,
                i = e.y,
                o = e.lat,
                n = e.lon;
            i < this.padding.top || i > p.map.height - this.padding.bottom || t < this.padding.left || t > p.map.width - this.padding.right || (this.clickedX = t, this.clickedY = i, this.open(o, n, !1, "click"))
        },
        open: function (e, t, n, r) {
            this.popup ? this.move(e, t, n, r) : (this.formatDir = i.getDirFunction(), this.show(e, t, n, r)), o.getParams = this.getParams.bind(this)
        },
        show: function (e, t, i, o) {
            var n = this;
            this.lat = e, this.lon = t, this.getInterpolator(function () {
                n.mountPicker(e, t, o), n.hasHooks || (a.on("redrawFinished", n.updateInterFun, n), a.on("metricChanged", n.onMetricChanged, n), a.on("dataChanged", n.updateInterFun, n), n.hasHooks = !0), n.update(), i || n.emit("pickerOpened", {
                    lat: e,
                    lon: t,
                    source: "picker"
                })
            })
        },
        mountPicker: function (e, t, i) {
            var o = this;
            this.popup = this.createPicker(e, t, i), this.popupContent = n(".picker-content", this.popup), h.instance({
                el: this.popup,
                stopPropagation: !0,
                click: function (e) {
                    switch (e) {
                        case "openDetailMobile":
                            if (!p.isMobile) return;
                        case "openDetail":
                            a.emit.call(a, "rqstOpen", "detail", o.getParams())
                    }
                }
            })
        },
        getInterpolator: function (e) {
            var t = this;
            d(function (i, o, n) {
                t.isAsync = n, t.interpolate = i.bind(d), t.interpolateXY = o.bind(d), e.call(t)
            })
        },
        updateInterFun: function () {
            this.getInterpolator(this.update)
        },
        updateAsync: function () {
            var e = this,
                t = this.getLatLng(),
                i = {
                    lat: t.lat,
                    lon: t.lng
                };
            p.picker = i, this.interpolate(i).then(function (t) {
                return e.render(t, i)
            })
        },
        update: function (e) {
            if (this.isAsync && !e) this.updateAsync();
            else {
                var t = Date.now();
                if (!this.popup || t - this.lastRender < 300) return;
                this.lastRender = t;
                var i = this.getLatLng(),
                    o = {
                        lat: i.lat,
                        lon: i.lng
                    },
                    n = this.interpolate(o);
                p.picker = o, null == n ? a.emit("rqstClose", "picker") : this.render(n, o)
            }
        },
        render: function (e, t) {
            Array.isArray(e) || e < 0 ? (this.popupContent.classList.remove("p-empty"), this.popupContent.firstChild.innerHTML = this.createHTML(e, t)) : (this.popupContent.classList.add("p-empty"), this.popupContent.firstChild.innerHTML = "")
        },
        dragend: function () {
            this.popup && (document.body.classList.remove("moooving"), this.update(), this.emit("pickerMoved", this.getParams(), {
                overlay: this.latestOverlay,
                values: this.latestValues
            }))
        },
        createHTML: function (i, o) {
            var n, a, d = '<div class="p-title">',
                h = t.get("overlay"),
                k = Array.isArray(i) && i[0],
                u = c[h],
                g = u.getName();
            l.getZoom();
            switch (this.latestValues = i, this.latestOverlay = h, h) {
                case "wind":
                case "currents":
                    n = r.wind2obj(i), d += " " + g + '</div><big><i title="Direction from, true north">' + r.windDir2html(n) + this.formatDir(n.dir) + "</i> " + u.convertValue(n.wind) + "</big>";
                    break;
                case "waves":
                case "swell1":
                case "swell2":
                case "swell3":
                case "wwaves":
                    d += g + '</div><big><i title="Direction from, true north" data-dir="' + (n = r.wave2obj(i)).dir + '">' + this.formatDir(n.dir) + "</i> " + u.convertValue(n.size) + "</big>" + s.PERIOD + " " + Math.round(n.period) + " s.<br>";
                    break;
                case "snowcover":
                    d += g + "</div><big>" + (k > 490 ? "More than 5m" : u.convertValue(k)) + "</big>" + (k > .5 ? s.SNOWDENSITY + " " + Math.round(i[1]) + " kg/m3<br>" : "");
                    break;
                case "cape":
                    d += s.THUNDER + " (CAPE Index)</div><big>" + u.convertValue(k) + "</big>";
                    break;
                case "cbase":
                    d += s.CLOUD_ALT + "</div><big>" + u.convertValue(k) + "</big>";
                    break;
                case "ptype":
                case "rain":
                    a = i[1], g = e.ptype.convertNumber(a) || s.RAIN, d += a > 0 ? g + " (3h)" : "", d += "</div><big>" + c[/5|6/.test(a) ? "snowAccu" : "rain"].convertValue(k) + "</big>";
                    break;
                case "clouds":
                case "lclouds":
                case "hclouds":
                case "mclouds":
                    d += g + "</div><big>" + Math.floor(k) + "%</big>" + (i[1] > .3 ? c.rain.convertValue(i[1]) + "<br>" : "");
                    break;
                case "capAlerts":
                case "fog":
                    d += g + "</div><big>" + s.D_FCST + "</big>";
                    break;
                case "radar":
                    d += g + "</div><big>" + (p.isMobile ? "Max: " + i[1] + "dBZ</big>" : "Latest: " + i[0] + "dBZ</big>Max: " + i[1] + "dBZ<br>");
                    break;
                case "map":
                    d += "Elevation</div><big>" + e.elevation.convertValue(k) + "</big>";
                    break;
                case "satellite":
                    d += g + "</div><big>" + (k > 0 ? "" + e.satellite.convertValue(k) : "" + e.satellite.na()) + "</big>";
                    break;
                default:
                    d += g + "</div><big>" + u.convertValue(k) + "</big>"
            }
            return this.displayLanLon && o && (d += this.createCoordsHtml(o)), d
        }
    })
}),
/*! */
W.define("pickerDesktop", ["format", "$", "broadcast", "map", "trans", "store", "Picker", "utils"], function (e, t, i, o, n, r, a, s) {
    return a.instance({
        wasDragged: r.get("wasDragged"),
        displayLanLon: !1,
        _init: function () {
            this.html = this.el.innerHTML, this.el.innerHTML = ""
        },
        removePicker: function () {
            this.wasDragged = !0, i.off(this.mapDragHandler), o.removeLayer(this.marker)
        },
        getLatLng: function () {
            return this.marker.getLatLng().wrap()
        },
        getParams: function () {
            var e = this.getLatLng();
            return {
                lat: e.lat,
                lon: e.lng,
                source: "picker",
                values: this.latestValues,
                overlay: this.latestOverlay
            }
        },
        move: function (e, t, i) {
            this.marker.setLatLng([e, t]), this.update(), i || this.emit("pickerMoved", {
                source: "picker",
                lat: e,
                lon: t
            })
        },
        checkAndRemove: function (e) {
            var t = this.getLatLng(),
                o = t.lat,
                n = t.lng;
            (n < e.west || n > e.east || o > e.north || o < e.south) && i.emit("rqstClose", "picker")
        },
        createPicker: function (e, a) {
            this.displayLanLon = r.get("latlon");
            var s = L.divIcon({
                className: "picker open",
                html: this.html + (this.wasDragged ? "" : '<div class="picker-drag-me">' + n.DRAG_ME + "</div>"),
                iconSize: [0, 125],
                zIndexOffset: 800,
                iconAnchor: [0, 125]
            });
            return this.marker = L.marker([e, a], {
                icon: s,
                draggable: !0
            }).on("dragstart", this.dragstart, this).on("drag", this.update.bind(this, !0), this).on("dragend", this.dragend, this).addTo(o), this.displayLanLon && (t(".picker-content", this.marker._icon).onmousedown = this.copyToClipboard.bind(this), t(".picker-share", this.marker._icon).style.display = "none"), this.mapDragHandler = i.on("mapChanged", this.checkAndRemove, this), this.marker._icon
        },
        dragstart: function () {
            this.wasDragged || (t(".picker-drag-me", this.popup).style.opacity = 0, t(".picker-drag-me", this.popup).style.visibility = "hidden", this.wasDragged = !0, r.set("wasDragged", !0)), document.body.classList.add("moooving")
        },
        createCoordsHtml: function (t) {
            var i = t.lat,
                o = t.lon,
                r = e.DD2DMS(i, o);
            return '<a class="picker-latlon" id="coords-to-clipboard" data-tooltip="' + n.COPY_TO_C + '">' + r + "</a>"
        },
        copyToClipboard: function () {
            s.copy2clipboard(s.normalizeLatLon(this.lat) + ", " + s.normalizeLatLon(this.lon))
        }
    })
}),
/*! */
W.define("pickerMobile", ["map", "Picker"], function (e, t) {
    return t.instance({
        removePicker: function () {
            e.removeZoomCenter(), this.dragHook && (e.off("drag", this.ondrag, this), e.off("dragend", this.dragend, this), this.dragHook = !1)
        },
        _init: function () {
            this.move = this.show
        },
        ondrag: function () {
            var t = Date.now();
            if (!(this.isAsync || t - this.lastRender < 100)) {
                this.lastRender = t;
                var i = e._getTopLeftPoint(),
                    o = this.x + i.x,
                    n = this.y + i.y,
                    r = this.interpolateXY(o - this.layerX, n - this.layerY, o, n);
                null != r && this.render(r)
            }
        },
        updateInterFun: function () {
            this.updateLayerXY(), t.updateInterFun.call(this)
        },
        updateLayerXY: function () {
            var t = e._getTopLeftPoint();
            this.layerX = t.x, this.layerY = t.y
        },
        getLatLng: function () {
            return e.containerPointToLatLng([this.x, this.y])
        },
        getParams: function () {
            var e = this.getLatLng();
            return {
                lat: e.lat,
                lon: e.lng,
                source: "picker"
            }
        },
        createPicker: function (t, i, o) {
            if (this.popup || (this.x = this.el.offsetLeft + 1, this.y = this.el.offsetTop + this.el.offsetHeight, e.setZoomCenter(this.x, this.y)), "click" !== o) {
                var n = e.getZoom(),
                    r = e.getSize().y,
                    a = e.project([t, i], n).subtract([0, this.y - r / 2]),
                    s = e.unproject(a, n);
                e.setView(s, n, {
                    animate: !0
                })
            }
            return this.updateLayerXY(), this.dragHook || (this.dragHook = !0, e.on("drag", this.ondrag, this), e.on("dragend", this.dragend, this)), this.el
        }
    })
}),
/*! */
W.tag("picker", '<div class="picker-lines noselect"></div><div class="picker-content noselect"><span data-do="openDetailMobile"></span><a class="picker-link iconfont tooltip-right shy" data-do="openDetail" data-tooltipsrc="D_FCST">?</a><a class="picker-share mobilehide shy" data-do="share" data-icon="F" data-t="SHARE_FCST"></a><a class="picker-close-button shy" data-do="rqstClose,picker" data-icon="&#xe013;"></a></div>', ".picker .picker-drag-me:before{font-family:iconfont;font-variant:normal;text-transform:none;line-height:1}.picker{transition:.3s opacity 0s;-webkit-transition:.3s opacity 0s;font-size:11px;letter-spacing:1px;animation:fadein-full 1s;-webkit-animation:fadein-full 1s;opacity:0}.picker:focus{outline:none}#device-mobile .picker{-webkit-transition:none;transition:none;position:fixed;left:50%;top:180px;margin-top:-70px}#device-mobile .has-statusbar .picker{top:200px}#device-mobile .onsearch .picker,#device-mobile .onweather .picker,#device-mobile .onfavs .picker,#device-mobile .onmenu .picker{visibility:hidden}.picker.open{opacity:1}.onsearch .picker{opacity:0}.picker .closing-x{display:none}.picker .picker-lines{position:relative;border-left:2px solid rgba(68,65,65,0.84);height:125px;cursor:move}.picker .picker-lines::after{display:block;position:absolute;left:-5px;top:120.5px;background-color:white;width:8px;height:8px;border-radius:4px;content:' '}.picker .picker-lines::before{display:block;position:absolute;content:' ';left:-10px;right:0;width:20px;height:140px}#device-mobile .picker .picker-lines{height:70px}#device-mobile .picker .picker-lines::after{top:calc(65.5px)}#device-mobile .picker .picker-lines::before{display:none}.picker .picker-content{position:absolute;left:2px;top:0;cursor:move;white-space:nowrap;color:white;background-color:rgba(68,65,65,0.84);border-top-right-radius:20px;border-bottom-right-radius:20px}.picker .picker-content .p-title{position:absolute;top:-18px;left:0;color:#fff3e1;text-shadow:0 0 4px black}.picker .picker-content a{color:white}.picker .picker-content span{display:inline-block;padding:0 30px 0 10px}.picker .picker-content span big{display:block;font-size:18px}.picker .picker-content i{font-style:inherit;color:#e4d5bd;font-size:.8em}.picker .picker-content i .iconfont{font-size:10px;margin-left:-0.5em;width:1em;height:1em;display:inline-block;text-align:center;margin-right:.5em;text-shadow:none}.picker .picker-content .picker-link,.picker .picker-content .picker-close-button{transition:.3s opacity 0s;-webkit-transition:.3s opacity 0s;cursor:pointer;display:block;position:absolute}.picker .picker-content .picker-close-button{border:10px solid transparent;background-clip:padding-box;left:calc(100% + 8px);top:-15px}.picker .picker-content .picker-close-button::before{display:block;font-size:18px;width:1em;height:1em;border-radius:1em;border:0;background-color:rgba(68,65,65,0.84)}.picker .picker-content .picker-link{font-size:25px;left:100%;width:1em;height:1em;border-radius:1em;margin-left:-0.7em;bottom:0;background-color:#d49500;box-shadow:0 0 4px 0 black}.picker .picker-content .picker-latlon,.picker .picker-content .picker-share{position:absolute;left:10px;margin-top:10px;top:100%;color:#fff3e1;text-shadow:0 0 4px black;cursor:pointer}.picker .picker-content .picker-share{opacity:0}.picker .picker-content .picker-share::before{position:relative;font-size:1.6em;top:.2em}.picker .picker-content .picker-link:hover+.picker-share,.picker .picker-content .picker-share:hover{opacity:1}.picker .picker-content.p-empty{background:none;width:30px;min-width:30px;height:50px}.picker .picker-content.p-empty .picker-close-button{position:absolute;left:0}.picker .picker-content.p-empty .picker-link{display:none}#device-mobile .picker .picker-content{-webkit-transition:none;transition:none;top:initial;min-height:27px;bottom:100%;border-radius:27px;transform:translateX(-50%);-webkit-transform:translateX(-50%)}#device-mobile .picker .picker-content span,#device-mobile .picker .picker-content .picker-close-button,#device-mobile .picker .picker-content .picker-link{-webkit-transition:none;transition:none}#device-mobile .picker .picker-content span{padding:2px 30px 2px 15px}#device-mobile .picker .picker-content span .p-title{display:none}#device-mobile .picker .picker-content .picker-close-button{top:-10px}#device-mobile .picker .picker-content .picker-close-button::before{font-size:27px}#device-mobile .picker .picker-content.p-empty .picker-close-button{left:-10px;bottom:-10px;top:initial}#device-mobile .picker .picker-content .picker-share{display:none}.picker .picker-drag-me{visibility:visible;transition:visibility 0s linear .5s,opacity .5s linear;position:absolute;bottom:5px;font-size:10px;color:#dedede;left:-5px;white-space:nowrap;transform-origin:left bottom;transform:rotate(-90deg);-webkit-transform-origin:left bottom;-webkit-transform:rotate(-90deg)}.picker .picker-drag-me:before{position:relative;font-size:16px;left:-3px;top:-3px;content:\"'\"}", "", function (e) {
    var t = (0, W.require)("rootScope"),
        i = W.require(t.isMobile ? "pickerMobile" : "pickerDesktop");
    this.onopen = function (e) {
        "singleclick" === e.source ? i.clickOnMap(e) : i.open(e.lat, e.lon, e.noEmit, "bcast")
    }, this.onclose = i.close.bind(i)
});