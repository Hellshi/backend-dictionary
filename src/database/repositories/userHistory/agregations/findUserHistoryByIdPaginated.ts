export const findUserHistoryByIdPaginated = ({
  take,
  userId,
  matchStage,
}: {
  userId: string;
  take: number;
  matchStage: any;
}) => [
  {
    $match: {
      ...matchStage,
      userId: { $eq: userId },
    },
  },
  {
    $project: {
      word: 1,
      added: 1,
      _id: 1,
    },
  },
  { $sort: { _id: -1 } },
  { $limit: +take },
];
