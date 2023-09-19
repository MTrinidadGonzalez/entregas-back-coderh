
export default class VentasService{
    constructor(dao){
        this.dao= dao
    }

    getVentas= ()=>{
        return this.dao.getVentas()
    }
    getVentaById=(pid)=>{
        return this.dao.getVentaById(pid)
    }

    getVentaTo= (param1,param2)=>{
        return this.dao.getVentaTo(param1,param2)
    }
    getVentaBy=(param1,param2)=>{
        return this.dao.getVentaBy(param1,param2)
    }

    createVenta=(venta)=>{
        return this.dao.createVenta(venta)
    }
    
    deleteVenta=(pid)=>{
        return this.dao.deleteVenta(pid)
    }
}