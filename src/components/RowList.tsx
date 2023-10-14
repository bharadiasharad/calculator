import { List } from 'antd';
import RowComponent from './RowComponent';
import { RowDataModal } from '../modals/RowDataModal';
import { DropdownOption } from '../modals/Interface/DropdownOption';

interface RowListProps {
  data: RowDataModal[]; // The list of data items to be displayed as rows
  handleChange: (value: number | null, index: number) => void; // Function to handle changes in the value of a row
  handleOperationChange: (value: string, index: number) => void; // Function to handle changes in the operation type of a row
  setRowVisibility: (index: number) => void; // Function to change the visibility of a row
  handleRemoveRow: (index: number) => void; // Function to remove a row
  options: DropdownOption[]; // List of options for the operation dropdown
}

// RowList is a functional component that renders a list of rows
const RowList: React.FC<RowListProps> = ({ data, handleChange, handleOperationChange, setRowVisibility, handleRemoveRow, options }) => {
  return (
    <List
      className="list-container"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item data-testid={"row-" + index}>
          <RowComponent
            item={item}
            index={index}
            handleChange={handleChange}
            handleOperationChange={handleOperationChange}
            setRowVisibility={setRowVisibility}
            handleRemoveRow={handleRemoveRow}
            options={options}
          />
        </List.Item>
      )}
    />
  );
};

export default RowList;
