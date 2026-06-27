import { App as e, Button as t, ConfigProvider as n, Drawer as r, Dropdown as i, Flex as a, Layout as o, Menu as s, Space as c, Typography as l, theme as u } from "antd";
import { createContext as d, useContext as f, useEffect as p, useMemo as m, useState as h } from "react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
import { DownOutlined as v } from "@ant-design/icons";
//#region src/provider/theme.ts
var y = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif", b = {
	dark: {
		accent: "#007acc",
		accentActive: "#04395e",
		accentHover: "#3794ff",
		accentSoft: "rgba(0, 122, 204, 0.18)",
		accentSofter: "rgba(0, 122, 204, 0.12)",
		active: "#37373d",
		bg: "#151515",
		border: "#3c3c3c",
		borderSoft: "#2b2b2b",
		danger: "#f48771",
		header: "#252526",
		hover: "#2a2d2e",
		input: "#313131",
		panel: "#202020",
		panelElevated: "#252526",
		panelMuted: "#2d2d30",
		sidebar: "#181818",
		success: "#89d185",
		text: "#cccccc",
		textMuted: "#858585",
		textSecondary: "#9d9d9d",
		textStrong: "#ffffff",
		textSubtle: "#6a6a6a",
		warning: "#cca700",
		workbench: "#1e1e1e"
	},
	light: {
		accent: "#0969da",
		accentActive: "#dbeafe",
		accentHover: "#0550ae",
		accentSoft: "rgba(9, 105, 218, 0.12)",
		accentSofter: "rgba(9, 105, 218, 0.08)",
		active: "#e8f2ff",
		bg: "#f3f3f3",
		border: "#d0d7de",
		borderSoft: "#e5e7eb",
		danger: "#cf222e",
		header: "#ffffff",
		hover: "#f3f4f6",
		input: "#ffffff",
		panel: "#ffffff",
		panelElevated: "#ffffff",
		panelMuted: "#f6f8fa",
		sidebar: "#f7f7f7",
		success: "#1a7f37",
		text: "#24292f",
		textMuted: "#6e7781",
		textSecondary: "#57606a",
		textStrong: "#111827",
		textSubtle: "#8c959f",
		warning: "#9a6700",
		workbench: "#ffffff"
	}
};
function x(e, t) {
	let n = e === "dark", r = b[e];
	return {
		...t,
		algorithm: t?.algorithm ?? (n ? u.darkAlgorithm : u.defaultAlgorithm),
		token: {
			borderRadius: 6,
			colorBgBase: r.bg,
			colorBgLayout: r.bg,
			colorBgContainer: r.panel,
			colorBgElevated: r.panelElevated,
			colorBgSpotlight: r.panelMuted,
			colorBorder: r.border,
			colorBorderSecondary: r.borderSoft,
			colorError: r.danger,
			colorFill: r.active,
			colorFillAlter: r.panelMuted,
			colorFillQuaternary: r.panel,
			colorFillSecondary: r.hover,
			colorFillTertiary: r.panelMuted,
			colorInfo: r.accentHover,
			colorLink: r.accentHover,
			colorLinkHover: r.textStrong,
			colorPrimary: r.accent,
			colorPrimaryActive: r.accentActive,
			colorPrimaryHover: r.accentHover,
			colorSplit: r.border,
			colorSuccess: r.success,
			colorText: r.text,
			colorTextDescription: r.textMuted,
			colorTextDisabled: r.textSubtle,
			colorTextHeading: r.textStrong,
			colorTextPlaceholder: r.textMuted,
			colorTextQuaternary: r.textSubtle,
			colorTextSecondary: r.textSecondary,
			colorTextTertiary: r.textMuted,
			colorWarning: r.warning,
			controlItemBgActive: r.accentSoft,
			controlItemBgHover: r.hover,
			controlOutline: r.accentActive,
			fontFamily: y,
			...t?.token
		},
		components: {
			Button: {
				defaultBg: r.panelMuted,
				defaultBorderColor: r.border,
				defaultColor: r.text,
				defaultHoverBg: r.hover,
				defaultHoverBorderColor: r.accentHover,
				defaultHoverColor: r.textStrong,
				primaryShadow: "none"
			},
			Card: {
				colorBgContainer: r.panel,
				colorBorderSecondary: r.border,
				headerBg: r.panel
			},
			Drawer: {
				colorBgElevated: r.panelElevated,
				colorSplit: r.border
			},
			Input: {
				activeBg: r.input,
				activeBorderColor: r.accentHover,
				addonBg: r.panelMuted,
				colorBgContainer: r.input,
				hoverBg: r.input,
				hoverBorderColor: r.accent
			},
			InputNumber: {
				activeBg: r.input,
				activeBorderColor: r.accentHover,
				colorBgContainer: r.input,
				hoverBg: r.input,
				hoverBorderColor: r.accent
			},
			Layout: {
				bodyBg: r.bg,
				headerBg: r.header,
				siderBg: r.sidebar
			},
			Menu: {
				darkItemBg: r.sidebar,
				darkItemColor: r.textSecondary,
				darkItemHoverBg: r.hover,
				darkItemHoverColor: r.textStrong,
				darkItemSelectedBg: r.accentSoft,
				darkItemSelectedColor: r.accentHover,
				darkSubMenuItemBg: r.sidebar,
				itemBg: "transparent",
				itemColor: r.textSecondary,
				itemHoverBg: r.hover,
				itemHoverColor: r.textStrong,
				itemSelectedBg: r.accentSoft,
				itemSelectedColor: r.accentHover
			},
			Modal: {
				contentBg: r.panelElevated,
				headerBg: r.panelElevated,
				titleColor: r.textStrong
			},
			Select: {
				activeBorderColor: r.accentHover,
				clearBg: r.input,
				colorBgContainer: r.input,
				colorBgElevated: r.panelElevated,
				optionActiveBg: r.hover,
				optionSelectedBg: r.accentSoft,
				optionSelectedColor: r.textStrong
			},
			Table: {
				borderColor: r.border,
				colorBgContainer: r.workbench,
				footerBg: r.panel,
				headerBg: r.panel,
				headerColor: r.textStrong,
				headerSplitColor: r.border,
				rowHoverBg: r.hover
			},
			Tabs: {
				itemActiveColor: r.textStrong,
				itemColor: r.textSecondary,
				itemHoverColor: r.accentHover,
				itemSelectedColor: r.accentHover
			},
			Tag: {
				defaultBg: r.panelMuted,
				defaultColor: r.text
			},
			...t?.components
		}
	};
}
//#endregion
//#region src/provider/WorkbenchProvider.tsx
var S = d(null);
function C({ children: t, defaultThemeMode: r = "dark", rootElement: i, storageKey: a = "workbench.theme", theme: o, themeMode: s, withAntdApp: c = !0, onThemeModeChange: l }) {
	let [u, d] = h(() => T(r, a)), f = s ?? u, _ = m(() => ({
		setThemeMode(e) {
			s === void 0 && d(e), l?.(e);
		},
		themeMode: f,
		toggleThemeMode() {
			let e = f === "dark" ? "light" : "dark";
			s === void 0 && d(e), l?.(e);
		}
	}), [
		f,
		l,
		s
	]);
	return p(() => {
		a !== !1 && globalThis.localStorage?.setItem(a, f);
		let e = i ?? globalThis.document?.documentElement;
		return e?.setAttribute("data-theme", f), e?.setAttribute("data-workbench-theme", f), () => {
			e?.removeAttribute("data-workbench-theme");
		};
	}, [
		f,
		i,
		a
	]), /* @__PURE__ */ g(S, {
		value: _,
		children: /* @__PURE__ */ g(n, {
			theme: m(() => x(f, o), [f, o]),
			children: c ? /* @__PURE__ */ g(e, {
				component: "div",
				children: t
			}) : t
		})
	});
}
function w() {
	let e = f(S);
	if (!e) throw Error("useWorkbenchTheme must be used within WorkbenchProvider.");
	return e;
}
function T(e, t) {
	if (t === !1) return e;
	let n = globalThis.localStorage?.getItem(t);
	return n === "dark" || n === "light" ? n : e;
}
//#endregion
//#region src/utils/cx.ts
function E(...e) {
	return e.filter(Boolean).join(" ") || void 0;
}
//#endregion
//#region src/utils/menu.ts
function D(e, t) {
	for (let n of e ?? []) if (n) {
		if ("children" in n && Array.isArray(n.children)) {
			let e = D(n.children, t);
			if (e) return e;
		}
		if ("key" in n && n.key === t && "label" in n) return {
			icon: "icon" in n ? n.icon : void 0,
			key: String(n.key),
			label: n.label
		};
	}
	return null;
}
function O(e, t, n) {
	return D(e, t)?.label ?? n;
}
//#endregion
//#region src/shell/WorkbenchHeader.tsx
function k({ actions: e, activeNavKey: n, activeNavKeys: r, brand: a, className: o, mobileNavFallback: c = "导航", navAriaLabel: l = "主导航", navItems: u, onNavigate: d }) {
	let f = r ?? (n ? [n] : []), p = O(u, f[0] ?? "", c), m = a.subtitle ?? M(a.version);
	return /* @__PURE__ */ _("header", {
		className: E("wb-header", o),
		children: [
			/* @__PURE__ */ _("div", {
				className: "wb-header__brand",
				"aria-label": a.ariaLabel ?? j(a.name),
				children: [/* @__PURE__ */ g("div", {
					className: "wb-header__brand-mark",
					children: a.mark ?? A(a.name)
				}), /* @__PURE__ */ _("div", {
					className: "wb-header__brand-meta",
					children: [/* @__PURE__ */ g("strong", { children: a.name }), m ? /* @__PURE__ */ g("span", { children: m }) : null]
				})]
			}),
			/* @__PURE__ */ _("nav", {
				className: "wb-header__nav",
				"aria-label": l,
				children: [/* @__PURE__ */ g(s, {
					className: "wb-header__nav-full",
					disabledOverflow: !0,
					items: u,
					mode: "horizontal",
					onClick: ({ key: e }) => d(e),
					selectedKeys: f
				}), /* @__PURE__ */ g(i, {
					menu: {
						items: u,
						onClick: ({ key: e }) => d(e),
						selectedKeys: f
					},
					placement: "bottom",
					trigger: ["click"],
					children: /* @__PURE__ */ g(t, {
						className: "wb-header__nav-mobile",
						icon: /* @__PURE__ */ g(v, {}),
						children: p
					})
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: "wb-header__actions",
				children: e
			})
		]
	});
}
function A(e) {
	let t = j(e).trim();
	return t ? t.slice(0, 1).toUpperCase() : "W";
}
function j(e) {
	return typeof e == "string" || typeof e == "number" ? String(e) : "Workbench";
}
function M(e) {
	return e?.split(/[+-]/, 1)[0];
}
//#endregion
//#region src/shell/WorkbenchShell.tsx
function N({ actions: e, activeNavKey: t, activeNavKeys: n, brand: r, children: i, className: a, contentClassName: s, flushContent: c = !1, navItems: l, onNavigate: u }) {
	return /* @__PURE__ */ _(o, {
		className: E("wb-shell", a),
		children: [/* @__PURE__ */ g(k, {
			actions: e,
			activeNavKey: t,
			activeNavKeys: n,
			brand: r,
			navItems: l,
			onNavigate: u
		}), /* @__PURE__ */ g(o.Content, {
			className: E("wb-shell__content", c && "wb-shell__content--flush", s),
			children: i
		})]
	});
}
//#endregion
//#region src/section/WorkbenchSectionLayout.tsx
function P({ activeKey: e, children: n, className: i, contentClassName: a, drawerTitle: u = "切换分区", menuItems: d, mobileActionLabel: f = "切换分区", siderWidth: p = 208, onChange: m }) {
	let [y, b] = h(!1), x = D(d, e);
	function S(e) {
		m(e), b(!1);
	}
	return /* @__PURE__ */ _(o, {
		className: E("wb-section", i),
		children: [
			/* @__PURE__ */ g(o.Sider, {
				className: "wb-section__sider wb-section__sider--desktop",
				theme: "dark",
				width: p,
				children: /* @__PURE__ */ g(s, {
					className: "wb-section__menu",
					items: d,
					mode: "inline",
					selectedKeys: [e],
					onClick: ({ key: e }) => S(e)
				})
			}),
			/* @__PURE__ */ _(o.Content, {
				className: E("wb-section__content", a),
				children: [/* @__PURE__ */ _("div", {
					className: "wb-section__mobile-nav",
					children: [/* @__PURE__ */ g("div", {
						className: "wb-section__mobile-current",
						children: /* @__PURE__ */ _(c, {
							size: 8,
							children: [x?.icon, /* @__PURE__ */ g(l.Text, {
								strong: !0,
								children: x?.label ?? e
							})]
						})
					}), /* @__PURE__ */ g(t, {
						icon: /* @__PURE__ */ g(v, {}),
						onClick: () => b(!0),
						children: f
					})]
				}), n]
			}),
			/* @__PURE__ */ g(r, {
				className: "wb-section__drawer",
				closable: !0,
				onClose: () => b(!1),
				open: y,
				placement: "bottom",
				size: "default",
				title: u,
				children: /* @__PURE__ */ g(s, {
					className: "wb-section__drawer-menu",
					items: d,
					mode: "inline",
					selectedKeys: [e],
					onClick: ({ key: e }) => S(e)
				})
			})
		]
	});
}
//#endregion
//#region src/page/WorkbenchPage.tsx
function F({ children: e, className: t, contentClassName: n, description: r, extra: i, title: o, toolbar: s }) {
	let u = o || r || i || s;
	return /* @__PURE__ */ _("section", {
		className: E("wb-page", t),
		children: [u ? /* @__PURE__ */ _(a, {
			className: "wb-page__header",
			align: "flex-start",
			justify: "space-between",
			gap: 12,
			children: [/* @__PURE__ */ _(c, {
				className: "wb-page__title-group",
				direction: "vertical",
				size: 2,
				children: [o ? /* @__PURE__ */ g(l.Title, {
					level: 3,
					className: "wb-page__title",
					children: o
				}) : null, r ? /* @__PURE__ */ g(l.Text, {
					className: "wb-page__description",
					children: r
				}) : null]
			}), i || s ? /* @__PURE__ */ _(c, {
				className: "wb-page__actions",
				size: 8,
				wrap: !0,
				children: [s, i]
			}) : null]
		}) : null, /* @__PURE__ */ g("div", {
			className: E("wb-page__content", n),
			children: e
		})]
	});
}
//#endregion
export { k as WorkbenchHeader, F as WorkbenchPage, C as WorkbenchProvider, P as WorkbenchSectionLayout, N as WorkbenchShell, x as createWorkbenchTheme, E as cx, D as findMenuItem, O as getMenuItemLabel, w as useWorkbenchTheme, b as workbenchPalettes };
