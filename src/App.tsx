import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Card, FloatButton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RowList from './components/RowList';
import { Operation } from './common/enum/Operation';
import { RowDataModal } from './modals/RowDataModal';
import { DropdownOption } from './modals/Interface/DropdownOption';

const App: React.FC = () => {

  // State to manage the list of data and the calculated result.
  const [data, setData] = useState<Array<RowDataModal>>([]);
  // State to hold the calculated result.
  const [result, setResult] = useState<number>(0);

  /**
   * Effect hook to recalculate the result whenever the data changes.
   * @param {Array<RowDataModal>} data - The data to monitor for changes.
   */
  useEffect(() => {
    calculateAndSetResult(data);
  }, [data]);

  /**
   * Function to add a new row to the data list.
   */
  const addRow = (): void => {
    setData([...data, new RowDataModal({})]);
  }

  /**
   * Function to remove a row from the data list.
   * @param {number} index - The index of the row to remove.
   */
  const handleRemoveRow = (index: number): void => {
    setData((data) => {
      return [...data].filter(( _ , i) => i !== index )
    })
  };

  /**
   * Function to toggle the visibility of a row.
   * @param {number} index - The index of the row to change visibility.
   */
  const setRowVisibility = (index: number): void => {
    const updatedRows: Array<RowDataModal> = [...data].map((e: RowDataModal, i: number): RowDataModal => {
      return i === index ? { ...e, isVisible: !e.isVisible } : e;
    });
    setData(updatedRows);
  }

  /**
   * Function to handle changes in the value of a row.
   * @param {number | null} value - The new value for the row.
   * @param {number} index - The index of the row to update.
   */
  const handleChange = (value: number | null, index: number) : void => {
    setData((prevData) => {
      const updatedRows = [...prevData];
      updatedRows[index].value = value;
      return updatedRows;
    });
  }

  /**
   * Function to handle changes in the operation type of a row.
   * @param {string} value - The new operation value for the row.
   * @param {number} index - The index of the row to update.
   */
  const handleOperationChange = (value: string, index: number) : void => {
    setData((prevData) => {
      const updatedRows = [...prevData];
      updatedRows[index].operation = value as Operation;
      return updatedRows;
    });
  }

  /**
   * Function to calculate and set the overall result based on the data list.
   * @param {Array<RowDataModal>} updatedRows - The updated list of data rows.
   */
  const calculateAndSetResult = (updatedRows: Array<RowDataModal>) => {
    const result = updatedRows.reduce((total: number, row: RowDataModal) : number => {
      if (!row.value || !row.isVisible) return total;

      switch (row.operation) {
        case Operation.Plus:
          return total + row.value;
        case Operation.Minus:
          return total - row.value;
        default:
          return total
      }
    }, 0);
    setResult(result)
  }

  /**
   * Generate options for the dropdown based on the 'Operation' enum.
   * @type {Array<DropdownOption>}
   */
  const options: Array<DropdownOption> = Object.values(Operation).map((e : string) : DropdownOption => ({ "value": e, "label": e }));

  /**
   * Render the main application component.
   * @returns {JSX.Element} - The JSX element representing the entire application.
   */
  return (
    <div data-testid="test-1" className="card-container">
      <Typography.Title level={2}>Calculator App</Typography.Title>
      <Card data-testid="calculator-card" className="card">
        <FloatButton data-testid="add-row-btn" className="float-button" onClick={() => addRow()} icon={<PlusOutlined />}/>
        <Card>
          <span data-testid="result-span" className="result-text">{result}</span>
        </Card>
        <RowList data={data} handleChange={handleChange} handleOperationChange={handleOperationChange} setRowVisibility={setRowVisibility} handleRemoveRow={handleRemoveRow} options={options} />
      </Card>
    </div>
  );
};

export default App;