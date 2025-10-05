module.exports = [
"[project]/.next-internal/server/app/api/dashboard/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/utils/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-namespace */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
let prisma;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.prisma) {
        /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
    }
    prisma = /*TURBOPACK member replacement*/ __turbopack_context__.g.prisma;
}
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/src/utils/dashboardAggregation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // src/utils/dashboardAggregation.ts
__turbopack_context__.s([
    "getAWLDashboardData",
    ()=>getAWLDashboardData,
    "getAWSDashboardData",
    ()=>getAWSDashboardData,
    "getDashboardData",
    ()=>getDashboardData,
    "getKebunData",
    ()=>getKebunData,
    "getPtData",
    ()=>getPtData,
    "updateDashboardAggregations",
    ()=>updateDashboardAggregations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/db.ts [app-route] (ecmascript)");
;
async function updateDashboardAggregations() {
    try {
        // Get all PT-Kebun combinations
        const kebuns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].kebun.findMany({
            include: {
                pt: true
            }
        });
        for (const kebun of kebuns){
            // Count AWS devices by status
            const awsStats = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].alatAWS.groupBy({
                by: [
                    "status"
                ],
                where: {
                    kebunId: kebun.id
                },
                _count: {
                    status: true
                }
            });
            // Count AWL devices by status
            const awlStats = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].alatAWL.groupBy({
                by: [
                    "status"
                ],
                where: {
                    kebunId: kebun.id
                },
                _count: {
                    status: true
                }
            });
            // Calculate AWL totals
            const awlStatusCounts = {
                rusak: 0,
                idle: 0,
                active: 0,
                alert: 0
            };
            awlStats.forEach((stat)=>{
                if (stat.status in awlStatusCounts) {
                    awlStatusCounts[stat.status] += stat._count.status;
                }
            });
            // Calculate AWS totals
            const awsStatusCounts = {
                rusak: 0,
                idle: 0,
                active: 0,
                alert: 0
            };
            awsStats.forEach((stat)=>{
                if (stat.status in awsStatusCounts) {
                    awsStatusCounts[stat.status] += stat._count.status;
                }
            });
            // Update or create AWL dashboard record
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].alatDashboard.upsert({
                where: {
                    ptId_kebunId_deviceType: {
                        ptId: kebun.ptId,
                        kebunId: kebun.id,
                        deviceType: "AWL"
                    }
                },
                update: {
                    ...awlStatusCounts
                },
                create: {
                    ptId: kebun.ptId,
                    kebunId: kebun.id,
                    deviceType: "AWL",
                    ...awlStatusCounts
                }
            });
            // Update or create AWS dashboard record
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].alatDashboard.upsert({
                where: {
                    ptId_kebunId_deviceType: {
                        ptId: kebun.ptId,
                        kebunId: kebun.id,
                        deviceType: "AWS"
                    }
                },
                update: {
                    ...awsStatusCounts
                },
                create: {
                    ptId: kebun.ptId,
                    kebunId: kebun.id,
                    deviceType: "AWS",
                    ...awsStatusCounts
                }
            });
        }
        return true;
    } catch (error) {
        console.error("Error updating dashboard aggregations:", error);
        return false;
    }
}
async function getDashboardData(filters = {}) {
    try {
        // Build where clause for filtering
        const whereClause = {};
        // Filter by PT name
        if (filters.pt) {
            whereClause.pt = {
                name: filters.pt
            };
        }
        // Filter by Kebun name
        if (filters.kebun) {
            whereClause.kebun = {
                name: filters.kebun
            };
        }
        // Filter by device type
        if (filters.deviceType) {
            whereClause.deviceType = filters.deviceType;
        }
        const dashboardData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].alatDashboard.findMany({
            where: whereClause,
            include: {
                pt: true,
                kebun: true
            },
            orderBy: [
                {
                    deviceType: "asc"
                },
                {
                    pt: {
                        name: "asc"
                    }
                },
                {
                    kebun: {
                        name: "asc"
                    }
                }
            ]
        });
        return dashboardData.map((item)=>({
                ptId: item.ptId,
                ptName: item.pt.name,
                kebunId: item.kebunId,
                kebunName: item.kebun.name,
                deviceType: item.deviceType,
                rusak: item.rusak,
                idle: item.idle,
                active: item.active,
                alert: item.alert
            }));
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return [];
    }
}
async function getAWLDashboardData(filters = {}) {
    return getDashboardData({
        ...filters,
        deviceType: "AWL"
    });
}
async function getAWSDashboardData(filters = {}) {
    return getDashboardData({
        ...filters,
        deviceType: "AWS"
    });
}
async function getPtData() {
    try {
        const pts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].pT.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return pts.map((pt)=>({
                id: pt.id,
                name: pt.name
            }));
    } catch (error) {
        console.error("Error fetching PT data:", error);
        return [];
    }
}
async function getKebunData(ptFilter) {
    try {
        const whereClause = {};
        // Filter kebuns by PT if provided
        if (ptFilter) {
            whereClause.pt = {
                name: ptFilter
            };
        }
        const kebuns = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].kebun.findMany({
            where: whereClause,
            include: {
                pt: true
            },
            orderBy: {
                name: "asc"
            }
        });
        return kebuns.map((kebun)=>({
                id: kebun.id,
                name: kebun.name,
                ptId: kebun.ptId,
                ptName: kebun.pt.name
            }));
    } catch (error) {
        console.error("Error fetching Kebun data:", error);
        return [];
    }
}
}),
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/dashboard/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dashboardAggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/dashboardAggregation.ts [app-route] (ecmascript)");
;
;
const GET = async (request)=>{
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url);
        const pt = searchParams.get("pt");
        const kebun = searchParams.get("kebun");
        const deviceType = searchParams.get("deviceType");
        // Create filters object
        const filters = {
            ...pt && pt !== "" && {
                pt
            },
            ...kebun && kebun !== "" && {
                kebun
            },
            ...deviceType && deviceType !== "" && {
                deviceType
            }
        };
        console.log("Dashboard API filters:", filters); // Debug log
        // Pass filters to your data fetching function
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dashboardAggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDashboardData"])(filters);
        console.log("Dashboard API data length:", data.length); // Debug log
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
};
const POST = async ()=>{
    try {
        // Trigger dashboard aggregation recalculation
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$dashboardAggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateDashboardAggregations"])();
        if (success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Dashboard aggregations updated successfully"
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to update dashboard aggregations"
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error("Error updating dashboard aggregations:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__898fd2ba._.js.map