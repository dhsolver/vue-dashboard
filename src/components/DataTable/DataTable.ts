import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import objectPath from 'object-path';
import JsonStore from './json';

import './style.scss';

@Component({
  template: require('./DataTable.html'),
})

export class DataTable extends Vue {
  store: any = null;

  @Prop() columns: [Object, Array<any>];
  @Prop() data: [Object, Array<any>, String];
  @Prop({ default: 'id1' }) filterID: String;
  @Prop({ default: -1 }) initSortField: Number;
  @Prop({ default: false }) filterable: Boolean;
  @Prop({ default: false }) paginate: Boolean;
  @Prop({ default: () => [10, 25, 50, 100] }) sizeOptions: Array<number>;
  @Prop({ default: null }) dataStore: Object;

  @Watch('data')
  onDataChanged(value, oldValue) {
    this.updateStore(this.data);
    if (this.initSortField !== -1) {
      this.store.sortBy(this.initSortField)
      this.store.sortBy(this.initSortField)
    }
  }

  get column_props() {
    let i = 0;
    return this.columns.map((column: any) => {
      let sortable = typeof column.sortable === 'undefined' ? true : column.sortable;
      sortable = column.component ? false : sortable;
      
      let filterable = typeof column.filterable === 'undefined' ? true : column.filterable;
      filterable = column.component ? false : filterable;
      return {
        id: i++,
        label: column.label || '',
        align: column.align || 'left',
        sortable: sortable,
        filterable: filterable,
        field: column.field || null,
        callback: column.callback || null,
        component: column.component || null
      };
    });
  }
  get has_size_options() {
    const is_array = (this.sizeOptions instanceof Array);
    const can_resize = this.store.can_resize;
    return is_array && can_resize;
  }

  created() {
    this.updateStore(this.data);
  }
  getHeaderColumnClass(head_column) {
    const can_sort = this.store.sortable;
    const sort_none = head_column.id !== this.store.sort_by || !this.store.sort_dir;
    const sort_asc = head_column.id === this.store.sort_by && this.store.sort_dir === 'asc';
    const sort_dsc = head_column.id === this.store.sort_by && this.store.sort_dir === 'dsc';
    return {
      'fa': can_sort,
      // 'fa-sort': can_sort,
      'fa-sort': can_sort && sort_none,
      'fa fa-sort-up': can_sort && sort_asc,
      'fa fa-sort-down': can_sort && sort_dsc,
    }
  }
  updateStore(data) {
    if (this.dataStore) {
      this.store = new Vue(this.dataStore);
    } else {
      this.store = new JsonStore;
    }
    this.store.setTable(this);
    this.store.setData(data);
    this.store.setFilterable(this.filterable);
    this.store.setPaginate(this.paginate);
    this.store.setSortable(true);
  }
  getRowFromField(row, field) {
    return objectPath.get(row, field)
  }
  getStateString() {
    const page_size = this.store.page_size;
    let startEntry = (this.store.page - 1) * page_size + 1;
    let endEntry = this.store.page * page_size;
    const totalEntry = this.store.filtered_rows.length;
    if (this.store.page === Math.ceil(totalEntry / page_size)) {
      endEntry = startEntry + (totalEntry % page_size - 1);
    }
    if (totalEntry === 0) {
      startEntry = 0
      endEntry = 0
    }
    return 'Showing ' + startEntry + ' to ' + endEntry + ' of ' + totalEntry + ' entries';
  }
  onSelectRow(row) {
    this.$parent.$emit('onSelectRow', row)
  }
}
