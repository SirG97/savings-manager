import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { setUserInfo, setUserToken, setLoginState, logoutUser } from './redux-store/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
// import jwt_decode from 'jwt-decode';
import Dashboard from './pages/dashboard/Dashboard';
import Wallets from './pages/wallets/Wallets';
import Branches from './pages/branches/Branches';
import Transactions from './pages/transactions/Transactions';
import Login from './pages/auth/Login';
// import InitialLogin from './pages/auth/InitialLogin';
// import { jwtDecode } from "jwt-decode";
import Branch from './pages/branches/Branch';
import Employees from './pages/employees/Employees';
import Employee from './pages/employees/Employee';
import Customers from './pages/customers/Customers';
import NewCustomer from './pages/customers/NewCustomer';
import Customer from './pages/customers/Customer';
import CustomerEdit from './pages/customers/CustomerEdit';
import CustomerDeposit from './pages/customers/CustomerDeposit';
import CustomerWithdraw from './pages/customers/CustomerWithdraw';
import Deposit from './pages/deposit/Deposit';
import Withdrawal from './pages/withdrawals/Withdrawal';
import Commission from './pages/commissions/Commission';
import Transfer from './pages/transfers/Transfers';
import Expenses from './pages/expenses/Exepenses';
import CustomerDeductCommission from './pages/customers/CustomerDeductCommission';
import ChangePassword from './pages/auth/ChangePassword';

const App = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.auth)
  let navigate = useNavigate()
  let token = localStorage.getItem("token");
  
    const useBeforeRender = (callback, deps) => {
      const [isRun, setIsRun] = useState(false);
      if (!isRun) {
        callback();
        setIsRun(true);
      }
      useEffect(() => () => setIsRun(false), [])
    };
  
  useBeforeRender(() => {
      
      dispatch(setUserToken(localStorage.getItem("token")))
      dispatch(setUserInfo(localStorage.getItem("userInfo")))
     
      dispatch(setLoginState(localStorage.getItem("loginState")))
    
    }, [dispatch]);
  
  if (selector.loggedIn) {
      // console.log(localStorage.getItem("token"))
    
      if (!token) {
        dispatch(logoutUser());
        navigate('/login');
      }
  
    }
  

  
  const AuthContainer = () => (
    <Routes>
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/change-password" element={<ChangePassword />} />
    </Routes>
  )
  const NotFoundContainer = () => (
    <Routes>
    <Route path="/404" element={<Login />} />
    <Route path="*" element={<Login />} />
    </Routes>
  )
    return (<>
        <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/branches" element={<Branches />} />
        <Route exact path="/branches/:id" element={<Branch />} />
        <Route exact path="/employees" element={<Employees />} />
        <Route exact path="/employee/:id" element={<Employee />} />
        <Route exact path="/customers" element={<Customers />} />
        <Route exact path="/customers/new" element={<NewCustomer />} />
        <Route exact path="/customer/:id" element={<Customer />} />
        <Route exact path="/customer/:id/edit" element={<CustomerEdit />} />
        <Route exact path="/customer/:id/deposit" element={<CustomerDeposit />} />
        <Route exact path="/customer/:id/withdraw" element={<CustomerWithdraw />} />
        <Route exact path="/customer/:id/commission" element={<CustomerDeductCommission/>} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/deposits" element={<Deposit />} />
        <Route exact path="/withdrawals" element={<Withdrawal />} />
        <Route exact path="/commissions" element={<Commission />} />
        <Route exact path="/transfers" element={<Transfer />} />
        <Route exact path="/expenses" element={<Expenses />} />
        <Route exact path="/loans" element={<Wallets />} />
        <Route exact path='*' element={<NotFoundContainer/>} />
        <Route exact path='auth/*' element={<AuthContainer />} />
      </Routes>
    </>);
}

export default App