import Supertest from 'supertest';
import Chai from 'chai';

const expect = Chai.expect;
const requester = Supertest('http://localhost:8080');

let tempCartId;
let tempProductId;
const tempProduct = {
    name: "Crema hidratante",
    href :"#",
    imageSrc: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
    imageAlt: "Crema hidratante",
    size: "100ml",
    price: 800,
    stock: 10,
    category:1,
    code:"dodthji"
}




describe('products testing', () => {
    describe('POSTS', () => {
        it('Debería poder crear un producto', async()=>{
            const response = await requester.post('/api/products').send(tempProduct);
            const {_body} = response;
            expect(_body).to.include.keys('_id')
            tempProductId = _body._id
        })
    })
    describe('GETS', () => {
        it('La petición base debe retornar 200',async()=>{
            let response = await requester.get('/api/products')
            expect(response.status).to.be.equal(200)
        })
        it('La petición base debe retornar un arreglo de productos',async ()=>{
            const response = await requester.get('/api/products');
            const {_body} = response;
            expect(_body).to.be.an('array')
        })
        
        it('La petición  debe retornar un producto ',async ()=>{
            const response = await requester.get(`/api/products/${tempProductId}`);
            const {_body} = response;
            expect(_body).to.be.an('object')
        })
    })
    
})

describe('carts testing', () => {
    describe('POSTS', () => {
        it('Debería poder crear un cart, que incluya un arr de productos vacio', async()=>{
            const response = await requester.post('/api/carts');
            const {_body} = response;
            expect(_body).to.include.keys('_id', 'products')
            expect(_body.products).to.be.an('array')
            expect(_body.products.length).to.be.equal(0)
            tempCartId = _body._id
        })
        it('Debe poder agregarse productos al cart', async()=>{
            const response = await requester.post(`/api/carts/${tempCartId}/products`).send({pid: tempProductId, qty:10 });
            const {_body} = response;
            expect(_body.status).to.be.equal('success')
           
        })
    })

    describe('GETS', () => {
        it('La petición base debe retornar 200',async()=>{
            let response = await requester.get('/api/carts')
            expect(response.status).to.be.equal(200)
        })
        it('La petición base debe retornar un arreglo de carts',async ()=>{
            const response = await requester.get('/api/carts');
            const {_body} = response;
            expect(_body).to.be.an('array')
        })
        it('La petición base debe retornar un arreglo de productos',async ()=>{
            const response = await requester.get(`/api/carts/${tempCartId}/products`);
            const {_body} = response;
            expect(_body).to.be.an('array')
        })

    })
    
})

