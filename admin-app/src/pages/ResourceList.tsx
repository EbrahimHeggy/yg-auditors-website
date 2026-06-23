import { List, useTable, EditButton, DeleteButton, CreateButton } from '@refinedev/antd';
import { Table, Space } from 'antd';

function summarize(record: Record<string, unknown>): string {
  const candidate = record.title ?? record.badge ?? record.name ?? record.id;
  return typeof candidate === 'string' ? candidate : String(candidate ?? '');
}

export function ResourceList() {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List headerButtons={<CreateButton />}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column title="Summary" render={(_, record) => summarize(record)} />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id as string} />
              <DeleteButton hideText size="small" recordItemId={record.id as string} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
