import { useState } from "react";
import styles from "./CreateRow.module.scss";
import { useEffect } from "react";

export const CreateRow = ({ params = [], createFunction }) => {
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    const startRowData = {};
    
    for (const param of params) {
      if (param.el === "select") {
        startRowData[param.name] = param.data[0].id;
        continue;
      }
      startRowData[param.name] = undefined;
    }
    
    setRowData(startRowData);
  }, [params]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {rowData.length === 0 ? null : (
        <form
          className={styles.wrapper}
          onSubmit={(e) => {
            e.preventDefault();
            createFunction(rowData);
            setRowData({});
          }}
        >
          {params.map((param) => {
            if (param.el === "input" || param.el === undefined) {
              return (
                <input
                  key={param?.name}
                  value={rowData[param.name] || ""}
                  {...param}
                  onChange={onChange}
                  autoComplete="off"
                />
              );
            } else if (param.el === "select") {
              return (
                <select key={param?.name} name={param.name} onChange={onChange}>
                  {param.data.map((item) => (
                    <option key={`option ${item.name}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              );
            } else {
              return <></>;
            }
          })}

          <button>Добавить</button>
        </form>
      )}
    </>
  );
};
