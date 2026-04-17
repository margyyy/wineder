import { describe, expect, it } from "vitest";
import { parseCreateWorkshopPayload } from "./validators";

describe("parseCreateWorkshopPayload", () => {
  it("accepts valid workshop payload", () => {
    const payload = parseCreateWorkshopPayload({
      name: "Enoteca Test",
      slug: "enoteca-test",
      category: "bar",
      lat: 45.4,
      lng: 10.9,
      profileText: "Profilo",
    });

    expect(payload.name).toBe("Enoteca Test");
    expect(payload.category).toBe("bar");
    expect(payload.lat).toBe(45.4);
  });

  it("rejects invalid category", () => {
    expect(() =>
      parseCreateWorkshopPayload({
        name: "Enoteca Test",
        slug: "enoteca-test",
        category: "hotel",
        lat: 45.4,
        lng: 10.9,
      }),
    ).toThrow();
  });

  it("rejects invalid coordinates", () => {
    expect(() =>
      parseCreateWorkshopPayload({
        name: "Enoteca Test",
        slug: "enoteca-test",
        category: "bar",
        lat: "x",
        lng: 10.9,
      }),
    ).toThrow();
  });
});
