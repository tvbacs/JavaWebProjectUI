import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RiUserReceivedLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";

import { useState } from 'react';
import Menu from '../Menu';

const cx = classNames.bind(styles);
function Header() {
    const [isLogin , setIsLogin] = useState(true);
    const [isShowMenu, setIsShowMenu] = useState(false);
    return (  
        <div className={cx("wrapper",'w-full')}>
            <div className={cx('content', 'flex','justify-between','items-center')}>
                <div className={cx('flex','justify-center','items-center')}>
                    <Link to='/'><h1 className={cx('text-[30px]','font-bold','mr-20px','logo')}>Connectify</h1></Link>
                        <ul className={cx('nav', 'hidden', 'lg:flex', 'items-center', 'justify-center')}>
                        <li className={cx('nav-item')}>
                            <NavLink
                            to="/"
                            className={({ isActive }) =>
                                cx('nav-link', { active: isActive })
                            }
                            >
                            Trang Chủ
                            </NavLink>
                        </li>
                        <li className={cx('nav-item')}>
                            <NavLink
                            to="/mobile"
                            className={({ isActive }) =>
                                cx('nav-link', { active: isActive })
                            }
                            >
                            Điện thoại
                            </NavLink>
                        </li>
                        <li className={cx('nav-item')}>
                            <NavLink
                            to="/laptop"
                            className={({ isActive }) =>
                                cx('nav-link', { active: isActive })
                            }
                            >
                            Laptop
                            </NavLink>
                        </li>
                        </ul>
                </div>
                <div className={cx('flex','justify-center','items-center')}>
                    <div className={cx('search','flex','items-center')}>
                        <IoSearchOutline className={cx('search-icon')}/>
                        <input  className={cx('search-input')} placeholder="Tìm kiếm sản phẩm..."/>
                    </div>
                    <div className={cx('cart')}>
                        <RiShoppingCart2Line className={cx('text-[20px]')}/>
                    </div>
                    <div className={cx('auth','flex')}>
                            {!isLogin ? 
                                 <NavLink to="/login" className={cx('btn-login')}>
                                <RiUserReceivedLine className={cx('text-[20px]','btn-login-icon')}/>
                                <Link to='/login' ><span className={cx('text-[14px]','btn-login-title','ml-[6px]','lg:block','hidden')}>login now!</span></Link>
                                 </NavLink>:
                               <Link to='/profile'> <img src="/images/testavt.png" alt="avatar"  className={cx('w-[40px]','h-[40px]','rounded-[50%]','cursor-pointer','avt-auth')}/></Link>
                            }
                            <div className={cx('btn-menu','lg:hidden')} onClick={() => setIsShowMenu(prev => !prev)}>
                                <IoMenu className={cx('lg:hidden')}/>
                            </div>
                    </div>
                </div>
            </div>  
           {isShowMenu && <Menu onClose={() => setIsShowMenu(false)} />}

        </div>
    );
}

export default Header;