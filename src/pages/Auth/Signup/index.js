

import classNames from "classnames/bind";
import styles from '../Auth.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoAt } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";


const cx = classNames.bind(styles)
function SignupPage() {
     const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
//     const handleLogin = () => {
//     localStorage.setItem('token', 'dummy_token');
//     navigate(from, { replace: true });
//   };
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Connectify</h1>
                <span>Sign up now use the website!</span>
                <form>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <IoAt className={cx('text-[20px]')}/>
                        </div>
                        <input className={cx('form-input')} placeholder='email address...'/>
                    </div>
                     <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <AiOutlineUser className={cx('text-[20px]')}/>
                        </div>
                        <input className={cx('form-input')} placeholder='fullname...'/>
                    </div>
                     <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <IoCallOutline className={cx('text-[20px]')}/>
                        </div>
                        <input type ='number'className={cx('form-input')} placeholder='phonenumber...'/>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <LuKeyRound className={cx('text-[20px]')}/>
                        </div>
                        <input type="password" className={cx('form-input')} placeholder='password...'/>
                    </div>
                    <button className={cx('btn-submit')}>Sign up</button>
                    <Link className={cx('btn-switch')} to='/login'>Login an account!</Link>
                </form>
            </div>

        </div>
     );
}

export default SignupPage;