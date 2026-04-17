import { NextResponse } from "next/server";
import { getKioskShareByCode } from "../../../../../lib/data/repositories/kioskRepository";

type Params = {
  params: Promise<{ code: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { code } = await params;
  const share = await getKioskShareByCode(code);

  if (!share) {
    return NextResponse.json({ error: "Sessione kiosk non trovata" }, { status: 404 });
  }

  return NextResponse.json({ share });
}
