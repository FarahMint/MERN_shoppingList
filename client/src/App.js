import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "reactstrap";
import AppNavbar from "./components/appNavBar";
import ShoppingList from "./components/shoppingList";
import ItemModal from "./components/itemModal";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth_action";

import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
