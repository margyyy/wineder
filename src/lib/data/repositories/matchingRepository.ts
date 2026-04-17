import type { FeatureVector } from "../../domain/matching/features";
import { prisma } from "../../db/prisma";

type SessionAnswer = {
  questionId: string;
  optionId: string;
};

function baselineData(vector: FeatureVector) {
  return {
    baselineDolcezza: vector.dolcezza,
    baselineAcidita: vector.acidita,
    baselineTannini: vector.tannini,
    baselineCorpo: vector.corpo,
    baselineAlcol: vector.alcol,
    baselineEffervescenza: vector.effervescenza,
    baselineFruttato: vector.fruttato,
    baselineFloreale: vector.floreale,
    baselineSpeziato: vector.speziato,
    baselineTerroso: vector.terroso,
    baselineLegnoso: vector.legnoso,
    baselineMinerale: vector.minerale,
  };
}

function currentData(vector: FeatureVector) {
  return {
    currentDolcezza: vector.dolcezza,
    currentAcidita: vector.acidita,
    currentTannini: vector.tannini,
    currentCorpo: vector.corpo,
    currentAlcol: vector.alcol,
    currentEffervescenza: vector.effervescenza,
    currentFruttato: vector.fruttato,
    currentFloreale: vector.floreale,
    currentSpeziato: vector.speziato,
    currentTerroso: vector.terroso,
    currentLegnoso: vector.legnoso,
    currentMinerale: vector.minerale,
  };
}

export async function createSurveySession(
  answers: SessionAnswer[],
  baselineVector: FeatureVector,
  learningRate = 0.25,
) {
  const session = await prisma.surveySession.create({ data: {} });

  if (answers.length > 0) {
    await prisma.surveyAnswer.createMany({
      data: answers.map((answer) => ({
        surveySessionId: session.id,
        questionId: answer.questionId,
        optionId: answer.optionId,
      })),
    });
  }

  await prisma.userTasteProfile.create({
    data: {
      surveySessionId: session.id,
      learningRate,
      ...baselineData(baselineVector),
      ...currentData(baselineVector),
    },
  });

  return session;
}

export async function getSurveySessionProfile(sessionId: string) {
  return prisma.userTasteProfile.findUnique({
    where: { surveySessionId: sessionId },
  });
}

export async function updateCurrentVector(sessionId: string, vector: FeatureVector) {
  return prisma.userTasteProfile.update({
    where: { surveySessionId: sessionId },
    data: currentData(vector),
  });
}

export async function addFeedbackEvent(
  sessionId: string,
  wineId: number,
  feedback: "LIKE" | "DISLIKE",
) {
  return prisma.wineFeedbackEvent.create({
    data: {
      surveySessionId: sessionId,
      wineId,
      feedback,
    },
  });
}

export async function getFeedbackEventsBySession(sessionId: string) {
  return prisma.wineFeedbackEvent.findMany({
    where: { surveySessionId: sessionId },
    orderBy: { createdAt: "asc" },
  });
}

export async function listWineVectors() {
  const wines = await prisma.wine.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      dolcezza: true,
      acidita: true,
      tannini: true,
      corpo: true,
      alcol: true,
      effervescenza: true,
      fruttato: true,
      floreale: true,
      speziato: true,
      terroso: true,
      legnoso: true,
      minerale: true,
    },
  });

  return wines.map((wine) => ({
    id: wine.id,
    slug: wine.slug,
    name: wine.name,
    vector: {
      dolcezza: wine.dolcezza,
      acidita: wine.acidita,
      tannini: wine.tannini,
      corpo: wine.corpo,
      alcol: wine.alcol,
      effervescenza: wine.effervescenza,
      fruttato: wine.fruttato,
      floreale: wine.floreale,
      speziato: wine.speziato,
      terroso: wine.terroso,
      legnoso: wine.legnoso,
      minerale: wine.minerale,
    },
  }));
}

export function profileToVectors(
  profile: NonNullable<Awaited<ReturnType<typeof getSurveySessionProfile>>>,
) {
  return {
    baseline: {
      dolcezza: profile.baselineDolcezza,
      acidita: profile.baselineAcidita,
      tannini: profile.baselineTannini,
      corpo: profile.baselineCorpo,
      alcol: profile.baselineAlcol,
      effervescenza: profile.baselineEffervescenza,
      fruttato: profile.baselineFruttato,
      floreale: profile.baselineFloreale,
      speziato: profile.baselineSpeziato,
      terroso: profile.baselineTerroso,
      legnoso: profile.baselineLegnoso,
      minerale: profile.baselineMinerale,
    },
    current: {
      dolcezza: profile.currentDolcezza,
      acidita: profile.currentAcidita,
      tannini: profile.currentTannini,
      corpo: profile.currentCorpo,
      alcol: profile.currentAlcol,
      effervescenza: profile.currentEffervescenza,
      fruttato: profile.currentFruttato,
      floreale: profile.currentFloreale,
      speziato: profile.currentSpeziato,
      terroso: profile.currentTerroso,
      legnoso: profile.currentLegnoso,
      minerale: profile.currentMinerale,
    },
    learningRate: profile.learningRate,
  };
}
