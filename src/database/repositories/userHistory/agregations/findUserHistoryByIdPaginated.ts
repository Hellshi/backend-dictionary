export const findUserHistoryByIdPaginated = ({
  skip,
  take,
  userId,
}: {
  userId: string;
  take: number;
  skip: number;
}) => [
  {
    $match: {
      userId: { $eq: userId },
    },
  },
  {
    $project: {
      word: 1,
      added: 1,
      _id: 0,
    },
  },
  { $skip: skip },
  { $limit: +take },
];
