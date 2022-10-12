import {useState, React} from 'react';
import '../style.css';
import ShopprBase from './../api/ShopprBase';
import {Link} from  'react-router-dom'

function Register() {
    const initialUserInfo = {username: '', email: '', password1: '', password2: ''}
    const [userInfo, setUserInfo] = useState(initialUserInfo);

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
          
                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
          
                          <form class="mx-1 mx-md-4" action='http://127.0.0.1:8000/shoppr/register' method='POST'>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="text" class="form-control" placeholder='Username' id="id_username" name = "username"/>
                                {/* <label class="form-label">Your Name</label> */}
                              </div>
                            </div>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="email" id="id_email" name = "email" class="form-control" placeholder='Email Address'/>
                                {/* <label class="form-label" for="form3Example3c">Your Email</label> */}
                              </div>
                            </div>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="password" id="id_password1" name="password1" class="form-control" placeholder='Password'/>
                                {/* <label class="form-label" for="form3Example4c">Password</label> */}
                              </div>
                            </div>
          
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="password" class="form-control" id="id_password2" name="password2" placeholder='Confirm password'/>
                                {/* <label class="form-label" for="form3Example4cd">Repeat your password</label> */}
                              </div>
                            </div>
          
                            <div class="form-check d-flex justify-content-center mb-5">
                              {/* <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                              <label class="form-check-label" for="form2Example3"> */}
                                Already have an account? Log in <Link className='' to='/login'> here </Link>
                              {/* </label> */}
                            </div>
          
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button  type="submit" class="btn btn-secondary btn-lg">Register</button>
                            </div>
          
                          </form>
          
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
            {/* <h1>
                This is the registration page.
            </h1>
            <form action='http://127.0.0.1:8000/shoppr/register' method='POST'>
                <div>
                    <label for='id_username'>Username</label>
                    <input type="text" id="id_username" name = "username" autofocus required />
                </div>
                <div class="group-input" id = "div_id_email">
                    <label for="id_email" class="requiredField">Email address *</label>
                    <input type="email" id="id_email" name = "email" required />
                </div>
                <div class="group-input" id="div_id_password1">
                    <label for="id_password1" class="requiredField">Password *</label>
                    <input type="password" id="id_password1" name="password1" required autocomplete='new_password' />
                </div>
                <div class="group-input" id="div_id_password2">
                    <label for="id_password2" class="requiredField">Confirm Password *</label>
                    <input type="password" id="id_password2" name="password2" required autocomplete='new_password' />
                </div>
                <button type="submit" class="site-btn register-btn">REGISTER</button>
            </form> */}
        </div>
    );
}

export default Register;