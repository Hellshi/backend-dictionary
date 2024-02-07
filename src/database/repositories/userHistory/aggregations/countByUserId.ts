export const countByUserId = ({ userId }: { userId: string }) => [
  {
    $match: {
      userId: { $eq: userId },
    },
  },
  { $count: 'count' },
];
