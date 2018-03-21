import React from "react";

// export default class Hello extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <p>Hello, {this.props.name}!</p>;
//   }
// }

const Hello = props => {
  return <p>Hello, {props.name}!</p>;
};

export default Hello;
