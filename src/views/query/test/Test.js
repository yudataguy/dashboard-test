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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/test_query`, {
        method: 'POST',
        mode: 'cors',
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
      const result = data['result']['hits']['hits']

      console.log(result)

      const newList = result.map((item) => ({
        value: item._source.value,
        column: item._source.element_ja,
        full_value: item._source.value_full_ja,
        score: item._score,
      }))

      // console.log(newList)

      setResult(newList)
      setSubmittedQuery(query)
      setQuery('')
    } catch (error) {
      console.error('Fetch Error:', error)
    }
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
