"use strict";
function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(t) {
        return typeof t
    }: function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
    })(t)
}
function filterList() {
    for (var t = [], e = [], n = [], r = [], i = 0; i < checkCategory.length; i += 1) if (checkCategory[i].checked) {
        var a = checkCategory[i].value;
        t.push(a)
    }
    for (var s = 0; s < checkDuration.length; s += 1) if (checkDuration[s].checked) {
        var o = checkDuration[s].value;
        e.push(o)
    }
    for (var l = 0; l < checkMeat.length; l += 1) if (checkMeat[l].checked) {
        var u = checkMeat[l].value;
        n.push(u)
    }
    for (var c = 0; c < checkOrigin.length; c += 1) if (checkOrigin[c].checked) {
        var f = checkOrigin[c].value;
        r.push(f)
    }
    t.length + e.length + n.length + r.length > 0 ? recipeList.filter(function(i) {
        var a = 0 === t.length || t.indexOf(i.values().category) > -1,
        s = 0 === e.length || e >= i.values().duration,
        o = 0 === n.length || n.filter(function(t) {
            return - 1 !== i.values().tags.split(", ").indexOf(t)
        }).length > 0,
        l = 0 === r.length || r.filter(function(t) {
            return - 1 !== i.values().tags.split(", ").indexOf(t)
        }).length > 0;
        return !! (a && s && o && l)
    }) : recipeList.filter()
} !
function(t, e) {
    "function" == typeof define && define.amd ? define([],
    function() {
        return e(t)
    }) : "object" === ("undefined" == typeof exports ? "undefined": _typeof(exports)) ? module.exports = e(t) : t.SmoothScroll = e(t)
} ("undefined" != typeof global ? global: "undefined" != typeof window ? window: void 0,
function(t) {
    var e = {
        ignore: "[data-scroll-ignore]",
        header: null,
        topOnEmptyHash: !0,
        speed: 500,
        speedAsDuration: !1,
        durationMax: null,
        durationMin: null,
        clip: !0,
        offset: 0,
        easing: "easeInOutCubic",
        customEasing: null,
        updateURL: !0,
        popstate: !0,
        emitEvents: !0
    },
    n = function() {
        return "querySelector" in document && "addEventListener" in t && "requestAnimationFrame" in t && "closest" in t.Element.prototype
    },
    r = function() {
        var t = {};
        return Array.prototype.forEach.call(arguments,
        function(e) {
            for (var n in e) {
                if (!e.hasOwnProperty(n)) return;
                t[n] = e[n]
            }
        }),
        t
    },
    i = function(e) {
        return !! ("matchMedia" in t && t.matchMedia("(prefers-reduced-motion)").matches)
    },
    a = function(e) {
        return parseInt(t.getComputedStyle(e).height, 10)
    },
    s = function(t) {
        "#" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = String(t), r = n.length, i = -1, a = "", s = n.charCodeAt(0); ++i < r;) {
            if (0 === (e = n.charCodeAt(i))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
            e >= 1 && e <= 31 || 127 == e || 0 === i && e >= 48 && e <= 57 || 1 === i && e >= 48 && e <= 57 && 45 === s ? a += "\\" + e.toString(16) + " ": a += e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 ? n.charAt(i) : "\\" + n.charAt(i)
        }
        return "#" + a
    },
    o = function(t, e) {
        var n;
        return "easeInQuad" === t.easing && (n = e * e),
        "easeOutQuad" === t.easing && (n = e * (2 - e)),
        "easeInOutQuad" === t.easing && (n = e < .5 ? 2 * e * e: (4 - 2 * e) * e - 1),
        "easeInCubic" === t.easing && (n = e * e * e),
        "easeOutCubic" === t.easing && (n = --e * e * e + 1),
        "easeInOutCubic" === t.easing && (n = e < .5 ? 4 * e * e * e: (e - 1) * (2 * e - 2) * (2 * e - 2) + 1),
        "easeInQuart" === t.easing && (n = e * e * e * e),
        "easeOutQuart" === t.easing && (n = 1 - --e * e * e * e),
        "easeInOutQuart" === t.easing && (n = e < .5 ? 8 * e * e * e * e: 1 - 8 * --e * e * e * e),
        "easeInQuint" === t.easing && (n = e * e * e * e * e),
        "easeOutQuint" === t.easing && (n = 1 + --e * e * e * e * e),
        "easeInOutQuint" === t.easing && (n = e < .5 ? 16 * e * e * e * e * e: 1 + 16 * --e * e * e * e * e),
        t.customEasing && (n = t.customEasing(e)),
        n || e
    },
    l = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
    },
    u = function(e, n, r, i) {
        var a = 0;
        if (e.offsetParent) do {
            a += e.offsetTop, e = e.offsetParent
        } while ( e );
        return a = Math.max(a - n - r, 0),
        i && (a = Math.min(a, l() - t.innerHeight)),
        a
    },
    c = function(t) {
        return t ? a(t) + t.offsetTop: 0
    },
    f = function(t, e) {
        var n = e.speedAsDuration ? e.speed: Math.abs(t / 1e3 * e.speed);
        return e.durationMax && n > e.durationMax ? e.durationMax: e.durationMin && n < e.durationMin ? e.durationMin: parseInt(n, 10)
    },
    d = function(e) {
        if (history.replaceState && e.updateURL && !history.state) {
            var n = t.location.hash;
            n = n || t.pageYOffset,
            history.replaceState({
                smoothScroll: JSON.stringify(e),
                anchor: n || t.pageYOffset
            },
            document.title, n || t.location.href)
        }
    },
    h = function(t, e, n) {
        e || history.pushState && n.updateURL && history.pushState({
            smoothScroll: JSON.stringify(n),
            anchor: t.id
        },
        document.title, t === document.documentElement ? "#top": "#" + t.id)
    },
    m = function(e, n, r) {
        0 === e && document.body.focus(),
        r || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), t.scrollTo(0, n))
    },
    v = function(e, n, r, i) {
        if (n.emitEvents && "function" == typeof t.CustomEvent) {
            var a = new CustomEvent(e, {
                bubbles: !0,
                detail: {
                    anchor: r,
                    toggle: i
                }
            });
            document.dispatchEvent(a)
        }
    };
    return function(a, g) {
        var p, y, b, C, S, E, O = {};
        O.cancelScroll = function(t) {
            cancelAnimationFrame(E),
            E = null,
            t || v("scrollCancel", p)
        },
        O.animateScroll = function(n, i, a) {
            O.cancelScroll();
            var s = r(p || e, a || {}),
            d = "[object Number]" === Object.prototype.toString.call(n),
            g = d || !n.tagName ? null: n;
            if (d || g) {
                var y = t.pageYOffset;
                s.header && !C && (C = document.querySelector(s.header));
                var b, S, x, w = c(C),
                A = d ? n: u(g, w, parseInt("function" == typeof s.offset ? s.offset(n, i) : s.offset, 10), s.clip),
                N = A - y,
                I = l(),
                L = 0,
                k = f(N, s),
                M = function(e, r) {
                    var a = t.pageYOffset;
                    if (e == r || a == r || (y < r && t.innerHeight + a) >= I) return O.cancelScroll(!0),
                    m(n, r, d),
                    v("scrollStop", s, n, i),
                    b = null,
                    E = null,
                    !0
                },
                B = function e(n) {
                    b || (b = n),
                    L += n - b,
                    S = 0 === k ? 0 : L / k,
                    S = S > 1 ? 1 : S,
                    x = y + N * o(s, S),
                    t.scrollTo(0, Math.floor(x)),
                    M(x, A) || (E = t.requestAnimationFrame(e), b = n)
                };
                0 === t.pageYOffset && t.scrollTo(0, 0),
                h(n, d, s),
                v("scrollStart", s, n, i),
                O.cancelScroll(!0),
                t.requestAnimationFrame(B)
            }
        };
        var x = function(e) {
            if (!i() && 0 === e.button && !e.metaKey && !e.ctrlKey && "closest" in e.target && (b = e.target.closest(a)) && "a" === b.tagName.toLowerCase() && !e.target.closest(p.ignore) && b.hostname === t.location.hostname && b.pathname === t.location.pathname && /#/.test(b.href)) {
                var n = s(b.hash),
                r = p.topOnEmptyHash && "#" === n ? document.documentElement: document.querySelector(n);
                r = r || "#top" !== n ? r: document.documentElement,
                r && (e.preventDefault(), d(p), O.animateScroll(r, b))
            }
        },
        w = function(t) {
            if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(p)) {
                var e = history.state.anchor;
                e && 0 !== e && !(e = document.querySelector(s(history.state.anchor))) || O.animateScroll(e, null, {
                    updateURL: !1
                })
            }
        };
        return O.destroy = function() {
            p && (document.removeEventListener("click", x, !1), t.removeEventListener("popstate", w, !1), O.cancelScroll(), p = null, y = null, b = null, C = null, S = null, E = null)
        },
        O.init = function(i) {
            if (!n()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            O.destroy(),
            p = r(e, i || {}),
            C = p.header ? document.querySelector(p.header) : null,
            document.addEventListener("click", x, !1),
            p.updateURL && p.popstate && t.addEventListener("popstate", w, !1)
        },
        O.init(g),
        O
    }
});
var scroll = new SmoothScroll('a[href*="#"]', {
    easing: "easeInOutCubic",
    offset: 64
}),
menuOpen = document.getElementById("js-navOpen"),
menuClose = document.getElementById("js-navClose"),
metabarNav = document.getElementById("js-metabarNav");
menuOpen.addEventListener("click",
function() {
    metabarNav.classList.add("open")
}),
menuClose.addEventListener("click",
function() {
    metabarNav.classList.remove("open")
});
for (var embeds = document.getElementsByClassName("embedly-card"), i = 0; i < embeds.length; i += 1) embeds[i].setAttribute("data-card-controls", "0"),
embeds[i].setAttribute("data-card-align", "left"),
embeds[i].setAttribute("data-card-recommend", "0"),
embeds[i].setAttribute("data-card-chrome", "0");
var List = function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    var n = {};
    return e.m = t,
    e.c = n,
    e.i = function(t) {
        return t
    },
    e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    },
    e.n = function(t) {
        var n = t && t.__esModule ?
        function() {
            return t.
        default
        }:
        function() {
            return t
        };
        return e.d(n, "a", n),
        n
    },
    e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    },
    e.p = "",
    e(e.s = 11)
} ([function(t, e, n) {
    function r(t) {
        if (!t || !t.nodeType) throw new Error("A DOM element reference is required");
        this.el = t,
        this.list = t.classList
    }
    var i = n(4),
    a = /\s+/;
    Object.prototype.toString,
    t.exports = function(t) {
        return new r(t)
    },
    r.prototype.add = function(t) {
        if (this.list) return this.list.add(t),
        this;
        var e = this.array();
        return~i(e, t) || e.push(t),
        this.el.className = e.join(" "),
        this
    },
    r.prototype.remove = function(t) {
        if (this.list) return this.list.remove(t),
        this;
        var e = this.array(),
        n = i(e, t);
        return~n && e.splice(n, 1),
        this.el.className = e.join(" "),
        this
    },
    r.prototype.toggle = function(t, e) {
        return this.list ? (void 0 !== e ? e !== this.list.toggle(t, e) && this.list.toggle(t) : this.list.toggle(t), this) : (void 0 !== e ? e ? this.add(t) : this.remove(t) : this.has(t) ? this.remove(t) : this.add(t), this)
    },
    r.prototype.array = function() {
        var t = this.el.getAttribute("class") || "",
        e = t.replace(/^\s+|\s+$/g, ""),
        n = e.split(a);
        return "" === n[0] && n.shift(),
        n
    },
    r.prototype.has = r.prototype.contains = function(t) {
        return this.list ? this.list.contains(t) : !!~i(this.array(), t)
    }
},
function(t, e, n) {
    var r = window.addEventListener ? "addEventListener": "attachEvent",
    i = window.removeEventListener ? "removeEventListener": "detachEvent",
    a = "addEventListener" !== r ? "on": "",
    s = n(5);
    e.bind = function(t, e, n, i) {
        t = s(t);
        for (var o = 0; o < t.length; o++) t[o][r](a + e, n, i || !1)
    },
    e.unbind = function(t, e, n, r) {
        t = s(t);
        for (var o = 0; o < t.length; o++) t[o][i](a + e, n, r || !1)
    }
},
function(t, e) {
    t.exports = function(t) {
        return function(e, n, r) {
            var i = this;
            this._values = {},
            this.found = !1,
            this.filtered = !1;
            this.values = function(e, n) {
                if (void 0 === e) return i._values;
                for (var r in e) i._values[r] = e[r]; ! 0 !== n && t.templater.set(i, i.values())
            },
            this.show = function() {
                t.templater.show(i)
            },
            this.hide = function() {
                t.templater.hide(i)
            },
            this.matching = function() {
                return t.filtered && t.searched && i.found && i.filtered || t.filtered && !t.searched && i.filtered || !t.filtered && t.searched && i.found || !t.filtered && !t.searched
            },
            this.visible = function() {
                return ! (!i.elm || i.elm.parentNode != t.list)
            },
            function(e, n, r) {
                if (void 0 === n) r ? i.values(e, r) : i.values(e);
                else {
                    i.elm = n;
                    var a = t.templater.get(i, e);
                    i.values(a)
                }
            } (e, n, r)
        }
    }
},
function(t, e) {
    var n = function(t, e, n) {
        return n ? t.getElementsByClassName(e)[0] : t.getElementsByClassName(e)
    },
    r = function(t, e, n) {
        return e = "." + e,
        n ? t.querySelector(e) : t.querySelectorAll(e)
    },
    i = function(t, e, n) {
        for (var r = [], i = t.getElementsByTagName("*"), a = i.length, s = new RegExp("(^|\\s)" + e + "(\\s|$)"), o = 0, l = 0; o < a; o++) if (s.test(i[o].className)) {
            if (n) return i[o];
            r[l] = i[o],
            l++
        }
        return r
    };
    t.exports = function() {
        return function(t, e, a, s) {
            return s = s || {},
            s.test && s.getElementsByClassName || !s.test && document.getElementsByClassName ? n(t, e, a) : s.test && s.querySelector || !s.test && document.querySelector ? r(t, e, a) : i(t, e, a)
        }
    } ()
},
function(t, e) {
    var n = [].indexOf;
    t.exports = function(t, e) {
        if (n) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r) if (t[r] === e) return r;
        return - 1
    }
},
function(t, e) {
    function n(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    t.exports = function(t) {
        if (void 0 === t) return [];
        if (null === t) return [null];
        if (t === window) return [window];
        if ("string" == typeof t) return [t];
        if (n(t)) return t;
        if ("number" != typeof t.length) return [t];
        if ("function" == typeof t && t instanceof Function) return [t];
        for (var e = [], r = 0; r < t.length; r++)(Object.prototype.hasOwnProperty.call(t, r) || r in t) && e.push(t[r]);
        return e.length ? e: []
    }
},
function(t, e) {
    t.exports = function(t) {
        return t = void 0 === t ? "": t,
        t = null === t ? "": t,
        t = t.toString()
    }
},
function(t, e) {
    t.exports = function(t) {
        for (var e, n = Array.prototype.slice.call(arguments, 1), r = 0; e = n[r]; r++) if (e) for (var i in e) t[i] = e[i];
        return t
    }
},
function(t, e) {
    t.exports = function(t) {
        return function e(n, r, i) {
            var a = n.splice(0, 50);
            i = i || [],
            i = i.concat(t.add(a)),
            n.length > 0 ? setTimeout(function() {
                e(n, r, i)
            },
            1) : (t.update(), r(i))
        }
    }
},
function(t, e) {
    t.exports = function(t) {
        return t.handlers.filterStart = t.handlers.filterStart || [],
        t.handlers.filterComplete = t.handlers.filterComplete || [],
        function(e) {
            if (t.trigger("filterStart"), t.i = 1, t.reset.filter(), void 0 === e) t.filtered = !1;
            else {
                t.filtered = !0;
                for (var n = t.items,
                r = 0,
                i = n.length; r < i; r++) {
                    var a = n[r];
                    e(a) ? a.filtered = !0 : a.filtered = !1
                }
            }
            return t.update(),
            t.trigger("filterComplete"),
            t.visibleItems
        }
    }
},
function(t, e, n) {
    var r = (n(0), n(1)),
    i = n(7),
    a = n(6),
    s = n(3),
    o = n(19);
    t.exports = function(t, e) {
        e = e || {},
        e = i({
            location: 0,
            distance: 100,
            threshold: .4,
            multiSearch: !0,
            searchClass: "fuzzy-search"
        },
        e);
        var n = {
            search: function(r, i) {
                for (var a = e.multiSearch ? r.replace(/ +$/, "").split(/ +/) : [r], s = 0, o = t.items.length; s < o; s++) n.item(t.items[s], i, a)
            },
            item: function(t, e, r) {
                for (var i = !0,
                a = 0; a < r.length; a++) {
                    for (var s = !1,
                    o = 0,
                    l = e.length; o < l; o++) n.values(t.values(), e[o], r[a]) && (s = !0);
                    s || (i = !1)
                }
                t.found = i
            },
            values: function(t, n, r) {
                if (t.hasOwnProperty(n)) {
                    var i = a(t[n]).toLowerCase();
                    if (o(i, r, e)) return ! 0
                }
                return ! 1
            }
        };
        return r.bind(s(t.listContainer, e.searchClass), "keyup",
        function(e) {
            var r = e.target || e.srcElement;
            t.search(r.value, n.search)
        }),
        function(e, r) {
            t.search(e, r, n.search)
        }
    }
},
function(t, e, n) {
    var r = n(18),
    i = n(3),
    a = n(7),
    s = n(4),
    o = n(1),
    l = n(6),
    u = n(0),
    c = n(17),
    f = n(5);
    t.exports = function(t, e, d) {
        var h, m = this,
        v = n(2)(m),
        g = n(8)(m),
        p = n(12)(m);
        h = {
            start: function() {
                m.listClass = "list",
                m.searchClass = "search",
                m.sortClass = "sort",
                m.page = 1e4,
                m.i = 1,
                m.items = [],
                m.visibleItems = [],
                m.matchingItems = [],
                m.searched = !1,
                m.filtered = !1,
                m.searchColumns = void 0,
                m.handlers = {
                    updated: []
                },
                m.valueNames = [],
                m.utils = {
                    getByClass: i,
                    extend: a,
                    indexOf: s,
                    events: o,
                    toString: l,
                    naturalSort: r,
                    classes: u,
                    getAttribute: c,
                    toArray: f
                },
                m.utils.extend(m, e),
                m.listContainer = "string" == typeof t ? document.getElementById(t) : t,
                m.listContainer && (m.list = i(m.listContainer, m.listClass, !0), m.parse = n(13)(m), m.templater = n(16)(m), m.search = n(14)(m), m.filter = n(9)(m), m.sort = n(15)(m), m.fuzzySearch = n(10)(m, e.fuzzySearch), this.handlers(), this.items(), this.pagination(), m.update())
            },
            handlers: function() {
                for (var t in m.handlers) m[t] && m.on(t, m[t])
            },
            items: function() {
                m.parse(m.list),
                void 0 !== d && m.add(d)
            },
            pagination: function() {
                if (void 0 !== e.pagination) { ! 0 === e.pagination && (e.pagination = [{}]),
                    void 0 === e.pagination[0] && (e.pagination = [e.pagination]);
                    for (var t = 0,
                    n = e.pagination.length; t < n; t++) p(e.pagination[t])
                }
            }
        },
        this.reIndex = function() {
            m.items = [],
            m.visibleItems = [],
            m.matchingItems = [],
            m.searched = !1,
            m.filtered = !1,
            m.parse(m.list)
        },
        this.toJSON = function() {
            for (var t = [], e = 0, n = m.items.length; e < n; e++) t.push(m.items[e].values());
            return t
        },
        this.add = function(t, e) {
            if (0 !== t.length) {
                if (e) return void g(t, e);
                var n = [],
                r = !1;
                void 0 === t[0] && (t = [t]);
                for (var i = 0,
                a = t.length; i < a; i++) {
                    var s = null;
                    r = m.items.length > m.page,
                    s = new v(t[i], void 0, r),
                    m.items.push(s),
                    n.push(s)
                }
                return m.update(),
                n
            }
        },
        this.show = function(t, e) {
            return this.i = t,
            this.page = e,
            m.update(),
            m
        },
        this.remove = function(t, e, n) {
            for (var r = 0,
            i = 0,
            a = m.items.length; i < a; i++) m.items[i].values()[t] == e && (m.templater.remove(m.items[i], n), m.items.splice(i, 1), a--, i--, r++);
            return m.update(),
            r
        },
        this.get = function(t, e) {
            for (var n = [], r = 0, i = m.items.length; r < i; r++) {
                var a = m.items[r];
                a.values()[t] == e && n.push(a)
            }
            return n
        },
        this.size = function() {
            return m.items.length
        },
        this.clear = function() {
            return m.templater.clear(),
            m.items = [],
            m
        },
        this.on = function(t, e) {
            return m.handlers[t].push(e),
            m
        },
        this.off = function(t, e) {
            var n = m.handlers[t],
            r = s(n, e);
            return r > -1 && n.splice(r, 1),
            m
        },
        this.trigger = function(t) {
            for (var e = m.handlers[t].length; e--;) m.handlers[t][e](m);
            return m
        },
        this.reset = {
            filter: function() {
                for (var t = m.items,
                e = t.length; e--;) t[e].filtered = !1;
                return m
            },
            search: function() {
                for (var t = m.items,
                e = t.length; e--;) t[e].found = !1;
                return m
            }
        },
        this.update = function() {
            var t = m.items,
            e = t.length;
            m.visibleItems = [],
            m.matchingItems = [],
            m.templater.clear();
            for (var n = 0; n < e; n++) t[n].matching() && m.matchingItems.length + 1 >= m.i && m.visibleItems.length < m.page ? (t[n].show(), m.visibleItems.push(t[n]), m.matchingItems.push(t[n])) : t[n].matching() ? (m.matchingItems.push(t[n]), t[n].hide()) : t[n].hide();
            return m.trigger("updated"),
            m
        },
        h.start()
    }
},
function(t, e, n) {
    var r = n(0),
    i = n(1),
    a = n(11);
    t.exports = function(t) {
        var e = function(e, i) {
            var a, o = t.matchingItems.length,
            l = t.i,
            u = t.page,
            c = Math.ceil(o / u),
            f = Math.ceil(l / u),
            d = i.innerWindow || 2,
            h = i.left || i.outerWindow || 0,
            m = i.right || i.outerWindow || 0;
            m = c - m,
            e.clear();
            for (var v = 1; v <= c; v++) {
                var g = f === v ? "active": "";
                n.number(v, h, m, f, d) ? (a = e.add({
                    page: v,
                    dotted: !1
                })[0], g && r(a.elm).add(g), s(a.elm, v, u)) : n.dotted(e, v, h, m, f, d, e.size()) && (a = e.add({
                    page: "...",
                    dotted: !0
                })[0], r(a.elm).add("disabled"))
            }
        },
        n = {
            number: function(t, e, n, r, i) {
                return this.left(t, e) || this.right(t, n) || this.innerWindow(t, r, i)
            },
            left: function(t, e) {
                return t <= e
            },
            right: function(t, e) {
                return t > e
            },
            innerWindow: function(t, e, n) {
                return t >= e - n && t <= e + n
            },
            dotted: function(t, e, n, r, i, a, s) {
                return this.dottedLeft(t, e, n, r, i, a) || this.dottedRight(t, e, n, r, i, a, s)
            },
            dottedLeft: function(t, e, n, r, i, a) {
                return e == n + 1 && !this.innerWindow(e, i, a) && !this.right(e, r)
            },
            dottedRight: function(t, e, n, r, i, a, s) {
                return ! t.items[s - 1].values().dotted && e == r && !this.innerWindow(e, i, a) && !this.right(e, r)
            }
        },
        s = function(e, n, r) {
            i.bind(e, "click",
            function() {
                t.show((n - 1) * r + 1, r)
            })
        };
        return function(n) {
            var r = new a(t.listContainer.id, {
                listClass: n.paginationClass || "pagination",
                item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
                valueNames: ["page", "dotted"],
                searchClass: "pagination-search-that-is-not-supposed-to-exist",
                sortClass: "pagination-sort-that-is-not-supposed-to-exist"
            });
            t.on("updated",
            function() {
                e(r, n)
            }),
            e(r, n)
        }
    }
},
function(t, e, n) {
    t.exports = function(t) {
        var e = n(2)(t),
        r = function(t) {
            for (var e = t.childNodes,
            n = [], r = 0, i = e.length; r < i; r++) void 0 === e[r].data && n.push(e[r]);
            return n
        },
        i = function(n, r) {
            for (var i = 0,
            a = n.length; i < a; i++) t.items.push(new e(r, n[i]))
        },
        a = function e(n, r) {
            var a = n.splice(0, 50);
            i(a, r),
            n.length > 0 ? setTimeout(function() {
                e(n, r)
            },
            1) : (t.update(), t.trigger("parseComplete"))
        };
        return t.handlers.parseComplete = t.handlers.parseComplete || [],
        function() {
            var e = r(t.list),
            n = t.valueNames;
            t.indexAsync ? a(e, n) : i(e, n)
        }
    }
},
function(t, e) {
    t.exports = function(t) {
        var e, n, r, i, a = {
            resetList: function() {
                t.i = 1,
                t.templater.clear(),
                i = void 0
            },
            setOptions: function(t) {
                2 == t.length && t[1] instanceof Array ? n = t[1] : 2 == t.length && "function" == typeof t[1] ? (n = void 0, i = t[1]) : 3 == t.length ? (n = t[1], i = t[2]) : n = void 0
            },
            setColumns: function() {
                0 !== t.items.length && void 0 === n && (n = void 0 === t.searchColumns ? a.toArray(t.items[0].values()) : t.searchColumns)
            },
            setSearchString: function(e) {
                e = t.utils.toString(e).toLowerCase(),
                e = e.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"),
                r = e
            },
            toArray: function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e
            }
        },
        s = {
            list: function() {
                for (var e = 0,
                n = t.items.length; e < n; e++) s.item(t.items[e])
            },
            item: function(t) {
                t.found = !1;
                for (var e = 0,
                r = n.length; e < r; e++) if (s.values(t.values(), n[e])) return void(t.found = !0)
            },
            values: function(n, i) {
                return !! (n.hasOwnProperty(i) && (e = t.utils.toString(n[i]).toLowerCase(), "" !== r && e.search(r) > -1))
            },
            reset: function() {
                t.reset.search(),
                t.searched = !1
            }
        },
        o = function(e) {
            return t.trigger("searchStart"),
            a.resetList(),
            a.setSearchString(e),
            a.setOptions(arguments),
            a.setColumns(),
            "" === r ? s.reset() : (t.searched = !0, i ? i(r, n) : s.list()),
            t.update(),
            t.trigger("searchComplete"),
            t.visibleItems
        };
        return t.handlers.searchStart = t.handlers.searchStart || [],
        t.handlers.searchComplete = t.handlers.searchComplete || [],
        t.utils.events.bind(t.utils.getByClass(t.listContainer, t.searchClass), "keyup",
        function(e) {
            var n = e.target || e.srcElement;
            "" === n.value && !t.searched || o(n.value)
        }),
        t.utils.events.bind(t.utils.getByClass(t.listContainer, t.searchClass), "input",
        function(t) {
            "" === (t.target || t.srcElement).value && o("")
        }),
        o
    }
},
function(t, e) {
    t.exports = function(t) {
        var e = {
            els: void 0,
            clear: function() {
                for (var n = 0,
                r = e.els.length; n < r; n++) t.utils.classes(e.els[n]).remove("asc"),
                t.utils.classes(e.els[n]).remove("desc")
            },
            getOrder: function(e) {
                var n = t.utils.getAttribute(e, "data-order");
                return "asc" == n || "desc" == n ? n: t.utils.classes(e).has("desc") ? "asc": t.utils.classes(e).has("asc") ? "desc": "asc"
            },
            getInSensitive: function(e, n) {
                var r = t.utils.getAttribute(e, "data-insensitive");
                n.insensitive = "false" !== r
            },
            setOrder: function(n) {
                for (var r = 0,
                i = e.els.length; r < i; r++) {
                    var a = e.els[r];
                    if (t.utils.getAttribute(a, "data-sort") === n.valueName) {
                        var s = t.utils.getAttribute(a, "data-order");
                        "asc" == s || "desc" == s ? s == n.order && t.utils.classes(a).add(n.order) : t.utils.classes(a).add(n.order)
                    }
                }
            }
        },
        n = function() {
            t.trigger("sortStart");
            var n = {},
            r = arguments[0].currentTarget || arguments[0].srcElement || void 0;
            r ? (n.valueName = t.utils.getAttribute(r, "data-sort"), e.getInSensitive(r, n), n.order = e.getOrder(r)) : (n = arguments[1] || n, n.valueName = arguments[0], n.order = n.order || "asc", n.insensitive = void 0 === n.insensitive || n.insensitive),
            e.clear(),
            e.setOrder(n);
            var i, a = n.sortFunction || t.sortFunction || null,
            s = "desc" === n.order ? -1 : 1;
            i = a ?
            function(t, e) {
                return a(t, e, n) * s
            }: function(e, r) {
                var i = t.utils.naturalSort;
                return i.alphabet = t.alphabet || n.alphabet || void 0,
                !i.alphabet && n.insensitive && (i = t.utils.naturalSort.caseInsensitive),
                i(e.values()[n.valueName], r.values()[n.valueName]) * s
            },
            t.items.sort(i),
            t.update(),
            t.trigger("sortComplete")
        };
        return t.handlers.sortStart = t.handlers.sortStart || [],
        t.handlers.sortComplete = t.handlers.sortComplete || [],
        e.els = t.utils.getByClass(t.listContainer, t.sortClass),
        t.utils.events.bind(e.els, "click", n),
        t.on("searchStart", e.clear),
        t.on("filterStart", e.clear),
        n
    }
},
function(t, e) {
    var n = function(t) {
        var e, n = this;
        this.clearSourceItem = function(e, n) {
            for (var r = 0,
            i = n.length; r < i; r++) {
                var a;
                if (n[r].data) for (var s = 0,
                o = n[r].data.length; s < o; s++) e.setAttribute("data-" + n[r].data[s], "");
                else n[r].attr && n[r].name ? (a = t.utils.getByClass(e, n[r].name, !0)) && a.setAttribute(n[r].attr, "") : (a = t.utils.getByClass(e, n[r], !0)) && (a.innerHTML = "");
                a = void 0
            }
            return e
        },
        this.getItemSource = function(e) {
            if (void 0 === e) {
                for (var n = t.list.childNodes,
                r = 0,
                i = n.length; r < i; r++) if (void 0 === n[r].data) return n[r].cloneNode(!0)
            } else {
                if (/<tr[\s>]/g.exec(e)) {
                    var a = document.createElement("tbody");
                    return a.innerHTML = e,
                    a.firstChild
                }
                if ( - 1 !== e.indexOf("<")) {
                    var s = document.createElement("div");
                    return s.innerHTML = e,
                    s.firstChild
                }
                var o = document.getElementById(t.item);
                if (o) return o
            }
        },
        this.get = function(e, r) {
            n.create(e);
            for (var i = {},
            a = 0,
            s = r.length; a < s; a++) {
                var o;
                if (r[a].data) for (var l = 0,
                u = r[a].data.length; l < u; l++) i[r[a].data[l]] = t.utils.getAttribute(e.elm, "data-" + r[a].data[l]);
                else r[a].attr && r[a].name ? (o = t.utils.getByClass(e.elm, r[a].name, !0), i[r[a].name] = o ? t.utils.getAttribute(o, r[a].attr) : "") : (o = t.utils.getByClass(e.elm, r[a], !0), i[r[a]] = o ? o.innerHTML: "");
                o = void 0
            }
            return i
        },
        this.set = function(e, r) {
            var i = function(e) {
                for (var n = 0,
                r = t.valueNames.length; n < r; n++) if (t.valueNames[n].data) {
                    for (var i = t.valueNames[n].data, a = 0, s = i.length; a < s; a++) if (i[a] === e) return {
                        data: e
                    }
                } else {
                    if (t.valueNames[n].attr && t.valueNames[n].name && t.valueNames[n].name == e) return t.valueNames[n];
                    if (t.valueNames[n] === e) return e
                }
            };
            if (!n.create(e)) for (var a in r) r.hasOwnProperty(a) &&
            function(n, r) {
                var a, s = i(n);
                s && (s.data ? e.elm.setAttribute("data-" + s.data, r) : s.attr && s.name ? (a = t.utils.getByClass(e.elm, s.name, !0), a && a.setAttribute(s.attr, r)) : (a = t.utils.getByClass(e.elm, s, !0), a && (a.innerHTML = r)), a = void 0)
            } (a, r[a])
        },
        this.create = function(t) {
            if (void 0 !== t.elm) return ! 1;
            if (void 0 === e) throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
            var r = e.cloneNode(!0);
            return r.removeAttribute("id"),
            t.elm = r,
            n.set(t, t.values()),
            !0
        },
        this.remove = function(e) {
            e.elm.parentNode === t.list && t.list.removeChild(e.elm)
        },
        this.show = function(e) {
            n.create(e),
            t.list.appendChild(e.elm)
        },
        this.hide = function(e) {
            void 0 !== e.elm && e.elm.parentNode === t.list && t.list.removeChild(e.elm)
        },
        this.clear = function() {
            if (t.list.hasChildNodes()) for (; t.list.childNodes.length >= 1;) t.list.removeChild(t.list.firstChild)
        },
        function() { (e = n.getItemSource(t.item)) && (e = n.clearSourceItem(e, t.valueNames))
        } ()
    };
    t.exports = function(t) {
        return new n(t)
    }
},
function(t, e) {
    t.exports = function(t, e) {
        var n = t.getAttribute && t.getAttribute(e) || null;
        if (!n) for (var r = t.attributes,
        i = r.length,
        a = 0; a < i; a++) void 0 !== e[a] && e[a].nodeName === e && (n = e[a].nodeValue);
        return n
    }
},
function(t, e, n) {
    function r(t) {
        return t >= 48 && t <= 57
    }
    function i(t, e) {
        for (var n = (t += "").length, i = (e += "").length, a = 0, l = 0; a < n && l < i;) {
            var u = t.charCodeAt(a),
            c = e.charCodeAt(l);
            if (r(u)) {
                if (!r(c)) return u - c;
                for (var f = a,
                d = l; 48 === u && ++f < n;) u = t.charCodeAt(f);
                for (; 48 === c && ++d < i;) c = e.charCodeAt(d);
                for (var h = f,
                m = d; h < n && r(t.charCodeAt(h));)++h;
                for (; m < i && r(e.charCodeAt(m));)++m;
                var v = h - f - m + d;
                if (v) return v;
                for (; f < h;) if (v = t.charCodeAt(f++) - e.charCodeAt(d++)) return v;
                a = h,
                l = m
            } else {
                if (u !== c) return u < o && c < o && -1 !== s[u] && -1 !== s[c] ? s[u] - s[c] : u - c; ++a,
                ++l
            }
        }
        return n - i
    }
    var a, s, o = 0;
    i.caseInsensitive = i.i = function(t, e) {
        return i(("" + t).toLowerCase(), ("" + e).toLowerCase())
    },
    Object.defineProperties(i, {
        alphabet: {
            get: function() {
                return a
            },
            set: function(t) {
                a = t,
                s = [];
                var e = 0;
                if (a) for (; e < a.length; e++) s[a.charCodeAt(e)] = e;
                for (o = s.length, e = 0; e < o; e++) void 0 === s[e] && (s[e] = -1)
            }
        }
    }),
    t.exports = i
},
function(t, e) {
    t.exports = function(t, e, n) {
        function r(t, n) {
            var r = t / e.length,
            i = Math.abs(o - n);
            return a ? r + i / a: i ? 1 : r
        }
        var i = n.location || 0,
        a = n.distance || 100,
        s = n.threshold || .4;
        if (e === t) return ! 0;
        if (e.length > 32) return ! 1;
        var o = i,
        l = function() {
            var t, n = {};
            for (t = 0; t < e.length; t++) n[e.charAt(t)] = 0;
            for (t = 0; t < e.length; t++) n[e.charAt(t)] |= 1 << e.length - t - 1;
            return n
        } (),
        u = s,
        c = t.indexOf(e, o); - 1 != c && (u = Math.min(r(0, c), u), -1 != (c = t.lastIndexOf(e, o + e.length)) && (u = Math.min(r(0, c), u)));
        var f = 1 << e.length - 1;
        c = -1;
        for (var d, h, m, v = e.length + t.length,
        g = 0; g < e.length; g++) {
            for (d = 0, h = v; d < h;) r(g, o + h) <= u ? d = h: v = h,
            h = Math.floor((v - d) / 2 + d);
            v = h;
            var p = Math.max(1, o - h + 1),
            y = Math.min(o + h, t.length) + e.length,
            b = Array(y + 2);
            b[y + 1] = (1 << g) - 1;
            for (var C = y; C >= p; C--) {
                var S = l[t.charAt(C - 1)];
                if (b[C] = 0 === g ? (b[C + 1] << 1 | 1) & S: (b[C + 1] << 1 | 1) & S | (m[C + 1] | m[C]) << 1 | 1 | m[C + 1], b[C] & f) {
                    var E = r(g, C - 1);
                    if (E <= u) {
                        if (u = E, !((c = C - 1) > o)) break;
                        p = Math.max(1, 2 * o - c)
                    }
                }
            }
            if (r(g + 1, o) > u) break;
            m = b
        }
        return ! (c < 0)
    }
}]),
searchOptions = {
    valueNames: ["title", "category", "tags", "duration", {
        name: "ingredients",
        attr: "data-ingredients"
    }],
    fuzzySearch: {
        searchClass: "search",
        location: 0,
        distance: 20,
        threshold: .4,
        multiSearch: !0
    }
},
recipeList = new List("js-list", searchOptions),
checkCategory = document.getElementsByClassName("js-category"),
checkDuration = document.getElementsByClassName("js-duration"),
checkMeat = document.getElementsByClassName("js-meat"),
checkOrigin = document.getElementsByClassName("js-origin"),
checkBoxes = document.getElementsByClassName("searchbar-checkbox");
if (checkBoxes) for (var k = 0; k < checkBoxes.length; k += 1) checkBoxes[k].addEventListener("change", filterList);