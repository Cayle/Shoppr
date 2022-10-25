import {useState, React} from 'react';
import '../style.css';
import ShopprBase from './../api/ShopprBase';
import {Link, Navigate, useNavigate} from  'react-router-dom'
import axios from 'axios';

function Register() {
    const initialUserInfo = {username: '', email: '', password: '', password1: '', password2: ''}
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [registrationSuccess, setRegistrationSucess] = useState(false)

    const navigate = useNavigate()
  

    function registerUser() {
      if (userInfo.password1 === '' || userInfo.username === '' || userInfo.email === '' || userInfo.password2 === '') {
        // console.log("got here");
        return;
      }
      axios.post("http://127.0.0.1:8000/shoppr/register", userInfo)
      .then(function(response) {
          console.log(response.data);
          setUserInfo(initialUserInfo)
          if (response.data.status === "OK") {
            setRegistrationSucess(true)
          }
      }).catch(function(error) {
          console.log(error);
      });

      // console.log("got here");
      // <Navigate to="/login"/>
      //  navigate('/login');
    }

    function RegisterForm() {
        return (
            <section class="vh-30" style={ {'background-color': '#eee'} }>
            <div class="container h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                  <div class="card text-black" style={ {'border-radius': '25px'} }>
                    <div class="card-body p-md-5">
                      <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          { registrationSuccess && 
                          <div class='alert-success' style={{borderRadius: 10 +'px', padding: 10 + 'px'}}>
                          <span>User registered successfully</span> <Link className='text-success' to='/login'> Login </Link>
                        </div>}
                          
    
                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
          
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
                                  value = {userInfo.username}
                                  onChange = {(e) => setUserInfo({username: e.target.value, email: userInfo.email, password1:userInfo.password1, password2: userInfo.password2})}/>

                                {/* <label class="form-label">Your Name</label> */}
                              </div>
                            </div>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                  type="email" 
                                  id="id_email" 
                                  name = "email" 
                                  class="form-control" 
                                  placeholder='Email Address'
                                  value = {userInfo.email}
                                  onChange = {(e) => setUserInfo({username: userInfo.username, email: e.target.value, password1:userInfo.password1, password2: userInfo.password2})}/>
                              </div>
                            </div>

                            {/* <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                  type="password" 
                                  id="id_password1" 
                                  class="form-control" 
                                  placeholder='Password'
                                  value = {userInfo.password1}
                                  onChange = {(e) => setUserInfo({username: userInfo.username, email: userInfo.email, password1:e.target.value, password2: userInfo.password2})}/>
                              </div>
                            </div> */}
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                  type="password" 
                                  id="id_password1" 
                                  name="password1" 
                                  class="form-control" 
                                  placeholder='Password'
                                  value = {userInfo.password1}
                                  onChange = {(e) => setUserInfo({username: userInfo.username, email: userInfo.email, password1:e.target.value, password2: userInfo.password2})}
                                  />
                              </div>
                            </div>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input 
                                  type="password" 
                                  class="form-control" 
                                  id="id_password2" 
                                  name="password2" 
                                  placeholder='Confirm password'
                                  value = {userInfo.password2}
                                  onChange={(e) => setUserInfo({username: userInfo.username, email: userInfo.email, password1: userInfo.password1, password2: e.target.value})}/>
                                {/* <label class="form-label" for="form3Example4cd">Repeat your password</label> */}
                              </div>
                            </div>
          
                            <div class="form-check d-flex justify-content-center mb-5">
                                Already have an account? Log in <Link className='' to='/login'> here </Link>
                            </div>
          
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button  type="submit" class="btn btn-secondary btn-lg" onClick={() => registerUser()}>Register</button>
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
            {RegisterForm()}
        </div>
    );
}

export default Register;