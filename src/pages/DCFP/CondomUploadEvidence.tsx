import React from 'react'
import CustomInput from '../../common/input'
import CustomDrag from '../../common/drag'
import CustomSelect from '../../common/select'
import { Button } from 'antd'

const CondomUploadEvidence = () => {


    return (
        <div className='h-[150vh]'>

            <div className="ml-[2.4rem] mt-[1rem]"><h1 className="text-justify">Condom Upload Evidence For Stores In Charge</h1></div>
            <div className='grid grid-cols-1 md:grid-cols-2 p-[1rem] mb-[3rem]  '>
                <div className="p-[2rem] space-y-4 ">
                    <CustomInput type='text' label='Condom Quantity' placeholder='Enter Quatity Recieved' />
                    <CustomDrag />
                    <Button>Upload</Button>
                </div>

                <div className='p-[2rem]  space-y-4'>
                    <CustomInput type='text' label='Condom Distributed' placeholder='Enter Quatity Distributed' />
                    <CustomDrag />
                    <CustomSelect label="Where To" name={undefined} options={[]} value={''} />
                    <Button>Upload</Button>
                </div>


            </div>


        </div>
    )
}

export default CondomUploadEvidence