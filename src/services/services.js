import dao from "../dao/Factory.js";

import UserRepository from "./UserRepository.js";
import CartsRepository from "./CartsRepository.js";
import ProductsRepository from "./ProductsRepository.js";
import OrdersRepository from "./OrdersReporitoy.js";
import ChatRepository from "./ChatRepository.js";


export const productsService =  new ProductsRepository (dao.productsDao );
export const usersService = new UserRepository(dao.usersDao);
export const cartsService = new CartsRepository(dao.cartsDao);
export const ordersService = new OrdersRepository(dao.ordersDao);
export const chatService = new ChatRepository(dao.chatDao);