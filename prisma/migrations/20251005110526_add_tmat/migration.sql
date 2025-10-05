-- CreateTable
CREATE TABLE "public"."TMATData" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "ketinggian" DOUBLE PRECISION NOT NULL,
    "kebunId" TEXT NOT NULL,
    "awlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TMATData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TMATData" ADD CONSTRAINT "TMATData_kebunId_fkey" FOREIGN KEY ("kebunId") REFERENCES "public"."Kebun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TMATData" ADD CONSTRAINT "TMATData_awlId_fkey" FOREIGN KEY ("awlId") REFERENCES "public"."AlatAWL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
