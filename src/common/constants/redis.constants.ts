export const REDIS = {
  USER_LOCATION: {
    COLLECTION_KEY: 'user:location:',
    MEMBER_KEY: (userId: bigint) => `user:location:${userId.toString()}`,
  },
  CURRENT_RIDING_TEAM: {
    KEY: (userId: bigint) => `user:current_riding_team:${userId.toString()}`,
  },
};
