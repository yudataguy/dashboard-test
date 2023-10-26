import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CRow,
  CForm,
  CFormTextarea,
  CButton,
} from '@coreui/react'

const PromptEngineering = () => {
  return (
    <CRow>
      <h1>Query Test History</h1>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>History</strong>
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detail</strong>
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PromptEngineering
