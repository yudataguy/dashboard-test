import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormTextarea,
  CButton,
  CTable,
  CSpinner,
} from '@coreui/react'

const ChecksRadios = () => {
  const columns = [
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
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/test_query`, {
        method: 'POST',
        // mode: 'cors',
        body: JSON.stringify({
          query: query,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      // console.log(data)
      const result = data['result']['list']

      // console.log(result)
      const processedQuery = data['result']['query']
      // console.log(processedQuery)

      setResult(result)
      setSubmittedQuery(processedQuery)
      setQuery('')
    } catch (error) {
      console.error('Fetch Error:', error)
    }
    setLoading(false)
  }

  return (
    <CRow>
      <h1>Retrieval Playground</h1>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormTextarea
                  id="Query"
                  label="Query"
                  rows={3}
                  text="Input Query for Testing"
                  onChange={(e) => setQuery(e.target.value)}
                ></CFormTextarea>
              </div>
              {loading ? (
                <CButton disabled>
                  <CSpinner component="span" size="sm" aria-hidden="true" /> Loading...
                </CButton>
              ) : (
                <div className="mb-3 button-group spaced-buttons flex justify-between">
                  <CButton
                    component="input"
                    type="button"
                    color="primary"
                    value="Submit"
                    className="mr-4"
                    onClick={handleSubmit}
                    style={{ marginRight: '12px' }}
                  />
                </div>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Query:</strong> {submittedQuery && JSON.stringify(submittedQuery)}
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={result} hover striped bordered size="sm" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChecksRadios
