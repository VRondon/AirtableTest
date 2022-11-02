import {
  Resolver, Query, Arg,
} from 'type-graphql';

// Models
import { User } from '~/schema/User/User.model';

// Utils
import { select, idTable } from '~/utils/airtable';

// Inputs
import { SearchUsersInput } from './input';

@Resolver(User)
export class UserQueryResolver {
  @Query(() => Boolean)
  public async me(@Arg('input', { nullable: true }) input?: SearchUsersInput) {
    select(idTable, input);
    return true;
  }
}
