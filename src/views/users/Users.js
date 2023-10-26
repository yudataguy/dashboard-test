import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormCheck, CFormSwitch, CRow } from '@coreui/react'

const ChecksRadios = () => {
  return (
    <CRow>
      <CRow>
        <h1>User Queries</h1>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Queries</CCardHeader>
            <CCardBody></CCardBody>
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
