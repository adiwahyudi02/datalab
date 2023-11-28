import { fireEvent, render, screen } from '@testing-library/react';
import { Table } from '../Table';
import { ColumnDef } from '@tanstack/react-table';

type TDummy = {
  id: number;
  name: string;
}

const columns: ColumnDef<TDummy>[] = [
  {
    header: 'id',
    accessorKey: 'id',
    meta: {
      style: {
        textAlign: 'right',
      },
    },
  },
  {
    header: 'name',
    accessorKey: 'name',
  },
];

const data: TDummy[] = [
  { id: 1, name: 'Adi' },
  { id: 2, name: 'Sally' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Allice' },
  { id: 5, name: 'Walter' },
  { id: 6, name: 'Smith' },
  { id: 7, name: 'Bloggs' },
  { id: 8, name: 'Black' },
  { id: 9, name: 'White' },
  { id: 10, name: 'Orange' },
];

const estimateSize = 33;

describe('Table', () => {
  describe('If loading is true', () => {
    beforeEach(() => {
      render(
        <Table
          columns={columns}
          data={data}
          maxWidth="100%"
          // with these height and overscan, it will only show 2 rows
          maxHeight="200px"
          overscan={1}
          estimateSize={estimateSize}
          isLoading
        />
      );
    });

    it('Sholud render loading component', () => {
      const loading = screen.getByTestId('loading-table');
      expect(loading).toBeInTheDocument();
    });
  });

  describe('If data available and loading is false', () => {
    beforeEach(() => {
      render(
        <Table
          columns={columns}
          data={data}
          maxWidth="100%"
          // with these height and overscan, it will only show 2 rows
          maxHeight="200px"
          overscan={1}
          estimateSize={estimateSize}
        />
      );
    });

    it('Should render columns and resizer correctly', () => {
      columns.forEach(column => {
        expect(screen.getByText(column.header as string)).toBeInTheDocument();
        // @ts-ignore: Unreachable code error
        expect(screen.getByTestId(`resizer-${column.accessorKey}`)).toBeInTheDocument();
      });
    });

    it('Should have justify style if column have meta textalign provided', () => {
      columns.forEach(column => {
        if (column.meta?.style.textAlign as string) {
          // @ts-ignore: Unreachable code error
          const getAllTd = screen.getAllByTestId(`td-align-text-${column.accessorKey}`)
          getAllTd.forEach(td => {
            expect(td).toHaveStyle(`justify-content: ${column.meta?.style.textAlign}`);
          });
        }
      });
    });

    it('Should render only the first 2 rows on the first render', () => {
      data.slice(0, 2).forEach(val => {
        expect(screen.queryByText(val.name)).toBeInTheDocument();
      });
    });

    it('If scolling the table, it should render next rows', () => {
      fireEvent.scroll(screen.getByTestId('table'), { target: { scrollTop: estimateSize * 2 } });

      // get 2 next rows + 1 overscan
      data.slice(1, 4).forEach(val => {
        expect(screen.queryByText(val.name)).toBeInTheDocument();
      });
    });

    it('If scolling the table, unmount the rows before', () => {
      fireEvent.scroll(screen.getByTestId('table'), { target: { scrollTop: estimateSize * 2 } });

      // first 2 rows - 1 overscan
      data.slice(0, 1).forEach(val => {
        expect(screen.queryByText(val.name)).not.toBeInTheDocument();
      });
    });
  });
});