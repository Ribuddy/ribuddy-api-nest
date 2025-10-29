export const REDIS = {
  USER_LOCATION: {
    key: 'user:location:',
    member: (userId: bigint) => `user:location:${userId.toString()}`,
  },
  CURRENT_RIDING_TEAM: {
    key: 'user:current_riding_team:',
    member: (userId: bigint) => `user:current_riding_team:${userId.toString()}`,
  },
};
