import airtable, { FieldSet, Records, SelectOptions } from 'airtable';

// Enums
import { UserFields, Users, FilterBy } from '~/utils/Airtable/airtable.enum';

// Utils
import { Logger } from '~/utils/logger';

// Errors
import { AirtableError } from '~/utils/Airtable/airtable.error';

// Access to the api
const apiKey = process.env.AIRTABLE_API_KEY || 'key6BafcViiXwNiWx';
const idDatabase = process.env.AIRTABLE_DATABASE_ID || 'appjBBRdx4MjC3EcY';

// DB instance
const base = new airtable({ apiKey }).base(idDatabase);

// Logger
const serviceName = 'Airtable';
const logger = new Logger(serviceName);

// IMPORTANTE: si el campo es de tipo colaborador, solo devolverá el nombre en el filterByFormula, por lo cual no 
// se podrá acceder al email del campo por las restricciones de la fórmula.
// https://community.airtable.com/t/how-to-referencing-a-field-within-a-field/45173/6

/**
 * Generate a formula to filter records in airtable. The syntax of this formula is:
 * For one record: ({`ColumnName`} = `ValueToSearch`)
 * For two or more 'and' records: AND({`ColumnName`} = `ValueToSearch`, {`ColumnName`} = `ValueToSearch`)
 */
const generateFilterFormula = (filter: FilterBy): string => {
  try {
    const valuesToFilter = [];
  
    for (let [key, value] of Object.entries(filter)) {
      const userFieldName = Object.entries(UserFields)
                            .find(([userFieldsKey]) => userFieldsKey.toLowerCase() === key.toLowerCase());
      if (!userFieldName) break;
      if (value) valuesToFilter.push(`{${userFieldName[1]}} = '${value}'`);
    }
  
    if (valuesToFilter.length > 1) return `AND(${valuesToFilter.toString()})`;
    return `(${valuesToFilter.toString()})`;
  } catch(error: any) {
    logger.error(`[generateFilterFormula] ${error.message}`, error);
    throw new Error(AirtableError.COULD_NOT_GENERATE_FILTER_FORMULA);
  }
}

/**
 * Get an airtable information by its tableId
 * @param filter 
 */
export const getTableInformation = async (tableId: string, filter?: FilterBy) => {
  try {
    const selectOptions: SelectOptions<FieldSet> = {
      view: "Grid view",
    }

    let filterFormula;
    if (filter) filterFormula = generateFilterFormula(filter);
    if (filterFormula) selectOptions.filterByFormula = filterFormula;

    base(tableId).select(selectOptions).eachPage(function page(records, fetchNextPage) {
      (records as unknown as Records<Users>).forEach(function(record) {

        // Do something with te records
        const { fields } = record;
        console.log(fields);
        console.log('Retrieved', record.get(UserFields.NAME));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, function done(err) {
      console.log('done');
      if (err) { console.error(err); return; }
    });
  } catch(error: any) {
    if (error instanceof Error) throw new Error(error.message);
    logger.error(`[getTableInformation] ${error.message}`, error);
    throw new Error(AirtableError.ERROR_ON_GETTING_TABLE_INFORMATION);
  }
}
