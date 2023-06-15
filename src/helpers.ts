import { Person } from './types/Person';

interface SortOptions {
  users: Person[],
  sortBy: keyof Person | null,
  isReverse: boolean,
}

export const sortUsersBy = (options: SortOptions) => {
  const { users: initialUsers, isReverse, sortBy } = options;

  const users = [...initialUsers];

  if (sortBy === null) {
    return users;
  }

  const sortedUsers = users.sort((a, b) => {
    switch (sortBy) {
      case 'born':
      case 'died':
        return a[sortBy] - b[sortBy];

      case 'sex':
      case 'slug':
      case 'fatherName':
      case 'motherName':
      case 'name':
        const aField = a[sortBy];
        const bField = b[sortBy];

        if (aField === null) {
          return -1;
        }

        if (bField === null) {
          return 1;
        }

        return aField.localeCompare(bField);

      default:
        return 0;
    }
  });

  return isReverse
    ? sortedUsers.reverse()
    : sortedUsers;
};
