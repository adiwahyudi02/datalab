import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Flex,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from 'react-icons/io';
import { useVirtual } from 'react-virtual';

const borderTable = '1px solid lightgray';

interface IMeasurementTextProps<T extends object> {
  cell: Cell<T, unknown>;
  isResizing: number | null;
}

const MeasurementText = <T extends object>({ cell, isResizing }: IMeasurementTextProps<T>) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const [textWidth, setTextWidth] = useState(0);
  const [cellWidth, setCellWidth] = useState(0);
  const [isExpanded, setisExpanded] = useState(false);

  const getTextWidthInPixels = (ref: HTMLSpanElement) =>
    ref.getBoundingClientRect().width;

  const getCellWidthInPixels = (ref: HTMLTableCellElement) =>
    ref.getBoundingClientRect().width;

  const expandIconWidth = 24;
  const isOverflow = useMemo(() => Number(cellWidth) < Number(textWidth) + expandIconWidth, [textWidth, cellWidth]);

  useEffect(() => {
    setTextWidth(getTextWidthInPixels(textRef.current!));
    setCellWidth(getCellWidthInPixels(cellRef.current!));
  }, [textRef, cellRef, isResizing]);

  return (
    <td
      ref={cellRef}
      key={cell.id}
      style={{
        padding: '6px',
        borderBottom: borderTable,
        borderRight: borderTable,
      }}
    >
      <Flex
        align="center"
        style={{ justifyContent: cell.column.columnDef.meta?.style.textAlign }}
        data-testid={`td-align-text-${cell.column.id}`}
      >
        <span
          ref={textRef}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...(isExpanded && {
              whiteSpace: 'normal',
              overflow: 'visible',
              textOverflow: 'clip',
              overflowWrap: 'anywhere',
            })
          }}
        >
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </span>
        {!!textWidth && !!cellWidth && isOverflow && (
          <Icon
            as={isExpanded ? IoIosArrowDropdownCircle : IoIosArrowDroprightCircle}
            float="right"
            color="gray.400"
            fontSize="xl"
            cursor="pointer"
            onClick={() => setisExpanded(!isExpanded)}
          />
        )}
      </Flex>
    </td>
  )
}

interface ITableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  maxWidth: string;
  maxHeight: string;
  overscan?: number;
  estimateSize?: number;
  isLoading?: boolean;
}

export function Table<T extends object>({
  columns,
  data,
  maxWidth,
  maxHeight,
  overscan = 15,
  estimateSize = 33,
  isLoading = false,
}: ITableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  })

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    estimateSize: useCallback(() => estimateSize, []),
    overscan,
  });

  const { virtualItems, totalSize } = rowVirtualizer

  const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
      : 0

  return (
    <div
      ref={tableContainerRef}
      style={{
        maxHeight,
        maxWidth,
        overflow: 'auto',
        border: borderTable,
      }}
      data-testid="table"
    >
      {/* loading */}
      {isLoading ? (
        <Stack
          p={2}
          data-testid="loading-table"
        >
          {Array.from(Array(10).keys()).map(id => (
            <Skeleton
              key={id}
              height={`${estimateSize}px`}
            />
          ))}
        </Stack>
      ) : (
        <div style={{ height: `${totalSize}px` }}>
          <table
            style={{
              borderCollapse: 'collapse',
              borderSpacing: 0,
              fontFamily: 'monospace',
              tableLayout: 'fixed',
              width: '100%',
            }}
          >
            <thead
              style={{
                background: 'ghostwhite',
                margin: 0,
                position: 'sticky',
                top: '-1px',
                zIndex: 10,
              }}
            >
              {/* header */}
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize(),
                          position: 'relative',
                          borderBottom: borderTable,
                          borderRight: borderTable,
                          padding: '2px 4px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}

                        {/* resizer */}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            style={{
                              position: 'absolute',
                              right: '4px',
                              top: 0,
                              cursor: 'col-resize',
                              userSelect: 'none',
                              touchAction: 'none',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                            }}
                            data-testid={`resizer-${header.id}`}
                          >
                            {Array.from(Array(2).keys()).map(id => (
                              <div
                                key={id}
                                style={{
                                  height: '80%',
                                  width: '3px',
                                  background: 'lightgray',
                                  ...(header.column.getIsResizing() && {
                                    background: 'gray',
                                  }),
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}

              {/* virtual list */}
              {virtualItems.map(virtualRow => {
                const row = rows[virtualRow.index]
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <MeasurementText
                        key={cell.id}
                        cell={cell}
                        isResizing={table.getState().columnSizingInfo.startOffset}
                      />
                    ))}
                  </tr>
                )
              })}

              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}