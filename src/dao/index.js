const persistence = "MONGO";
let productsService;
let cartsService;
let userService;
switch(persistence){
    //import dinamico
    case "MEMORY":
        const {default: MemProducts} = await import ('./MemoryDAO/Products.js');
        const {default: MemCarts} = await import ('./MemoryDAO/Carts.js');
       productsService = new MemProducts();
       cartsService = new MemCarts();
        break;
    case "MONGO":
        const {default: MongoProducts} = await import ('./MongoDAO/Products.js');
        const {default: MongoCarts} = await import ('./MongoDAO/Carts.js');
        const {default: MongoUser} = await import ('./MongoDAO/User.js');
        productsService = new MongoProducts();
        cartsService = new MongoCarts();
        userService = new MongoUser();
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
    cartsService,
    userService
}

export default services