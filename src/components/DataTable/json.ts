import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import objectPath from 'object-path';

@Component({})

export default class JsonStore extends Vue {
  paginate = false
  filterable = false
  sortable = false
  can_resize = true
  filter = ''
  sort_by = ''
  sort_dir = 'asc'
  page = 1
  page_size = 10
  data = []
  table = null

  @Watch('filter')
  onFilterChanged(value, oldValue) {
    this.page = 1;
  }
  @Watch('page_size')
  onPageSizeChanged(value, oldValue) {
    this.page = 1;
  }

  get last_page() {
    return Math.ceil(this.filtered_rows.length / this.page_size);
  }
  get filtered_rows() {
    const rows = this.data;
    if (this.filterable && this.filter) {
      let filter_words = this.filter.split(' ');
      return rows.filter((row) => {
        for (let f in filter_words) {
          let filter_word = filter_words[f];
          if (typeof filter_word.toLowerCase === 'function') {
            filter_word = filter_word.toLowerCase();
          }
          let pass = false;
          for (let i in this.table.columns) {
            let column_definition = this.table.column_props[i];
            let column_text = '';
            if (!column_definition.filterable) {
              continue;
            }
            if (column_definition.field) {
              column_text = objectPath.get(row, column_definition.field);
            } else if (typeof column_definition.callback === 'function') {
              column_text = (column_definition.callback)(row);
            } else {
              continue;
            }
            if (!column_text) {
              continue;
            }
            column_text = ('' + column_text + '').trim();
            if (typeof column_text.toLowerCase === 'function') {
              column_text = column_text.toLowerCase();
            }
            if (column_text.indexOf(filter_word) !== -1) {
              pass = true;
            }
          }
          if (!pass) {
            return false;
          }
        }
        return true;
      }, this);
    }
    return rows.filter(row => true);
  }
  get sorted_rows() {
    const column = this.table.column_props[this.sort_by];
    if (!column || this.sort_by === null) {
      return this.filtered_rows;
    }
    return this.filtered_rows.sort((a, b) => {
      const value_a = column.callback ? column.callback(a) : objectPath.get(a, column.field);
      const value_b = column.callback ? column.callback(b) : objectPath.get(b, column.field);
      if (value_a === value_b) {
        return 0;
      }
      let sort_val = value_a > value_b ? 1 : -1;
      if (this.sort_dir === 'dsc') {
        sort_val *= -1;
      }
      return sort_val;
    });
  }
  get visible_rows() {
    if (this.paginate) {
      const beginning = this.page_size * (this.page - 1);
      return this.sorted_rows.slice(beginning, beginning + this.page_size);
    }

    return this.sorted_rows;
  }

  sortBy(column_id) {
    if (this.sort_by === column_id) {
      switch (this.sort_dir) {
        case null:
          this.sort_dir = 'asc';
          break;
        case 'asc':
          this.sort_dir = 'dsc';
          break;
        case 'dsc':
          this.sort_dir = null;
          break;
      }
      return;
    }
    this.sort_by = column_id;
    this.sort_dir = 'asc';
  }
  setPage(page_number, event) {
    this.page = page_number;
    event.target.blur();
  }
  setTable(table) {
    this.table = table;
  }
  setData(data) {
    this.data = data;
  }
  setFilterable(value) {
    this.filterable = value;
  }
  setPaginate(value) {
    this.paginate = value;
  }
  setSortable(value) {
    this.sortable = value;
  }
};
