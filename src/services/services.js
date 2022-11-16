import dao from "../dao/Factory.js";

import UserRepository from "./UserRepository.js";
import CartsRepository from "./CartsRepository.js";
import ProductsRepository from "./ProductsRepository.js";


export const productsService =  new ProductsRepository (dao.productsDao );
export const usersService = new UserRepository(dao.usersDao);
export const cartsService = new CartsRepository(dao.cartsDao);