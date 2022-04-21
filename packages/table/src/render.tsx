/*
* Tencent is pleased to support the open source community by making
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
*
* Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
*
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
*
* License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
*
* ---------------------------------------------------
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
* to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of
* the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
* THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
* CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

import { AngleDownFill, AngleUpFill } from '@bkui-vue/icon/';
import Pagination from '@bkui-vue/pagination';
import { classes, random } from '@bkui-vue/shared';

import { TablePlugins } from './plugins/index';
import { Column, GroupColumn, IColumnActive, IReactiveProp, TablePropTypes } from './props';
import { resolveHeadConfig, resolvePropVal, resolveWidth } from './utils';;
export const enum EVENTS {
  /** 点击排序事件 */
  ON_SORT_BY_CLICK = 'onSortByClick'
}

/** 排序方式 */
export const enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}
export default class TableRender {
  props: TablePropTypes;
  context;
  reactiveProp: any;
  colgroups: GroupColumn[];
  uuid: string;
  events: Map<string, any[]>;
  public plugins: TablePlugins;
  constructor(props, ctx, reactiveProp: IReactiveProp, colgroups: GroupColumn[]) {
    this.props = props;
    this.context = ctx;
    this.reactiveProp = reactiveProp;
    this.colgroups = colgroups;
    this.plugins = new TablePlugins(props, ctx);
    this.uuid = random(8);
    this.events = new Map<string, any[]>();
  }

  get propActiveCols(): IColumnActive[] {
    return this.reactiveProp.activeColumns;
  }

  /**
   * 渲染Table Head
   * @param activeColumns 当前选中的列
   * @returns
   */
  public renderTableHeadSchema() {
    const { isShow = true } = resolveHeadConfig(this.props);
    if (!isShow) {
      return null;
    }

    return <table cellpadding={0} cellspacing={0}>
        { this.renderColGroup() }
        { this.renderHeader() }
      </table>;
  }

  /**
   * 渲染Table主体
   * @param activeColumns 当前选中的列
   * @returns
   */
  public renderTableBodySchema(rows: any[]) {
    return <table cellpadding={0} cellspacing={0}>
      { this.renderColGroup() }
      { this.renderTBody(rows) }
    </table>;
  }

  public renderTableFooter(options: any) {
    return <Pagination { ...options }
    modelValue={options.current}
    onLimitChange={ limit => this.handlePageLimitChange(limit) }
    onChange={ current => this.hanlePageChange(current) }></Pagination>;
  }

  /**
   * 注册监听事件
   * @param eventName
   * @param wartcher
   */
  public on(eventName: string, wartcher: Function) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(wartcher);
    return this;
  }

  public destroy() {
    this.events.clear();
    this.events = null;
  }

  /**
   * 派发事件
   * @param eventName
   * @param args
   */
  private emitEvent(eventName: string, args: any[]) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach((evet: any) => {
        if (typeof evet === 'function') {
          Reflect.apply(evet, this, args);
        }
      });
    }
  }

  private handlePageLimitChange(limit: number) {
    Object.assign(this.props.pagination, { limit });
    this.context.emit('pageLimitChange', limit);
  }

  private hanlePageChange(current: number) {
    Object.assign(this.props.pagination, { current, value: current });
    this.context.emit('pageValueChange', current);
  }

  /**
   * 指定列选中状态
   * @param index 指定选中的列Index
   * @param single 是否重置其他列，当只允许选中一列的情况下需要先重置
   */
  private setColumnActive(index: number, single = false) {
    const col = this.propActiveCols.find((item: IColumnActive) => item.index === index);
    Object.assign(col, { active: !col.active });

    if (single) {
      this.propActiveCols.filter((item: IColumnActive) => item.index !== index && item.active)
        .forEach((col: IColumnActive) => {
          Object.assign(col, { active: false });
        });
    }
  }

  /**
   * 点击选中一列事件
   * @param index 当前选中列Index
   */
  private handleColumnHeadClick(index: number) {
    if (this.props.columnPick !== 'disabled') {
      this.setColumnActive(index, this.props.columnPick === 'single');
      this.context.emit('column-pick', this.propActiveCols);
    }
  }

  /**
   * 渲染Table Header
   * @returns
   */
  private renderHeader() {
    const config = resolveHeadConfig(this.props);
    const { cellFn } =  config;
    const rowStyle = {
      '--row-height': `${resolvePropVal(config, 'height', ['thead'])}px`,
    };

    const hanldeSortClick = (e: MouseEvent, column:  Column, index: number, type: string) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();

      const fieldName = column.field as string;
      const getVal = (row: any) => this.getRowText(row, fieldName, column);
      const sortFn0 = (a: any, b: any) => {
        const val0 = getVal(a);
        const val1 = getVal(b);
        if (typeof val0 === 'number' && typeof val1 === 'number') {
          return val0 - val1;
        }

        return String.prototype.localeCompare.call(val0, val1);
      };
      Object.assign(column, { _sort_reg: type });
      const sortFn = typeof (column.sort as any)?.sortFn === 'function' ? (column.sort as any)?.sortFn : sortFn0;
      const execFn = (_a, _b) => sortFn(_a, _b) * (type === SortType.DESC ? -1 : 1);
      this.emitEvent(EVENTS.ON_SORT_BY_CLICK, [{ sortFn: execFn, column, index, type }]);
    };

    /**
     * table head cell render
     * @param column
     * @param index
     * @returns
     */
    const renderHeadCell = (column: Column, index: number) => {
      const cells = [];
      if (column.sort) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const sortReg = column['_sort_reg'];
        const sortCell = <span class="head-cell-sort">
          <AngleDownFill class={['sort-action', 'sort-asc', sortReg === SortType.ASC ? 'active' : '']}
            onClick={(e: MouseEvent) => hanldeSortClick(e, column, index, SortType.ASC)}/>
          <AngleUpFill class={['sort-action', 'sort-desc', sortReg === SortType.DESC ? 'active' : '']}
            onClick={(e: MouseEvent) => hanldeSortClick(e, column, index, SortType.DESC)}/>
        </span>;
        cells.push(sortCell);
      }

      if (typeof cellFn === 'function') {
        cells.unshift(cellFn(column, index));
        return cells;
      }

      cells.unshift(resolvePropVal(column, 'label', [column, index]));
      return cells;
    };
    // @ts-ignore:next-line
    return <thead style={rowStyle}>
        <tr>
        {
          this.props.columns.map((column: Column, index: number) => <th colspan={1} rowspan={1}
          class={ classes({
            active: this.isColActive(index),
          }) }
          onClick={ () => this.handleColumnHeadClick(index) }>
            <div class="cell">{ renderHeadCell(column, index) }</div>
          </th>)
        }
        </tr>
      </thead>;
  }

  /**
   * 渲染Table Body
   * @returns
   */
  private renderTBody(rows: any) {
    return <tbody>
    {
      rows.map((row: any, rowIndex: number) => {
        const rowStyle = {
          '--row-height': `${resolvePropVal(this.props, 'rowHeight', ['tbody', row, rowIndex])}px`,
        };

        return <tr
          // @ts-ignore
          style={rowStyle}
          onClick={ e => this.handleRowClick(e, row, rowIndex, rows)}
          onDblclick={e => this.handleRowDblClick(e, row, rowIndex, rows)}
        >
        {
          this.props.columns.map((column: Column, index: number) => <td class={this.getColumnClass(index)}
          colspan={1} rowspan={1}>
          <div class="cell" >{ this.renderCell(row, column, rowIndex, rows) }</div>
        </td>)
        }
      </tr>;
      })
    }
  </tbody>;
  }

  private getColumnClass = (colIndex: number) => `${this.uuid}-column-${colIndex}`;

  /**
   * table row click handle
   * @param e
   * @param row
   * @param index
   * @param rows
   */
  private handleRowClick(e: MouseEvent, row: any, index: number, rows: any) {
    this.context.emit('rowClick', e, row, index, rows, this);
  }

  /**
   * table row click handle
   * @param e
   * @param row
   * @param index
   * @param rows
   */
  private handleRowDblClick(e: MouseEvent, row: any, index: number, rows: any) {
    this.context.emit('rowDblClick', e, row, index, rows, this);
  }

  /**
   * 获取当前行指定列的内容
   * @param row 当前行
   * @param key 指定列名
   * @param column 列配置
   * @param index 当前行Index
   * @returns
   */
  private getRowText(row: any, key: string, column: Column) {
    if (column.type === 'index') {
      return row.__$table_row_index;
    }

    return row[key];
  }

  /**
   * 渲染表格Cell内容
   * @param row 当前行
   * @param column 当前列
   * @returns
   */
  private renderCell(row: any, column: Column, index: number, rows: any[]) {
    const cell = this.getRowText(row, resolvePropVal(column, 'field', [column, row]), column);
    if (typeof column.render === 'function') {
      return column.render(cell, row, index, rows);
    }

    return cell;
  }

  /**
   * 判定指定列是否为选中状态
   * @param colIndex 指定列Index
   * @returns
   */
  private isColActive(colIndex: number) {
    return this.props.columnPick !== 'disabled'
    && this.propActiveCols.some((col: IColumnActive) => col.index === colIndex && col.active);
  }


  /**
 * 渲染表格Col分组
 * @returns
 */
  private renderColGroup() {
    return <colgroup>
      {
        (this.colgroups || []).map((column: GroupColumn, index: number) => {
          const colCls = classes({
            active: this.isColActive(index),
          });

          const width = `${resolveWidth(column.calcWidth)}`.replace(/px$/i, '');
          return <col class={ colCls } width={ width }></col>;
        })
      }
      </colgroup>;
  }
}
