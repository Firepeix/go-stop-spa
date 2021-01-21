import { Vue, Component } from 'vue-property-decorator'

interface PaginationOptionsInterface {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
  maxPages: number;
  sortBy: string;
  descending: true;
}

@Component
export default class PaginationMixin extends Vue {
  paginationOptions : PaginationOptionsInterface = {
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 1,
    maxPages: 1,
    sortBy: 'id',
    descending: true
  };
}
