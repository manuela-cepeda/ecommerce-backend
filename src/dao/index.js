const persistence = "FILES";
let productsService;
let cartsService;
switch(persistence){
    //import dinamico
    case "MEMORY":
        const {default: MemProducts} = await import ('./MemoryDAO/Products.js');
        // const {default: MemCarts} = await import ('./MemoryDAO/Carts.js');
       productsService = new MemProducts();
    //    cartssService = new MemCarts();
        break;
    case "MONGO":
        const {default: MongoProducts} = await import ('./MongoDAO/Products.js');
        const {default: MongoCarts} = await import ('./MongoDAO/Carts.js');
        productsService = new MongoProducts();
        cartsService = new MongoCarts();
         break;
     case "FILES":
        const {default: FilesProducts} = await import ('./FilesDAO/Products.js');
        const {default: FilesCarts} = await import ('./FilesDAO/Carts.js');
        productsService = new FilesProducts();
        cartsService = new FilesCarts();
         break;
}


const services = {
    productsService,
    cartsService
}

export default services