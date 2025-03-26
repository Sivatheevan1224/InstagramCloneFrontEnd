import React from 'react'
import SideBar from './SideBar'
import Feed from './Feed'
import Suggestions from './Suggestions'

function App() {
  return (
    <div className="d-flex vh-100">
      <div className="w-20"><SideBar/></div>
      <div className="w-50 "><Feed/></div>
      <div className="w-30"><Suggestions/></div>
    </div>
  )
}
/* w-25 w-50 w-75 w-100 */
export default App