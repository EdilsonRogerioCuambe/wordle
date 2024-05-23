"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataWordsTable = void 0;
var react_1 = require("react");
var react_table_1 = require("@tanstack/react-table");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var link_1 = __importDefault(require("next/link"));
function DataWordsTable(_a) {
    var _b, _c, _d;
    var columns = _a.columns, data = _a.data;
    var _e = (0, react_1.useState)([]), sorting = _e[0], setSorting = _e[1];
    var _f = (0, react_1.useState)([]), columnFilters = _f[0], setColumnFilters = _f[1];
    var table = (0, react_table_1.useReactTable)({
        data: data,
        columns: columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        onSortingChange: setSorting,
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
        },
    });
    return (<div className="text-[#f5f5f5] my-5 border-2 p-4 border-[#f5f5f5] rounded-lg">
      <div className="flex items-center py-4 justify-between gap-x-2">
        <input_1.Input placeholder='Pesquisar palavra por "nome"' value={(_c = (_b = table.getColumn('value')) === null || _b === void 0 ? void 0 : _b.getFilterValue()) !== null && _c !== void 0 ? _c : ''} onChange={function (event) { var _a; return (_a = table.getColumn('value')) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className="max-w-sm w-full bg-transparent border-2 text-[#f5f5f5] placeholder:text-[#f5f5f5] border-[#f5f5f5]"/>
        <link_1.default href="/dashboard/add-word" passHref>
          <button_1.Button variant="outline" className="bg-transparent transition-all duration-300 ease-in-out hover:text-[#f5f5f5] hover:bg-[#121214]">
            Adicionar Nova Palavra
          </button_1.Button>
        </link_1.default>
      </div>
      <div className="my-4">
        <table_1.Table>
          <table_1.TableHeader>
            {table.getHeaderGroups().map(function (headerGroup) { return (<table_1.TableRow key={headerGroup.id}>
                {headerGroup.headers.map(function (header) {
                return (<table_1.TableHead key={header.id} className="text-[#c3c3cc] hover:text-[#f5f5f5] cursor-pointer">
                      {header.isPlaceholder
                        ? null
                        : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
                    </table_1.TableHead>);
            })}
              </table_1.TableRow>); })}
          </table_1.TableHeader>
          <table_1.TableBody>
            {((_d = table.getRowModel().rows) === null || _d === void 0 ? void 0 : _d.length) ? (table.getRowModel().rows.map(function (row) { return (<table_1.TableRow className="hover:bg-[#202024] hover:rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#f5f5f5]" key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(function (cell) { return (<table_1.TableCell key={cell.id}>
                      {(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}
                    </table_1.TableCell>); })}
                </table_1.TableRow>); })) : (<table_1.TableRow>
                <table_1.TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhuma categoria encontrada.
                </table_1.TableCell>
              </table_1.TableRow>)}
          </table_1.TableBody>
        </table_1.Table>
      </div>
      <div className="flex items-center justify-end text-[#f5f5f5] space-x-2 py-4">
        <button_1.Button variant="outline" size="sm" onClick={function () { return table.previousPage(); }} disabled={!table.getCanPreviousPage()}>
          Anterior
        </button_1.Button>
        <button_1.Button variant="outline" size="sm" onClick={function () { return table.nextPage(); }} disabled={!table.getCanNextPage()}>
          Próximo
        </button_1.Button>
      </div>
    </div>);
}
exports.DataWordsTable = DataWordsTable;
