export const FALLBACK_THRESHOLD = 0.8;
export const FAILED_THRESHOLD = 0.6;

export const checkIntenRanking = (intentRanking) => {
  let result =
    intentRanking?.[0]?.confidence >= FALLBACK_THRESHOLD &&
    intentRanking?.[0]?.name !== "nlu_fallback";
  return result;
};

export const checkBotFailed = (intentRanking) => {
  let result =
    intentRanking?.[1]?.confidence < FAILED_THRESHOLD &&
    intentRanking?.[0]?.name === "nlu_fallback";

  return result;
};

export const getIntents = (intenRanking) => {
  if (intenRanking?.intent_ranking?.[0]?.name === "nlu_fallback") {
    return intenRanking?.intent_ranking?.slice(1);
  } else {
    return intenRanking?.intent_ranking?.slice(0);
  }
};
