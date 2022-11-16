import dao from "../dao/index.js";

import UserService from "./UserService.js";
import CartsService from "./CartsService.js";
import ProductsService from "./ProductsService.js";


export const productsService =  new ProductsService (dao.productsDao );
export const cartsService = new CartsService(dao.usersDao);
export const usersService = new UserService(dao.cartsDao);