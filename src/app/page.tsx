import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get("survey_session_id")?.value;

  if (!existingSession) {
    redirect("/questionnaire");
  }

  redirect("/questionnaire");
}
