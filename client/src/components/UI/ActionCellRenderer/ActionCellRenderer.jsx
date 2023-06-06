import styles from './ActionCellRenderer.module.scss'

export const ActionCellRenderer = (params) => {
  const editingCells = params.api.getEditingCells();
  
  const isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  return (
    <div className={styles.wrapper}>
      {isCurrentRowEditing ? (
        <>
          <button className={styles.update} name="update">обновить</button>
          <button className={styles.cancel} name="cancel">отмена</button>
        </>
      ) : (
        <>
          <button className={styles.edit} name="edit">изменить</button>
          <button className={styles.delete} name="delete">удалить</button>
        </>
      )}
    </div>
  );
};