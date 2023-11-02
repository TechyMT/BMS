import { User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export class BillDto {
    invoiceNumber: string;
    invoiceDate: string;
    vendorDetails: Prisma.JsonValue;
    notes: Prisma.JsonValue;
    items: Prisma.JsonArray;
    totalAmount: Prisma.JsonValue;
    imageUrl: string;
    fk_user: number;
}