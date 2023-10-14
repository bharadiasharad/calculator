import { InputNumber, Select, Popconfirm } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Operation } from '../common/enum/Operation';
import { RowDataModal } from '../modals/RowDataModal';
import { DropdownOption } from '../modals/Interface/DropdownOption';

interface RowComponentProps {
  item: RowDataModal; // The data item for this row
  index: number; // The index of this row in the list
  handleChange: (value: number | null, index: number) => void; // Function to handle changes in the value of this row
  handleOperationChange: (value: string, index: number) => void; // Function to handle changes in the operation type of this row
  setRowVisibility: (index: number) => void; // Function to change the visibility of this row
  handleRemoveRow: (index: number) => void; // Function to remove this row
  options: Array<DropdownOption>; // List of options for the operation dropdown
}

// RowComponent is a functional component that renders a single row
const RowComponent: React.FC<RowComponentProps> = ({
  item,
  index,
  handleChange,
  handleOperationChange,
  setRowVisibility,
  handleRemoveRow,
  options,
}) => {
  return (
    <div className="space-compact">
      <InputNumber
        className="input-number"
        data-testid={`input-${index}`}
        value={item.value}
        min={0}
        defaultValue={0}
        onChange={(e) => handleChange(e, index)}
        disabled={!item.isVisible}
        addonBefore={
          <Select
            onChange={(e) => handleOperationChange(e, index)}
            defaultValue={Operation.Plus}
            disabled={!item.isVisible}
            options={options}
          />
        }
        />
      <div className="icon-button">
        {item.isVisible ? (
          <EyeOutlined className="eye-icon" onClick={() => setRowVisibility(index)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setRowVisibility(index)} />
        )}
      </div>
      <Popconfirm
        title="Delete the entry"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleRemoveRow(index)}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      >
        <DeleteOutlined data-testid={`delete-${index}`} alt='deleteButton' className="delete-button" />
      </Popconfirm>
    </div>
  );
};

export default RowComponent;
