import { Col, Row, Text } from "@dataesr/dsfr-plus";
import { useEffect, useState } from "react";

import "./style.scss";

export default function DataTable({ aggregations, columns, dataTable, filters, numberOfResults, pagination, setFilters, setPagination, setSorting, sorting }) {
  const inputsTmp = {}
  filters.forEach((filter) => {
    inputsTmp[filter.id] = filter.value
  });
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
      let icon = <i className="ri-arrow-up-down-fill" />
      if ((id === sorting?.id) && (sorting?.order === 'asc')) icon = <i className="ri-sort-asc" />
      if ((id === sorting?.id) && (sorting?.order === 'desc')) icon = <i className="ri-sort-desc" />
      return (
        <button
          className="fr-btn fundings-datatable_filter"
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
      const { [column.id]: _, ...rest } = inputs as any;
      setInputs(rest);
    } else {
      setInputs({ ...inputs, [column.id]: event.target.value });
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(Object.keys(inputs).map((id) => ({ id, value: inputs[id] })).filter((filter) => filter.value.length > 0))
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputs]);

  return (
    <>
      <div className="fr-table fr-table--sm fr-table--multiline fundings-datatable">
        <div className="fr-table__wrapper">
          <div className="fr-table__container">
            <div className="fr-table__content">
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => {
                      return (
                        <th key={column.id} scope="col">
                          {column.isPlaceholder ? null : (
                            <>
                              <div className="fundings-datatable__header">
                                {column?.label ?? column.id}
                                {' '}
                                {column?.isFilterable}
                                {' '}
                                {getSortableIcon(column)}
                              </div>
                              <div>
                                {column?.isFilterable && (
                                  column?.isFilterableBySelect && aggregations?.[column.id] ? (
                                    <select
                                      className="fr-select fundings-datatable__select"
                                      id={`fundings-structure-data-${column.id}`}
                                      name={`fundings-structure-data-${column.id}`}
                                      onChange={(event) => handleFilter(column, event)}
                                      value={inputs[column.id]}
                                    >
                                      <option key='all' value=''>
                                        Tout
                                      </option>
                                      {(aggregations?.[column.id]?.buckets ?? []).map((bucket) => (
                                        <option key={bucket.key} value={bucket.key}>
                                          {getLabelByBucketKey(bucket.key.toString())} ({bucket.doc_count})
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      className="fr-input fundings-datatable__input"
                                      onChange={(event) => handleFilter(column, event)}
                                      type="text"
                                      value={inputs[column.id]}
                                    />
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataTable.map((row) => (
                    <tr key={row.uniqId}>
                      {columns.map((column) => (
                        <td key={`${column.id}-${row.id}`}>
                          {column.getCellValue ? column.getCellValue(row) : row?.[column?.id]}
                        </td>
                      ))}
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
          <div className="fundings-datatable__page-size">
            <select
              className="fr-select"
              onChange={(e) => setPagination({ from: 0, size: Number(e.target.value) })}
              value={pagination.size}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
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