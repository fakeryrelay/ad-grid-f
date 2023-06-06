const deleteRow = async (id, service) => {
  try {
    const res = await service.delete(+id)

    return res
  } catch (error) {
    console.log(error);
  }
};

export const updateRow = async (data, service) => {
  const { id, ...body } = data
  console.log(body)
  
  try {
    const res = await service.update(id, body)
    return res
  } catch (error) {
    console.log('error', error);
  }
}

// TODO: try/catch

export const onCellClickedActions = async (params, service, gridRef) => {
  if (!params.column.colId === "action" || !params.event.target.name) return;
  const action = params.event.target.name;

  if (action === "edit") {
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      colKey: params.columnApi.getDisplayedCenterColumns()[0].colId,
    });
  }

  if (action === "delete") {
    const res = await deleteRow(params.data.id, service)

    if (res) {
      gridRef.current.api.refreshInfiniteCache();
    }
  }

  if (action === "update") {
    params.api.stopEditing(false);
    
    const data = params.data
    await updateRow(data, service)
  }

  if (action === "cancel") {
    params.api.stopEditing(true);
  }
};