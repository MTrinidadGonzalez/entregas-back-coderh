import chai from 'chai'
import { response } from 'express'
import supertest from 'supertest'

const expect= chai.expect
const requester= supertest('http://localhost:8080')


describe('Supertes de ecommerce CoderHose', async function(){
   describe('Test integral majeno de session', async function(){
       it('End point POST, registro de usuario', async function(){
            const user={
                first_name:"Sol",
                last_name:"Selei",
                email: "sol@gmail.com",
                password:"12345",                                        
            }
            const {status}= await requester.post('/api/session/register').send(user) 
            expect(status).to.be.equal(200)
        })//cierre register
     

      it('End point POST, login de usuario, debe devolver el token de login', async function(){
            const user={
                email: "sol@gmail.com",
                password:"12345",                                        
            }
            const response= await requester.post('/api/session/login').send(user)
            const cookieresult= response.headers['set-cookie'][0]
            const cookie={
                name: cookieresult.split("=")[0],
                value:cookieresult.split("=")[1],
            } 
            expect(cookie.name).to.be.ok.and.eql('authToken')
            expect(cookie.value).to.be.ok
           
         //   expect(status).to.be.equal(200)
        })//cierre login


   })//cierre api/sessions

    
describe('Test integral manejo de usuario', async function(){

    it('Endpoint GET /api/users, trae los usuarios de la db',async function(){
        const response=await requester.get('/api/users')
        const {status,_body}= response
        expect(status).to.be.equal(200)
    })

   

})//cierre api/users
       
     

})//cierre de todos los describe






