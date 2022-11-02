import airtable, { Collaborator, FieldSet, Records, SelectOptions } from 'airtable';

// Access to the api
const apiKey = 'key6BafcViiXwNiWx';
const idDatabase = 'appjBBRdx4MjC3EcY';
export const idTable = 'tblU7w4IfYBqGYTnz';

// DB instance
const base = new airtable({apiKey}).base(idDatabase);

export const enum UserFields {
  STATUS = 'Status',
  NAME = 'Name',
  NOTES = 'Notes',
  ASSIGNEE = 'Assignee',
}

export type FilterBy = {
  [key in UserFields]?: string;
};

interface Users extends FieldSet {
  [UserFields.STATUS]: string;
  [UserFields.NAME]: string;
  [UserFields.NOTES]: string;
  [UserFields.ASSIGNEE]: Collaborator;
}

// IMPORTANTE: si el campo es de tipo colaborador, solo devolverá el nombre en el filterByFormula, por lo cual no 
// se podrá acceder al email del campo por las restricciones de la fórmula.
// https://community.airtable.com/t/how-to-referencing-a-field-within-a-field/45173/6

/**
 * Generate a formula to filter records in airtable. The syntax of this formula is:
 * For one record: ({`ColumnName`} = `ValueToSearch`)
 * For two or more 'and' records: AND({`ColumnName`} = `ValueToSearch`, {`ColumnName`} = `ValueToSearch`)
 */
const generateFilterFormula = (filter: FilterBy): string => {
  const valuesToFilter = [];
  for(const [key, value] of Object.entries(filter)){
    if (value) valuesToFilter.push(`{${key}} = '${value}'`);
  }
  if (valuesToFilter.length > 1) return `AND(${valuesToFilter.toString()})`;
  return `(${valuesToFilter.toString()})`;
}

/**
 * Get an airtable information by its tableId
 * @param filter 
 */
export const select = async (tableId: string, filter?: FilterBy) => {
  const selectOptions: SelectOptions<FieldSet> = {
    view: "Grid view",
  }

  let filterFormula;
  if (filter) filterFormula = generateFilterFormula(filter);
  if (filterFormula) selectOptions.filterByFormula = filterFormula

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
}
