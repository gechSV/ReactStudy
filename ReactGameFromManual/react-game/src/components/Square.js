import React from "react";

class Square extends React.Component{

    render(){
        return(
            <button 
                className="square"
                onClick={this.SquereOnClick}
            >
                {this.props.value}
            </button>
        );
    }

    SquereOnClick = () =>  {
        this.props.onClick()
    }
}


export default Square;