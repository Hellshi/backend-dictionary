export const findUserHistoryWithFilterPaginated = ({
  take,
  filter,
  matchStage,
}: {
  filter: any;
  take: number;
  matchStage: any;
}) => [
  {
    $match: {
      ...matchStage,
      ...filter,
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
