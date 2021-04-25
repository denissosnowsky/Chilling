import { connect } from 'react-redux';
import { logoutAuth } from '../../redux/authReducer';
import Header from "./Header";

const HeaderContainer = ({logoutAuth, sImg}) => {
    return(
        <Header logoutAuth={logoutAuth}
                sImg={sImg}
        />
    )
};

const mapStateToProps = (state) => ({
    sImg: state.authPage.sImg
});

export default connect(mapStateToProps, {logoutAuth})(HeaderContainer);
