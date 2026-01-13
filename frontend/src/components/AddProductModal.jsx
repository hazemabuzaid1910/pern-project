import React from "react";
import { useProductStore } from "../store/useProductStore";
import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData,loading } = useProductStore();
  const isDisabled = !formData.name || !formData.price || !formData.image || loading;

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        <form action="" method="dialog">
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Add New Product!</h3>
        <form action="" onSubmit={addProduct} className="mt-10 space-y-10">
          <div className="grid gap-6">
            <div className="space-y-1 form-control">
              <label htmlFor="" className="label">
                <span className="text-base font-medium label-text">
                  Product Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full py-3 pl-10 transition-colors duration-200 border border-gray-400 input focus:input-primary"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>             
               </div>

              {/** price input  */}
              <div className="space-y-1 form-control">
                <label htmlFor="" className="label">
                  <span className="text-base font-medium label-text">
                    Price
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <DollarSignIcon className="mr-2 size-5" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full py-3 pl-10 transition-colors duration-200 border border-gray-400 input focus:input-primary"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              {/**Product Image */}
              <div className="space-y-1 form-control">
                <label htmlFor="" className="label">
                  <span className="text-base font-medium label-text">
                    Image URL
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none text-base-content/50">
                    <ImageIcon className="size-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="w-full py-3 pl-10 transition-colors duration-200 border border-gray-400 input focus:input-primary"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/**MODAL ACTION */}
            <div className="modal-action">
             <form method="dialog">
                <button className="px-4 btn btn-ghost hover:bg-gray-800">Cancel</button>
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
                    <PlusCircleIcon className="mr-2 size-5"/>
                    Add Product
                    </>
                    
               )}
             </button>
            </div>
        </form>
      </div>
       <form  method="dialog" className="modal-backdrop">
            <button>Close</button>
           </form>
    </dialog>
  );
}

export default AddProductModal;
