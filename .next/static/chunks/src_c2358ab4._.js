(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/shared/helper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "camel2title",
    ()=>camel2title,
    "convertToLabelValue",
    ()=>convertToLabelValue,
    "getWindDirection",
    ()=>getWindDirection,
    "numberWithSeparator",
    ()=>numberWithSeparator,
    "transformColor",
    ()=>transformColor
]);
const changeTailwindToHex = (color)=>{
    switch(color){
        case "bg-indicator-red":
            return "#E51717";
        case "bg-indicator-magenta":
            return "#E91D62";
        case "bg-indicator-purple":
            return "#9C29B2";
        case "bg-indicator-deepPurple":
            return "#663CB5";
        case "bg-indicator-indigo":
            return "#4153B5";
        case "bg-indicator-blue":
            return "#2176F5";
        case "bg-indicator-lightBlue":
            return "#02A9F7";
        case "bg-indicator-cyan":
            return "#01BCD6";
        case "bg-indicator-teal":
            return "#039789";
        case "bg-indicator-green":
            return "#4CB051";
        case "bg-indicator-lightGreen":
            return "#8DC34B";
        case "bg-indicator-lime":
            return "#CBDD38";
        case "bg-indicator-yellow":
            return "#FFE93D";
        case "bg-indicator-amber":
            return "#FCC005";
        case "bg-indicator-grande":
            return "#FF9800";
        case "bg-indicator-deepOrange":
            return "#FE5823";
        case "bg-indicator-brown":
            return "#7B5649";
        case "bg-indicator-grey":
            return "#9E9E9E";
        case "bg-indicator-blueGrey":
            return "#5F7D8C";
        case "bg-indicator-black":
            return "#373232";
        case "bg-primary-50":
            return "#E8EDFB";
        default:
            return "#FFFFFF";
    }
};
const camel2title = (camelCase)=>camelCase.replace(/([A-Z])/g, (match)=>" ".concat(match)).replace(/^./, (match)=>match.toUpperCase()).trim();
const numberWithSeparator = (x)=>{
    return x === null || x === void 0 ? void 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const transformColor = (backgroundColor)=>{
    const _background = [];
    backgroundColor.map((d)=>{
        _background.push(changeTailwindToHex(d));
    });
    return _background;
};
function getWindDirection(degrees) {
    if (degrees < 0 || degrees >= 360) {
        throw new Error("Degrees must be between 0 and 359");
    }
    const directions = [
        "Utara",
        "Utara-Timur Laut",
        "Timur Laut",
        "Timur-Utara Laut",
        "Timur",
        "Timur-Selatan Laut",
        "Tenggara",
        "Selatan-Tenggara",
        "Selatan",
        "Selatan-Barat Daya",
        "Barat Daya",
        "Barat-Tenggara",
        "Barat",
        "Barat-Utara Laut",
        "Barat Laut",
        "Utara-Barat Laut"
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}
const convertToLabelValue = (data, selectedKebun)=>{
    if (!selectedKebun) {
        // Sum all data regardless of device type (since we're filtering by device type at API level)
        const totals = {
            rusak: 0,
            idle: 0,
            active: 0,
            alert: 0
        };
        data.forEach((item)=>{
            totals.rusak += item.rusak || 0;
            totals.idle += item.idle || 0;
            totals.active += item.active || 0;
            totals.alert += item.alert || 0;
        });
        return [
            {
                label: "Rusak",
                value: totals.rusak
            },
            {
                label: "Idle",
                value: totals.idle
            },
            {
                label: "Active",
                value: totals.active
            },
            {
                label: "Alert",
                value: totals.alert
            }
        ];
    }
    // Find entry by kebunName (since our API returns kebunName)
    const entry = data.find((item)=>item.kebun === selectedKebun || item.kebunName === selectedKebun || item.kebun_name === selectedKebun);
    if (entry) {
        return [
            {
                label: "Rusak",
                value: entry.rusak || 0
            },
            {
                label: "Idle",
                value: entry.idle || 0
            },
            {
                label: "Active",
                value: entry.active || 0
            },
            {
                label: "Alert",
                value: entry.alert || 0
            }
        ];
    }
    return [
        {
            label: "Rusak",
            value: 0
        },
        {
            label: "Idle",
            value: 0
        },
        {
            label: "Active",
            value: 0
        },
        {
            label: "Alert",
            value: 0
        }
    ];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownType",
    ()=>DropdownType,
    "defaultColor",
    ()=>defaultColor
]);
const defaultColor = [
    "bg-indicator-green",
    "bg-indicator-grey",
    "bg-indicator-yellow",
    "bg-indicator-red",
    "bg-indicator-blue",
    "bg-indicator-magenta",
    "bg-indicator-purple",
    "bg-indicator-indigo",
    "bg-indicator-cyan",
    "bg-indicator-teal",
    "bg-indicator-lime",
    "bg-indicator-amber",
    "bg-indicator-grande",
    "bg-indicator-brown",
    "bg-indicator-black"
];
var DropdownType = /*#__PURE__*/ function(DropdownType) {
    DropdownType["PRIMARY"] = "Primary";
    DropdownType["SECONDARY"] = "Secondary";
    DropdownType["DISABLED"] = "Disabled";
    return DropdownType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Chart/DoughnutChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/helper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$heroicons$2d$react$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/heroicons-react/build/index.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ArcElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
function DoughnutChart(param) {
    let { title, subTitle, data, className = "", below = false, backgroundColor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultColor"], row = false, noLine = false, size = "w-full", sideTitle = false, onClick, background = "bg-neutral-white", onStatusClicked, onLaporanHarianClicked, onLaporanBulananClicked } = param;
    _s();
    const total = data.reduce((a, b)=>parseInt(a) + parseInt(b.value), 0);
    data.sort((a, b)=>b.value - a.value);
    const datas = {
        datasets: [
            {
                data: data,
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"])(backgroundColor),
                borderWidth: 0,
                hoverBorderColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"])(backgroundColor),
                hoverBorderWidth: 10,
                hoverBorderRadius: 10
            }
        ]
    };
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("p-6 bg-white rounded-2xl drop-shadow-lg", className, background),
        children: [
            !sideTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex pr-3 pt-3 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-grow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h6 font-bold text-neutral-primary",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cursor-pointer",
                                onClick: ()=>{
                                    setShow(!show);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$heroicons$2d$react$2f$build$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewList"], {
                                    className: "h-6 w-6",
                                    onPointerEnterCapture: undefined,
                                    onPointerLeaveCapture: undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-2 drop-shadow rounded absolute mt-8 z-10 right-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-fit overflow-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-y-2 flex-col min-h-14 w-[150px] bg-neutral-white rounded text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex text-lg text-primary-60 cursor-pointer hover:underline hover:bg-primary-20",
                                                onClick: ()=>{
                                                    onStatusClicked();
                                                },
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 102,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex cursor-pointer hover:underline hover:bg-gray-20 ",
                                                onClick: ()=>{
                                                    onLaporanHarianClicked();
                                                },
                                                children: "Laporan Harian"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 109,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex cursor-pointer hover:underline hover:bg-gray-20 ",
                                                onClick: ()=>{
                                                    onLaporanBulananClicked();
                                                },
                                                children: "Laporan Bulanan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 116,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                    lineNumber: 100,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h7 my-4 text-neutral-primary",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberWithSeparator"])(total),
                            " ",
                            subTitle
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            !noLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px w-full bg-neutral-line"
            }, void 0, false, {
                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                lineNumber: 133,
                columnNumber: 19
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-4 gap-4 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(size, " ").concat(below ? "col-span-4" : row ? "col-span-2" : ""),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Doughnut"], {
                            data: datas,
                            options: {
                                layout: {
                                    padding: 20
                                },
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context)=>{
                                                return "".concat(data[context.dataIndex].label, ": ").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberWithSeparator"])(context.raw.value));
                                            }
                                        },
                                        yAlign: "bottom",
                                        padding: 15,
                                        backgroundColor: "#09173D",
                                        displayColors: false
                                    }
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(below ? "col-span-4" : "col-span-2", ""),
                        children: [
                            sideTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "body5 font-bold text-neutral-primary",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "body5 mt-1 mb-2 text-neutral-primary",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberWithSeparator"])(total),
                                            " ",
                                            subTitle
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            row ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-rows-2 gap-4 mt-2 cursor-pointer",
                                children: data.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("w-full bg-opacity-0", {
                                            "hover:bg-opacity-30 rounded": onClick
                                        }),
                                        style: {
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"])(backgroundColor)[i]
                                        },
                                        onClick: ()=>onClick === null || onClick === void 0 ? void 0 : onClick(i),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "self-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full self-center mx-2 ",
                                                            style: {
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"])(backgroundColor)[i]
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "col-span-2 text-neutral-primary",
                                                        children: d.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full self-center mx-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "col-span-2 text-neutral-primary",
                                                        children: [
                                                            (d.value / total * 100).toFixed(2),
                                                            " %"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 199,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 mt-2",
                                children: data.map((d, i)=>{
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("cursor-pointer flex"),
                                        onClick: ()=>onClick === null || onClick === void 0 ? void 0 : onClick(i),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full m-2",
                                                    style: {
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformColor"])(backgroundColor)[i]
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-neutral-primary break-words",
                                                        children: d.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-neutral-primary",
                                                        children: [
                                                            (d.value / total * 100).toFixed(2),
                                                            " %"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                                lineNumber: 224,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Chart/DoughnutChart.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(DoughnutChart, "NKb1ZOdhT+qUsWLXSgjSS2bk2C4=");
_c = DoughnutChart;
const __TURBOPACK__default__export__ = DoughnutChart;
var _c;
__turbopack_context__.k.register(_c, "DoughnutChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CustomSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$index$2d$641ee5b8$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__c__as__components$3e$__ = __turbopack_context__.i("[project]/node_modules/react-select/dist/index-641ee5b8.esm.js [app-client] (ecmascript) <export c as components>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-select/dist/react-select.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
;
const DropdownIndicator = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$index$2d$641ee5b8$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__c__as__components$3e$__["components"].DropdownIndicator, {
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            alt: "",
            src: "/dropdown-select.svg",
            width: 20,
            height: 20
        }, void 0, false, {
            fileName: "[project]/src/components/CustomSelect.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/CustomSelect.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = DropdownIndicator;
const CustomSelect = (param)=>{
    let { options, value, onChange, placeholder, error } = param;
    console.log("value", value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$select$2f$dist$2f$react$2d$select$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
        options: options,
        styles: {
            menuPortal: (base)=>({
                    ...base,
                    zIndex: 9999,
                    color: "#000000"
                }),
            control: (base)=>({
                    ...base,
                    minWidth: "150px",
                    border: error ? "1px solid #DC2626" : "1px solid #E5E7EB",
                    borderRadius: "8px",
                    overflow: "hidden",
                    color: "#000000",
                    height: "48px",
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center"
                }),
            option: (base)=>({
                    ...base,
                    color: "#000000"
                })
        },
        onChange: (selectedOption)=>{
            onChange(selectedOption.value);
        },
        value: options ? options.find((option)=>option.value === value) : "",
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "Choose Select",
        components: {
            DropdownIndicator,
            IndicatorSeparator: ()=>null
        }
    }, void 0, false, {
        fileName: "[project]/src/components/CustomSelect.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = CustomSelect;
const __TURBOPACK__default__export__ = CustomSelect;
var _c, _c1;
__turbopack_context__.k.register(_c, "DropdownIndicator");
__turbopack_context__.k.register(_c1, "CustomSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CustomSelectField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CustomSelect.tsx [app-client] (ecmascript)");
;
;
;
const CustomSelectField = (param)=>{
    let { className, label, name, placeholder, options, value, onChange, required = false, error, helper } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-80 text-base my-auto mr-4 min-w-[100px]",
                children: [
                    label,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-danger-60",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CustomSelectField.tsx",
                        lineNumber: 38,
                        columnNumber: 30
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CustomSelectField.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: helper && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-50 ",
                    children: helper
                }, void 0, false, {
                    fileName: "[project]/src/components/CustomSelectField.tsx",
                    lineNumber: 40,
                    columnNumber: 23
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/CustomSelectField.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CustomSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                options: options,
                value: value,
                onChange: onChange
            }, void 0, false, {
                fileName: "[project]/src/components/CustomSelectField.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CustomSelectField.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CustomSelectField;
const __TURBOPACK__default__export__ = CustomSelectField;
var _c;
__turbopack_context__.k.register(_c, "CustomSelectField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonColor",
    ()=>ButtonColor,
    "ButtonSize",
    ()=>ButtonSize,
    "ButtonType",
    ()=>ButtonType,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
;
var ButtonColor = /*#__PURE__*/ function(ButtonColor) {
    ButtonColor["PRIMARY"] = "primary-60";
    ButtonColor["SECONDARY"] = "gray-30";
    ButtonColor["DANGER"] = "danger-60";
    return ButtonColor;
}({});
var ButtonType = /*#__PURE__*/ function(ButtonType) {
    ButtonType["OUTLINED"] = "border border";
    ButtonType["FILL"] = "bg";
    return ButtonType;
}({});
var ButtonSize = /*#__PURE__*/ function(ButtonSize) {
    ButtonSize["SMALL"] = "h-[44px] text-xs";
    ButtonSize["MEDIUM"] = "h-[48px] text-sm";
    ButtonSize["LARGE"] = "h-[56px] text-base";
    return ButtonSize;
}({});
function Button(param) {
    let { label, onClick, disabled = false, buttonColor = "primary-60", buttonType = "bg", buttonSize = "h-[48px] text-sm", fullWidth = false, icon, type = "button" } = param;
    const baseClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex max-h-[48px] items-center rounded-xl px-4 space-x-[4px] transition-all duration-200 ease-in-out", buttonSize, fullWidth && "w-full", disabled ? "bg-opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-opacity-80 hover:scale-105 hover:shadow-md active:scale-95", buttonType === "border border" ? "border" : "");
    const colorClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "bg-primary-60": buttonType === "bg" && buttonColor === "primary-60",
        "bg-gray-30": buttonType === "bg" && buttonColor === "gray-30",
        "bg-danger-60": buttonType === "bg" && buttonColor === "danger-60",
        "text-danger-60 border-danger-60 hover:bg-danger-60 hover:text-white": buttonType === "border border" && buttonColor === "danger-60",
        "text-gray-100 border-gray-100 hover:bg-gray-100 hover:text-white": buttonType === "border border" && buttonColor === "gray-30",
        "text-primary-60 border-primary-60 hover:bg-primary-60 hover:text-white": buttonType === "border border" && buttonColor === "primary-60",
        "text-white": buttonType === "bg"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(baseClasses, colorClasses),
        onClick: (e)=>{
            e.stopPropagation();
            if (!disabled) {
                onClick();
            }
        },
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                alt: "",
                src: icon,
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 81,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center w-full",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/Button.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Button.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c = Button;
const __TURBOPACK__default__export__ = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(web)/dashboard/components/SelectModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const SelectModal = (param)=>{
    let { show, onClose } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ",
        onClick: ()=>{
            onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex p-4 space-x-4 bg-white h-20 align-center justify-center w-[20%] rounded-lg ",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    label: "TMAS",
                    onClick: ()=>{
                        router.push("/device/tmas");
                    },
                    buttonSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonSize"].LARGE,
                    buttonColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonColor"].PRIMARY
                }, void 0, false, {
                    fileName: "[project]/src/app/(web)/dashboard/components/SelectModal.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    label: "TMAT",
                    onClick: ()=>{
                        router.push("/device/tmat");
                    },
                    buttonSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonSize"].LARGE,
                    buttonColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonColor"].PRIMARY
                }, void 0, false, {
                    fileName: "[project]/src/app/(web)/dashboard/components/SelectModal.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(web)/dashboard/components/SelectModal.tsx",
            lineNumber: 20,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(web)/dashboard/components/SelectModal.tsx",
        lineNumber: 15,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SelectModal, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SelectModal;
const __TURBOPACK__default__export__ = SelectModal;
var _c;
__turbopack_context__.k.register(_c, "SelectModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(web)/dashboard/DashboardData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "getAWLDashboard",
    ()=>getAWLDashboard,
    "getAWSDashboard",
    ()=>getAWSDashboard,
    "getDashboard",
    ()=>getDashboard,
    "getKebun",
    ()=>getKebun,
    "getPt",
    ()=>getPt
]);
const getDashboard = async (filters)=>{
    try {
        // Build query string from filters
        const searchParams = new URLSearchParams();
        if ((filters === null || filters === void 0 ? void 0 : filters.pt) && filters.pt !== "") {
            searchParams.append("pt", filters.pt);
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.kebun) && filters.kebun !== "") {
            searchParams.append("kebun", filters.kebun);
        }
        if ((filters === null || filters === void 0 ? void 0 : filters.deviceType) && filters.deviceType !== "") {
            searchParams.append("deviceType", filters.deviceType);
        }
        const queryString = searchParams.toString();
        const url = "/api/dashboard".concat(queryString ? "?".concat(queryString) : "");
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        return result;
    } catch (err) {
        console.log(err);
        return {
            data: []
        }; // Return empty data on error
    }
};
const getAWLDashboard = async (filters)=>{
    return getDashboard({
        ...filters,
        deviceType: "AWL"
    });
};
const getAWSDashboard = async (filters)=>{
    return getDashboard({
        ...filters,
        deviceType: "AWS"
    });
};
const getPt = async ()=>{
    try {
        const res = await fetch("/api/dashboard/pt");
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        return result;
    } catch (err) {
        console.log(err);
        return {
            data: []
        }; // Return empty data on error
    }
};
const getKebun = async (pt)=>{
    try {
        // Optionally filter kebun by PT
        const url = pt && pt !== "" ? "/api/dashboard/kebun?pt=".concat(encodeURIComponent(pt)) : "/api/dashboard/kebun";
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        return result;
    } catch (err) {
        console.log(err);
        return {
            data: []
        }; // Return empty data on error
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(web)/dashboard/useDashboardImpl.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "useDashboardImpl",
    ()=>useDashboardImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/helper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$DashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(web)/dashboard/DashboardData.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const useDashboardImpl = ()=>{
    _s();
    const [pt, setPt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [kebun, setKebun] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pts, setPts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [kebuns, setKebuns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [awlDashboards, setAwlDashboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [awsDashboards, setAwsDashboards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getPTData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardImpl.useCallback[getPTData]": ()=>{
            setIsLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$DashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPt"])().then({
                "useDashboardImpl.useCallback[getPTData]": (res)=>{
                    if (res === null || res === void 0 ? void 0 : res.data) {
                        const _pts = res.data.map({
                            "useDashboardImpl.useCallback[getPTData]._pts": (item)=>({
                                    label: item.name,
                                    value: item.name
                                })
                        }["useDashboardImpl.useCallback[getPTData]._pts"]).filter({
                            "useDashboardImpl.useCallback[getPTData]._pts": (item)=>item.value !== ""
                        }["useDashboardImpl.useCallback[getPTData]._pts"]);
                        setPts([
                            {
                                label: "All",
                                value: ""
                            },
                            ..._pts
                        ]);
                    }
                }
            }["useDashboardImpl.useCallback[getPTData]"]).catch({
                "useDashboardImpl.useCallback[getPTData]": (error)=>{
                    console.error("Error fetching PT data:", error);
                    setPts([
                        {
                            label: "All",
                            value: ""
                        }
                    ]);
                }
            }["useDashboardImpl.useCallback[getPTData]"]).finally({
                "useDashboardImpl.useCallback[getPTData]": ()=>{
                    setIsLoading(false);
                }
            }["useDashboardImpl.useCallback[getPTData]"]);
        }
    }["useDashboardImpl.useCallback[getPTData]"], []);
    const getKebunData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardImpl.useCallback[getKebunData]": (selectedPt)=>{
            setIsLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$DashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKebun"])(selectedPt).then({
                "useDashboardImpl.useCallback[getKebunData]": (res)=>{
                    if (res === null || res === void 0 ? void 0 : res.data) {
                        const _kebun = res.data.map({
                            "useDashboardImpl.useCallback[getKebunData]._kebun": (item)=>({
                                    label: item.name,
                                    value: item.name
                                })
                        }["useDashboardImpl.useCallback[getKebunData]._kebun"]).filter({
                            "useDashboardImpl.useCallback[getKebunData]._kebun": (item)=>item.value !== ""
                        }["useDashboardImpl.useCallback[getKebunData]._kebun"]);
                        setKebuns([
                            {
                                label: "All",
                                value: ""
                            },
                            ..._kebun
                        ]);
                    }
                }
            }["useDashboardImpl.useCallback[getKebunData]"]).catch({
                "useDashboardImpl.useCallback[getKebunData]": (error)=>{
                    console.error("Error fetching Kebun data:", error);
                    setKebuns([
                        {
                            label: "All",
                            value: ""
                        }
                    ]);
                }
            }["useDashboardImpl.useCallback[getKebunData]"]).finally({
                "useDashboardImpl.useCallback[getKebunData]": ()=>{
                    setIsLoading(false);
                }
            }["useDashboardImpl.useCallback[getKebunData]"]);
        }
    }["useDashboardImpl.useCallback[getKebunData]"], []);
    const getDashboardData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardImpl.useCallback[getDashboardData]": ()=>{
            setIsLoading(true);
            const filters = {
                pt: pt || undefined,
                kebun: kebun || undefined
            };
            console.log("Fetching dashboard with filters:", filters);
            // Fetch both AWL and AWS data simultaneously
            Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$DashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAWLDashboard"])(filters),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$DashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAWSDashboard"])(filters)
            ]).then({
                "useDashboardImpl.useCallback[getDashboardData]": (param)=>{
                    let [awlRes, awsRes] = param;
                    console.log("AWL Response:", awlRes);
                    console.log("AWS Response:", awsRes);
                    if (awlRes === null || awlRes === void 0 ? void 0 : awlRes.data) {
                        setAwlDashboards(awlRes.data);
                    } else {
                        setAwlDashboards([]);
                    }
                    if (awsRes === null || awsRes === void 0 ? void 0 : awsRes.data) {
                        setAwsDashboards(awsRes.data);
                    } else {
                        setAwsDashboards([]);
                    }
                }
            }["useDashboardImpl.useCallback[getDashboardData]"]).catch({
                "useDashboardImpl.useCallback[getDashboardData]": (error)=>{
                    console.error("Error fetching dashboard data:", error);
                    setAwlDashboards([]);
                    setAwsDashboards([]);
                }
            }["useDashboardImpl.useCallback[getDashboardData]"]).finally({
                "useDashboardImpl.useCallback[getDashboardData]": ()=>{
                    setIsLoading(false);
                }
            }["useDashboardImpl.useCallback[getDashboardData]"]);
        }
    }["useDashboardImpl.useCallback[getDashboardData]"], [
        pt,
        kebun
    ]);
    // Separate dashboard data for AWL and AWS
    const awlDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDashboardImpl.useMemo[awlDashboard]": ()=>{
            console.log("Converting AWL dashboards:", awlDashboards);
            if (awlDashboards.length > 0) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertToLabelValue"])(awlDashboards, kebun);
            }
            return [];
        }
    }["useDashboardImpl.useMemo[awlDashboard]"], [
        awlDashboards,
        kebun
    ]);
    const awsDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDashboardImpl.useMemo[awsDashboard]": ()=>{
            console.log("Converting AWS dashboards:", awsDashboards);
            if (awsDashboards.length > 0) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertToLabelValue"])(awsDashboards, kebun);
            }
            return [];
        }
    }["useDashboardImpl.useMemo[awsDashboard]"], [
        awsDashboards,
        kebun
    ]);
    // Handle PT change
    const handlePtChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardImpl.useCallback[handlePtChange]": (newPt)=>{
            console.log("PT changed to:", newPt);
            setPt(newPt);
            // Reset kebun when PT changes and reload kebun options
            setKebun("");
            getKebunData(newPt === "" ? undefined : newPt);
        }
    }["useDashboardImpl.useCallback[handlePtChange]"], [
        getKebunData
    ]);
    // Handle Kebun change
    const handleKebunChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDashboardImpl.useCallback[handleKebunChange]": (newKebun)=>{
            console.log("Kebun changed to:", newKebun);
            setKebun(newKebun);
        }
    }["useDashboardImpl.useCallback[handleKebunChange]"], []);
    // Initial data load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDashboardImpl.useEffect": ()=>{
            console.log("Initial data load");
            getPTData();
            getKebunData();
        }
    }["useDashboardImpl.useEffect"], [
        getPTData,
        getKebunData
    ]);
    // Reload dashboard when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDashboardImpl.useEffect": ()=>{
            // Only fetch dashboard data after initial PT data is loaded
            if (pts.length > 0) {
                console.log("Reloading dashboard data due to filter change");
                getDashboardData();
            }
        }
    }["useDashboardImpl.useEffect"], [
        pt,
        kebun,
        pts.length,
        getDashboardData
    ]);
    return {
        pt,
        pts,
        kebun,
        kebuns,
        awlDashboard,
        awsDashboard,
        showModal,
        loading: isLoading,
        setShowModal,
        setPt: handlePtChange,
        setKebun: handleKebunChange
    };
};
_s(useDashboardImpl, "vxmH08OdCcDpgaNVZUFkGirXOE4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(web)/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chart$2f$DoughnutChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Chart/DoughnutChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CustomSelectField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CustomSelectField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$components$2f$SelectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(web)/dashboard/components/SelectModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$useDashboardImpl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(web)/dashboard/useDashboardImpl.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Dashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { pt, pts, kebun, kebuns, awlDashboard, awsDashboard, showModal, loading, setShowModal, setPt, setKebun } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$useDashboardImpl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardImpl"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "m-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-8 px-4 space-x-4 flex h-[112px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CustomSelectField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        options: pts,
                        value: pt,
                        onChange: (e)=>{
                            setPt(e);
                        },
                        name: "pt",
                        label: "PT"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CustomSelectField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        options: kebuns,
                        value: kebun,
                        onChange: (e)=>{
                            setKebun(e);
                        },
                        name: "kebun",
                        label: "Kebun"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$components$2f$SelectModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showModal,
                onClose: ()=>{
                    setShowModal(false);
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("z-10 grid grid-cols-12 gap-4 mb-4 p-4", {}),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-4 bg-white",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full flex items-center justify-center bg-white rounded-lg shadow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500",
                                children: "Loading AWL data..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chart$2f$DoughnutChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "AWL TMAS (Tinggi Muka Air Saluran)",
                            data: awlDashboard,
                            below: true,
                            noLine: true,
                            className: "h-full",
                            onClick: ()=>{
                                console.log("AWL clicked");
                            },
                            subTitle: "Total",
                            onStatusClicked: ()=>{
                                router.push("/sumber/awl");
                            },
                            onLaporanHarianClicked: ()=>{
                                setShowModal(true);
                            },
                            onLaporanBulananClicked: ()=>{
                                setShowModal(true);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-4",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full flex items-center justify-center bg-white rounded-lg shadow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500",
                                children: "Loading AWS data..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chart$2f$DoughnutChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "AWS",
                            data: awsDashboard,
                            below: true,
                            noLine: true,
                            className: "h-full",
                            onClick: ()=>{
                                console.log("AWS clicked");
                            },
                            subTitle: "Total",
                            onStatusClicked: ()=>{
                                router.push("/sumber/aws");
                            },
                            onLaporanHarianClicked: ()=>{
                                router.push("/device/aws");
                            },
                            onLaporanBulananClicked: ()=>{
                                router.push("/device/aws");
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(web)/dashboard/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(web)/dashboard/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "YJ5MxbGfBE2gqObcKu2JAFTaxGE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$web$292f$dashboard$2f$useDashboardImpl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDashboardImpl"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c2358ab4._.js.map