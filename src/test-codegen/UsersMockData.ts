import { type User } from '@src/test-codegen/UsersRepo';

const userOne: User = {
    id: 0,
    email: 'jane@doe.com',
    name: 'Jane Doe',
    status: 'Happy',
    phoneNumbers: ['111-111-1111'],
};
const userTwo: User = {
    id: 1,
    email: 'john@doe.com',
    name: 'John Doe',
    status: 'Sad',
    phoneNumbers: ['222-222-2222'],
};

const users: User[] = [userOne, userTwo];

export { userOne, userTwo, users };
