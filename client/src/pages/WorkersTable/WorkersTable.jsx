import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom/dist";
import IntegerEditor from "../../utils/editors/IntegerEditor";
import { CreateRow } from "../../components/UI/CreateRow/CreateRow";
import { ActionCellRenderer } from "../../components/UI/ActionCellRenderer/ActionCellRenderer";
import {
  onCellClickedActions,
  updateRow,
} from "../../utils/ad-grid/onCellClickedActions";
import WorkersService from "../../services/workers.service";
import NumericEditor from "../../utils/editors/NumericEditor";
import DateEditor from "../../utils/editors/DateEditor";
import { createParamsSingle } from "./WorkersTableSingle.data";
import { createParamsAll } from "./WorkersTableAll.data";

export const WorkersTable = () => {
  const gridRef = useRef();
  const { id } = useParams();

  const [createParams, setCreateParams] = useState([])
  const [columnDefs] = useState([
    { field: "name", headerName: "Фамилия Имя" },
    { field: "salary", cellEditor: NumericEditor, headerName: "Зарплата" },
    {
      field: "hire_date",
      cellEditor: DateEditor,
      headerName: "Дата устройства",
    },
    {
      field: "performance",
      cellEditor: IntegerEditor,
      headerName: "Производительность",
    },
    {
      field: "action",
      headerName: "Удалить",
      editable: "false",
      cellRenderer: ActionCellRenderer,
      maxWidth: 190,
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

  useEffect(() => {
    const getCreateParams = async () => {
      if (id !== 'all') {
        setCreateParams(createParamsSingle)
        return
      }
      const res = await createParamsAll()
      setCreateParams(res)
    }

    getCreateParams()
  }, [])

  const addItem = useCallback(() => {
    const maxRowFound = gridRef.current.api.isLastRowIndexKnown();
    if (maxRowFound) {
      const rowCount = gridRef.current.api.getInfiniteRowCount() || 0;
      gridRef.current.api.setRowCount(rowCount);
    }
    gridRef.current.api.refreshInfiniteCache();
  }, []);

  const getData = async (params) => {
    let result;

    if (id === 'all') {
      const { data } = await WorkersService.getAll(params);
      result = data;
    } else {
      const { data } = await WorkersService.getByShopId(id, params);
      result = data;
    }

    return result;
  };

  const createRow = async (body) => {
    let shopId = id ? id : body.shop_id 
    const data = {
      ...body,
      shop_id: shopId
    };
    try {
      const res = await WorkersService.create(data);

      addItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onGridReady = useCallback(async (params) => {
    const dataSource = {
      rowCount: undefined,
      getRows: async (params) => {
        const limit = params.endRow - params.startRow;
        const offset = params.startRow;
        const reqParams = {
          offset: offset,
          limit: limit,
        };

        const rowsThisPage = await getData(reqParams);

        let lastRow = -1;
        if (rowsThisPage.length < limit) {
          lastRow = params.startRow + rowsThisPage.length;
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
        maxHeight: "100%",
      }}
    >
      <div>
        <CreateRow params={createParams} createFunction={createRow} />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ width: "100%", flexGrow: 1, flex: "1 1 0px" }}
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
          onCellClicked={(p) =>
            onCellClickedActions(p, WorkersService, gridRef)
          }
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
            updateRow(params.data, WorkersService);
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};
