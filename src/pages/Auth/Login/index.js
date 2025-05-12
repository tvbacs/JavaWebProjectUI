

import classNames from "classnames/bind";
import styles from '../Auth.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoAt } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";

const cx = classNames.bind(styles)
function LoginPage() {
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
                <span>Welcome to Connectify Store – Your Trusted Marketplace for Pre-Loved Items!</span>
                <form>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <IoAt className={cx('text-[20px]')}/>
                        </div>
                        <input className={cx('form-input')} placeholder='email address...'/>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-icon')}>
                            <LuKeyRound className={cx('text-[20px]')}/>
                        </div>
                        <input type="password" className={cx('form-input')} placeholder='password...'/>
                    </div>
                    <button className={cx('btn-submit')}>Login</button>
                    <Link className={cx('btn-switch')} to='/signup'>Sign up an account for free!</Link>
                </form>
            </div>

        </div>
     );
}

export default LoginPage;