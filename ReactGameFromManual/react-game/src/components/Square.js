import React from "react";

// Класс
// class Square extends React.Component{

//     render(){
//         return(
//             <button 
//                 className="square"
//                 onClick={this.SquereOnClick}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }

//     SquereOnClick = () =>  {
//         this.props.onClick()
//     }
// }


// export default Square;

// Функция взамен класса


function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square