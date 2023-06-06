import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { TableLink } from "../../components/UI/TableLink/TableLink";
import {
  onCellClickedActions,
  updateRow,
} from "../../utils/ad-grid/onCellClickedActions";
import { CreateRow } from "../../components/UI/CreateRow/CreateRow";
import ShopsService from "../../services/shops.service";
import { ActionCellRenderer } from "../../components/UI/ActionCellRenderer/ActionCellRenderer";
import NumericEditor from "../../utils/editors/NumericEditor";
import DateEditor from "../../utils/editors/DateEditor";
import IntegerEditor from "../../utils/editors/IntegerEditor";
import { createParams } from "./ShopsTable.data";

export const ShopsTable = () => {
  const gridRef = useRef();

  const addItem = useCallback(() => {
    const maxRowFound = gridRef.current.api.isLastRowIndexKnown();
    if (maxRowFound) {
      const rowCount = gridRef.current.api.getInfiniteRowCount() || 0;
      gridRef.current.api.setRowCount(rowCount);
    }
    gridRef.current.api.refreshInfiniteCache();
  }, []);

  const [columnDefs] = useState([
    {
      field: "name",
      headerName: "Название",
      width: 200
    },
    {
      field: "total_revenue",
      headerName: "Общая прибыль",
      cellEditor: NumericEditor,
      width: 150
    },
    {
      field: "open_date",
      headerName: "Дата открытия",
      cellEditor: DateEditor,
      width: 150
    },
    {
      field: "area",
      headerName: "Площадь",
      cellEditor: IntegerEditor,
      width: 120
    },
    {
      field: "action",
      headerName: "Редактировать",
      editable: false,
      cellRenderer: ActionCellRenderer,
      maxWidth: 190,
    },
    {
      headerName: "Рабочие",
      cellRenderer: TableLink,
      editable: false,
      maxWidth: 120,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      editable: true,
      resizable: true,
      flex: 1
    }),
    []
  );

  const getData = async (params) => {
    const { data } = await ShopsService.getAll(params)

    return data;
  };

  const createRow = async (body) => {
    try {
      const data = {
        name: body.name,
        total_revenue: +body.total_revenue,
        open_date: body.open_date,
        area: +body.area,
      };
      const res = await ShopsService.create(data);

      addItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onGridReady = useCallback(async (params) => {
    const dataSource = await {
      rowCount: undefined,
      getRows: async (params) => {
        const limit = params.endRow - params.startRow
        const offset = params.startRow
        const reqParams = {
          offset: offset,
          limit: limit,
        }

        const rowsThisPage = await getData(reqParams);
        
        let lastRow = -1
        if (rowsThisPage.length < limit) {
          lastRow = params.startRow + rowsThisPage.length
        }

        params.successCallback(rowsThisPage, lastRow);
      },
    };
    params.api.setDatasource(dataSource);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxHeight: "100%"
      }}
    >
      <div>
        <CreateRow params={createParams} createFunction={createRow} />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ width: "100%", flexGrow: 1 }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // InfiniteRow
          rowBuffer={0}
          rowModelType={"infinite"}
          cacheBlockSize={30}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={150}
          maxBlocksInCache={5}
          onGridReady={onGridReady}
          // Editing
          editType={"fullRow"}
          suppressClickEdit={true}
          onCellClicked={(p) => onCellClickedActions(p, ShopsService, gridRef)}
          onRowEditingStarted={(params) => {
            params.api.refreshCells({
              columns: ["action"],
              rowNodes: [params.node],
              force: true,
            });
          }}
          onRowEditingStopped={(params) => {
            params.api.refreshCells({
              columns: ["action"],
              rowNodes: [params.node],
              force: true,
            });
          }}
          onRowValueChanged={(params) => {
            updateRow(params.data, ShopsService);
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};
