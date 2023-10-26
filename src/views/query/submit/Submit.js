import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormTextarea,
  CButton,
} from '@coreui/react'

const ChecksRadios = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Query Test</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormTextarea
                  id="System Prompt"
                  label="Instruction for LLM"
                  rows={3}
                  text="System Instruction (Default Loaded)"
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormTextarea id="Query" label="Query" rows={3} text="User Input"></CFormTextarea>
              </div>
              <div className="mb-3 button-group spaced-buttons flex justify-between">
                <CButton
                  component="input"
                  type="button"
                  color="primary"
                  value="Submit"
                  className="mr-4"
                  style={{ marginRight: '12px' }}
                />
                <CButton component="input" type="button" color="warning" value="Set as Default" />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <strong>Result</strong>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChecksRadios
