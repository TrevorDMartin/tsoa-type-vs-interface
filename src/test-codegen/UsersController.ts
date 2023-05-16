import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Response,
    Route,
    SuccessResponse,
} from 'tsoa';
import { type User, type CreateUserParams, UserRepo } from './UsersRepo';
import { HttpStatusCode } from '@src/utility/HttpStatusCode';

interface UserNotFoundError {
    message: 'User Not Found';
    details: Record<string, unknown>;
}

@Route('users')
class UsersController extends Controller {
    @Get()
    public getUserByNameOrAll(@Query() name?: string): User[] | undefined {
        const result = new UserRepo().getUserByNameOrAll(name);
        this.setStatus(HttpStatusCode.Ok);
        return result;
    }

    @Response<UserNotFoundError>('400', 'Validation Failed')
    @Get('{userId}')
    public getUserById(@Path() userId: number): User | undefined {
        const result = new UserRepo().getUserById(userId);
        this.setStatus(HttpStatusCode.Ok);
        return result;
    }

    /**
     * Creates a new User and returns that user
     * @param requestBody
     * @returns User
     */
    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public createUser(@Body() requestBody: CreateUserParams): User {
        const newUser = new UserRepo().createUser(requestBody);
        this.setStatus(HttpStatusCode.Created);
        return newUser;
    }
}

export { UsersController };
