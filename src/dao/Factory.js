const persistence = "MONGO";
let productsDao;
let cartsDao;
let usersDao;
let chatDao;
let ordersDao;
switch(persistence){

    case "MONGO":
        const {default: MongoProducts} = await import ('./MongoDAO/Products.js');
        const {default: MongoCarts} = await import ('./MongoDAO/Carts.js');
        const {default: MongoUser} = await import ('./MongoDAO/User.js');
        const {default: MongoChat} = await import ('./MongoDAO/Chat.js');
        const {default: MongoOrders} = await import ('./MongoDAO/Orders.js');
        productsDao = new MongoProducts();
        cartsDao = new MongoCarts();
        usersDao = new MongoUser();
        chatDao = new MongoChat();
        ordersDao = new MongoOrders();
         break;
}




export default  {
    productsDao,
    cartsDao,
    usersDao,
    chatDao,
    ordersDao
}
