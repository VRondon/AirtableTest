import {
  Resolver, Query, Arg,
} from 'type-graphql';

// Models
import { User } from '~/schema/User/User.model';

// Utils
import { select } from '~/utils/Airtable/airtable';

// Inputs
import { SearchUsersInput } from './input';

const idTable = process.env.AIRTABLE_TABLE_ID || 'tblU7w4IfYBqGYTnz';

@Resolver(User)
export class UserQueryResolver {
  @Query(() => Boolean)
  public async me(@Arg('input', { nullable: true }) input?: SearchUsersInput) {
    select(idTable, input);
    return true;
  }
}
