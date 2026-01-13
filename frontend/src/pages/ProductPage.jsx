import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from 'lucide-react'

function ProductPage() {
  const {currentProduct,formData,deleteProduct,setFormData,loading,error,fetchProduct,updateProduct}=useProductStore()
  const navigate=useNavigate()
  const {id}=useParams()
  const isDisabled = !formData.name || !formData.price || !formData.image || loading;

  useEffect(()=>{
    fetchProduct(id)
  },[fetchProduct,id])
  console.log("formData:",formData)

  const handleDelete=async()=>{
    if(window.confirm("Are you sure you want delete this product?"))
    await deleteProduct(id)
    navigate('/')
  }

  if(loading){
    return(
      <div className='flex items-center justify-center min-h-screen'>
        <div className='loading loading-spinner loading-lg'></div>
      </div>
    )
  }
   if(error){
    return(
      <div className='container px-4 py-8 mx-auto'>
        <div className='alert alert-error '>Something Went Wrong! , Try again</div>
      </div>
    )
  }
  return (
    <div className='container max-w-4xl px-4 py-8 mx-auto'>
    <button onClick={()=>navigate("/")} className='mb-8 btn btn-ghost'>
       <ArrowLeftIcon className='mr-2 size-4'/>
     Back to Product
    </button>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      <div className='overflow-hidden rounded-lg shadow-lg bg-base-100'>
        <img src={currentProduct?.image} alt={currentProduct?.name} className='object-cover w-full h-full ' />
      </div>

      <div className='shadow-lg card bg-base-100'>
        <div className='card-body'>
          <h2 className='mb-6 text-2xl card-title'>Edit Product</h2>
        
        <form onSubmit={(e)=>{
          e.preventDefault();
          updateProduct(id)
        }} className='space-y-6'>

          <div className='form-control'>
            <label htmlFor="" className='label'>
              <span className='text-base font-medium label-text'>Product Name</span>
            </label>
            <input
             type="text"
             placeholder='Enter product name'
             className='w-full pl-3 border border-gray-400 input input-bordered'
             value={formData.name}
             onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
          </div>
            <div className='form-control'>
            <label htmlFor="" className='label'>
              <span className='text-base font-medium label-text'>Price</span>
            </label>
            <input
             type="number"
             min="0"
             step="0.01"
             placeholder='0.00'
             className='w-full pl-3 border border-gray-400 input input-bordered'
             value={formData.price}
             onChange={(e)=>setFormData({...formData,price:e.target.value})}
            />
          </div>
            <div className='form-control'>
            <label htmlFor="" className='label'>
              <span className='text-base font-medium label-text'>Product Image</span>
            </label>
            <input
             type="text"
             placeholder='https://example.com/image.jpg'
             className='w-full pl-3 border border-gray-400 input input-bordered'
             value={formData.image}
             onChange={(e)=>setFormData({...formData,image:e.target.value})}
            />
          </div>
          <div className="modal-action">
             <form method="dialog">
                <button type="button" onClick={handleDelete} className="px-4 btn btn-error bg-error hover:bg-gray-800">
                  <Trash2Icon className='mr-2 size-4 '/>
                  Delete Product
                </button>
             </form>
             <button
             type="submit"
             disabled={isDisabled}
            className={`btn ${isDisabled?"bg-gray-900":"bg-primary"} btn-primary bg-primary px-4 min-w-[120px]`}

             >
                {loading?(
                    <span className="loading loading-spinner loading-sm"/>
                ):(
                    <>
                    <SaveIcon className="mr-2 size-5"/>
                    Save Changes
                    </>
                    
               )}
             </button>
            </div>
        </form>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ProductPage