import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilGolf,
  cilWc,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilAvTimer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Prompts',
  },
  {
    component: CNavItem,
    name: 'Playground',
    to: '/prompts',
    icon: <CIcon icon={cilGolf} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Retrieval',
  },
  {
    component: CNavItem,
    name: 'Test',
    to: '/query/submit',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History',
    to: '/query/history',
    icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavItem,
    name: 'Queries',
    to: '/users',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
  },
]

export default _nav
