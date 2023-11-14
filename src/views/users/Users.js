import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CButton } from '@coreui/react'

const ChecksRadios = () => {
  const columns = [
    {
      key: 'timestamp',
      label: 'Date',
      _props: { scope: 'col' },
    },
    {
      key: 'query',
      label: 'Query',
      _props: { scope: 'col' },
    },
    {
      key: 'response',
      label: 'Response',
      _props: { scope: 'col' },
    },
    {
      key: 'thumb_up',
      label: 'Positive',
      _props: { scope: 'col' },
    },
  ]

  const [result, setResult] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    fetch(`/user_queries_list?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => setResult(data['data']))
      .catch((error) => console.log(error))
  }, [pageNumber]) // add pageNumber as a dependency

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  return (
    <CRow>
      <CRow>
        <h1>User Queries</h1>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Queries</CCardHeader>
            <CCardBody>
              <CTable columns={columns} items={result} hover striped bordered size="sm" />
              <CRow className="mt-3">
                <CCol>
                  <CButton
                    color="primary"
                    disabled={pageNumber === 1}
                    onClick={handlePreviousPage}
                    style={{ marginRight: '12px' }}
                  >
                    Previous
                  </CButton>
                  <CButton color="primary" onClick={handleNextPage}>
                    Next
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Detail</CCardHeader>
            <CCardBody></CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default ChecksRadios
