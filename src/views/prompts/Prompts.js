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

const PromptEngineering = () => {
  const columns = [
    {
      key: 'prompt',
      label: 'Prompt',
      _props: { scope: 'col' },
    },
    {
      key: 'query',
      label: 'Query',
      _props: { scope: 'col' },
    },
    {
      key: 'result',
      label: 'Result',
      _props: { scope: 'col' },
    },
  ]

  const baseUrl = '/api'

  const [result, setResult] = useState(null)
  const [systemPrompt, setSystemPrompt] = useState('')
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState([])

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/prompt_engineering`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          systemPrompt: systemPrompt,
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
      const result = data['data']['response']
      setResult(result)
      setHistory([...history, { prompt: systemPrompt, query: query, result: result }])
    } catch (error) {
      console.error('Fetch Error:', error)
    }
  }

  return (
    <CRow>
      <h1>Prompt Engineering Playground</h1>
      <p>This is a playground for testing out the Prompt Engineering. It is a work in progress.</p>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Generation</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormTextarea
                  id="System Prompt"
                  label="Instruction for LLM"
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormTextarea
                  id="Query"
                  label="Query"
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></CFormTextarea>
              </div>
              <div className="mb-3 button-group spaced-buttons flex justify-between">
                <CButton
                  component="input"
                  type="button"
                  color="primary"
                  value="Submit"
                  onClick={handleSubmit}
                  className="mr-4"
                  style={{ marginRight: '12px' }}
                />
                <CButton
                  component="input"
                  type="button"
                  color="warning"
                  value="Set as Default"
                  disabled
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Result</strong>
          </CCardHeader>
          <CCardBody>{result && <p>{result}</p>}</CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>History</strong>
          </CCardHeader>
          <CCardBody>
            <CTable columns={columns} items={history} hover striped bordered size="sm" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PromptEngineering
