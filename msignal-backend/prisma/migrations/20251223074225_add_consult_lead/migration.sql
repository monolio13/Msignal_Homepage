-- CreateTable
CREATE TABLE "ConsultLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "inquiryTypes" TEXT[],
    "agreePersonal" BOOLEAN NOT NULL DEFAULT false,
    "agreeMarketing" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsultLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsultLead_phone_idx" ON "ConsultLead"("phone");
