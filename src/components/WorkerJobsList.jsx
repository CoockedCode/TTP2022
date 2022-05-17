import { useState } from 'react'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

const WorkerJobsList = () => {

  const [value, setvalue] = useState('')

  const  handleOnchange  =  val  => {
    setvalue(val)
  }

  const  options  = [
    { label:  'Tööline', value:  'Tööline'  },
    { label:  'Käsitleja ', value:  'Käsitleja'  },
    { label:  'Katsetaja ', value:  'Katsetaja'  },
    { label:  'Raamatupidaja', value:  'Raamatupidaja'  },
    { label:  'Omanik', value:  'Omanik'  },
  ]

  return(
    <div className="drop-down-select">
      <div  className="drop-down-preview-values">
    	Tööaja roll(id): {value}
      </div>

      <MultiSelect
        onChange={handleOnchange}
        options={options}
      />
    </div>
)}
export default WorkerJobsList