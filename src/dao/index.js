const persistence = "MONGO";
let productsDao;
let cartsDao;
let usersDao;
switch(persistence){
    //import dinamico
    case "MEMORY":
        const {default: MemProducts} = await import ('./MemoryDAO/Products.js');
        const {default: MemCarts} = await import ('./MemoryDAO/Carts.js');
       productsDao = new MemProducts();
       cartsDao = new MemCarts();
        break;
    case "MONGO":
        const {default: MongoProducts} = await import ('./MongoDAO/Products.js');
        const {default: MongoCarts} = await import ('./MongoDAO/Carts.js');
        const {default: MongoUser} = await import ('./MongoDAO/User.js');
        productsDao = new MongoProducts();
        cartsDao = new MongoCarts();
        usersDao = new MongoUser();
         break;
    //  case "FILES":
    //     const {default: FilesProducts} = await import ('./FilesDAO/Products.js');
    //     const {default: FilesCarts} = await import ('./FilesDAO/Carts.js');
    //     productsDao = new FilesProducts();
    //     cartsDao = new FilesCarts();
    //      break;
}




export default  {
    productsDao,
    cartsDao,
    usersDao
}
