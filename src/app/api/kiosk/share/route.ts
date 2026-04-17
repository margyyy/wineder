import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { createKioskShare, type KioskPersistedWine } from "../../../../lib/data/repositories/kioskRepository";

function parsePayload(payload: unknown): { wines: KioskPersistedWine[]; sessionId?: string } {
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Payload kiosk non valido");
  }

  const body = payload as Record<string, unknown>;
  if (!Array.isArray(body.wines) || body.wines.length === 0) {
    throw new Error("Lista vini obbligatoria");
  }

  return {
    wines: body.wines as KioskPersistedWine[],
    sessionId: typeof body.sessionId === "string" ? body.sessionId : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = parsePayload(await request.json());
    const code = randomUUID().replace(/-/g, "").slice(0, 12);
    const share = await createKioskShare({
      code,
      sessionId: body.sessionId,
      wines: body.wines,
    });

    const requestUrl = new URL(request.url);
    const shareUrl = `${requestUrl.origin}/kiosk/mobile/${share.code}`;
    const qrDataUrl = await QRCode.toDataURL(shareUrl, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: "M",
    });

    return NextResponse.json({
      code: share.code,
      shareUrl,
      qrDataUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Errore creazione QR" },
      { status: 400 },
    );
  }
}
