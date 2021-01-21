export interface TableColumnInterface {
  name: string;
  label: string;
  field: string;
  align: 'center';
  sortable: true;

  format? (value: unknown) : string
}
