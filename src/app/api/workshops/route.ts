import { NextResponse } from "next/server";
import { createWorkshop } from "../../../lib/data/repositories/managementRepository";
import { parseCreateWorkshopPayload } from "./validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseCreateWorkshopPayload(body);
    const workshop = await createWorkshop(payload);

    return NextResponse.json({ workshop }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Impossibile creare il workshop",
      },
      { status: 400 },
    );
  }
}
