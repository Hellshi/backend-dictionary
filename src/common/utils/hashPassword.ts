import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const comparePassword = ({
  attempt,
  password,
}: {
  attempt: string;
  password: string;
}) => bcrypt.compareSync(attempt, password);
