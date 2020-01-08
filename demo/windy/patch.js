W.patchVersion = "2019-11-16-extended-windy-maps-promo", /*! */
	W.patchHtml = '<donate><div class="weather-box clickable-size size-l fg-white bg-transparent" id="donate-promo-goals" data-do="rqstOpen,donate"><img src="https://www.windy.com/img/donate/Windy-needs-your-help.svg"> <span class="button size-s btn-white" data-t="DONATE"></span><p class="size-s"></p></div></donate><maps><section class="weather-box clickable-size size-l fg-white bg-transparent" id="wm-promo"><div><img src="https://img.windy.com/albums/Windy-Maps/windy-maps-logo-male-hranate.png"> <img class="wm-logo" alt="Windy Maps" src="https://img.windy.com/albums/Windy-Maps/WindyMaps.png"> <small data-t="WM_TRY"></small></div><ul><li data-t="WM_MAP" class="inlined" data-icon="O"></li><li data-t="WM_OFFLINE" class="inlined" data-icon="Q"></li><li data-t="WM_TRACKER" class="inlined" data-icon="&#xe028;"></li><li data-t="WM_ROUTE" class="inlined" data-icon="&#xe040;"></li><li data-t="WM_OSM" class="inlined" data-icon="&#xe02e;"></li><li data-t="WM_MAP" class="inlined" data-icon="O"></li></ul><span class="button size-s btn-white" data-t="MENU_MOBILE"></span> <span class="bg-gray clickble" data-hide="true"><span class="checkbox off size-s" data-hide="true" data-t="DO_NOT_SHOW"></span></span></section></maps>', /*! */
	W.patchLang = {
		OBSOLETE_APP: "This version of Windy.com App is <b>obsolete</b> and will stop working soon. Please <b>update your Windy.com App to the latest version</b>.",
		WM_TRY: "try new app from creators of Windy",
		WM_MAP: "Detailed Worldwide hiking map",
		WM_OFFLINE: "100% offline use",
		WM_TRACKER: "Sport tracker included",
		WM_ROUTE: "Car, hike, bike route planner",
		WM_OSM: "Based on free community data",
		DO_NOT_SHOW: "Do not show this anymore"
	}, /*! */
	/*! */
	W.tag("patch", "", "#plugin-patch{display:none !important}#wm-promo{overflow:hidden;position:relative;background-image:url('https://img.windy.com/albums/Windy-Maps/New-Project-3-.png');background-position:bottom right;background-size:cover;background-repeat:no-repeat}#wm-promo>div{width:100%;padding:10px;font-size:25px}#wm-promo>div img:first-child{float:left;width:55px;margin-right:15px}#wm-promo>div img.wm-logo{width:130px;margin-top:5px}#wm-promo>div small{text-shadow:0px 0px 4px black;display:block;font-size:14px;line-height:1;margin-left:10px}#wm-promo ul{display:block;clear:both;width:100%;white-space:nowrap;margin-top:10px;transition:margin 1s}#wm-promo ul.noanim{transition:none}#wm-promo ul li{text-shadow:0px 0px 4px black;font-size:20px;list-style:none;width:100%;display:inline-block;padding:0px 15px 10px 20px;line-height:1.4;overflow:hidden}#wm-promo ul li::before{font-size:1.4em}#wm-promo .button{background-color:#9D0300;border:none;position:absolute;top:5px;right:10px;color:white}#wm-promo span.bg-gray{padding:3px 8px 5px 10px;display:inline-block;float:right;border-top-left-radius:8px;opacity:.7}#promo-obsolete-app{text-shadow:0px 0px 4px black;color:white;display:block;line-height:1.6;text-align:center;overflow:hidden;letter-spacing:.1em;padding:.5em 1em}#donate-promo-goals{padding:10px 15px;letter-spacing:.02em;margin-bottom:5px}#donate-promo-goals p>div{margin:1em 0}#donate-promo-goals img{width:200px;-webkit-filter:drop-shadow(0 0 1px rgba(0,0,0,0.8));filter:drop-shadow(0 0 1px rgba(0,0,0,0.8));position:relative;left:-5px}#donate-promo-goals .third{font-size:12px;padding:2px 15px;border-radius:15px}#donate-promo-goals .button{position:absolute;top:5px;right:10px}.new::after{font-family:sans-serif;content:'New';font-size:9px;color:yellow;position:absolute;display:block;font-weight:bold;top:0;right:0;transform:rotate(45deg);text-shadow:0 0 2px rgba(0,0,0,0.63)}.settings-new::after{font-family:sans-serif;content:'New';font-size:9px;color:yellow;position:absolute;display:block;font-weight:bold;top:0;right:0;transform:rotate(45deg);text-shadow:0 0 2px rgba(0,0,0,0.63)}.settings-new::after{display:inline-block;position:relative;font-size:11px;top:-10px}", "", function () {
		function t(t) {
			function e(t) {
				var e = t.split(".").map(Number);
				return 1e3 * e[0] + 100 * e[1] + e[2]
			}
			return e(t) <= e(c.version)
		}

		function e(t) {
			return t.filter(function (t) {
				return Date.now() < new Date(t.end).getTime()
			}).filter(function (t) {
				return t.filter()
			}).filter(function (t) {
				if (l.getCounter2) {
					var e = l.getCounter2(t.id),
						n = e.ts,
						o = e.displayed;
					return 0 === o || o < t.counter && b - n > t.delay
				}
				return l.getCounter(t.id) < t.counter
			})
		}

		function n() {
			return k(e(f)[0])
		}
		var a = W.require("2019-11-16-extended-windy-maps-promo/donationGoals"),
			r = (W.require("Window"), W.require("broadcast")),
			s = W.require("$"),
			o = (W.require("plugins"), W.require("http")),
			d = W.require("trans"),
			i = W.require("log"),
			l = W.require("promo"),
			p = W.require("utils"),
			c = W.require("rootScope"),
			u = W.require("store"),
			m = ["at", "ba", "be", "bg", "ch", "cy", "de", "dk", "ee", "es", "fi", "fr", "gr", "hr", "hu", "ie", "il", "is", "it", "lt", "lu", "lv", "md", "me", "mk", "mt", "nl", "no", "pl", "pt", "ro", "rs", "se", "si", "sk", "uk", "cz"],
			g = "ad,al,at,ax,ba,be,bg,by,ch,de,dk,ee,es,eu,fi,fo,fr,fx,gb,gg,gi,gr,hr,hu,ie,im,is,it,je,li,lt,lu,lv,mc,md,me,mk,mt,nl,no,pl,pt,ro,rs,ru,se,si,sj,sm,tr,ua,va".split(",").concat("ao,bf,bi,bj,bw,cd,cf,cg,ci,cm,cv,dj,dz,eg,eh,er,et,ga,gh,gm,gn,gq,gw,ke,km,lr,ls,ly,ma,mg,ml,mr,mu,mw,mz,na,ne,ng,re,rw,sc,sd,sh,sl,sn,so,st,sz,td,tg,tn,tz,ug,yt,za,zm,zw".split(",")).concat("ar,bo,br,cl,co,ec,fk,gf,gy,pe,py,sr,uy,ve".split(",")),
			h = u.get("country"),
			f = [{
				id: "obsoleteApp19",
				end: "2019-12-31T20:00:00.000Z",
				counter: 1e3,
				delay: 0,
				filter: function () {
					return "mobile" === c.target && !t("20.0.0")
				},
				run: function () {
					var t = ["#d49500", "#d40000", "#d4009b", "#8400d4", "#2200d4", "#0d869a", "#177900", "#ad7100"];
					x('<div id="promo-obsolete-app" style="background: ' + t[Math.round(Math.random() * (t.length - 1))] + '" data-t="OBSOLETE_APP"></div>')
				}
			}, {
				id: "donateMaps",
				end: "2019-12-31T20:00:00.000Z",
				counter: 10,
				delay: 36 * p.tsHour,
				filter: function () {
					return "mobile" === c.target && t("20.0.0") && 4 < c.sessionCounter && g.includes(h)
				},
				run: function () {
					var n = this,
						t = x(W.patchHtml.replace(/.*<maps>(.*)<\/maps>.*/, "$1")),
						e = s("ul", t),
						o = 1,
						i = setInterval(function () {
							5 < o ? (o = 0, e.classList.add("noanim")) : e.classList.remove("noanim"), e.style.marginLeft = "-" + o + "00%", o++
						}, 3e3);
					setTimeout(function () {
						e.style.marginLeft = 0, clearTimeout(i)
					}, 12e4), l.hitCounter(this.id);

					function a(t) {
						if (t && t.target && t.target.dataset.hide) l.neverSee(n.id);
						else {
							var e = "ios" === c.platform ? "https://apps.apple.com/app/apple-store/id1201228182?pt=118417623&ct=windycom-in-app&mt=8" : "https://play.google.com/store/apps/details?id=cz.seznam.windymaps&utm_source=windycom&utm_medium=promomaps&utm_campaign=promomaps";
							window.open(e, "_system")
						}
					}
					t.ontouchstart = a, t.onmousedown = a, t.onclick = a, t.ontouch = a
				}
			}, {
				id: "donateGoals3",
				end: "2019-12-31T20:00:00.000Z",
				counter: 30,
				delay: 24 * p.tsHour,
				filter: function () {
					return ("mobile" === c.target && t("20.0.0") || "index" === c.target && !c.isMobile && !c.isTablet) && 3 < c.sessionCounter && !(0 < u.get("donations").length)
				},
				run: function () {
					var i = this,
						t = "https://www.windy.com/v/20.9.0.ind.22c2/lang/donate/" + u.get("usedLang") + ".json";
					o.get(t).then(function (t) {
						var e = t.data;
						Object.assign(d, e);
						var n = x(W.patchHtml.replace(/.*<donate>(.*)<\/donate>.*/, "$1"));
						a(m.includes(h)), l.hitCounter(i.id);

						function o() {
							return r.emit("rqstOpen", "donate")
						}
						n.ontouchstart = o, n.onmousedown = o
					})
				}
			}],
			w = [{
				id: "satPromo",
				end: "2020-01-01T00:00:00.000Z",
				counter: 10,
				delay: 0,
				filter: function () {
					return !c.isMobileOrTablet && 3 < c.sessionCounter
				},
				run: function () {
					"satellite" === u.get("overlay") || i.has("ov/satellite") || (l.hitCounter(this.id), setTimeout(function () {
						var t = s('#overlay > a[data-do="unfold,radarSat"] > div.menu-text'),
							e = s('#overlay > a[data-do="set,satellite"] > div.menu-text');
						t && (t.classList.add("shaky"), e.classList.add("new"), setTimeout(function () {
							t.classList.remove("shaky"), t.classList.add("new")
						}, 5e3), setTimeout(function () {
							t.classList.remove("new"), e.classList.remove("new")
						}, 15e3))
					}, 2e3))
				}
			}, {
				id: "settingsMobile",
				end: "2021-01-01T00:00:00.000Z",
				counter: 20,
				delay: 0,
				filter: function () {
					return c.isMobile && t("20.10.0")
				},
				run: function () {
					var e = this;
					r.on("pluginOpened", function (t) {
						"menu" === t && setTimeout(function () {
							var t = s('#plugin-menu [data-do="rqstOpen,settings"]');
							t.classList.add("shaky"), t.classList.add("settings-new"), l.hitCounter(e.id), setTimeout(function () {
								t.classList.remove("shaky")
							}, 7e3)
						}, 1e3)
					})
				}
			}],
			b = Date.now();
		Object.assign(d, W.patchLang);
		var y = u.get("usedLang");

		function v() {
			e(w).forEach(k), u.get("hpShown") ? n() : u.once("hpShown", function (t) {
				return t && n()
			})
		}

		function x(t) {
			var e = s("#articles");
			e.insertAdjacentHTML("beforebegin", t);
			var n = e.previousSibling;
			return d.translateDocument(n.parentNode), u.on("hpShown", function (t) {
				!t && n && (n.outerHTML = "", n = null)
			}), n
		}

		function k(t) {
			t && (t.html && x(t.html), t.run ? t.run.call(t) : l.hitCounter(t.id))
		}
		"en" !== y && ["zh", "ja", "fr", "de", "pt", "ko", "it", "ru", "nl", "cs", "tr", "pl", "sv", "fi", "ro", "el", "hu", "hr", "ca", "da", "ar", "fa", "hi", "sk", "uk", "bg", "he", "is", "lt", "et", "vi", "sl", "sr", "id", "th", "nb", "es"].includes(y) ? (null == c.patchServer && (c.patchServer = "https://www.windy.com"), o.get(c.patchServer + "/patch/index/" + W.patchVersion + "/" + y + ".json").then(function (t) {
			var e = t.data;
			Object.assign(d, e), v()
		}).catch(v)) : v()
	}),
	/*! */
	W.define("2019-11-16-extended-windy-maps-promo/donationGoals", ["utils", "http", "trans", "$"], function (a, t, r, e) {
		function s(t) {
			return t ? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
		}

		function d(e) {
			var n = Date.now(),
				o = n + 4e3,
				i = function () {
					var t = Math.floor(a.smoothstep(n, o, Date.now()) * e);
					! function (t) {
						var e = t.raisedShown,
							n = t.raisedPct;
						m.innerHTML = "<div>\n\t\t" + a.template(r.DON_DONATED2, {
							users: s(l)
						}) + ':\n\t\t<big class="size-l">' + s(e) + "&nbsp;" + u + '</big>\n\t</div>\n\t<div class="third" style="background: linear-gradient(to right, ' + g + " 0%, " + h + " " + n + "%,  #adadad " + n + '%, #adadad 100%);">\n\t\t' + a.template(r.DON_RAISED, {
							raised: n
						}) + "\n\t</div>"
					}({
						raisedShown: t,
						raisedPct: a.bound(Math.floor(t / c * 1e3) / 10, .1, 100)
					}), t < e && window.requestAnimationFrame(i)
				};
			i()
		}
		var l, p, c = 5e5,
			u = "USD",
			m = null,
			n = [
				["#d49500", "#9d0300"],
				["#44cabe", "#435da7"],
				["#3cc894", "#2b8825"],
				["#df6ee1", "#6c2128"]
			][Math.round(3 * Math.random())],
			g = n[0],
			h = n[1],
			o = function () {
				e("#donate-promo-goals").style.display = "none"
			};
		return function (s) {
			(m = e("#donate-promo-goals > p")) || o(), t.get("/payments/total", {
				cache: !1
			}).then(function (t) {
				var e = t.data,
					n = e.eur,
					o = e.usd,
					i = e.count,
					a = 1,
					r = 1;
				s ? (u = "EUR", r = 1 / e.eurToUsd) : (c = 5e4 * Math.round(c * e.eurToUsd / 5e4), a = e.eurToUsd), p = Math.round(a * n + r * o), l = i, d(p)
			}).catch(o)
		}
	});