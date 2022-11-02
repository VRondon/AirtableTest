import { InputType, Field } from 'type-graphql';

// Utils
import { UserFilterField, Status } from '~/utils/Airtable/airtable.enum';

@InputType()
export class SearchUsersInput {
  @Field({ nullable: true })
  public company_email?: string;

  @Field(() => Status, { nullable: true })
  public [UserFilterField.STATUS]?: Status;
}
