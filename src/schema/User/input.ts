import { InputType, Field } from 'type-graphql';

// Utils
import { UserFields } from '~/utils/airtable';

@InputType()
export class SearchUsersInput {
  @Field({ nullable: true })
  public [UserFields.NAME]?: string;

  @Field({ nullable: true })
  public [UserFields.STATUS]?: string;
}
