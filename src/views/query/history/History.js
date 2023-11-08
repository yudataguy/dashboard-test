import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CRow,
  CForm,
  CFormTextarea,
  CTable,
  CButton,
} from '@coreui/react'

const QueryHistory = () => {
  const detailColumns = [
    {
      key: 'query',
      label: 'Query',
      _props: { scope: 'col' },
    },
    {
      key: 'column',
      label: 'Column',
      _props: { scope: 'col' },
    },
    {
      key: 'value',
      label: 'Content',
      _props: { scope: 'col' },
    },
    {
      key: 'full_value',
      label: 'Full Content',
      _props: { scope: 'col' },
    },
    {
      key: 'score',
      label: 'Score',
      _props: { scope: 'col' },
    },
  ]

  const baseUrl = '/api'

  const [result, setResult] = useState(null)
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch(`${baseUrl}/test_query_history?page=${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const result = JSON.parse(decodeURIComponent(escape(data['result']))) // convert result to JSON object and ensure it's in UTF-8 format
        setTotalRows(data['total'])
        console.log(result)
        setResult(result)
      } catch (error) {
        console.log(error)
      }
    }

    loadHistory()
  }, [page])

  return (
    <CRow>
      <h1>Query Test History</h1>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>History</strong>
          </CCardHeader>
          <CCardBody>
            <CTable columns={detailColumns} items={result} hover striped bordered size="sm" />
          </CCardBody>
          <div className="mb-3 button-group spaced-buttons flex justify-between">
            <CButton
              component="input"
              type="button"
              color="primary"
              value="PREVIOUS"
              className="mr-4"
              style={{ marginRight: '12px' }}
              onClick={() => setPage(page === 1 ? 1 : page - 1)}
              disabled={page === 1}
            />
            <CButton
              component="input"
              type="button"
              color="primary"
              value="NEXT"
              className="mr-4"
              onClick={() => setPage(page === totalRows ? totalRows : page + 1)}
              disabled={page === totalRows}
            />
          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default QueryHistory
