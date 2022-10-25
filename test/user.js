let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('../index')
const userRoute = require('../routes/user')

//app.use("/api/users", userRoute)
//ASSERTION STYLE

chai.should();

chai.use(chaiHttp);

describe("Users API", ()=>{
    //TEST THE GET ROUTE
    describe('GET /api/users', ()=>{
        it("It should get all the users", (done)=>{
            chai.request(server)
                .get("/api/users", userRoute)
                .end((err, response) =>  {
                    response.should.have.status(200);
                    //response.body.should.be.a('array');
                    //response.body.length.should.be.eq(3);
                    done()
                })
        })

        it("It should NOT get all the tasks", (done)=>{
            chai.request(server)
                .get("/api/task")
                .end((err, response) =>  {
                    response.should.have.status(404);
                    done()
                })
        })
    })
})