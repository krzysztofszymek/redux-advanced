import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'
import { getCartData, sendCartData } from './store/slices/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartVisibility = useSelector(state => state.uiReducer.cartIsVisible);
  const cart = useSelector(state => state.cartReducer);
  const notification = useSelector(state => state.uiReducer.notification);

  useEffect(() => {
    dispatch(getCartData())
  }, [dispatch]);

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message}/>
      }
      <Layout>
        {cartVisibility && <Cart />}
        <Products />
      </Layout>
    </Fragment>
    
  );
}

export default App;
