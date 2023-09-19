import ventasModel from '../models/ventasModel.js'

export default class VentasManager{
    getVentas= ()=>{
        return ventasModel.find()
    }
    getVentaById=(pid)=>{
        return ventasModel.findById(pid)
    }

    getVentaTo= (param1,param2)=>{
        return ventasModel.find({[param1]:param2})
    }
    getVentaBy=(param1,param2)=>{
        return ventasModel.findOne({[param1]:param2})
    }

    createVenta=(venta)=>{
        return ventasModel.create(venta)
    }
    
    deleteVenta=(pid)=>{
        return ventasModel.findByIdAndDelete(pid)
    }
}