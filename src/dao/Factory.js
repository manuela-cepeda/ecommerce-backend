const persistence = "MONGO";
let productsDao;
let cartsDao;
let usersDao;
let ordersDao;
let chatDao;
switch(persistence){

    case "MONGO":
        const {default: MongoProducts} = await import ('./MongoDAO/Products.js');
        const {default: MongoCarts} = await import ('./MongoDAO/Carts.js');
        const {default: MongoUser} = await import ('./MongoDAO/User.js');
        const {default: MongoOrders} = await import ('./MongoDAO/Orders.js');
        const {default: MongoChat} = await import ('./MongoDAO/Chat.js');
        productsDao = new MongoProducts();
        cartsDao = new MongoCarts();
        usersDao = new MongoUser();
        ordersDao = new MongoOrders();
        chatDao = new MongoChat();
         break;
}




export default  {
    productsDao,
    cartsDao,
    usersDao,
    ordersDao, 
    chatDao
}
