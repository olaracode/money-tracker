import React from "react";
import "./UserStyle.css";
import UserNav from "./UserNav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import General from "./general/General";
import Ingresos from "./Ingresos";
import Egresos from "./Egresos";
import Metas from "./Metas";

function UserArea() {
  return (
    <div className="UserBody">
      <BrowserRouter>
        <UserNav />
        <Switch>
          <Route exact path="/" component={General} />
          <Route path="/ingresos" component={Ingresos} />
          <Route path="/egresos" component={Egresos} />
          <Route path="/metas" component={Metas} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default UserArea;
