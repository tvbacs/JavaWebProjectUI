
import classNames from "classnames/bind";
import styles from './MobilePage.module.scss'

const cx = classNames.bind(styles)
function MobilePage() {
    return ( 
        <div className={cx('wrapper')}>
            MobilePage
        </div>
     );
}

export default MobilePage;