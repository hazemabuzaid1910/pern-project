import { EditIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'

function ProductCard({product}) {
  const {deleteProduct} = useProductStore()
    
  return (
    <div className='transition-shadow duration-300 shadow-xl card bg-base-100 hover:shadow-2xl'>
      <figure className='relative pt-[56.25%]'>
        <img 
          src={product.image} 
          alt={product.name} 
          className='absolute top-0 left-0 object-cover w-full h-full'
        />
      </figure>
      <div className='card-body'>
        <h2 className='text-lg font-semibold card-title'>{product.name}</h2>
        <p className='text-2xl font-bold text-primary'>
          ${Number(product.price).toFixed(2)}
        </p>
        <div className='justify-end mt-4 card-actions'>
          <Link 
            to={`/product/${product.id}`} 
            className='btn btn-outline btn-info btn-sm'
          >
            <EditIcon className='size-4 text-info'/>
          </Link>
          <button
            className='btn btn-outline btn-error btn-sm' 
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className='size-4 text-error' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard