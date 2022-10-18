import {useState, React} from 'react';
import '../style.css';
import ShopprBase from './../api/ShopprBase';
import {Link, Navigate, useNavigate} from  'react-router-dom';

import axios from 'axios';

function LogIn() {
    const intialLoginInfo = {username: '', password: ''};
    const [loginInfo, setLoginInfo] = useState(intialLoginInfo);

    const navigate = useNavigate();

    function loginUser() {
        if (loginInfo.password == '' || loginInfo.username == '') {
            console.log("got here");
            return;
        }
        // ShopprBase.post('/login', {username: loginInfo.username, password: loginInfo.password})
        //   .then(function (response) {
        //     console.log(response);
        //     <Navigate to='/' />

        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        axios.post("http://127.0.0.1:8000/shoppr/login", {username: loginInfo.username, password: loginInfo.password})
        .then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        console.log("got here");
        <Navigate to="/register"/>
    }

    function LoginForm() {
        return (
            <section class="vh-30" style={ {'background-color': '#eee'} }>
            <div class="container h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                  <div class="card text-black" style={ {'border-radius': '25px'} }>
                    <div class="card-body p-md-5">
                      <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
          
                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>
          
                          <div class="mx-1 mx-md-4">
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder='Username' 
                                    id="id_username" 
                                    name = "username"
                                    value={loginInfo.username}
                                    onChange={(e) => setLoginInfo({username: e.target.value, password:loginInfo.password})}/>
                              </div>
                            </div>
          
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                    type="password" 
                                    id="id_password" 
                                    name="password" 
                                    class="form-control" 
                                    placeholder='Password'
                                    value={loginInfo.password}
                                    onChange={(e) => setLoginInfo({username: loginInfo.username, password: e.target.value})}/>
                                {/* <label class="form-label" for="form3Example4c">Password</label> */}
                              </div>
                            </div>
          
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" class="btn btn-secondary btn-lg" onClick={()=> loginUser()}>Log In</button>
                            </div>
          
                          </div>
          
                        </div>
                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
          
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            class="img-fluid" alt="Sample image"/>
          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }

    return (
        <div>
            {LoginForm()}
        </div>
    );
}

export default LogIn;