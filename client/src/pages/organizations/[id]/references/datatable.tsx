import { Button, Col, Row, Text } from "@dataesr/dsfr-plus";
import { useEffect, useState } from "react";

import { type Column, type Filter, type Pagination, type Sort } from "./index";

import "./style.scss";

export default function DataTable(
  { aggregations, columns, dataTable, filters, numberOfResults, pagination, setFilters, setPagination, setSorting, sorting }
    : { aggregations: any, columns: Column[], dataTable: any[], filters: Filter[], numberOfResults: number, pagination: Pagination, setFilters: any, setPagination: any, setSorting: any, sorting: Sort }
) {
  const inputsTmp = {}
  filters.forEach((filter) => {
    inputsTmp[filter.id] = filter.value
  })
  const [inputs, setInputs] = useState(inputsTmp)

  const getLabelByBucketKey = (key: string) => {
    switch (key) {
      case '1':
        return 'Oui'
      case '0':
        return 'Non'
      default:
        return key
    }
  }

  const getSortableIcon = (column) => {
    if (column.isSortable) {
      const id = column?.sortableField ?? column.id
      let icon = <span className="fr-icon-arrow-up-down-fill" />
      if ((id === sorting?.id) && (sorting?.order === 'asc')) icon = <span className="fr-icon-sort-asc" />
      if ((id === sorting?.id) && (sorting?.order === 'desc')) icon = <span className="fr-icon-sort-desc" />
      return (
        <button
          className="fr-btn fr-btn--secondary references-datatable_filter fr-ml-1w"
          onClick={() => handleSort(column)}
        >
          {icon}
        </button>
      )
    }
    return ''
  }

  const handleSort = (column) => {
    if (column.isSortable) {
      const id = column?.sortableField ?? column.id;
      if (id === sorting?.id) {
        if (sorting.order === 'asc') {
          setSorting({ id, order: 'desc' })
        } else {
          setSorting()
        }
      } else {
        setSorting({ id, order: 'asc' })
      }
    }
  }

  const handleFilter = (column, event) => {
    if (event.target.value === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [column.id]: _, ...rest } = inputs as any;
      setInputs(rest);
    } else {
      setInputs({ ...inputs, [column.id]: event.target.value });
    }
  }

  const ColumnHeader = ({ column }: { column: Column }) => {
    return (
      <>
        <div className="references-datatable__header">
          {column?.label ?? column.id}
          {' '}
          {getSortableIcon(column)}
        </div>
        <div>
          {column?.isFilterable && (
            column?.filterType === 'select' && aggregations?.[column.id] ? (
              <select
                className="fr-select references-datatable__select"
                id={`references-structure-data-${column.id}`}
                name={`references-structure-data-${column.id}`}
                onChange={(event) => handleFilter(column, event)}
                value={inputs[column.id]}
              >
                <option key='all' value=''>
                  Tout ({numberOfResults})
                </option>
                {(aggregations?.[column.id]?.buckets ?? []).map((bucket) => (
                  <option key={`aggs-${column.id}-${bucket.key}`} value={bucket.key}>
                    {getLabelByBucketKey(bucket.key.toString())} ({bucket.doc_count})
                  </option>
                ))}
              </select>
            ) : (
              column.filterType === 'missing' ? (
                Object.keys(inputs).includes(column.id) ? (
                  <Button
                    className="fr-button fr-btn--secondary fr-btn--sm"
                    onClick={(event) => handleFilter(column, event)}
                    value=""
                  >
                    Restaurer toutes les structures
                  </Button>
                ) : (
                  <Button
                    className="fr-button fr-btn--secondary fr-btn--sm"
                    onClick={(event) => handleFilter(column, event)}
                    value="missing"
                  >
                    {column.label} manquants
                  </Button>
                )
              ) : (
                <input
                  className="fr-input references-datatable__input"
                  onChange={(event) => handleFilter(column, event)}
                  type="text"
                  value={inputs[column.id]}
                />
              )
            )
          )}
        </div>
      </>
    )
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(Object.keys(inputs).map((id) => ({ id, value: inputs[id] })))
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputs, setFilters])

  const columnHasGroups = columns.some((column) => column?.groups)

  return (
    <>
      <div className="fr-table fr-table--sm fr-table--multiline references-datatable">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <thead>
                  <tr>
                    {columns.filter((column) => column?.isDisplayed ?? true).map((column) => {
                      return (
                        <th colSpan={columnHasGroups && column?.groups ? column.groups.length : 1} key={column.id} rowSpan={columnHasGroups && column?.groups ? 1 : 2} scope="col" style={{ width: column?.width }}>
                          <ColumnHeader column={column} />
                        </th>
                      )
                    })}
                  </tr>
                  <tr>
                    {columns.filter((column) => column?.isDisplayed ?? true).map((column) => column?.groups ?? []).flat().filter((column) => column?.isDisplayed ?? true).map((column) => {
                      return (
                        <th key={column.id} scope="col" style={{ width: column?.width }}>
                          <ColumnHeader column={column} />
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataTable && dataTable.map((row) => (
                    <tr key={`datatable-row-${row.id}`}>
                      {columns.filter((column) => column?.isDisplayed ?? true).map((column) => {
                        if ((column?.groups ?? []).length > 0) {
                          return column.groups.filter((column) => column?.isDisplayed ?? true).map((group) => (
                            <td key={`datatable-cell-${group.id}-${row.id}`} className={group?.getClassName ? group.getClassName(row) : ''}>
                              {group.getCellValue ? group.getCellValue(row) : <span title={row?.[group?.id]}>{row?.[group?.id]}</span>}
                            </td>
                          ))
                        } else {
                          return (
                            <td key={`datatable-cell-${column.id}-${row.id}`} className={column?.getClassName ? column.getClassName(row) : ''}>
                              {column.getCellValue ? column.getCellValue(row) : <span title={row?.[column?.id]}>{row?.[column?.id]}</span>}
                            </td>
                          )
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Row className="fr-mt-1w">
        <Col>
          <div className="references-datatable__page-size">
            <select
              className="fr-select"
              onChange={(e) => setPagination({ from: 0, size: Number(e.target.value) })}
              value={pagination.size}
            >
              {[100, 300, 500].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            résultats par page
          </div>
        </Col>
        <Col>
          <nav role="navigation" className="fr-pagination" aria-label="Pagination">
            <ul className="fr-pagination__list">
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--first"
                  disabled={pagination.from === 0}
                  onClick={() => setPagination({ ...pagination, from: 0 })}
                  title="Première page"
                >
                  Première page
                </button>
              </li>
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
                  disabled={pagination.from === 0}
                  onClick={() => setPagination({ ...pagination, from: pagination.from - pagination.size })}
                  title="Page précédente"
                >
                  Page précédente
                </button>
              </li>
              <li>
                <a className="fr-pagination__link" aria-current="page">
                  {(pagination.from / pagination.size) + 1}
                </a>
              </li>
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
                  disabled={(pagination.from / pagination.size) + 1 === Math.ceil(numberOfResults / pagination.size)}
                  onClick={() => setPagination({ ...pagination, from: pagination.from + pagination.size })}
                  title="Page suivante"
                >
                  Page suivante
                </button>
              </li>
              <li>
                <button
                  className="fr-pagination__link fr-pagination__link--last"
                  disabled={(pagination.from / pagination.size) + 1 === Math.ceil(numberOfResults / pagination.size)}
                  onClick={() => setPagination({ ...pagination, from: Math.floor(numberOfResults / pagination.size) * pagination.size })}
                  title="Dernière page"
                >
                  Dernière page
                </button>
              </li>
            </ul>
          </nav>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Text className="fr-text--sm fr-mb-0">
            Résultats {pagination.from + 1} - {Math.min(pagination.from + pagination.size, numberOfResults)} / {numberOfResults}
          </Text>
        </Col>
      </Row>
    </>
  )
}