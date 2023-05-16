import { users } from '@src/test-codegen/UsersMockData';

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
interface User {
    id: number;
    email: string;
    name: string;
    status?: 'Happy' | 'Sad';
    phoneNumbers: string[];
}

type CreateUserParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

class UserRepo {
    public getUserByNameOrAll = (name?: string): User[] => {
        return name
            ? users.filter(({ name: userName }) => userName === name)
            : users;
    };

    public getUserById = (id: number): User | undefined =>
        users.find(({ id: userId }) => userId === id);

    public createUser = (createUserParams: CreateUserParams): User => {
        const newUser = {
            id: users.length,
            ...createUserParams,
        };
        users.push(newUser);
        return newUser;
    };
}

export { type User, type CreateUserParams, UserRepo };
