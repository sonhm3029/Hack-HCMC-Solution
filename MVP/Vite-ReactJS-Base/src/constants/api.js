export const PREFIX = "/api/v1";

const API_VAR = {
  CHATBOT: {
    MSG: "/webhooks/rest/webhook",
    INTENT_RANKING: "/model/parse",
  },
  CONVERSATION: {
    SEARCH: "/query-message",
    DELETE: "/add-deleted",
  },
  INTENT: {
    SEARCH: PREFIX + "/intent",
    CREATE: PREFIX + "/intent",
    UPDATE: PREFIX + "/intent",
    SUGGEST_INTENT: PREFIX + "/suggest-intent",
  },
  MEDIA: {
    SEARCH: PREFIX + "/media",
    CREATE: PREFIX + "/media",
    DELETE: PREFIX + "/media",
  },
  INTENT_MANAGE: {
    CREATE: PREFIX + "/intent-manage",
    DELETE: PREFIX + "/intent-manage",
    UPDATE: PREFIX + "/intent-manage",
  },
  STORY_INTENT: {
    CREATE: PREFIX + "/story-intent",
    SEARCH: PREFIX + "/story-intent",
    UPDATE: PREFIX + "/story-intent",
    DELETE: PREFIX + "/story-intent",
  },
  STORY_RESPONSE: {
    CREATE: PREFIX + "/story-utter",
    SEARCH: PREFIX + "/story-utter",
    UPDATE: PREFIX + "/story-utter",
    DELETE: PREFIX + "/story-utter",
  },
  STORIES: {
    CREATE: PREFIX + "/stories",
    SEARCH: PREFIX + "/stories",
    UPDATE: PREFIX + "/stories",
    DELETE: PREFIX + "/stories",
  },

  AUTH: {
    LOGIN: PREFIX + "/login",
  },
  TRAINING: {
    START: PREFIX + "/training",
    UPDATE: PREFIX + "/update-model",
    UPDATE_CONFIG: PREFIX + "/update-config-model",
    TESTING_MODEL: PREFIX + "/test-model"
  },
  TRAINING_HISTORY: {
    SEARCH: PREFIX + "/training-history",
  },
  MODEL_VERSIONING: {
    GET_LASTEST: PREFIX + "/model-versioning",
  },
  USER_FEEDBACKS: {
    CREATE: PREFIX + "/create-user-feedbacks",
    SEARCH: PREFIX + "/user-feedbacks",
    UPDATE: PREFIX + "/user-feedbacks",
    DELETE: PREFIX + "/user-feedbacks",
  },
  TOXIC_DATA: {
    BASE: PREFIX + "/toxic-data",
    FLAG_TOXIC: PREFIX + "/toxic-data-flag"
  },
  APPLICATION_SETTINGS: {
    BASE: PREFIX + "/application-settings",
    SWITH_AUTO_TRAINING: PREFIX + "/switch-auto-training"
  },
  STATISTIC: {
    NUM_REQUEST_STATS: PREFIX + "/num-request-stats",
    USER_RES_QUALITY_STATS: PREFIX + "/user-response-quality-stats"
  },
  OPENAI: {
    CHAT_COMPLETION: PREFIX + "/openai-chat-completion",
    CHAT_RAG: PREFIX + "/ivirse-chat-rag"
  },
  VALIDATE: {
    INTENT_VALIDATE: PREFIX + "/validate-intent"
  }
};

export default API_VAR;
