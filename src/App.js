// Setup
// Setup React
// Componet
// Props
// Props validation
// Function Component
// Class Component
// diff class Component and Function Component
// State & Global Storage
// Life Cycle methods
// TODO Applicaion
// Api Integration
// Hooks
// Convet Todo application using Hooks
// Testing Components

import RouteWithSubRoutes from 'components/Navigation';
import React, { Suspense } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/authContext';
import routes from './route';
import store from './configureStore';
import customHistory from './history';

// const Header = () => {
//   const [auth] = useContext(AuthContext);
//   if (auth) {
//     return (
//       <nav>
//         <ul>
//           {route.map(x => {
//             if (x.label) {
//               return (
//                 <li key={x.path}>
//                   <Link to={x.path}>{x.label}</Link>
//                 </li>
//               );
//             }
//             return null;
//           })}
//         </ul>
//       </nav>
//     );
//   }
//   return null;
// };

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router history={customHistory}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;

// component
// 1. First Letter should be capital
// 2. return only 1 element

// Children is default props in all components
// props is meat to pass data to component
// cant change props value

// Function Component
// const App = ({ children, name }) => (
//   <>
//     <h1>{children}</h1>
//     <h2>{name}</h2>
//     <input type="text" />
//   </>
// );

// Global data
// State is local component data

// component will re-render only when prop value change or state value change.

// React < 15
// Hooks ->
// Class Componenat
// Mouting
// -> constructor
// -> getDerivedStateFromProps
// -> render
// -> componentDidMount

// Updating
// -> getDerivedStateFromProps
// -> shouldComponentUpdate
// -> render
// -> getSnapshotBeforeUpdate -> Hooks Not Supported
// -> componentDidUpdate

// Unmount
// -> componentWillUnmount

// Error
// -> getDerivedStateFromError -> Hooks Not Supported
// -> componentDidCatch -> Hooks Not Supported

// class App extends Component {
//   static propTypes = {
//     children: PropTypes.string.isRequired,
//     name: PropTypes.string,
//   };

//   static defaultProps = {
//     name: 'Hello',
//   };

//   nameRef = createRef();

//   state = {
//     data: 'hello from data',
//   };

//   // State Def
//   /**
//    * Creates an instance of App.
//    * @param {*} props
//    * @memberof App
//    * used for declare state and bind events
//    * fire only once in LCM
//    */
//   constructor(props) {
//     super(props);
//     console.log('constructor');
//     this.copyEvent = this.copyEvent.bind(this);
//   }

//   /**
//    *
//    *
//    * @static
//    * @param {*} props
//    * @param {*} state
//    * @return {*} New State
//    * @memberof App
//    * base on your new Props and new State return new state value
//    * Mouting & Updating
//    */
//   static getDerivedStateFromProps(props, state) {
//     return {
//       ...state,
//       nameWithGreet: `Hello ${props.name}`,
//     };
//   }

//   /**
//    * once component mounted on DOM this LCM called
//    * call only once
//    * Event Lisner Register
//    * TO manipulate DOM
//    * TO Get Data on load of component
//    * @memberof App
//    */
//   async componentDidMount() {
//     this.nameRef.current.style = 'color: red';
//     document.addEventListener('copy', this.copyEvent);
//     this.timeout = setTimeout(() => {
//       console.log('sto');
//     }, 5000);
//     try {
//       // const data = await getData()
//       // this.setState({ data })
//     } catch (error) {
//       // this.setError({ error })
//     }

//     // to Fetch data
//   }

//   /**
//    * base on nextProps and nextState you can stop rerendring
//    * IMP LCM to improve performace
//    *
//    * @param {*} nextProps
//    * @param {*} nextState
//    * @return {boolean}
//    * @memberof App
//    */
//   shouldComponentUpdate(nextProps, nextState) {
//     // if (this.state !== nextState && this.props !== nextProps) {
//     //   return true;
//     // }
//     return true;
//   }

//   /**
//    * To get Current UI Possition
//    * what ever you retun you will get in 3rd parameter of CDU
//    *
//    * @param {*} prevProps
//    * @param {*} prevState
//    * @return {any}
//    * @memberof App
//    */
//   // getSnapshotBeforeUpdate(prevProps, prevState) {
//   //   return 10;
//   // }

//   /**
//    * To remove event listners
//    * TO manipulate DOM
//    * TO Get Data on re-render of component
//    * @param {*} prevProps
//    * @param {*} prevState
//    * @param {*} snapshot
//    * @memberof App
//    */
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     // if(this.state.xyz !== prevState.xyz) {
//     //     // call api
//     // }
//   }

//   /**
//    * to remove events or timeouts or interval
//    * TO Cancel API
//    * TO remove all async processes
//    * @memberof App
//    */
//   componentWillUnmount() {
//     document.removeEventListener('copy', this.copyEvent);
//     clearTimeout(this.timeout);
//   }

//   /**
//    * To display message on Error
//    *
//    * @static
//    * @param {*} error
//    * @return {*}
//    * @memberof App
//    */
//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: error };
//   }

//   /**
//    * To Log errors
//    *
//    * @param {*} error
//    * @param {*} info
//    * @memberof App
//    */
//   componentDidCatch(error, info) {
//     // to log errors
//   }

//   copyEvent() {
//     console.log('copied');
//   }

//   /**
//    * this method return HTML for dome
//    * userd to design UI
//    * @return {HTMLAllCollection}
//    * @memberof App
//    */
//   render() {
//     console.log('render');
//     const { data, nameWithGreet } = this.state;
//     const { children } = this.props;
//     return (
//       <>
//         <h1 ref={this.nameRef}>{nameWithGreet}</h1>
//         <h1>{children}</h1>
//         <h1>{data}</h1>
//         <button
//           type="button"
//           onClick={() => {
//             this.setState({
//               data: 'Hello chnaged data',
//             });
//             // data = 'Hello chnaged data';
//           }}
//         >
//           Click Me
//         </button>
//       </>
//     );
//   }
// }

// App.propTypes = {
//   children: PropTypes.string.isRequired,
//   name: PropTypes.string,
// };

// App.defaultProps = {
//   name: 'Hello',
// };

// export default App;
