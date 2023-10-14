import { Operation } from "../common/enum/Operation";

export class RowDataModal {
  operation?: Operation;
  value: number | null;
  isVisible: boolean;

  constructor(obj: any) {
    this.operation = obj.operation || Operation.Plus;
    this.value = obj.value || 0;
    this.isVisible = obj.isVisible || true;
  }
}
